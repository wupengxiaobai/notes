# NodeJS学习笔记

## 前奏预热

**Webkit 工作原理（Chrome，Safari， Opera）**

![1543038934559](.\node\1543038934559.png)

**浏览器访问服务器过程**

1. 浏览器地址栏中输入网址
2. 浏览器通过用户在地址栏中输入的 URL 构建 HTTP 请求报文
3. 浏览器发起 DNS 解析请求，将域名转为 IP 地址
4. 浏览器将请求报文发送给服务器
5. 服务器接收请求报文，并解析
6. 服务器处理用户请求，并将结果封装成 HTTP 响应报文
7. 服务器将 HTTP 响应报文发送给浏览器
8. 浏览器接收服务器响应的 HTTP 报文，并解析
9. 浏览器解析 HTML 页面并显示， 在解析 HTML 页面时遇到新的资源再次进行请求发送
10. 最终浏览器展示页面

**web开发本质**

1. 请求， 客户端发起请求
2. 处理，服务器处理请求
3. 响应，服务器将处理结果发送给客户端

**关于C/S 和 B/S**

C/S：客户端服务器(Client/Server)



B/S：浏览器服务器(Browser/Server)

## 认识

> 参考文档: https://nodejs.org/zh-cn/docs/

- **Node.js是什么**
  - 是一个 JavaScript 运行时环境，是一个开发平台
  - 简单讲就是可以解析和执行js代码(以前只有浏览器可以解析js代码)

- 浏览器中的JavaScript
  - EcmaScript
    - 基本语法
    - if
    - var
    - function
    - Object
    - Array
    - ...
  - DOM
  - BOM

- **Node.js中的 JavaScript**
  - 没有BOM/DOM
  - EcmaScript语法
  - 在node这个js执行环境中,为JavaScript提供一些服务端的API
    - 文件读写
    - 网络服务的构建
    - ....

- 构建于Chrome的V8引擎之上

  - Chrome的V8引擎是解析javascript代码最快的

- **Node.js 的特性**
  - 事件驱动
  - 非阻塞IO(异步操作)
  - 单线程

  **理解: ** node.js 为何又是单线程, 又是非阻塞 IO

  [异步代码动画演示](http://latentflip.com/loupe)	

- Node.js 包管理器
  - 拥有是世界上最大的开源库生态系统(npm)
  - 绝大多数js相关的包都可以通过npm安装

------

- **Node.js能做什么**

  - **web服务器后台**
  - 命令行工具
    - npm(node)
    - git(c)

  - Web 应用程序（网站）
- node.js 全栈开发技术栈： MEAN - MongoDB Express Angular Node.js
- 预备知识
  - 简单的命令行操作
    - cd 
    - dir 列出目录
    - rm 删文件
- 学习资源
  - 深入浅出Node.js           偏理论，理解底层原理帮助
  - Node.js权威指南        API讲解
  - Node 入门
  - [Node.js API文档](https://nodejs.org/zh-cn/docs/)
- 为什么要学习Node.js
  - 通过学习 Node.js 开发深入理解 **服务器开发**, **web请求和响应过程**, **了解服务器如何与客户端配合**
  - 学习服务器端渲染
- **学到？**
  - B/S编程模型
    - Browerr - Server
    - 任何服务端技术 BS编程模型都是一样的
  - 模块化编程
  - Node常用API
  - 异步编程
    - 回调函数
    - Promise
    - async
    - generator
  - Express开发框架
  - Ecmascript6

------

## 起步

### 安装Node 环境

[下载地址](https://nodejs.org/zh-cn/download/)

- 查看Node版本 				`node --version` 简写 `node -V`
- 确认Node.js 是否安装成功     

#### **通过 nvm-windows 管理一台计算机上的多个 node 版本**

[github地址](https://github.com/coreybutler/nvm-windows)

常用命令:

- nvm version
- nvm install latest           下载最新版本的 node.js
- nvm install 版本号         下载 node.js 版本
- nvm uninstall 版本号     删除 node.js 版本
- nvm list                            查看已安装 node.js 列表
- nvm use 版本号              切换 node 版本

### Node执行js脚本文件

- **输入 `node 文件名`  执行对应脚本文件**
- 不使用中文命名
- 解析执行 JavaScript  

```js
//	命令行输入 执行对应js脚本文件
node xxx.js
```
## 开始

### Node开发web网站

nodejs 本身就是一个 http 服务程序, 无需额外服务器支持

![1543112694571](.\node\1543112694571.png)

### REPL

类似浏览器的 console 控制台

如果我们在测试一个简单的 node 程序, 无需再次创建. cmd控制台输入 node 即可, 之后我们就可以在控制台中测试node代码了

![1543113999175](.\node\1543113999175.png)

### Hello Word

![1543114983932](.\node\1543114983932.png)

------

## node 中的 js

- EcmaScript

  - 没有DOM/BOM

- 模块系统

  - 核心模块
  - 第三方模块
  - 用户自定义模块

  在 Node 中没有全局作用域的概念

  在 Node 中,只能通过 require 的方法来加载执行 多个 javascript 脚本文件

  require 加载只能执行其中的代码, 文件与文件之间由于是模块作用域, 所以不会有变量污染的问题

  ​	模块完全封闭

  ​	外部无法访问内部

  ​	内部也无法访问外部

  模块作用域固然带来了一些好处, 可以加载多个文件, 可以完全避免变量冲突污染问题

  但是某些情况下, 模块和模块是需要进行通信的

  在每个模块中, 都提供了一个对象: `exports` , 该对象默认是一个空对象

  你要做的就是需要吧外部访问使用的成员手动挂载到 `exports` 接口对象中,谁来 `require` 这个模块, 谁就可以的到模块内部的 `exports` 接口对象

### 核心模块

Node为 javascript 提供了很多服务器级别的API, 一个个具名模块,都有自己特殊的名称标识

例如文件操作的 `fs` 模块, http服务构建的 `http` 模块, `path` 路径操作模块, `os` 操作系统信息模块.....

> 参考文档: https://nodejs.org/dist/latest-v8.x/docs/api/

`var fs= require('fs')`

```js
// 核心模块需要先被require,才可以使用
const xxx = require('核心模块');
```

#### fs 模块(文件读写)

- fs.mkdir(文件夹名, 回调) 创建文件夹

- **fs.readdir(文件,回调) 读取文件目录**

```js
// 多个异步操作有时候不可以正常读取文件.
fs.readdir('./aaa', (err, files) => {
    var wenjainjia = [];
    // 迭代器iterator函数就是 强行把异步操作变成同步操作
    (function iterator(i) {
        if (i == files.length) {
            console.log(wenjainjia)
            return;
        }
        fs.stat("./aaa/" + files[i], (err, stats) => {
            if (stats.isDirectory()) {
                wenjainjia.push(files[i])
            }
            iterator(i + 1);
        })
    })(0)
})
```

- **fs.readFile**  **fs.writeFile**
  - fs.readFile(path[, options], callback)
  - fs.writeFile(file, data[, options], callback)

```javascript
//	读文件
fs.readFile('./data/hello.txt', (err, data) => {
    if (err) {  //通过判断err来确定是否有错误发生
        console.log('读取文件失败');
        return;
    }
    console.log(data, data.toString());
    // <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 2e 6a 73>
    // 文件中存储的其实是二进制数据 0 1
    // 我们可以通过toString方法把起转为我们认识的数据 
})

//	写文件
fs.writeFile('./data/write', '大家好,我是node.js,正在执行写文件的操作', (err) => {
    if (err) {
        console.log('文件写入失败');
        return;
    }
    console.log('文件写入成功!');
})
```

**\_\_dirname** 和 **\_\_filename** 

​	_\_dirname 表示当前正在执行的js文件所在目录

​	__filename 表示当前正在执行的js文件完整路径

![1543123590061](.\node\1543123590061.png)



**封装promise版本的readFile, 鄙视回调地狱**

```javascript
var fs = require('fs')
function pReadFile(fliePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(fliePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

pReadFile('./data/a.txt')
    .then((data) => {
        console.log(data)
        return pReadFile('./data/b.txt')
    })
    .then((data) => {
        console.log(data)
        return pReadFile('./data/c.txt')
    })
    .then((data) => {
        console.log(data)
    })
```



#### http 模块

```javascript
//  使用Node 非常轻松地构建一个 web 服务器
//  在Node 中专门提供了一个核心模块: http
//  http 这个模块职责就帮我们创建编写服务器

// 1.加载 http 核心模块
const http = require('http');

// 2.使用 http.createServer() 方法创建一个web服务器, 返回一个 Server 实例
const server = http.createServer();

// 3.服务器要干嘛?
//      提供服务: 对数据的服务
//      接收请求
//      处理请求
//      发送反馈(响应)
//  注册request 请求事件,当客户端请求过来就会自动触发服务器的request请求事件,然后执行第二个参数回调处理函数
server.on('request', function (requset, response) {
    //  Request     请求对象
    //      请求对象可以用来获取客户端的一些数据请求,例如请求路径
    //  Response    响应对象
    //      响应对象可以用来给用户发送数据
    // response对象有一个方法: write 可以用来给对象发送数据
    // write 可以写很多次,但是最后一定要用end结束响应,不然服务端会一直响应
    console.log('收到客户端的请求了');
    //	接收请求
    console.log(request.url)
    //	响应请求
    //	服务器通过响应报文来告诉浏览器使用 使用什么方式解析
    response.setHeader('Content-Type', 'text/plane;charset=utf-8')
    response.write('hello http 你好世界!')
    response.end('响应结束');	//	结束响应
})

// 4.绑定端口号启动服务器(监听)
server.listen(3000, function () {
    console.log('服务器启动成功了,可以通过 http://localhost:3000 进行访问');
});
```

![1543126964391](.\node\1543126964391.png)

**用户根据不同请求作出不同响应**

![1543127993314](.\node\1543127993314.png)

**用户根据不同请求作出不同的 html文件 响应**

![1543128950839](.\node\1543128950839.png)

#### path 模块

**文件路径操作模块**

```javascript
const path = require('path')

//	path.dirname() 返回目录名
path.dirname('/foo/bar/baz/asdf/quux');
// Returns: '/foo/bar/baz/asdf'

//	path.parse() 返回一个路径的对象
path.parse('/home/user/dir/file.txt');
// Returns:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

//	path.extname（）返回后缀名
path.extname('index.html');
// Returns: '.html'

//	path.join（[... paths]） 合成路径
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'

//	path.resolve()方法将一系列路径或路径段解析为绝对路径。
path.resolve(wwwroot, 'static_files/png/', '../gif/image.gif');
// if the current working directory is /home/myself/node
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

**Node 中的其他成员 **

`__dirname` **动态获取** 当前文件所在目录的绝对路径

`__filename` **动态获取** 当前文件的绝对路径

`__dirname` 和 `__filename` 是不受 node 命令所属路径影响的

在文件操作中, 使用相对路径是不可靠的, 在Node中 文件操作的路径被设计为相对 node 命令所处的路径

所以为了解决这个问题, 只需要把 相对路径 变成 绝对路径

```javascript
//	__dirname  获取当前文件所在目录的绝对路径
app.use('/public/', path.join(__dirname, './public/'))
//	__filename 获取当前文件的绝对路径
```

为了避面问题, 在文件操作中的相对路径, 都同一转换为 **动态的绝对路径**

补充: 模块的相对路径标识正常相对文件模块

#### url 模块

- `url.parse(hash, boolean) ` url地址解析
- `url.parse(hash, true).pathname` 请求路径
- `url.parse(hash, true).query` 请求(查询字符串列化)对象

```javascript
var urlLib = require('url')
console.log(urlLib.parse('http://localhost:8080?user=xiaobai&pass=1234', true))

// pathname
// query
/* 
Url {
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'localhost:8080',
    port: '8080',
    hostname: 'localhost',
    hash: null,
    search: '?user=xiaobai&pass=1234',
    query: { user: 'xiaobai', pass: '1234' },
    pathname: '/',
    path: '/?user=xiaobai&pass=1234',
    href: 'http://localhost:8080/?user=xiaobai&pass=1234' 
} 
*/
```

**我们要清楚的明白, 请求路径只是一个标识而已. 具体请求文件是什么由服务器决定**

#### events 模块

```js
//	异步有结果, 执行事件
const EventEmitter = require('events').EventEmitter
const myEmtter = new EventEmitter
const fn = () => {
    console.log('这是某异步的回调函数')
}
myEmtter.on('someEvents',fn)
//	这里有一个异步的操作
setTimeout(() => {
    //	异步有结果, 触发执行函数
    myEmtter.emit("someEvents")
},2000)
```

![1546878050611](.\node\1546878050611.png)

### 用户自定义模块

- require  加载
- exports  导出

```js
// require('目录')
require('./mod.js');

//在Node中,没有全局作用域,只有模块作用域 
//	外部访问不到内部
//	内部也访问不到外部
//	默认都是封闭的

//有时候,我们加载文件模块目的不是简单地需要里面的代码,而是需要使用里面的方法,需要导出模块
module.exports = {
    sum:function(a,b){
        return a+b;
    },
    el:'导出文件'
}
```

### 第三方模块

- md5 加密处理

> 地址: https://github.com/blueimp/JavaScript-MD5

**下载** `npm install blueimp-md5`

```Javascript
//	引入
const md5 = require('blueimp-md5');
//	加密
md5('string');
//	建议二次加密
let constString  = '!@#$%^&*wudi的我,wu低了';
md5('string' + constString)
```

- mime 判断文件 MIME 类型

>  地址: https://www.npmjs.com/package/mime

下载 `npm install mime`

```javascript
//	引入
const mime = require('mime');
//	使用: 备注`filename`是文件路径名称
res.setHeader('Content-Type', mime.getType(filename));
```

### 开放静态资源目录

​	浏览器收到 HTML 响应内容后, 就要开始从上到下开始解析, 当解析过程中, 如果发现: **link script img iframe video audio**, 等带有 src 或者 href (link) 属性(**具有外链资源**)的时候, 浏览器就会自动对这些资源发起新的请求.

​	**为了方便统一处理静态资源, 所以约定所有静态资源都存放在 public 文件目录下. 直接静态开放整个public 文件**

```js
const http = require('http');
const fs = require('fs');
const urlLib = require('url');
const mime = require('mime');
const server = http.createServer();
server.on('request', function(req, res) {
    let query = urlLib.parse(req.url, true);
    let urlPathname = query.pathname;
    if (urlPathname.indexOf('/public/') === 0) {
        //  统一处理:
        //      如果请求路径是以 /public/ 开头的,则我认为是在 public 中获取某个资源
        //      所有我们就可以直接把请求路径当做文件路径进行读取
        fs.readFile('.' + urlPathname, (err, data) => {
            if (err) {
                return res.end('未找到文件')
            }
            //  通过第三方模块mime, 来判断不同的资源对应的 Content-Type 类型
        	res.setHeader('Content-Type', mime.getType(filename));
            res.end(data)
        })
    }
})
server.listen(3000);
```

![1543135701653](.\node\1543135701653.png)

### request 和 response

- request: 服务器解析用户提交的 http 请求报文, 将结果解析到 request 对象中, 凡是要获取和用户请求相关的数据都可以通过 request 对象获取.
- response: 在服务器端用来向用户做出响应的对象. 凡是需要向客户端响应的操作, 都需要通过response 对象来进行

**常用 API** 

[request](https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_class_http_incomingmessage)

- `request.headers`

- `request.rawHeaders`

- 	`request.httpVersopm`

- `request.method` 

- `request.url`

![1543139382650](.\node\1543139382650.png)

![1543139716242](.\node\1543139716242.png)

[response](https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_class_http_serverresponse)

- `response.setHeader`

- `response.statusCode`

- `response.statusMessage`

- `response.writeHead` 可以一次性包含以上三个方法或属性的设置

  ```javascript
  res.writeHead(404, 'Not Found', {
  	'Content-Type': 'text/plain;charset=utf-8',
  	//	....
  })
  ```

  注意: 在一个请求中, 系统会自动调用 writeHead 方法, 所以尽管我们没有调用它, 系统有会自动设置一些默认的响应头数据. 如果说我们没有主动设置 writeHead, 系统会默认把 setHeader 等放到 writeHead 中作为项传到客户端, 如果我们主动设置了 writeHead, 那么如果和上面的 setHeader 等有所冲突, 则以我们手动设置 writeHead 的为准.

- `response.end`

- `response.write`

![1543141370660](.\node\1543141370660.png)

### 路由设计



### 模块系统

使用 Node 编写应用程序主要是在使用:

- EcmaScript语言
  - 和浏览器不一样, Node中没有DOM/BOM等
- 核心模块
  - 文件操作的 fs
  - http 服务的 http
  - url 路径操作模块
  - path 路径处理模块
  - os 操作系统信息模块
- 第三方模块 必须通过 npm 来下载才可以使用
  - `art-template`
- 自己写的模块
  - 自己创建的文件夹

####  什么是模块化

- 文件作用域
- 通信规则
  - 加载 require
  - 导出 

#### CommonJS 模块规范

[CommonJS 规范](http://www.commonjs.org/) 为了 JavaScript 语言定制的一种 模块规范、编程、API 规范

在Node 中的 JavaScript 还有一个很重要的概念: 模块系统

- 模块作用域
- 使用 require 方法来加载模块
- 使用 exports 接口对象用来导出模块中的成员

##### 加载模块 `require`

```js
var 自定义变量名称 = require('模块')
```

一个模块, 默认被 require() 的时候，返回值是一个对象。

两个作用:

- 执行被加载模块中的代码
- 得到被加载模块中的 `exports` 导出接口对象

##### 导出 exports

- Node 中是模块作用域, 默认文件中所有的对象只在当前模块中使用
- 对于希望可以被其它模块访问的成员,我们需要把这些公开的成员都挂载到 `exports` 接口对象上就可以了

导出多个成员(必须在对象中 . 操作使用)

```js
exports.a = 123
exports.b = 'hello'
exports.c = function(){ console.log('hhh') }
exports.d = {
    foo:'bar'
}
```

导出单个成员(拿到的就是: 函数/字符串/...)

```js
module.exports = 'hello'
```

以下情况会覆盖

```js
module.exports = 'hello'
//以这个为准,后者会覆盖前者
module.exports = function (x, y) {
    return x + y
}
```

也可以这样导出多个成员

```js
module.exports = {
    add: function (x, y){
        return x + y
    },
    str: 'hello' 
}
```

##### 原理解析

exports 和 `module.exports` 是同一个引用

```js
//1. 在 Node 中, 每个模块内部都有一个自己的 module
// 该 moudle对象中, 有一个成员叫 exports 也是一个对象
// 也就是说如果我们需要对外导出成员, 只需要吧导出的成员挂载到 module.exports 上
//----------------------------------------
//2. 我们发现, 每次导出接口成员的时候都是通过 module.exports.xxx = xxx 的方式导出成员,比较麻烦
// 所以, node 为了简化操作, 专门提供了一个变量: exports 等于 module.exports
// 也就是说 exports === module.exports
//----------------------------------------
//3. 在Node代码中,最后会有return module.exports 

// exports = module.exports 可以从新建立exports 与 module.exports 的引用关系
console.log(exports === module.exports) //true
exports = {	//	export赋值于一个新的对象, node中默认导出module.exports 所以 该对象的属性 外部引入取不到.
    add: function () {},
    str: 'hello'
}

//在node中如果重新给 exports 或者 module.exports赋值.会切断两者关系链.以至于最后导出的内容会有影响,如果分不清 exports 和 module.exports 就忘记 exports 吧

// node模块中也隐藏着这么一句
// return module.exports
```

<u>分不清 exports 和 module.exports 可以选择忘记 exports</u> **使用 modul.exports 导出即可**

```javascript
//	如果导出多个成员, 建议导出一贯坚持如此方式
module.exports = {
    add:'add',
    sum(){},
    //	.....
}

//	当 module.export.xxx = xxx 导出形式的时候, 完全可以
exports.xxx = xxx;

//	如果导出单个成员, 必须如此方式导出
module.exports = '单个对象'

//	有一种赋值方式比较特殊 exports = module.exports 重新建立exports 和 module.exports 的引用关系. 
```

####  require 方法加载规则

- 核心模块
  - 模块名
- 第三方模块
  - 模块名
- 用户自己写的模块
  - 路径


规则1: 优先从缓存中加载 (不会重复加载已经加载过的文件)

规则2: 判断模块标识(require的参数)

- 核心模块优先

- 第三方模块其次(查找规则)

  - node_modules/xxx/
  - node_modules/xxx/package.json
  - node_modules/xxx/package.json 下的 main属性 (main属性记录了第三方模块的入口文件 index.js)
  - index.js 默认备选项 (如果没有main属性)
  - 进入上一级目录找 node_modules ,按规则依次向上找,直到磁盘根目录 (如果以上都不成立)
  - 未找到, 最后报错 (can not find module xxx)
  - 一个项目中只会有一个node_modules文件, 放在在项目根目录下

- 自己写的模块紧接 (带路径的模块)

  ```js
  blog
  	a
      	foo.js
  		node_modules
          	art-template
  	b	
      	../a/foo.js
  		a中的第三方包是不能通过第三方包加载方式加载的 require('art-template')
  		这样写可以加载第三方包 require('../a/node_modules/art-template/../index.js')
  ```

##### 路径操作 `./`

- 模块路径
  - 自定义模块引入路径 ./不可以省略
  - 第三方模块的引用 可以省略 ./

```javascript
const router = require('./router')
const template = require('art-template')
```

- 文件操作路径
  - 当前目录 可以省略 ./

```javascript
// 在使用 fs 进行文件操作的时候
//      ./data/a.txt  相对于文件目录 *
//      data/a.txt    相对于文件目录 *
//      /data/a.txt   相对于当前文件模块所属磁盘根目录
//      c:/xx/xx...   绝对路径
fs.readFile('./data/a.txt', (err, data) => {
    if (err) {
        return console.log(err, '读取失败')
    }
    console.log(data.toString())
})
```

##### require 加载注意点

1. 所有模块第一次加载完毕后都会有**缓存**, 二次加载直接读取缓存, 避免了二次开销, 因为有缓存, **所以模块中的代码只会在第一次加载的时候执行一次**

2. 每次加载模块的时候都优先从缓存中加载, 缓存中没有的情况下才会按照 node.js 加载模块的规则去查找

3. 核心模块在 node.js 源码编译的时候， 都已经编译成为二进制执行文件， 所以加载速度较快（核心模块加载优先仅次于 缓存加载）

4. 核心模块都保存在 lib 目录下

5. 试图加载一个和 核心模块 同名的 自定义模块（第三方模块）是不会成功的。

   －　自定义模块名字不要与核心模块同名

   －　使用路径方式加载

6. 核心模块 只能通过模型名称来加载

7. require() 加载模块使用  ./ 相对路径时,  相对路径时相当于当前模块, 不受执行 node 命令的路径影响

8. 建议加载文件模块的时候始终添加文件后缀名， 不要省略

#### 模块化思想

+ 我们通过了N个模块分布式管理项目
  + 模块一: app.js 该模块用于项目入口的访问
  + 模块二: context.js 该模块用于对 req 和 res 对象进行扩展
  + 模块三: router.js 该模块用于对保存所有路由的请求
  + 模块四: handler.js 该模块保存了路由对应的业务操作
  + 模块五: config.js 该模块保存了项目的常用配置数据





### Buffer

**类型介绍**

1. javascript 语言没有读取或操作二进制数据流的机制。
2. Node.js 中引入了 Buffer 类型使我们可以操作 TCP 流或 文件流。
3. Buffer 类型的对象类似于整数数组， 但 Buffer 的大小是固定的， 且在 V8堆外分配物理内存。 Buffer 的大小在被创建时确定， 且无法调整。（buf.length 是固定的， 不允许修改）
4. Buffer 是全局的，所以使用的时候无需 require() 的方式来加载。

**创建一个 Buffer 对象**

常见的 api 介绍

1. 创建一个 Buffer 对象

   ```javascript
   //	1. 通过 Buffer.from() 创建一个 Buffer 对象
   //	通过一个字节数组来创建一个 Buffer 对象
   var array = [0x68, 0x65,...];
   var buf = Buffer.from(array);
   console.log(buf.toString('utf8'));
   
   //	2.通过字符串来创建一个 Buffer 对象
   //	Buffer.from(string[,encoding])
   var buf = Buffer.from('你好世界! hello world!');
   console.log(buf);
   consle.log(buf.toString());
   ```

2. 拼接多个 Buffer 对象为一个对象

   ```javascript
   //	Buffer.concat(list[,totalLength])
   var bufferList = [];
   var buf = Buffer.concat(bufferList);
   ```

3. 获取字符串对应的字节个数

   ```javascript
   //	Buffer.byteLength(string[,encoding])
   console.log(Buffer.byteLength('你好世界! hello world!', 'utf8'));
   ```

4. 判断一个对象是是否是 Buffer 类型对象

   ```javascript
   Buffer.isBuffer(Obj)
   //	obj <Object>
   //	returns <boolean>
   ```

5. 获取 Buffer 中的某个字节

   ```javascript
   //	根据索引获取 Buffer 中某个字节(byte, octet)
   buf[index]
   ```

6. 获取 Buffer 对象中的字节的个数

   ```javascript
   buf.length
   ```

![1543296577319](.\node\1543296577319.png)

**Buffer 对象与编码**

Node.js 目前支持的编码如下

1. ascii
2. utf8
3. utf16le(别名ucs2)
4. base64
5. latin1(别名binary)
6. hex(两位14禁止表示每个字节)

代码示例:

```javascript
var buf = Buffer.from('你好世界! hello world!', 'utf8')
console.log(buf.toString('utf8'));
console.log(buf.toString('base64');
```

![1543296908536](.\node\1543296908536.png)

## API

### 异步API

- process.nextTick(callback)

- setImmediate(callback)

**nodeJS中代码执行队列**

```
nacro-task:
	script(全部的代码) 定时器 setImmediate I/0(读写操作)
micro-task:
	process.nextTick() Promise
```

```js
//	异步代码执行优先级
process.nextTick() > Promise.then() > 定时器 >  setImmediate > I/0 操作
```





## 其它知识点

### ip和端口号

- ip地址用来定位计算机
- 端口号用来定位具体的应用程序
- 所有需要联网通讯的软件都会占用一个端口号
- 端口号范围0-65536
- 计算机中默认的端口号, 不要去使用, 我们开发使用没有特殊意义的端口号
- 可以同时开启多个服务, 但是一定要确保不同服务占用端口号必须不相同

> req.socket.remoteAddress 来宾请求IP地址  req.socket.remotePort 来宾请求端口号

### Content-Type

- content-type参考 http://tool.oschina.net/commons
- 服务器最好把每次响应的数据是什么类型告诉客户端, 而且正确的告诉
- 不同的资源对应的Content-Type 是不一样的
- 图片不需要指定编码
- 一般只为字符数据才指定编码

```javascript
var http = require('http');
var server = http.createServer();

server.on('request', function (req, res) {
    // 在服务器默认发送的数据,其实是utf8编码的内容
    // 但是浏览器你不知道我们是使用utf8编码
    // 浏览器在不知道服务器响应内容编码的情况下,会按照当前操作系统的默认编码去解析
    // 中文操作系统默认 gdk 
    // 解决方法就是正确地高数浏览器,我们发送的数据是什么编码的
    // 在http协议中, Content-Type 就是告诉浏览器我发送给的数据内容是什么类型
    var url = req.url;
    if (url === '/plain') {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('hello 世界');
    } else if (url === '/html') {
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end('<p>hello html世界<p>');
    } else {
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end('您访问的页面不存在')
    }
})

server.listen('3000');
```



### 通过网络发送文件

- 发送的并不是文件, 本质上是发送是文件的内容
- 当浏览器收到服务器响应内容之后, 就会根据我们的Conetnt-Type 进行对应的解析处理

```js
// 1.结合fs 发送文件中的数据
// 2.Content-Type
//      http://tool.oschina.net/commons
//      不同的资源对应的Content-Type 是不一样的
//      图片不需要指定编码
//      一般只为字符数据才指定编码
var http = require('http');
var fs = require('fs');
var server = http.createServer();
server.on('request', function (req, res) {
    var url = req.url;
    if (url == '/') {
        fs.readFile('./resource/index.html', (err, data) => {
            if (err) {
                res.setHeader('Content-Type', 'text/plain;charset=utf-8');
                res.end('文件读取失败,请稍后重试')
            } else {
                // data 默认是二进制数据,可以通过toString转为咱们可以识别的字符串
                // res.end支持两种数据类型,一种是二进制,一种是字符串
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(data);
            }
        })
    }else if(url == '/pic'){
        // url: 同一资源定位符
        // 一个url最终其实就是对应到一个资源
        fs.readFile('./resource/1.jpg', (err, data) => {
            if (err) {
                res.setHeader('Content-Type', 'text/plain;charset=utf-8');
                res.end('文件读取失败,请稍后重试')
            } else {
                // data 默认是二进制数据,可以通过toString转为咱们可以识别的字符串
                // res.end支持两种数据类型,一种是二进制,一种是字符串
                // 图片不需要指定编码,我们常说的编码一般指的是: 字符编码
                res.setHeader('Content-Type', 'image/jpeg');
                res.end(data);
            }
        })
    }
})
server.listen(8080);
```

### 代码风格

- 规范代码书写

    - [JavaScript Standard Style](https://standardjs.com/)
    - Airbnb JavaScript Style

- 代码无分号问题

  - `[` `(` `	如果我们代码中有以 此三种方式 开始建议之前添加 ;

  ```js
  function say() {
      console.log('hello word');
  }
  say()
  //代码无分号问题
  ;(function () {
      console.log('hello')
  })()

  ;['苹果', '香蕉'].forEach((item, i) => {
      console.log(item);
  })

  // 当我们采用了无分号代码风格的时候,只需要注意三种情况, 就不会有报错问题了
  //  当一行代码是以:
  //      (
  //      [
  //      `
  //      开头的时候,则在前面补上一个分号就可以避免语法解析错误
  //  我们会发现在一些第三方的代码中还能看到一上来就以 ; 开头
  //  无论我们的代码是否有分号, 都建议我们在 ( [ ` 之前添加 ; 号, 也可以使用! ~ 等
  ```

---

## 服务端渲染

- 在服务端使用模板引擎
- 模板引擎最早诞生于服务端

![53163742912](.\node\1531637429125.png)

### 服务端渲染和客户端渲染的区别

- 客户端渲染不利于 SEO 搜索引擎优化
- 服务端渲染是可以被爬虫抓取到的, 客户端异步渲染很难被爬虫抓取
- 真正的网站既不是纯异步, 又不是纯服务端渲染的, 是两者结合
- 例如京东商品列表是通过服务端渲染, 目的是为了 SEO 搜索引擎优化, 它的商品评论列表为了用户体验, 而且也不需要 SEO 优化, 所以采用客户端渲染

### 通过服务器让客户端重定向

- 状态码需要设置为 302 临时重定向
  - response.statusCode = 302
- 在响应头中通过 Location 告诉客户端重定向目标位置
  - response.setHeader('Location', 路径)

```javascript
res.statusCode = 302
res.setHeader('Location', '/')
```



---

## 其它

### package.json

- 建议执行 `npm install 包` 的时候都加上 `--save` 选项,目的是保存依赖信息

```js
cnpm install jquery --save //	插入到package.json(包描述中)
```

- 我们建议每一个项目都要有一个 `package.json` 文件(包描述文件)

这个文件可以通过 `npm init` 方式创建出来

```js
{
  "name": "",
  "version": "",
  "dependencies": {
    "jquery": "^3.3.1"
  }
}
```

- 对于我们目前来讲,最有用的是 `dependencies` 选项,可以帮我们保存第三方包依赖信息
- 如果node_modules文件不慎失掉, 再有 package.json 情况下,直接 `npm install` 就会自动把 `package.json` 中的 `dependencies` 中所有依赖都下载回来

#### package.json 和 package-lock.json

npm 5 以前是不会有 `package-lock.json` 文件的.

npm 5 以后才加入了这个文件

当我们安装包的时候, npm 都会生成或者更新 `package-lock.json` 这个文件

- npm 5 以后的版本安装包不需要加 `--save` 参数 , 会自动保存依赖文件信息
- 当我们安装包的时候, 会自动创建或者更新 `package-lock.json` 文件
  - 如此重新 `npm install` 的时候速度就可以提升很快
- 从文件来看, 有一个 `lock` 称之为锁
  - 这个 `lock` 也用来锁定版本的
  - 如果项目依赖了某版本
  - 重新install 的时候其实不会下载原版本,会下载最新版本.这时候 package-lock.json 的好处就呈现出来了 
  - 我们的目的就是希望还是使用原来的版本, 所以这个 `package-lock.json` 的另一个作用就是锁定版本号 ,防止自动升级下载新版本

#####　如何创建包并上传到ｎｐｍ



### npm

- node package manager - Node 包管理器

**npm网站**

> www.npmjs.com

#### npm命令工具

npm第二层含义就是一个命令行工具,只要安装了 node 就安装了npm 命令行工具

npm 也有版本这个概念

```js
npm --version
```

升级 npm

```js
npm install --global npm
```

##### npm 常用命令

- npm init 生成说明文件 package.json
  - npm init-y 可以跳过向导, 快速生成
- npm install 
  - 一次性把 dependencies 选项中的依赖全部安装
- npm install 包名
  - 只下载
  - npm i (简写)
- npm install 包名 --save
  - 下载并且保存依赖项(package.json 文件中的 `dependencies`)
  - npm i -S

![53170627011](.\node\1531706270116.png)

- npm uninstall 包名
  - 只删除, 如果有依赖项依然保存
- npm uninstall 包名 --save
  - 删除,并且以来信息也去除
  - npm un -S
- npm help
  - 查看使用帮助
- npm 命令 help 
  - 查看指定命令使用帮助
  - npm install --help
  - 例如我忘记 uninstall 命令缩写了,这时候可以通过 npm uninstall --help 查看

##### 解决 npm 被墙问题

npm 存储包文件的服务器在国外, 有时候会被墙, 速度很慢

安装淘宝的 cnpm:

```js
// 在任意目录执行都可以
// --global 表示安装到全局, 而非当前目录
// --global 不能省略
npm install --global cnpm
```

接下来安装包的时候把之前的 `npm` 替换成 cnpm

```javascript
// 这里还是使用npm 服务器, 速度比较慢\
npm insatll jquery
// 使用cnpm 就会通过淘宝的服务器下载依赖
cnpm install jquery
```

如果不想安装 `cnpm` 又想使用淘宝服务器来下载

```js
npm i jquery --registry=https://registry.npm.taobao.org
```

但是每一次手动这样参数很麻烦 , 我们可以把这个选项加入配置文件中去

```js
npm config set registry https://registry.npm.taobao.org
// 查看 npm 配置信息
npm config list
```

### 自动重启终端

全局安装的 在任何目录下都可以使用

我们这里可以使用一个第三方命令行工具 : `nodemon` 来帮我们解决频繁修改代码重启服务器问题.

`nodemon` 是一个机遇Node.js 开发的一个第三方命令行工具, 我们使用的时候需要独立安装:

```js
npm install --global nodemon
```

安装完成后, 使用 :

```js
node app.js
// 使用 nodemon
nodemon app.js
```

只要是通过 `nodemon app.js` 启动的服务, 她会检测你的变化, 当文件发生变化的时候, 自动帮我们重启服务器

### 异步编程

#### 回调函数

**获取异步操作的结果**:

```js
// /* 不成立情况1 */
// function add(x, y){
//     setTimeout(()=>{
//         var ret =  x + y
//         return ret 
//     }, 1000)
// }
// console.log(add(5, "20"))	//undefined
```

```js
// /* 不成立情况2 */
// function add(x, y) {
//     var ret
//     console.log(1)
//     setTimeout(() => {
//         ret = x + y
//     }, 1000);
//     console.log(3)
//     return ret
// }
// console.log(add(5, '20'))	//1 3 undefined
```

**使用回调函数来获取异步操作结果： 成立情况**

```js
/* 注意: 凡是需要得到一个函数内部异步操作的结果 
        setTimeout
        readFile
        writeFile
        ajax
*/
/* 获取异步操作结果 -> 使用回调函数 */
function add(x, y, callback) {
    setTimeout(() => {
        var ret = x + y
        callback(ret)
    },1000)
}
add(5, '20', function (res) {
    console.log(res)
    // 拿到异步操作结果后的一系列操作
})
```

#### Promise

#####  回调地狱: 回调中套回调

```js
var fs = require('fs');
fs.readFile('./data/a.txt', (err, data) => {
    if (err) {
        //  return console.log('读取文件失败')
        //  抛出异常
        //      1. 阻止程序的执行
        //      2. 把错误消息打印到控制台
        throw err
    }
    console.log(data)
})
fs.readFile('./data/b.txt', (err, data) => {
    if (err) {
        throw err
    }
    console.log(data)
})
fs.readFile('./data/c.txt', (err, data) => {
    if (err) {
        throw err
    }
    console.log(data)
})
```

以上代码无法保证回调执行顺序

**要保证执行的顺序, 回调嵌套回调**

```js
// callback hell (回调地狱)  由此产生
fs.readFile('./data/a.txt', (err, data) => {
    if (err) {
        throw err
    }
    console.log(data)
    fs.readFile('./data/b.txt', (err, data) => {
        if (err) {
            throw err
        }
        console.log(data)
        fs.readFile('./data/c.txt', (err, data) => {
            if (err) {
                throw err
            }
            console.log(data)
        })
    })
})
```

为了解决以上代码方式带来的问题(回调地狱嵌套), 所以 EcmaScript 6 中新增了一个 API : `Promise` .

- Promise 的英文就是 承诺/保证 的意思 (I promise you)

#####  Promise API

Promise 基本语法

```js
var fs = require('fs')
// Promise 诺言 
// EcmaScript 6 中新增的一个 API
// Promise 是一个构造函数

// 创建 Promise 容器
// 1. 给别人一个承诺 I promise you.
//      Promise 容器一旦创建, 就开始执行里面的代码
//      承诺本身不是异步, 但是内部往往都是封装一个异步任务
var pms = new Promise(function (resolve, reject) {
    fs.readFile('./data/a.txt', 'utf8', (err, data) => {
        if (err) {
            // 失败了, 承诺容器中的任务失败了
            // 把容器的 Pending 状态变为reject
            // 调用了reject 相当于调用了then方法的第二个参数(回调)
            reject(err);
        } else {
            // 承诺容器中任务成功了
            // 把容器的Pending 状态改成 resolve
            // console.log(data)
            // 也就是说这里调用的 resolve 方法实际上就是 then 方法传递的 func
            resolve(data);
        }
    })
})

// pms 就是 Promise 承诺
// 当 pms 成功了然后 (then) 做 .... 指定操作
// 现在 then 方法接收的 第一个function 就是 resolve
// 第二个 func 就是 reject
pms.then(function (data) {
    console.log(data)
},function(err){
    console.log('读取文件失败了', err)
})
```

封装 Promise 版的 readFile

```js
var fs = require('fs')

function pReadFile(fliePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(fliePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

pReadFile('./data/a.txt')
    .then((data) => {
        console.log(data)
    	//	当 return 一个 promise 对象的时候, 后续的then方法中的第一个参数(成功回调)会作为 pms2 的 resolve
        return pReadFile('./data/b.txt')
	})
    .then((data) => {
        console.log(data)
        return pReadFile('./data/c.txt')
    })
    .then((data) => {
        console.log(data)
    })
```

##### async 函数

```Javascript
router.post('/register', async function (req, res) {
    let query = req.body;
    query.email = decodeURIComponent(query.email) //  解码email特殊字符
    query.password = md5(query.password + md5STRING);
    //  查询数据库及业务反馈    
    try{
        if(){
           
           }
           }catch(){

        }
});
```

原来异步代码

```javascript
router.post('/register', function (req, res) {
    let query = req.body;
    query.email = decodeURIComponent(query.email) //  解码email特殊字符
    query.password = md5(query.password + md5STRING);
    //  查询数据库及业务反馈    
    connection.query(`SELECT * FROM user WHERE email='${query.email}'`, function (err, ret) { 
        connection.query(`SELECT * FROM user WHERE nickname='${query.nickname}'`, function (err1, ret1) {
            if (err || err1) return res.status(500).send('Server error.'); //..数据库出错
            if (ret.length && !ret1.length) return res.status(200).json({
                success: true,
                err_code: 0,
                message: '邮箱已注册'
            })
            if (ret1.length && !ret.length) return res.status(200).json({
                success: true,
                err_code: 1,
                message: '昵称已存在'
            })
            if (ret1.length && ret.length) return res.status(200).json({
                success: true,
                err_code: 2,
                message: '邮箱已注册, 昵称已存在'
            })
            //  保存注册信息到数据库
            connection.query(`insert into user (email, nickname, password) values ('${query.email}', '${query.nickname}', '${query.password}'); `, function (err, ret) {
                if (err) return res.status(500).send('Server error.'); //..数据库出错
                res.status(200).json({
                    success: true,
                    err_code: 3,
                    message: '注册成功'
                })
            })
            //  保存用户登录 session
        })
    });
});
```



### EcmaScript6 find和findIndex原理

```js
var users = [
    {id: 1, name: '小白'},
    {id: 2, name: '小白'},
    {id: 3,name: '小白'},
    {id: 4,name: '小白'},
    {id: 5, name: '小白'}
]

Array.prototype.myFind = function (cnditionFunc) {
    // var cnditionFunc = function(item, index){ return item.id === 4 }
    for (var i = 0; i < this.length; i++) {
        if (cnditionFunc(this[i], i)) {
            return this[i]
        }
    }
}
var ret = users.myFind(function (item, index) {
    return item.id === 4
})
```

```js
//findIndex
Array.prototype.myFindIndex = function (cnditionFunc) {
    // var cnditionFunc = function(item, index){ return item.id === 4 }
    for (var i = 0; i < this.length; i++) {
        if (cnditionFunc(this[i], i)) {
            return i
        }
    }
}
var ret2 = users.myFindIndex(function (item, index) {
    return item.id === 4
})
```

## 综合案例

### underscore 第三方模块

> 一个工具函数库, 可以用于浏览器端, 也可以用在 node 服务器端

[github](https://github.com/jashkenas/underscore)

**类似模板引擎的方法 _.template(templateString, [settings])**

基本使用: 

```js
//	引入
import _ from 'underscore';
//	使用
var compiled = _.template("hello: <%= name %>");
compiled({name: 'moe'});
//	=> "hello: moe"
```



------

## Express

> 参考文档: http://www.expressjs.com.cn/4x/api.html

原生的 http 在某些方面表现不足以应对我们的开发需求, 所以我们就必须使用框架开加快我们的开发效率,框架的目的就是提高效率, 让我们的代码更加高度统一

- 第三方 web 开发框架
- 高度封装了 http 模块
- 更加专注于业务, 而非底层细节

**特点**

1. 实现了路由功能
2. 中间件(函数)功能
3. 对 req 和 res 对象的扩展
4. 集成其它模板引擎

### 1.起步

#### 1.1 安装

```js
npm install express --save
```

#### 1.2 hello world

```js
const express = require('express');
//  创建 app
var app = express();
//  请求
app.get('/index', (req, res) => {
  res.send('hello world!');
})
//  监听
app.listen(9090, () => {
  console.log('running in  9090...');
})
```

#### 1.3 基本路由

##### 1.3.1 get

```js
// 当我们以get方式请求根目录的时候, 执行对应处理函数
app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/index', (req, res) => {
    res.send('hello index!')
})

//	以上含义
//	1. 请求方法必须是 get
//	2. 请求路径 pathname 必须等于(===) /index
```

##### 1.3.2 post

```js
// 当我们以post方法请求根目录的时候, 执行对应处理函数
app.post('/', function(req, res) {
    res.send('go a POST request')
})
```

##### 1.3.3 res.send 和 res.end 区别

1. 参数类型区别

   res.send() 参数可以是 Buffer, String, Object, Array

   res.end() 参数只能是 Buffer, String

2. res.send() 会自动发送更多响应报文头, 其中就包括 Content-Type

##### 1.3.4使用 use 注册路由

```javascript
app.use('/index', (req, res) => {
    res.send('hello use requsst router');
})
//	使用 use 注册路由含义
//	1. 在进行路由匹配的时候不限定方法, 什么请求方法都会进入这里
//	2. 请求路径中的第一部分只要与 /index 相等即可, 并不要求请求路径(pathname)完全匹配
```

##### 1.3.5 使用 all 注册路由

```javascript
app.all('/index', (req, res) => {
    res.send('hello all request router');
})
//	使用 all 注册路由含义
//	1. 不限定请求方法
//	2. 请求路径的pathname必须完全匹配(===)
```

##### 1.3.6 使用正则匹配路由

```javascript
app.get(/^\/index(\/.+)*$/i, (req, res) => {
    res.send('hello reg');
})
//	此时匹配项目可以是如下
//	/index
//	/index/aeqwew/...
```

##### 1.3.7 通过 req.params 获取路由参数

```javascript
//	路径参数
app.get('/new/:year/:month/:day', (req, res) => {
    res.send(req.params);
})
```

![1543307351392](.\node\1543307351392.png)

#### res 下的常用方法

[官网API](http://www.expressjs.com.cn/4x/api.html#res)

- res.json([body]) 发送一个json数据
- res.redirect([status,] path) 重定向
- res.sendFile(filename,[options,]callback) 读取文件并设置回调
- res.status(code).end() 设置状态吗并指定提示

#### 1.4 静态资源服务(开放)

```js
// 当省略第一个参数的时候可以直接访问目录下的静态资源 /xxx
app.use(express.static('public'))

// /public/xxx	√ 推荐
app.use('/public/', express.static(path.join(__dirname, 'public')))

// /static/xxx
app.use('/static/', express.static('public'))

// /static/xxx
app.use('/static/', express.static(path.join(__dirname, 'public')))
```



### 2. 模板引擎的使用

 **在Express 中配置 `art-template` 模板引擎**

> http://aui.github.io/art-template/ 官方文档

**安装:**

```js
npm install art-template --save
npm install express-art-template --save
```

**配置:**

```js
// 表示以xxx结尾的文件使用 art-template 模板引擎渲染 
app.engine('art', require('express-art-template'))
```

如果希望修改默认的 `views` 视图渲染存储目录, 我们可以这样做

```js 
// 注意: 第一个参数 views 必须是这样写
app.set('views', 目录路径)
```

**使用：**

```js
const express = require('express')
const app = express()

//	配置使用 art-template 模板引擎
//	第一个参数, 当渲染以.html结尾的文件 的时候, 使用art-template模板
//	express-art-template 是专门用来express中把art-template整合到 express中, express-art-template 依赖了 art-template
app.engine('html', require('express-art-template'))

//	Express 为 Response 相应对象提供了一个方法: render
//	render 方法默认是不可以使用, 但是如果配置了模板引擎就可以使用了
//	res.render('html模板名', {模板数据})
//	第一个参数不能写路径, 默认会去项目中的 views 目录查找模板文件

//	修改默认存储的文件路径
//	app.set('views', 目录路径)

app.get('/', function (req, res) {
    //	默认会去项目中的 views 文件中找 index.html
    res.render('index.html', {
        title: 'hello world'
    })
})

app.listen(3000)
```

**模板的继承和子模板**

子模板引入 `{{ include './xx.html' data}}` 引入模板文件 +  参数

模板继承 `{{ block '坑' }}{{ /block }}`  

**layout.html** 模板页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>模板layout</title>
    <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css"> 
    {{ block 'head' }}{{ /block }}
</head>
<body>
    <!-- 引入公共头 -->
    {{ include './head.html' }}

    <!-- 使用block 留坑, 给需要的孩子填 -->
    {{ block 'content' }}{{ /block }}

    <!-- 引入公共尾部 -->
    {{ include './foot.html' }}

    <script src="/node_modules/jquery/dist/jquery.js"></script>
    <script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
    {{ block 'script' }}{{ /block }}
</body>
</html>
```

**index.html **主页面

```html
<!-- 继承模板页面 -->
{{ extend  './layout.html' }}

<!-- index 填的head坑 -->
{{ block 'head' }}
<link rel="stylesheet" href="/public/css/xxx.css"> 
{{ /block }}

<!-- 使用block填坑填充主体坑 -->
{{ block 'content' }}
<h1>index 填的content坑</h1>
{{ /block }}

{{ block 'script' }}
<script src="/public/js/xx.js"></script>
{{ /block }}
```

### 3. 获取表单数据

####  在 Express 中获取表单 POST 请求体数据

在 Express 中, 没有内置获取表单 post 请求体的API, 这里需要一个第三方包: **`body-parser`**	

**安装**

```js
npm install body-parser --save
```

**配置**

```js
var express = require('express')
var app = express()
// 0.引包
var bodyParser = require('body-parser')

// 1.配置 body-parser 中间件
// 只要加入这个配置, 则在 req 请求对象上会多一个属性 body
// 也就是说我们可以直接通过 req.body 来获取表单 POST 请求体
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false }))
// parse application/json
app.use(bodyParser.json())
```

**使用**

```javascript
// 2.使用
app.post('/post', function(req){
    console.log(req.body)	// POST 数据的获取
})
app.listen(8080)
```

#### 在 Express 中获取表单 GET 请求体数据

在 Express 中, 有内置获取GET请求体的API **`req.query`**

```javascript
//	get请求提数据的内置方法可以直接使用获取 request.query  
req.query
```



### 4. 导航 (路由模块设计)

> 属模块化思想, 一切更加清晰明了. 

独立路由文件 user/**userRouter.js**

```javascript
//	1. 引入
const express = require('express');
const router = express.Router();

//  2. 分配各个路由工作
//	定义 注册路由
router.get('/register', function(req, res) {
  res.send('register get');
});
router.post('/register', function(req, res) {
   res.send('resgister post')  
});
//	定义 登录路由
router.get('/login', function(req, res) {
  res.send('login get');
});
router.post('/login', function(req, res) {
  res.send('login post');
});

//	3. 导出路由
module.exports = router;
```

应用文件 **app.js**

```javascript
//	在应用中加载路由模块：
const userRouter = require('./router/userRouter');
//	使用路由(用户模块)
app.use('/user', userRouter);
```



### 5.  express-session

> 参考文档: https://www.npmjs.com/package/express-session

安装

```js
npm install express-session
```

配置

```js
// 该插件会为 req 请求对象成员添加一个成员: req.session 默认是一个对象
// 这是最简单的配置方式, 暂且不关心里面参数的含义
app.use(session({
    //配置加密字符串, 它会在原有加密基础上和这个字符串拼起来去加密
    //目的是为了增加安全性, 繁殖客户端恶意伪造
    secret: 'sess_user',
    resave: false,
    saveUninitialized: false // 无论我们是否使用 Session , 默认直接分配一把钥匙, 默认true
})
```

使用

```js
// 添加 Session 数据
req.session.ss = 'sess_'

// 获取 Session 数据
req.session.ss
```

提示: 默认 Session 数据是内存存储的, 服务器一旦重启就会丢失, 真正的生产会把 Session 进行持久化存储.

### 6. 中间件

**中间件的本质就是一个请求处理方法, 我们把用户从请求道响应整个过程分发到多个中间件去处理,这样做的目的就是为了提高代码的灵活性, 动态可扩展性.**

- 同一个请求所经过的中间件都是同一个 `请求` 对象 和 `响应` 对象

  ```js
  app.use((req, res, next) => {
      req.foo = 'Hello world'
      console.log(1)
      next()
  })
  app.get('/aaa', (req, res, next) => {
      console.log(req.foo)
  })
  ```

- **中间件中, 当匹上第一个,就不会往下匹配了**

  ​

#### 6.1 应用程序级别中间件

万能匹配 ( 不关心任何请求路径和请求方法 ) 

```js
app.use(function(req, res, next){
    console.log('Time': Date.now())
    next()
})
```

只要以 '/xxx' 开头的

```js
app.use('/a', function(req, res. next){
    console.log('Time', Date.now())
    next()
})
```

#### 6.2 路由级别中间件

get

```js
app.get('/', function(req, res){
    res.send('Hello orld!')
})
```

post

```js
app.post('/', function(req, res){
    res.send('got a Post Request')
})
```

错误处理统一中间件

```js
//  配置一个处理 404 的中间件
app.use(function (req, res) {
    res.render('404.html')
})
```

配置一个全局错误对象处理中间件

```js
router.post('/login', function (req, res, next) {
    //......数据处理,如果数据出错
    if(err){
        return next(err)
    }
}

//  配置一个全局错误处理中间件 (四个参数必须写全)
//  当调用next的时候,如果传递了参数,直接往后找到带有四个参数的use中间件
app.use(function (err, req, res, next) {
    res.status(500).json({
        err_code: 500,
        desc: '服务器出错'
    })
})
```



第三方中间件

- body-parser
- express-session
- multer
- ..........



## express crud案例

### **模块化思想**

如何划分模块?	

- 模块职责要单一

### 路由分析

| 请求方法 |     请求路径     | get参数 |        post参数        |       备注       |
| :------: | :--------------: | :-----: | :--------------------: | :--------------: |
|   GET    |    /students     |         |                        |     渲染首页     |
|   GET    |  /students/new   |         |                        | 渲染添加学生页面 |
|   POST   |  /students/new   |         |  name/age/sex/hobbys   | 处理添加学生请求 |
|   GET    |  /students/edit  |   id    |                        |   渲染编辑页面   |
|   POST   |  /students/edit  |         | id/age/sex/hobbys/name |   处理编辑请求   |
|   GET    | /students/delete |   id    |                        |   处理删除请求   |

### 提取路由模块操作业务

```js
//	1. 引入express.Router()
const express = require('express');
const router = express.Router();
const Student = require('../toDo/student');

//  2. 分配各个路由工作
//  学生首页数据展示
router.get('/', function (req, res) {
    Student.findALL(function (err, students) {
        if (err) return res.status(500).send('Server error.');
        //  数据请求成功
        res.render('student.html', {
            title: '学生页面操作',
            data: students
        })
    })
})

//	定义 学生添加
router.get('/add', function (req, res) {
    res.render('add.html', {
        title: '添加学生'
    })
});
//  添加学生 post 提交
router.post('/add', function (req, res) {
    let student = req.body;
    Student.addOne(student, function (err) {
        if (err) return res.status(500).send('Server error.');
        res.redirect('/student');
    })
});
//	定义 学生修改页面展示
router.get('/edit', function (req, res) {
    let studentId = req.query;
    Student.findOne(studentId['id'], function (student) {
        //  渲染数据 student 对应传递的id值的学生对象
        res.render('edit.html', {
            student
        })
    })
});
//  定义  学生修改数据保存
router.post('/edit', function (req, res) {
    let student = req.body;
    Student.save(student, function (err) {
        if (err) return res.status(500).send('Server error.');
        res.redirect('/student');
    })
});
//  定义 学生删除
router.get('/del', function (req, res) {
    let studentId = req.query;
    Student.delete(studentId['id'], function (err) {
        if (err) return res.status(500).send('Server error.');
        res.redirect('/student');
    })
})

//	3. 导出路由
module.exports = router;
```

### 设计操作数据的API文件

**操作文件中的数据, 只处理数据, 不处理业务**

```js
//  student的文件操作独有文件
const fs = require('fs');
//  数据文件路径
const DBPATH = './db.json';
//  方法    一切数据操作交给router负责

//  读取全部数据
exports.findALL = function (callback) {
    fs.readFile(DBPATH, 'utf8', function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, JSON.parse(data)['students']);
    })
}

//  添加数据
exports.addOne = function (student, callback) {
    student['sex'] = student['sex'] || 0; //..设置性别默认值
    fs.readFile(DBPATH, 'utf8', function (err, data) {
        if (err) return callback(err);
        let students = JSON.parse(data)['students'];
        student.id = students[students.length - 1].id + 1;
        students.push(student);
        let dbStr = JSON.stringify({
            students
        })
        //  重写文件
        fs.writeFile(DBPATH, dbStr, function (err) {
            if (err) {
                return callback(err)
            }
            //  写入成功 err 为 null
            callback(null);
        })
    })
}

//  查找一个对应id值的对象
exports.findOne = function (studentId, callback) {
    fs.readFile(DBPATH, 'utf8', function (err, data) {
        if (err) return callback(err);
        let students = JSON.parse(data)['students'];
        let student = students.find(function (X) {
            return X.id == studentId;
        })
        callback(student);
    })
}

//  保存
exports.save = function (student, callback) {
    fs.readFile(DBPATH, 'utf8', function (err, data) {
        if (err) return callback(err);
        let students = JSON.parse(data)['students'];
        students.forEach(function (item) {
            if (item.id == student.id) {
                for (const key in item) {
                    item[key] = student[key];
                }
            }
        })
        let dbStr = JSON.stringify({
            students
        })
        fs.writeFile(DBPATH, dbStr, function (err) {
            if (err) return callback(err)
            callback(null)
        })
    })
}

//  删除
exports.delete = function (studentId, callback) {
    fs.readFile(DBPATH, 'utf8', function (err, data) {
        if (err) return callback(err);
        let students = JSON.parse(data)['students'];
        let deleteId = students.findIndex(function (X) {
            return X.id == studentId;
        })
        students.splice(deleteId, 1);
        let dbStr = JSON.stringify({
            students
        })
        fs.writeFile(DBPATH, dbStr, function (err) {
            if (err) return callback(err);
            return callback(null);
        })
    })
}
```

### 封装异步API

```js
// 定时器, 异步的操作
function fn(callback) {
    // var callback = function (data) { console.log(data) }
    setTimeout(function () {
        var msg = 'hello'
        callback(msg)
    }, 1000)
}

// 调用fn, 得到内部的 data
// 如果需要获取一个函数中异步操作的结果, 则必须通过回调函数的方式获取, 没有其它方法
fn(function (data) {
    console.log(data)
})
```

**案例整体步骤**

- 处理模板
- 配置开发自静态资源
- 配置模板引擎
- 简单路由: /students 渲染静态页
- 路由设计
- 提取路由模块
- 由于街来来一系列操作,都需要处理文件数据, 所以我们需要封装 student.js
- 先写到student.js 文件结构
  - 查询所有学生列表的 API dind
  - findById
  - seve
  - updateById
  - deleteById
- 实现具体功能
  - 通过路由收到请求
  - 接收请求中的数据
    - req.query
    - req.body
  - 调用数据操作API 处理数据
  - 根据操作结果给客户端发送响应
- 业务功能顺序
  - 列表
  - 添加
  - 编辑
  - 删除
- find
- findIndex

------

## MongoDB 介绍和安装

> http://www.runoob.com/mongodb/mongodb-connections.html

### 关系型数据库和非关系型数据库

表就是关系

或者说表和表之间存在关系

- 所有关系型数据库都需要通过 `sql` 语言来操作
- 所有的关系下数据库在操作之前都需要设计表结构
- 而且数据表还支持约束
  - 唯一的
  - 主键
  - 默认值
  - ....
- 非关系型数据库非常的灵活
- 有的非关系型数据库就是 key - value 对
- MongoDB 是长得最像关系型数据库的非关系型数据库
  - 数据库 ---- 数据库
  - 数据表 ---- 集合(数组)
  - 表记录 ---- (文档对象)
- MongoDB 不需要设计表结构
- 可以任意往里面存数据, 没有结构性说法

### 下载

> https://www.mongodb.com

### 安装

- 配置环境变量 
- 输入`mongod --version` 确保mongodb 安装成功


![53178120946](.\node\1531781209464.png)

### 启动和关闭数据库

**启动:**

```js
// mongodb 默认使用执行 mogod 命令处所处磁盘根目录下的 /data/db 作为自己的数据存储目录
// 所以在第一次执行该命令之前先手动创建一个 /data/db
mongod
```

**如果想要修改数据目录, 可以:**

```js
mongod --dbpath=数据存储目录路径	
```

**停止:**

```js
在开启服务的控制台, 直接ctrl+c 停止
或者直接关闭控制台
```

### 连接数据库

连接

```js
// 改命令默认链接本机的 MongoDB 服务
mongo 
```

退出

```js
// 在连接状态输入 exit 退出连接
exit
```

### 基本命令

- `show dbs`
  - 查看显示所有数据库
- `db`
  - 查看当前操作的数据库
- `use 数据库名称`
  - 切换到指定的数据库 (如果没有会新建)
- 查看组
  - show collections 查看表
  - db.表名.find() 查看数据

### 在 cmd 中操作 MongoDB 数据

#### 插入数据

数据库中不能直接插入数据, 只能往集合(collections)中插入数据

`db.student.insert({"name":"小白","age":23});`

db.student 系统发现 student 是一个陌生的集合名字,所以就自动创建了集合

**导入外部数据**

`mongoimport --db test --collection restaurant --drop --file primer-dataset.json`

`mongoimport -d 数据库名 -c 集合名 -d(删除之前数据) -file 要插入的数据文件`

- --db test                                 想往哪个数据库里面导入
- --collection 集合名称            往哪个集合中导入
- --drop                                     删除之前的集合中的数据
- --file 表名称                           导入数据的文件位置

这样我们就可以用 工具 创建一个 json 文件, 使用以上方法导入到对应集合中去

#### 查找数据

`db.student.find()` 列出 student 集合中的所有数据

`db.student.find({"score.shuxue":70})` 精确匹配符合条件的所有数据

`db.student.find({"score.shuxue":80,"age":9})` 精确匹配 与 关键字所有数据

`db.student.find({"score.yuwen":{$gt:50}})` 精确匹配 > 关键字所有数据 `大于等于$gte` `小于$lt`

`db.student.find({$or:[{"age":9},{"age":11}]})` 精确匹配 或 关键字所有数据

`db.student.find().sort({"条件1":1,"条件2":-1})` 精确匹配所有并且按条件排序 1正序, -1倒序

#### 修改数据

`db.student.update({"name":"小白"},{$set{"age":18,"hobby":"running"}})`  默认只修改一个

`db.student.update({"name":"小白"},{$set{"age":18,"hobby":"running"}},{multi:true})`  修改多个

`db.student.update({"name":"小白"},{"age":18,"hobby:"running"})`  完整替换数据

#### 删除数据

`db.student.remove({"name":"沙雕"})` 精确匹配删除数据， 默认匹配数据全部删除

`db.student.remove({"name":"杀掉"}，{justOne:true})`  匹配删除一条

`db.student.remove({})` 删除集合中的所有数据

#### 删除当前你所在的数据库

`db.dropDatabase()` 删除数据库

### 在 Node 中如何操作 MongoDB 数据

#### 1.MongoDB 数据库的基本概念

- 可以有多个数据库
- 一个数据库中可以有多个集合 (表)
- 一个集合当中可以有多个文档 (表记录)
- 文档结构很灵活, 没有任何限制
- MongoDB 非常灵活, 不需要像 MySQL 一样创建数据库/表/设计表结构
- 在这里只要: 当我们需要插入数据的时候, 只需要指定往哪个数据库的哪个集合操作就可以了
- 一切都由 MongoDB帮我们

#### 2.使用第三方 mongoose 来操作MongoDB 数据库

> http://mongoosejs.com/ 官网

> http://mongoosejs.com/docs/guide.html 官方文档

```js
{
    qq:{
        users:[
            {name: '小白', age: 18},
            {}
            //.....
        ],
        products:[],
        //....
    },
    taobao:{
            
    }
}
```

#### 3.起步

安装:

```js
npm i mongoose
```

开始:

```js
const mongoose = require('mongoose');
//	连接数据库
mongoose.connect('mongodb://localhost/test');
// 创建一个模型
// 就是在设计数据库
// MongoDB 是动态的, 非常灵活, 只需要在代码中设计我们要的数据库就行了
// mongoose 这个包就可以让我们的设计编写过程变得非常的简单
const Cat = mongoose.model('Cat', {
    name: String
});
// 实例化一个 Cat
const kitty = new Cat({
    name: 'Zildjian'
});
// 持久保存kitty 实例
kitty.save().then(() => console.log('meow'));
```

### 官方指南

##### 设计Schema 发布模型

```js
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

//  1.连接数据库
//  指定链接的数据库不需要存在, 当我们插入第一条数据之后就会自动被创建出来
mongoose.connect('mongodb://localhost/test');

//  2.设计集合结构 (表结构)
//  	字段名称就是表结构中的属性名称
//  	值
//  约束的目的是为了保证数据的完整性, 保持统一
var userSchema = new Schema({
    username: {
        type: String,
        required: true // 字段不能为空
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});

//  3.将文档结构发布为模型
//  mongoose.model 方法就是讲一个架构发布为module
//      第一个参数: 传入一个大写名词单数字符串用来表示数据库名称
//          mongoose 会自动将 大写单数 自动地生成 小写复数的 集合名词
//          例如这里的 User -> users
//      第二个参数: 模型构造函数
//      返回值: 模型构造函数
var User = mongoose.model('User', userSchema);

//  4.当我们有了模型构造函数之后, 就可以对这个构造函数对 users 表进行增删改查

```

##### 增加数据

```js
var admin = new User({
    username: 'admin',
    password: '1234',
    email: 'admin@admin.com'
})
admin.save(function (err, ret) {
    if (err) {
        console.log('保存失败');
    } else {
        console.log('保存成功');
        console.log(ret);
    }
})
```

#####  查询数据

查询所有:

```js
User.find(function (err, ret) {
    if (err) {
        console.log('查询失败');
    } else {
        console.log(ret)
    }
})
```

按条件查询所有:

```js
User.find({
    username: 'xiaobai'
}, function (err, ret) {
    if (err) {
        console.log('查询失败');
    } else {
        console.log(ret)
    }
})

```

根据ID查找:

```js
User.findById(id, [callback])
```

按条件查询单个:

```js	
User.findOne({
    username: 'xiaobai',
    password: '123456'
}, function (err, ret) {
    if (err) {
        console.log('查询失败');
    } else {
        console.log(ret)
    }
})
```

按条件查找(或)

```js
User.findOne({
	$or: [
        	{
            "email": body.email
        	}, {
            "nickname": body.nickname
     		}
   		 ]
}, function (err, ret) {
    if (err) {
        console.log('查询失败');
    } else {
        console.log(ret)
    }
})
```

**关键字: `limit` 和 `spik` 和配合使用 分页**

```javascript

```



#####  删除数据

根据条件删除, 查询复合条件删除多个

```js
User.remove({
    username: 'admin'
}, function (err, ret) {
    if (err) {
        console.log('删除失败');
    } else {
        console.log('删除成功', ret)
    }
})
```

根据条件删除一个

```js
Model.findOneAndRemove(conditions, [options],[callback])
```

根据id删除一个:

```js
Model.findByIdAndRemove(id,[options],[callback])
```

#####  更新数据

根据条件更新所有:

```js
Model.update(conditions, doc, [options], [callback])
```

根据指定条件更新一个:

```js
Model.findOneAndUpdate([conditions], [updata], [options], [callback])
```

根据 id 更新一个:

```js
User.findByIdAndUpdate('5af1674fdbd19f1424d151fe',{
    password:'woaiwo'
},function(err,ret){
    if(err){
        console.log('更新失败');
    }else{
        console.log(ret)
    }
})
```

##### 使用 mongodb 修改crud案例

student.js 	mongodb mongoose 的数据设计

```javascript
let mongoose = require('mongoose');
//  连接
mongoose.connect('mongodb://localhost:27017/itcast');
//  Schema设计
let Schema = mongoose.Schema;
let studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: [0, 1],
        default: 0
    },
    age: {
        type: Number
    },
    hobbys: {
        type: String
    }
})
//  直接导出模型构造函数
module.exports = mongoose.model('Student', studentSchema);
```

 studentRouter.js 业务操作  

```javascript
//	1. 引入express.Router()
const express = require('express');
const router = express.Router();
//  引入数据源文件
const Student = require('../toDo/studentMongodb');

//  2. 分配各个路由工作
//  学生首页数据展示
router.get('/', function (req, res) {
    Student.find(function (err, students) {
        if (err) return res.status(500).send('Server error.');
        //  数据请求成功
        res.render('student.html', {
            title: '学生页面操作',
            data: students
        })
        console.log(students);
    })
})

//	定义 学生添加
router.get('/add', function (req, res) {
    res.render('add.html', {
        title: '添加学生'
    })
});
//  添加学生 post 提交
router.post('/add', function (req, res) {
    let student = req.body;
    new Student(student).save(function (err) {
        if (err) return res.status(500).send('Server error.');
        res.redirect('/student');
    })
});
//	定义 学生修改页面展示
router.get('/edit', function (req, res) {
    let studentId = req.query.id;
    Student.findById(studentId, function (err, student) {
        if (err) return res.status(500).send('Server error.');
        //  渲染数据 student 对应传递的id值的学生对象
        res.render('edit.html', {
            student
        })
    })
});
//  定义  学生修改数据保存
router.post('/edit', function (req, res) {
    let student = req.body;
    student.id = student.id.replace(/"/g, '')
    Student.findByIdAndUpdate(student.id, student, function (err, ret) {
        console.log(student)
        if (err) return res.status(500).send('Server error.');
        res.redirect('/student');
    })
});
//  定义 学生删除
router.get('/del', function (req, res) {
    let studentId = req.query.id;
    Student.findByIdAndRemove(studentId, function (err) {
        if (err) return res.status(500).send('Server error.');
        res.redirect('/student');
    })
})

//	3. 导出路由
module.exports = router;
```



------

## Node 操作 MySQL 数据库

**安装**

```javascript
npm i mysql
```

**使用**

```js
const mysql = require('mysql');
//	创建连接
const connection = mysql.createConnection({
    host: 'localhost',	//	数据库地址
    user: 'xiaobai',	//	连接用户
    password: 'woaiwo',	//	连接密码
    database: 'student'	//	数据库名
});
//	连接数据库 	 	  打开冰箱
connection.connect();
//	执行数据库操作 	放进大象
connection.query('SQL语句', function(error, results, fields){
    //	error 错误对象
    //	results 成功结果
});
//	关闭数据库  		 关闭冰箱
connection.end();
```

**查询语句 常用列举**

**新增**

```mysql
/*新增数据*/
insert into `users` values (null, '小白', 18, 0);
insert into `users` (name, age, gender) values ('小怪', '18', 1);
```

**删除**

```mysql
/*删除 一定要配合数据筛选*/
delete from `users` where `id` = 1;
delete from `users` where `id` in(1,2,3,4);
```

**修改**

```mysql
/*修改*/
update `users` set `name` = '萌小白' where  `id` in (2,3,4,5); 
update `users` set `name` = '懵', `age` = 18 where `id`= 2;
```

**查询**

```mysql
/*基础查询*/ 
SELECT `id`, `title` FROM `users`;
/*使用通配符会产生全表扫描, 建议指定列名*/  
select * from users;
/*select 语句可以选择 列 或者一个具体的 值*/
select 1 from users;
```

**筛选条件**

- 子语句, 不能单独执行, 必须配合删除/修改/查询语句

```mysql
delete from `users` where `id` = 6;
delete from `users` where `id` = 6 and `gender` = 0;
delete from `users` where `id` = 6 or `gender` = 0;
delete from `users` where `id` > 6;
delete from `users` where `id` in (4,5);
## 无条件查找全部, 有条件按条件模糊查找 @CreateDate参数 null or 条件 
where (@CreateDate is null or CreateDate like %@CreateDate%)   
```

**常见查询函数**

- 总条数 -- count 分页功能, 查询总页数
- 最大值/最小值 -- max/min
- 平均值 -- avg

```mysql
select count(id) from `users`;
/*一般我们这样查询数据表的总数据个数*/
select count(1) as count from `users`;	# 推荐
/*最大值*/
select max(id) from `users`;
/*最小值*/
select min(id) from `users`;
/*平均值*/
select avg(id) from `users`;
```

 **多表联合查询**

```mysql
SELECT categories.*, user.avatar FROM categories INNER JOIN user ON categories.categoryAuthor=user.nickname WHERE issueId=${query.talkId} ORDER BY categories.categoryCreateDate DESC
```

![52749569673](E:\www\1527495696737.png)

**分页查询数据**

**子语句**

 `limit <skip>, <length>`

`skip = (page - 1) * length`

```mysql
/*limit 子语句/*
/*一个参数: 限制取几条*/
select * from `users` limit 2;
/*两个参数: 越过几条,取几条*/
select * from `users` limit 0, 2;
/*page 页码, size 数量, skip 越过的条数*/
skip = (page - 1) * size
```

---

## 文件上传

下载依赖 `npm i multer` 

**前端代码**

```javascript
//  1. 图片上传业务逻辑
let file = $("#avatarFile")[0];
file.onchange = function () {
    //创建一个FormDate
    var formData = new FormData();
    //将文件信息追加到其中
    formData.append('file', file.files[0]);
    //利用split切割，拿到上传文件的格式
    var src = file.files[0].name,
        formart = src.split(".")[1];
    //使用if判断上传文件格式是否符合               
    if (formart == "jpg" || formart == "png") {
        //只有满足以上格式时，才会触发ajax请求
        $.ajax({
            url: '/community/avatarUpload',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                //上传成功之后，返回对象data                 
                if (data.code > 0) {
                    var src = data.avatarData;
                    //利用返回值 src 网络路径，来实现上传文档的下载        
                    $('.uploadimg').attr('src', src);
                    $('input[name=uploadLink]').val(src);	//	隐藏input保存着图片的访问路径, 用于提交form
                } else {
                    alert("文件格式不支持上传")
                }
            }
        })
    }
};
//   2. 提交校验
$('#profileBtn').on('click', function (ev) {
    ev.preventDefault();
    let $form = $('#profile_from');
    let formData = myFunc.serialize2json($form.serialize());
    $.ajax({
        type: 'POST',
        url: '/community/settings/profile',
        data: formData,
        dataType: 'json',
        success(data) {
            if (data.err_code == 0) {
                $('#profileModalDefault').modal('show');
            }
            if (data.err_code == 6) {
                $('#profileModal').modal('show');
            }
        }
    })
})
```

**后端代码**

```javascript
//  a.处理头像的业务
const multer = require('multer');
//设置文件上传路径和文件命名
let tupianName = '';
//  配置上传文件相关(保存目录文件, 重命名)
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //文件上传成功后会放入public下的upload文件夹
        cb(null, path.join(__dirname, './../../public/images/avatarUpload'))
    },
    filename: function (req, file, cb) {
        // console.log(file);
        let ext = file.originalname.substr(file.originalname.indexOf('.'))
        tupianName = new Date().getTime() + ext;
        //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
        cb(null, tupianName)
    }
});
var upload = multer({
    storage: storage
});
//处理来自前端的ajax请求, single文件上传 并且返回保存路径给前端
router.post('/avatarUpload', upload.single('file'), function (req, res, next) {
    //拼接文件上传后的网络路径，
    var url = '/public/images/avatarUpload/' + tupianName;
    //将其发回客户端
    res.status(200).json({
        code: 6,
        avatarData: url
    });
});
```

