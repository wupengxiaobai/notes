# JavaScript 模块化

​	**将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起块的内部数据/实现是私有的, 只是向外暴露了一些接口(方法)与外部其它模块通信**

**基础实现**

```js
var KTV = (function(){
    return {
        pay(){},
        buy(){},
        //,...
    }
})()
```

## 模块化的进化史

- 最早, 我们这么写代码

```js
function foo(){}
function bar(){}
```

**Global 被污染, 很容易命名冲突**

- 然后, 我们进行简单的封装 Namespace 模式

```js
var MYAPI = {
    msg: 'module',
    foo(){
        console.log(this.msg);
    },
    bar(){
        console.log(this.msg);
    }
}
MYAPI.foo();

//	我们可以修改对象内部数据... 所以一点都不安全
MYAIP.msg = '修改后的msg';
MYAPI.msg;	//	修改后的msg
```

**减少 Global 上变量数目; 本质是对象, 一点都不安全**

- 匿名闭包: IIFE模式

```js
var Module = (function(){
    var _private = "safe now";
    var foo = function(){
        console.log(_private);
    }
    return {
        foo:foo
    }
})()

Module.foo()	//	safe now
Module._private;	//	undefined
```

**函数是 JavaScript 唯一的 Local Scope** 

- IIFE模式增强: 引入依赖

```js
var Module = (function($){
    var _$body = $("body");
    var foo = function(){
        console.log(_$body);
    }
    return {
        foo: foo
    }
})(jQuery)

Module.foo();	//	element(body)
```

**这就是 模块模式, 也是现代模实现的基石**

## 模块化的好处

- 避免命名冲突(减少命名空间污染)

- 更好的分离, 按需加载

- 更高复用性

- 高可维护性

**然而我们发现的问题**

一个页面需要引入多个 js 文件, 导致以下问题

1. 请求多
2. 依赖模糊

3. 难以模糊

这些问题可以通过 **现代模块化编程** 和 **项目构建** 来解决



## CommonJS

#### 规范

##### 说明

1. 每个文件(.js)都可当做一个模块
2. 在服务端: 模块的加载时运行时同步加载的
3. 在浏览器端: 模块需要提前编译打包处理

##### 基本语法

**如何向外暴露模块**

1. module.exports = value
2. exports.xxx = value

**引入模块 require(xxx)**

1. 第三方模块: xxx为模块名
2. 自定义模块: xxx为模块文路径

#### 实现

##### 服务器端实现 **node.js**

文件目录

```js
|-modules
	|-modules1.js
	|-modules2.js
|-app.js
```

```js
//	modules1.js
module.exports = function(str){
    console.log(str);
}

// modules2.js
let str = 'hello world';
module.exports = str;
```

```js
//	app.js
let modules1 = require(./modules/modules1.js);
let modules2 = require(./modules/modules2.js);

modules1(modules2);
```

![1543380408610](.\javascript\1543380408610.png)

##### 浏览器端实现

[Browserify](http://browserify.org/) 也称为 CommonJS 的浏览器端的打包工具

**文件目录如下**

```
|-js
	|-dist	//	打包后的文件目录
	|-src
		|-app.js
		|-module1.js
		|-module2.js
|-index.html
|-package.json
```

1. 下载 browserify

   - 全局安装一次: npm install browserify -g
   - 局部安装: npm install browserify --save-dev(-D)

2. 定义模块代码

   ```js
   //	modules1.js
   module.exports = function(str){
       console.log(str);
   }
   // modules2.js
   let str = 'hello world';
   module.exports = str;
   
   //	app.js
   let module1 = require('./module1.js');
   let module2 = require('./module2.js');
   module2(module1);
   ```

   ```html
   //	index.html
   <script src='js/src/app.js'></script>
   ```

3. 使用 browserify 打包文件

   ```cmd
   #	1. 安装 browserify 在局部我们就可以使用 browserify 命令
   npm install browserify -D
   #	2. 我们开始打包 app.js 执行打包命令
   browserify js/src/app.js -o js/dist/bundle.js
   ```

4. 此时页面使用引入(index.html)

   ```html
   //	3.html文件引入打包编译后的js文件即可
   <script src='js/dist/bundle.js'></script>
   ```

##### 区别 Node 与 Browserify 的模块化

浏览器端默认不支持 require 和 export 所以必须使用依赖 browserify 打包编译 js 生成编译后的 js在引入

## *RequireJS(AMD)

#### 规范

**说明**

1. Asynchronous Module Definition(异步模块定义)
2. [github地址](https://github.com/amdjs/amdjs-api/wiki/ADM)
3. 专门用于浏览器端, 模块的加载时异步的

##### **基本语法**

###### 定义暴露模块

- 定义没有依赖的模块

```js
define(function(){
    return 模块
})
```

- 定义有依赖的模块

```js
define(['module1','module2'], function(m1, m2){
    return 模块
})
```

###### 引入使用模块

```js
require(['module1', 'module2'], function(m1, m2){
    //	使用 m1/m2
})
```

##### 模块的返回值

```js
require(['module1', 'module2', 'module3'], function(m1, m2, m3){
    //	主动加载
    m3()
    
    //	按需(点击执行)加载使用 m1/m2
    document.getElementById('button').onclick = function(){
        //	按钮点击调用 m1 的初始化函数执行
        m1.init();
    }
})
```



#### 实现(浏览器端)

[Require.js](http://requirejs.cn)

**基本目录**

```
|-js
	|-libs
	|-modules
		|-alerter.js
		|-dataService.js
    |-main.js
|-test.html
```

**实施步骤**

1. 下载 require.js

2. 编写代码

   ```js
   //	dataService.js 定义没有依赖的模块
   define(function () {
     let name = 'dataService.js';
     function getName() {
       return name;
     }
     return { getName }
   })
   
   //	alerter.js 定义有依赖的模块
   define(['dataService'], function (dataService) {
     let name = 'alerter.js';
     function showMsg() {
       console.log(name, dataService.getName());
     }
     return { showMsg }
   })
   
   
   //	main.js 主模块中引入模块 *
   (function () {
     requirejs.config({
       //  配置基础目录 
       paseUrl: 'js/',
       paths: {  //  配置模块目录, 谨记在这里不能添加js后缀
         dataService: 'modules/dataService',
         alerter: 'modules/alerter',
         jquery: './libs/jquery-1.10/1'
       }
     });
     //  加载模块
     requirejs(['alerter','jquery'], function (alerter,$) {
       alerter.showMsg();
       $('body').css('background', 'deeppink')
     })
   })()
   ```

3. 页面引入主模块js

   ```html
   <script data-main="./js/main.js" src="./js/libs/require.js"></script>
   ```

**注意点**

引入第三方模块, 比如 jQuery, jQuery 默认支持 AMD. 所以我们在指定名称的时候必须使用jq库指定的 

![1543388141325](.\javascript\1543388141325.png)

![1543388201759](.\javascript\1543388201759.png)



## SeaJS(CMD)

#### **基本语法**

##### 定义暴露模块

**定义没有依赖的模块**

```js
define(function(require, exports, module){
    exports.xxx = value
    module.exports = value
})
```

**定义有依赖的模块**

```js
define(function(require, exports, module){
    //	引入依赖模块(同步)
    var module2 = require('./module2')
    //	引入依赖模块(异步)
    require.async('./module3', function(m3){})
    //	八路模块
    exports.xxx = value
})
```

##### 引入使用模块

```js
define(function(require){
    var m1 = require('./module1')
    var m4 = require('./module4')
    m1.show()
    m4.show()
})
```

#### 实现(浏览器端)

[Sea.js](https://www.zhangxinxu.com/sp/seajs/)

**基本文件目录**

```
|-js
	|-libs
		|-sea.js
	|-module
		|-main.js
		|-m1.js
		|-m2.js
		|-m3.js
		|-m4.js
|-test.html
```

```js
//	m1代码
define(function (require, exports, module) {
  let name = 'm1';
  function showName() {
    console.log(name);
  }
  module.exports = showName
})

//	m2代码
define(function (require, exports, module) {
  let name = 'm2';
  function showName() {
    console.log(name);
  }
  exports.showM2 = {
    showName
  }
})

//	m3代码
define(function (require, exports, module) {
  let name = 'm3';
  function showName() {
    console.log(name);
  }
  exports.showM3 = {
    showName
  }
})

//	m4代码
define(function (require, exports, module) {
  //  同步引入模块2
  require('./m2').showM2.showName();
  //  异步引入模块3
  require.async('./m3', function(m3){
    m3.showM3.showName();
  })
  let name = 'm4';
  function showName() {
    console.log(name);
  }
  exports.showM4 = {
    showName
  }
})


//	main.js代码
define(function(require){
  //  引入模块1,并执行其导出的函数
  require('./m1')();
  //  引入模块4
  require('./m4').showM4.showName();
})
```

```html
<!-- test.html 引入使用 -->
<script src="./js/libs/sea.js"></script>
<script>
    seajs.use('./js/module/main.js');
</script>
```

执行结果

```
m1	//	首先引入m1执行
m2	//	引入m4时同步执行被m4引入的m2
m4	//	引入m4后执行
m3	//	引入m4时异步执行被m4引入的m3
```



## ES6

#### 规范

**说明**

1. [文档地址](http://es6.ruanyifeng.com/#docs/module)
2. 依赖模块需要编译打包处理

**语法**

1. 导出模块 export
2. 引入模块 import

#### 实现(浏览器端)

**ES6-Babel-browserify 使用教程**

1. 定义 package.json 文件

2. 安装 babel-cli, babel-preset-es2015 和 browserify

   1. npm i babel-cli browserify -g
   2. npm i babel-preset-es2015 -D
   3. prset 预设(将es6转换成es5的所有插件打包)

3. 定义 .babelrc 文件

   ```
   {
       "presets": ["es2015"]
   }
   ```

4. 编译准备

   目录

   ```
   |-test.html
   |-js
   	|-dist
   	|-src
   		|-main.js
   		|-module1.js
   		|-module2.js
   		|_module3.js
   |-babelrc
   ```

   代码文件

   ```js
   //	main.js
   import { fn1 as m1f1, fn2 as m1f2, arr as m1arr } from './module1.js';
   import { fn1 as m2f1, fn2 as m2f2, arr as m2arr } from './module2.js';
   import module3 from './module3';
   m1f1();
   m1f2();
   m2f1();
   m2f2();
   console.log(m1arr);
   console.log(m2arr);
   module3();
   
   //	module1.js 分别暴露
   export function fn1() {
     console.log('fn1 module1');
   };
   export function fn2() {
     console.log('fn2 module1');
   }
   export let arr = [1, 2, 3, 4, 520];
   
   //	module2.js 统一暴露
   function fn1() {
     console.log('fn1 module2');
   }
   function fn2() {
     console.log('fn2 module2');
   }
   let arr = [1, 2, 3, 4, 520]
   export {
     fn1,
     fn2,
     arr
   }
   
   //	module3.js 默认暴露 可以是任意数据类型, 暴露什么数据接收到的就是什么数据
   export default () => {
     console.log('我是默认暴露的箭头函数')
   }
   ```

5. **编译**

   ***使用Babel 将 ES5代码编译为 ES5代码**

   ***使用 Browserify 编译 js**

   ```js
   //	使用Babel 编译js/src下的ES6代码js文件 到 js/lib下(lib文件没有自动创建)
   babel js/src -d js/lib
   
   //	使用 Browserify 编译js (dist文件必须存在)
   browserify js/lib/main.js -o js/dist/bundle.js
   ```

6. 页面引入测试

   ```html
   <script src='js/dist/bundle.js'></script>
   ```

7. **第三方模块的使用**

   直接 npm i jquery -D 下载

   我们在代码中直接如此引入 **import $ from 'jquery'**

   ![1543397511435](.\javascript\1543397511435.png)