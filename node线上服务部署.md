# Node 线上服务部署【windows】

## 常用命令

查看硬盘信息 `sudo fdisk -l`  

查看硬盘使用信息 `df -h`

退出 `control + d`

清屏 `control + r`

## 购买主机&域名



## 线上服务部署

### **远程登录服务器**

##### 第一次 `root` 登录

​	`ssh root@132.232.**.***`

​	输入密码 ****

任命钦差大臣（管理员）	

`adduser smile_x` 

```
smile_x wupengXIAOBAI1234
```

设置权限

​	`gpasswd -a smile_x sudo` （相对较高权限）	

​	执行 `sudo visudo` 

```js
# User privilege specification 
smile_x ALL=(ALL:ALL) ALL	// 授予管理员有超级权限 (=输入密码的超管）
```

##### ssh 无密码登录(无需输入密码的超管)

```
本地私钥 -> 本地传到服务器的公钥 -> 密钥算法对比 -> 登录
```

**生成本地密钥**

```
ssh-keygen -t rsa -b 4096 -C "17805819702@139.com"  #连续回车(不需要输入密码)
```

*生成文件 :* `id_rsa` 本地私钥   `id_rsa.pub` 本地公钥

*查看密钥内容 :* `type id_rsa` 

**加入代理** (windows 打开 `gitpash` 操作)

运行 ssh-agent 代理  `eval "$(ssh-agent -s)"`

加入 `ssh-add ~/.ssh/id_rsa`

**生成服务器密钥**

操作与本地生成密钥一致

**创建授权文件，拷贝本地公钥**

```js
# 创建打开授权文件
vi authorized_keys 
# 复制本地公钥（id_rsa.pub），保存退出 ESC -> :wq
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDHpjmuQLJUVRI5ZAi295xkFZeJJ+dQSV4PCq3taWrB8excx96nxvrff1mvEG/23VBdCwdEaCFgLwUIMcBiFmfWUXIasF9zlJ1tB4aCeeV8uN6yal4EUFuYhihzbpZC3EQZaIrXXHa0rh9MrfILJZFqOyvgrOjbizHkcfjPWGIN4nWr9CU/JxL7Wra7c+zAMkpDopx3FJ7aXZ2JEwiKyWvNrpAb1rZ2E3qrklVw+1O56jWh57HDOrPuHWMy7S2xlPX34QxgysnuoHAhCsVljdL+fVz4dc20HhZboSlMxdZAkao3UMlSYZk6qblF4Sz9wb5Ti+HpxdaaNuarM0uuXLXRugOopk9QU3fs//bNjaf3p8M65IoYmWEySI+Ml6NeWkPPA1N0n25aURWmsat2JSoE+AsC6O1K3ONbWA25EfcOLKMH6jUzZqGYxUfUhnKoVASGVFnszhRezIMbZTe9Mehe4dGrG2Lf1B8LdvzyK3amk8mHUL7spHy2PPDb1lhZBu/GRyL4SXUwXpCS2ikJxcqJJiUh59FIF20S6Nr11MylmXT4YDnAqpdI+muFltIrEyTvrEm0X8HAWJkfF6zmSATD/t2q5aS2xeUgMAwfoHIVd8Y34JlPNn0F0maQUEZqvx51/qW8TB5i5UnRQBITflDx9eKoUckmQvspK+SU2vRreQ== 17805819702@139.com
# 文件授权，重启 ssh
chmod 600 authorized_keys
sudo service ssh restart
```

### 增强服务安全等级

##### 修改 Linux 默认登录端口

输入配置命令 `sudo vi /etc/ssh/sshd_config` 进入配置文件

```JS
# 修改端口及允许登录用户
Port 59999
Port 23333

# 允许root登录： 设置为 no 不允许 root 登录
PermitRootLogin yes

# 只允许用户登录
AllowUsers root smile_w smile_x smile_z
```

重启 ssh `sudo service ssh restart`

验证: 通过 59999 端口登录用户 `ssh -p 59999 smile_w@132.232.**.***`

##### 禁止 root 登录的权限

```JS
# 允许root登录： 设置为 no 不允许 root 登录
PermitRootLogin no
```

### 搭建 Node 生产环境
##### 防火墙配置
- 安装 ufw `apt-get install ufw`
- 启用
  ufw enbale
  ufw default deny
**实例**
- 查看防火墙状态
  `ufw status`  
    - inactive 未开启
    - active 开启
- 启用防火墙
  `ufw enbale`
- 禁用防火墙
  `ufw disable`
  
##### 防火墙规则设置

- 创建防火墙规则 `sudo vi /etc/iptables.up.rules`

  ```JS
   *filter
    # 允许所有建立起来的链接
    -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
    # 允许所有出去的流量
    -A OUTPUT -j ACCEPT
    # 允许https 请求下的链接
    -A INPUT -p tcp --dport 443 -j ACCEPT
    -A INPUT -p tcp --dport 80 -j ACCEPT
    # 设置只能从 39999 端口登录服务器
    -A INPUT -p tcp -m state --state NEW --dport 39999 -j ACCEPT
    # ping
    -A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT
    # log denied calls
    -A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied" --log-level 7
    # drop incoming sensitive connections 禁止密集的或者可疑的请求
    -A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --set
    -A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 150
     -j DROP
    # reject all other inbound

    -A INPUT -j REJECT
    -A FORWARD -j REJECT
    
    COMMIT
  ```
  ```JS
  *filter
  # 允许所有建立起来的连接
  -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
  -A OUTPUT -j ACCEPT
  
  # 允许 http https
  -A INPUT -p tcp --dport 443 -j ACCEPT
  -A INPUT -p tcp --dport 80  -j ACCEPT
  
  # 允许 ssh 端口登录
  -A INPUT -p tcp -m state --state NEW --dport 59999 -j ACCEPT
  -A INPUT -p tcp -m state --state NEW --dport 39999 -j ACCEPT
  -A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT
  
  # 允许 ping
  -A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT
  
  # 级别
  -A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied:" --log-level 7
  
  # 可疑、密集请求拦截（对80端口在60秒内发出超过 150 次请求）
  -A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --set
  -A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 150 -j DROP
  
  # 拒接所有其他连接
  -A INPUT -j REJECT
  -A FORWARD -j REJECT
  
  COMMIT
  ```

  遇到问题：提示 COMMIT 执行失败
  



##### 搭建node环境

- 更新软件包

  `sudo apt-get update`

- 安装 `Linux` 软件包

  `sudo apt-get install vim openssl build-essential libssl-dev wget curl git`

- 安装Node

  - 安装 `vim`

    `wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`

  - 使用 `vim` 安装 `Nodejs`

    `nvm install v10.15.3`

  - `nvm` 使用 `node`， 设置默认版本

    `nvm use v10.15.3`  `nvm alias default v10.15.3`

- 安装 `npm` 指定国内镜像源

  `npm --registry=https://registry.npm.taobao.org install -g npm`

  临时使用淘宝镜像源 `npm --registry https://registry.npm.taobao.org install express`

  永久使用淘宝镜像源 `npm config set registry https://registry.npm.taobao.org`

- 安装 `cnpm` npm install -g cnpm

- 安装 `npm` 包文件

  `npm i pm2 webpack gulp grunt-cli -g`

### PM2 使用

- 开启一个服务 `pm2 star app.js`
- 关闭一个服务 `pm2 stop app.js`
- 删除一个服务 `pm2 delete app.js`
- 查看服务列表 `pm2 list`
- 展示一个服务信息 `pm2 show app`
- 展示所有服务日志 `pm2 logs`
- 清除所有日志 `pm2 flush`

### 配置 `Nginx` 反向代理

- 安装 `Nginx`

  - 更新包列表 `sudo apt-get update`
  - 安装 `Nginx`  `sudo apt-get install nginx`
  - 查看 `Nginx` 版本 `nginx -v`

- `Nginx` 配置代理转发

  - 创建/打开代理配置文件

    ```js
    cd /etc/nginx/conf.d
    # 配置
    sudo vi  www-nimengwei-com-3000.conf
    ```

  - 编辑 `Nginx` 代理文件

    ```JS
    server {
        listen 80;
        server_name 132.232.**.***;
    
        location / {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_pass http:WWW.xbainy.cn//website;
            proxy_redirect off;
        }
    }
    ```

    **当用户访问 132.232.27.121 时， 转发到本机的 `http://127.0.0.1:3000`**

  - `Nginx` 测试及重启

    ```JS
    sudo nginx -t	//	测试
    sudo nginx -s reload	//	重启
    # nginx 主页路径为 /usr/share/nginx/html
    ```

- 返回隐藏 `Nginx` 版本信息

  ```JS
  # 通过 nginx 代理会返回 nginx 版本信息
  响应头 Response Header 中 server 字段值为 nginx/1.4.6(ubuntu)
  # 进入配置文件目录，编辑配置文件
  cd /etc/nginx
  sudo vi nginx.conf
  # 解除 nginx 配置
  server_tokens off；
  # 重启 nginx
  sudo nginx -s reload
  ```

  如此响应头中 Response Headers 中 serve 显示为 nginx。
  
 

### 管理域名解析

- 主机记录	

- 设置DNS解析实现域名访问七牛云

  ```JS
  1. 操作七牛云
  进入七牛云 - 资源主页 - 对象存储 -新建、选择存储空间 - 融合 CDN 加速域名 - 立即绑定一个域名 -加速域名（weixin.cloud.xbainy.cn）
  进入七牛云 - 资源主页 - 融合CDN - 域名管理 - 复制 CNAME 记录值
  2. 操作腾讯云
  登录腾讯云 - 控制台 - 域名 - 解析 
  添加记录值 - 选择CNAME - 填写主机记录(weixin.cloud) - 粘贴记录值 - 添加
  3. 测试
  ```


###  服务器配置安装 Mongodb



### 服务器配置安装Mysql

### Mysql删除
- 查看mysql的依赖库项 `dpkg --list|grep mysql`
- 卸载 
  `sudo apt-get remove mysql-common`
  `sudo apt-get autoremove --purge mysql-server-5.7`
- 清除残余
  `dpkg -l|grep ^rc|awk '{print$2}'|sudo xargs dpkg -P`
- 查看剩余依赖
  `dpkg --list|grep mysql`
- 删除剩余依赖
  `sudo apt-get autoremove --purge mysql-apt-config`
  
```JS
# 删除mysql
sudo apt purge mysql-*
sudo rm -rf /etc/mysql/ /var/lib/mysql
sudo apt autoremove
sudo apt autoreclean
```
