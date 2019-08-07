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