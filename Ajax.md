# AJAX

## 概述

> web 程序最初的目的就是将 (数据) 放到公共的服务器, 让所有的网络用户都可以通过浏览器访问.

![52708612905](.\php\1527086129057.png)

在此之前, 我们可以通过以下几种方式让浏览器发出对服务端的请求, 获得服务端的数据

- 地址栏输入地址, 回车, 刷新
- 特定元素的 href 或 src 属性
- 表单提交

这些方案是我们无法通过或者很难通过代码的方式进行编程 (发出请求,并且接收服务端返回的响应), **如果我们可以通过 JavaScript 直接发送网络请求, 那么 web的可能就会更多,随之就能够实现的功能也会更多, 至少不会再是"静态页面"**

AJAX ( Asynchronous JavaScript and XML), 是在浏览器端机械能  **网络编程** (发送请求/ 接收响应) 的技术方案, 它是我们可以直接通过 JavaScript 直接获取服务端最新的内容而不必重新加载页面. 让 Web 更能接近桌面应用的用户体验.

**AJAX 就是浏览器提供的一套 API,  可以通过 JavaScript 调用, 从而实现通过该代码控制请求与响应. 实现网络编程**

> 使用 API 来弥补语言的能力不全

## 快速上手

使用 AJAX 的过程可以类比平常我们访问网页的过程

```javascript
//	1. 创建一个 XMLHttpRequest 类型的对象 -- 相当于 打开了一个浏览器
var xhr = new XMLHttpRequest();

//	2.打开与一个网址之间的连接 -- 相当于在地址栏输入访问地址
xhr.open('GET', 'time.php');

//  3. 通过连接发送一次请求 -- 相当于回车或者点击访问发送请求
xhr.send();

//  4. 指定 xhr 状态变化事件处理函数 -- 相当处理网页呈现后的操作
xhr.onreadystatechange = function(){
    //	通过 xhr 的 readyState 判断此次请求的响应是否接收完毕
    if (this.readyState === 4) {
        //	通过 xhr 的 responseText 获取得到响应的响应体
    	console.log(this);
    }
}
```



### readyState

由于 `readystatechange` 事件是在 `xhr` 对象状态变化的时触发 (不单是在的到响应时), 也就意味着这个事件会触发多次, 所以我们有必要了解每个状态的含义.

![readyState 状态](.\php\1527134595298.png)

**时间流程**

![52713959182](.\php\1527139591829.png)

```javascript
var xhr = new XMLHttpRequest();
console.log(xhr.readyState);
//	=> 0  初始化 请求代理对象

xhr.open('GET', 'time.php');
console.log(xhr.readyState);
//	=> 1 open方法已经调用, 建立一个与服务器特定端口的连接

xhr.send();
console.log(xhr.readyState);
//	=> 1

xhr.onreadystatechange = function(){
    switch (this.readyState) {
        case 2:
            console.log(this.readyState); // 2
            //	可以拿到响应报文的响应头了.
            console.log(this.getAllResponseHeaders()); 		//	全部
            console.log(this.getResponseHeader('date'));	//	某项
            break;
        case 3:
            console.log(this.readyState); // 3
            //	正在下载响应报文的响应体, 有可能为空, 也要有可能不完整.
            //	这个状态下的响应体不可靠.
            console.log(this.responseText);
            break;
        case 4:
            console.log(this.readyState); // 4
            //	一切 OK. (整个响应报文已经完全下载完毕. 很可靠)
            break;
    }
}
```

通过理解状态值的含义的吹一个结论, 我们一般都是在 `readyState 为 4 的时候执行响应的后续逻辑`

```javascript
xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
        // code.....
    }
}
```

**onload** 兼容性不好

```js
var xhr = new XMLHttpRequest();

xhr.open('GET', 'time.php');

xhr.send(null);

// onload 是 HTML 中 提供的 XMLHttpRequest version 2.0 定义的.
xhr.onload = function () {
    console.log(this.readyState); // 4
    console.log(this.responseText);
}
```



### 遵循HTTP

**XMLHttpRequest** **就是** **JavaScript 在 Web 平台中发送 HTTP 请求的手段**, 所以我们发出去的请求仍然是 HTTP 请求, 同样符合 HTTP 约定的格式

```js
//  设置请求报文请求行
xhr.open('POST', './add.php');
//  设置请求头
xhr.setRequestHeader('Hello', 'hello girl'); // 设置一个请求头
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');// 设置请求体内容对应 Content-Type
// 设置请求体内容
xhr.send('gender=girl&age=18');
// 状态
xhr.onreadystatechange = function() {
    if(this.readyState !== 4) return;
    //  获取状态码和描述
    console.log(this.status);
    cosnole.log(this.statusText);
    //	获取响应头
    console.log(this.getResponseHeader('Content-Type'));
 	console.log(this.getAllResponseHeader());
    //	获取响应体
    console.log(this.responseText); // 文本形式
    console.log(this.responseXML);  // xml形式, 了解即可	
}
```

**注意 :**  我们设置的请求体是 **什么格式** 的内容, 也一定要设置请求体中 `Content-Type` 的对应类型.  

如上我们设置的请求体是 urlencoded 格式内容, 所以我们也必须设置对应的 Content-Type为application/x-www-form-urlencoded

![请求体的 Content-Type](.\php\1527139072283.png)



## 具体用法

### GET请求

> 通常在一次 **GET** 请求中, 参数传递都是通过 URL 地址中的 `?` 参数传递.

```javascript
var xhr = new XMLHttpRequest();
//	GET 请求传递参数通常使用的是问号传参
//	这里可以再请求地址后面加上参数, 从而传递数据到服务端
xhr.open('GET', './users.php?id=xxx');
//  一般在 GET 请求时无需设置响应体, 可以传 null 或者 直接不传
xhr.send(null);
xhr.onreadystatechange = fuinction() {
    if (this.readyState === 4) {
        console.log(JSON.parse(this.responText));
    }
}
//	一般情况下 URL 传递的都是参数性质的数据, 而 POST 一般都是业务性属性
```



### POST请求

> **POST** 请求过程中, 都是采用 **xhr.send** (请求头) 承载需要提交的数据

```javascript
//	找一个合适的时机, 做一件合适的事情.
var btn = document.getElementById('login');
var txtUsername = document.getElementById('username');
var txtPassword = document.getElementById('password');
btn.onclick = function () {
    //	1. 获取value
    var username = txtUsername.value;
    var password = txtPassword.value;
    //	2. 通过xhr发送一个post请求
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'login.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //	发送的请求体按照哪种格式就必须指定请求头的设置.
    xhr.send(`username=${username}&password=${password}`); // √
    //	3. 根据服务端的反馈, 作出提示
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
        }
    }
}
```



### 同步与异步

关于同步和异步的概念, 生活中有很多常见的常见.

> 同步: 同时做多件事情
>
> 异步: 一次只能做一件事情

在程序的世界中, 同步和异步的概念与生活中的概念恰恰相反. 

> 同步: 必须等待一个程序先完成, 才能执行其它程序.
>
> 异步: 不需要等待程序完成, 也执行其他程序, 可以同时进行.

`xhr.open()` 方法第三个参数要求传入的是一个 `boolean` 值, 其作用就是设置此次请求是否采用异步方式执行, 默认为`true`, 如果需同步执行可以通过传递 `false` 实现.

```javascript
var asyncXhr = new XMLHttpRequest();
//	open 方法的第三个参数是 async 可以传入一个布尔值, 默认 为 true
asyncXhr.open('GET', 'time.php', true);
console.time('async');
asyncXhr.send(null);
asyncXhr.onreadystatechange = function () {}
console.timeEnd('async');

var syncXhr = new XMLHttpRequest();
//	open 方法的第三个参数是 async 可以传入一个布尔值, 默认 为 true
syncXhr.open('GET', 'time.php', false);
console.time('sync');
syncXhr.send(null);
syncXhr.onreadystatechange = function () {}
console.timeEnd('sync');

//	同步操作在请求时会等待响应数据回馈再执行接下来的代码.会出现进程阻塞的情况
//	所以我们一般使用异步执行代码, 因为这样效率比较快. 而且同步操作的ajax请求已经被浏览器建议不要再使用了.
async: 0.2080078125ms
sync: 4.328125ms
```



### 响应数据格式

> 如果希望服务端返回一个复杂数据, 如何处理

问题就是服务端发出何种格式的数据, 这种数据格式在客户端用 **JavaScript** 解析.

> 不管服务端是采用 XML 还是 JSON ,本质都是将数据返回给客户端
>
> 服务端应该设置一个合理的 Content-Type

#### XML

XML是一种标记语言.  淘汰原因: 数据沉余太多

```xml
<?xml version="1.0" encoding="utf-8" ?>
<users>
    <user>
        <id>1</id>
		<username>小白菜</username>
        <loginName>小了白了兔</loginName>
        <password>woaiwo1234</password>
    </user>
    <user>
        <id>2</id>
		<username>小白</username>
        <loginName>白了又了白</loginName>
        <password>woiaow</password>
    </user>
</users>
```

**客户端怎么去接收 xml 格式数据并解析**

```js
//	xml 和 html 的语法非常相似, 解析 html 的时候, 我们使用 dom 对象, 然后调用 dom 的 api 去进行解析
document.querySelector("input").onclick = function(){
    var xhr = new XMLHttpRequest()
    xhr.open('get', "./xml.php")
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            //	如果服务器返回的是 xml 格式的数据, 我们通过 responseXML 接收
            var dom = xhr.responseXML
            var users = dom.querySelectorAll("user")
            //	console.log(users)
            useres[1].querySelector("username")	//	小白
        }
    }
}
```



#### JSON

一种数据描述手段, 类似于 JavaScript 字面量方式

服务端采用 **JSON** 格式返回数据, 客户端按照 **JSON** 格式解析数据.

### 处理响应数据渲染

> 使用 **模板引擎**
>
> ​	art-template:  https://aui.github.io/art-template/zh-cn/docs/installation.html

```html
//	html中
<table border="1">
   <tbody id="demo"></tbody>
</table>
<script src="art-template.js"></script>
<script id="tmpl" type="text/x-art-template">
	{{each comments}}
	<tr>
		<td>{{$value.author}}</td>
		<td>{{$value.content}}</td>
		<td>{{$value.created}}</td>
	</tr>
	{{/each}}
</script>
<script>      
//	js中
var xhr = new XMLHttpRequest();
xhr.open('GET', 'test.php');
xhr.send();
xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return;
    var res = JSON.parse(this.responseText);
    //	目标所需数据
    var context = { comments: res.data };
    //	借助模板引擎提供的API渲染数据
    var html = template('tmpl', context);
    demo.innerHTML = html;
    //  1.选择一个模板引擎
    //  2.下载模板引擎js文件
    //  3.引入到页面中
    //  4.准备一个模板
    //  5.准备一个数据
    //  6.通过模板引擎的js文件提供的一个函数将目标和数据整合得到渲染结果HTML
    //  7.将渲染结果的HTML 设置到某个元素的innerHTML中
}
</script>
```



## 封装

### AJAX 请求封装

```javascript
//	封装的套路
//	1. 写一个相对比较完善的用例
//  2. 写一个空的函数, 没有形参, 将刚才用例直接作为函数函数体
//  3. 根据使用过程中的需求, 抽象参数

function ajax(options) {

    options.method = options.method.toUpperCase();
    options.data = options.data || null;

    if (typeof options.data === 'object') {
        var tempArr = [];
        for (var key in options.data) {
            var value = options.data[key];
            tempArr.push(key + '=' + value);
        }
        options.data = tempArr.join('&');
    }

    if (options.method === 'GET') {
        options.url += '?' + options.data
    }

    var xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url);

    var data = null;
    if (options.method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        data = options.data;
    }

    //  beforeSend 拦截: 正则验证, 请求前xxx效果等等
    if (options.beforeSend) {
        console.log('执行了 beforeSend 回调')
        var beforeSendRes = options.beforeSend()
        if (!beforeSendRes) {
            return
        }
    }

    xhr.send(data);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log('执行了 success 回调')
                options.success && options.success(JSON.parse(this.responseText));
            } else {
                options.error && options.error('执行了error函数');
            }
        }
    }
}


//	我们在使用
/* ajax({
      method: 'GET',
      url: 'http://localhost:3000/',
      data: {
        id: 1
      },
      success: function (data) {
        console.log(data);
      }
    }); */

ajax({
    method: 'post',
    url: 'http://localhost:3000/',
    data: {
        key1: 'value1',
        key2: 'value2'
    },
    beforeSend: function () {
        return true
    },
    success: function (data) {
        console.log(data)
    },
    error: function (res) {
        console.log(res)
    }
});
```



### jQuery 中的 AJAX

Jquery 中有一套专门针对 AJAX 的封装, 功能十分完善, 经常使用. 兼容强大

> 参考:
>
> http://jquery.cuishifeng.cn/jQuery.Ajax.html
>
> http://www.bootcdn.cn/jquery/

#### $.ajax

```javascript
$.ajax({
    url: 'json.php', 
    type: 'post',
    data: {
        id: 1, 
        name: '小白'
    },
    //	用于响应具体的类型, 和data没有关系.
    dataType: 'json',
    success: function(data){
        //	一旦设置了 dataType 选项, 就可以不用关心服务端的 Content-Type 的设置了. 
        //	客户端会主观的认为返回的是json格式的字符串
        console.log(data);
    }
})
```

#### $.get

```javascript
$.get('json.php', function(data){
    //	data 会自动根据服务端响应的 content-type 自动转换为适合的格式
    //	这是 jquery 提供的功能
    console.log(data);
})
```

#### $.post

```javascript
$.post("json.php", function(data){
    console.log(data);
})
```

#### jQuery.ajax 的回调

```javascript
//显示 loading
$.ajax({
    url: 'time.php',
    type: 'get',
    beforeSend(xhr){ //	ajax 发送请求之前的操作(open, send 之前)
        console.log(xhr);
    },
    success(data){	//请求成功
        console.log(data);
    },
    error(status){	//请求失败
        console.log(status);
    },
    complete(xhr){  //请求完成
        // 不管是成功还是失败,都是完成.
        // 都会执行这个complete函数
        // 隐藏lodging
        console.log(xhr)
    }
})
```

#### 全局事件处理函数

> ​	比如  像 `brforeSend(){}` 和 `complete(){}` 等钩子函数，在请求发送和请求完成的阶段, 我们一般会作一个 **loading** 加载, 如果说每个请求中都要重复 beforesend 和 complete 回调, 会显得十分晕菜. 即便可以复制黏贴也不好玩. jquery 给我们提供了 **全局事件处理** 函数, 如下操作,再也不用担心复制黏贴的烦恼了.
>
> `.ajaxStart(function(){})`  ajax 请求开始出发的钩子
>
> `.ajaxStop(function(){})`    ajax 请求结束的钩子

**使用**

```javascript
$(document)
    .ajaxStart(function () {  // 全局性处理函数,ajax开始请求
        NProgress.start(); //  调用Nprogress 库的开始加载
    })
    .ajaxStop(function () {   // 全局性处理函数,ajax请求结束
        NProgress.done();  //  调用Nprogress 库的加载结束
    })
```

#### 局部加载页面

`$(selector).load()`

```javascript
$(function ($) {  // 局部化 $
    // $(function(){}) 有一个独立的作用域，顺便确保dom结构加载完成执行
    $('.list-group-item').on('click', function () {
        var url = $(this).attr('href');
        //  jquery中的load()的局部加载实现
        $('#main').load(url + ' #main > *');	
        //	指定区域局部加载某个页面的某个部分
        return false; //  去除a默认事件
    })
})
```



## 跨域

### 相关概念

同源策略是浏览器的一种安全策略, 所谓 同源是指 **域名/协议/端口** 完全相同, 只有 **同源地址** 才可以互相通过 **AJAX** 的方式请求.

同源或不同源说的就是两个地址之间的关系, 不同源地址之间请求我们称之为 **跨域请求**

![52722745649](.\php\1527227483902.png)

### 解决方法

#### JSONP

**jsonp封装**

![52725184958](.\php\1527251849582.png)



**jquery 中的 jsonp**

```javascript
$.ajax({
    'url':'http://localhost:8080/day-six/22-JSONP/data.php',
    'dataType':'jsonp',
    success(data){
        console.log(data);
    }
})
```

#### CORS贼可怕... 

```php
//	在后端那边开放资源设置, 这就可以进行ajax请求跨域了.
header('Access-Control-Allow-Origin: *')
```



##  