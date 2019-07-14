# ubuntu

## 基本准备

### 中文语言切换

设置 -》 语言，下载安装中国语言，上拉置顶。安装重启即可

### 常用软件安装

- 设置服务器镜像源（ubuntu大部分软件利用 apt命令，从ubuntu服务器直接安装，为提高效率）

  步骤： 软件和更新 -》 ubuntu软件  -》下载自（选择其它站点） -》 自动检测

- apt终端命令

  - 使用 apt 安装/更新/卸载

  ```
  # 安装软件
  sudo apt install 软件名
  
  # 卸载软件
  sudo apt remove 软件名
  
  # 更新可以用软件包列表
  sudo apt update
  
  # 更新已安装软件的包
  sudo apt upgrade
  ```

  - 安装常用工具

  ```
  # python 常用安装
  sudo apt install ipython
  sudo apt install ipython3
  sudo apt install python-pip
  sudo apt install python3-pip
  ```

  - `apt` 和 `apt-get`

    apt 是 apt-get 的强势版本，我们日常使用 apt 即可正常进行操作

- **deb 安装格式**

  ```
  deb 是 Debian Linux 的安装格式， 在 ubuntu 中同样可以使用
  $ sudo dpkg -i <package.deb>
  ```

  - 谷歌浏览器 chrome

  ```
  # 下载谷歌浏览器 deb
  
  # 执行命令
  sudo apt install libappindicator1 libindicator7
  sudo dpkg -i google-chrome-stable_current_amd64.deb
  sudo apt -f install
  ```

  

  - 搜狗输入法