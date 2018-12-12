# React 基础学习笔记

## 介绍

**1.React是一个用于构建用界面的渐进式 JAVASCRPT 库.**

- 本身只处理 UI
- 不关系路由
- 不处理 AJAX

**2.React 主要用于构建UI, 很多人认为 React 是 MVC 中的 V(视图)**

- 数据驱动视图

**3.React 由 Facebook 开发**

从最早的 UI 引擎变成了一整套前后端通吃的 Web App 解决方案, 衍生的 React Native项目

**4.数据驱动视图**

**组件化**

**路由**

**React**

- 对技术要求相对较高
- 编程性更好, 更底层, 更灵活

**5.React 特点**

- 组件化
- 高效
  - 虚拟 DOM
  - Vue2 也是虚拟 DOM
- 灵活
  - 渐进式, 本身只处理UI, 可以和其它技术栈组合使用
- 声明(配置)式设计
  - `data` 响应式数据
  - `methods` 处理函数
  - 特定的组件生命周期
  - `state`
  - 方法就是类成员
  - 这样做的好处就是约定式开发
- JSX
  - 一种编译 JavaScript 语言, 允许 js 和 html 混搭
  - 模板中 就是 javascript 逻辑
- 单向数据流
  - 组件传值
  - 所有数据都是单向的, 组件船只的数据都是单向的
  - 没有双向数据绑定

## 对比 Vue

**技术层面**

- Vue 生产力更高(更少的代码实现更强功能)
- React 技术占比较重
- 都采用了虚拟 DOM 效率都很高.
- 组件化 (支持)
- 数据绑定
  - 都支持数据驱动视图
  - Vue 还支持表单控件的双向数据绑定
  - React 不支持双向数据绑定
- 他们的核心库都很小, 都是渐进式 配合全家桶就厉害了
- React 采用 JSX 语法编写组件
- Vue 采用 单文件组件
  - `template`
  - `script`
  - `style`

**开发团队**

- React 由 Facebook 前端团队维护开发
- Vue
  - 早起只有尤雨溪一人
  - 使用者愈来愈多, 离职后专职开发维护
  - 目前由团队在维护

**移动 APP 开发**

- React Native
  - 可以原生引用
- Weex
  - 阿里巴巴内部搞的一个东西(多端适用). 基于vue

## 相关资源连接

[React 官网文档](https://reactjs.org/docs/getting-started.html)

[官方教程](https://reactjs.org/docs/getting-started.html)

[React Native 适用react开发原生移动web]()

## React核心概念

### 3.1	组件化

![53367895663](E:\react\1533678956631.png)

### 3.2 虚拟 DOM

### 3.3 JSX

## 起步

### **4.1 安装**

- 云端编程环境
  - 只适用于 demo 测试
- 脚手架工具: `create-react-app`
  - 类似于 vue-cli
  - 集成了webpack 构建工具等环境
- 本地简单开测试 (没有模块化支持)
- 自己手动搭建模块化 , webpack 开发环境

> https://reactjs.org/docs/hello-world.html

### 4.2 babel

**调用 API 编译执行**

```html
<script> 
    var input = 'const getMessage = () => "Hello World"; console.log(getMessage())';
    //	调用Babel 提供的转换 API 完成编译转换, 得到结果字符串
    //	编译过程比较耗时, 只推荐开发测试使用
    //	使用其目的是为了 简化 react 的学习过程
    var output = Babel.transform(input,{presets:['es2015']}).code;
    window.eval(output);
</script>
```

**babel 自动编译执行**

```html
<!-- 可以帮我们读取 text/babel 的 script 进行正常编译执行(生产环境下) -->
<script type="text/babel">
	const getMessage= () => "hello World"
    console.log(getMessage());
</script>
```

### 4.3 初始化安装依赖(非模块化)

```shell
npm init -y
npm install --save react react-dom @babel/standalone
```

### Hello World

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>react Hello World</title>
    </head>
    <body>
        <div id="app"></div>
        
        <script src="node_modules/@babel/standalone/babel.js"></script>
        <script src="node_modules/react/umd/react.development.js"></script>
        <script src="node_modules/react-dom/umd/react-dom.development.js"></script>
        <!-- React 的核心理念:   组件化, 不支持管理 DOM 模板, 它必须把所有所谓的模板都放到组件中`-->
        <script type="text/babel">
        	// 下面代码的作用: 讲一个 h1 标签渲染到指定的界面入口中 
            // 这种将 html 和 js 混写的方式交 JSX 语法 // 这种语法必须通过 Babel 编译完成浏览器才能执行 		      		ReactDOM.render(<h1>Hello World</h1>, document.getElementById('app'))
        </script>
    </body>
</html>
```

## JSX

HTML 语言直接写在 JavaScript 语言中, 不加任何引号, 这就是 JSX 语法. 它允许 HTML 与 JavaScript 的混写.

### 5.1 环境配置

- 非模块化环境
  - `babel-standalone`
  - 执行时编译, 速度比较慢, 只适合开发测试环境
- 模块化环境
  - 结合 webpack 配置 babel 响应工具完成预编译
  - 浏览器执行的是预编译结果
- Babel REPL 赋值查看编译结果
  - [适用于在线测试](http://babeljs.io/repl)

### 5.2 基本语法规则

- 必须只能有一个根节点
- 多标签包到一个小括号中, 防止 JavaScript 自动分号之后不执行(return之后不执行)
- 遇到 html 标签 (以 `<` 开头) 就用 HTML 规则解析
  - 单标签不能省略结束标签.
- 遇到代码块 (以 `{` 开头) 就用 JavaScript 规则解析 
- JSX 允许直接在模板中插入一个 JavaScript 变量
  - 如果这个变量是一个数组, 则会展开这个数组的所有成员添加到模板中
- 单标签必须结束 `/>`

**基本语法示例**

```JSX
/* 换行或者多标签, 推按加 () */ 
const element = (
    <div>
        <h1>Hello JSX</h1>
        <p>哈哈哈哈</p>
    </div>
) 
ReactDOM.render(element, document.getElementById('app') ) 
```

### 5.3 在 JSX 中嵌入 JavaScript 表达式

- 语法
- 如果 JSX 写入了多行中, 则建议包装括号避免自动分号的问题

```JSX
const user = { name: '小白', age: 18, gender: 0 } 
const element = (
    <div>
        { 
            //  不推荐这种注释方法
        }
        {/*jsx中的注释: 推荐使用多行注释*/}
        <p>{1+1}</p>
        <p>{'hello ' + user.name}</p>
        <p>{`hello ${user.name}`}</p>
        <p>姓名: {user.name}</p>
        <p>年龄: {user.age}</p>
        <p>性别: {user.gender==0?'男孩纸':'女孩纸'}</p>
    </div>
) 
ReactDOM.render(element, document.getElementById('app'))
```

### 5.4 在 JavaScript 表达式中嵌入 JSX

```javascript
let user = {
    name : '小白',
    age: 18,
    gender: 0
}

function getGreeting(user) {
    if(user){
        return <h1>hello {user.name}</h1>
    }
    return <h1>Hello 陌生人</h1>
}

const element = getGreeting(null)
ReactDOM.render(
    element, 
    document.getElementById('app')
)
```

### 5.5 JSX 中的属性

- 动态绑定属性
- `class` 使用 `className`
- `tabindex` 使用 `tabIndex`
- `for` 使用 `htmlFor`
- `checked` 使用 `defaultChecked`
- ....

普通的属性:

```JSX
const element = <div tabIndex="0"></div>;
```

在属性中使用表达式:

```jsx
const element = <img src={user.avatarUrl} />;
```

简单 demo

```JSX
user = {
    name: '小白',
    age: 18
}
const element = (
    {/*jsx中class是一个关键字, 请使用className替代class进行属性的绑定*/}
    <div className="box" title={user.name}>
    	{/*jsx中for也是一个关键字, 请使用htmlFor替代for进行属性的绑定*/}
    	<label htmlFor="name">用户名</label>
        {/* jsx中单标签必须 /> 结尾, 不能省略 / */}
        <input type="text" id="name" />
    </div>
) 
ReactDOM.render( element, document.getElementById('app') )
```

### 5.6 声明子节点

- 必须有且只有一个根节点

如果标签是空的, 可以使用 `/>` 立即关闭

```JSX
const element = <img src={user.avatarUrl} />;
```

JSX 子节点可以包含子节点

```JSX
cosnt element = (
	<div>
    	<h1>哈哈</h1>
        <p>2333</p>	
    </div>
)
```

### 5.7 JSX 自动阻止注入式攻击

原样输出:

```jsx
const element = <div>{'<h1>this is safe</h1>'}</div>
```

输出 html:

```JSX

```

### 5.8 在 JSX 中使用注释

在 JavaScript 中的注释还是以前的方式

```javascript
//	当行注释
/* 多行注释 */
```

在 JSX 中写注释

```javascript
# 方式一
{
    //	注释这样写, 必须分开, 不推荐
}
# 方式二: 推荐使用
{/* 注释这样写, 推荐 */}
```

### 5.9 JSX 原理

### 5.10 DOM Elements

[参考文档](https://reactjs.org/docs/dom-elements.html) **关键字的替代**

### 5.11 JSX 语法高亮

[BABEL设置](babeljs.io/docs/editors) 语法高亮



## 列表渲染

> https://reactjs.org/docs/lists-and-keys.html

JSX 允许直接在模板中插入 JavaScript 变量. 如果这个变量是一个数组, 则会展开这个数组的所有成员

```JSX
const fruits = [
    <li key="1">苹果</li>,
    <li key="2">香蕉</li>,
    <li key="3">橘子</li>
]
const element = (
    <div>
        <h1>Hello fruits</h1>
        {/* 在 jsx 中, 绑定数组的成员 会直接把成员渲染到此处 */}
        <ul>{fruits}</ul>
    </div>
)

ReactDOM.render(element, document.getElementById('app'))
```

通常情况下, 我们渲染的一般是数据

```JSX
//  数据遍历这样玩
let todos = [
    {id:1,title:'吃饭'},
    {id:2,title:'睡觉'},
    {id:3,title:'打豆豆'}
]
/* 使用我们常用的 forEach 遍历 构建一个所需数据的新数组 */
// const todoLis = []
// todos.forEach(item => {
//     todoLis.push(<li key={item.id}>{item.title}</li>)
// });

/* 使用数组的 map 方法, 遍历数组返回一个所需数据的新数组 */
const todoLis = todos.map(item=>{
    return <li key={item.id}>{item.title}</li>
})

const element = (
    <div>
        <h1>Hello todoLis</h1>
        {/* 在 jsx 中, 绑定数组的成员 会直接把成员渲染到此处 */}
        <ul>{todoLis}</ul>
    </div>
)

ReactDOM.render(element, document.getElementById('app'))
```

我们还可以直接在标签中渲染

```JSX
let todos = [
    {id:1,title:'吃饭'},
    {id:2,title:'睡觉'},
    {id:3,title:'打豆豆'}
]
const element = (
    <div>
        {/* 直接在标签中列表渲染*/}
        <h1>直接在标签中列表渲染</h1>  
        <ul>
            {
                todos.map(item=>{
                    return <li key={item.id}>{item.title}</li>
                })
            }
        </ul>
    </div>
)
```



## 条件渲染

## 事件处理

```JSX
function handleClick() {
    window.alert('hello')

    /*
        1. 事件绑定必须使用驼峰命名
        2. 事件绑定必须给定一个函数
        3. 如果我们想要行内处理.我们可以这样..
    */
}

const element = (
    <div>
        <button onClick={handleClick}>点我</button>
        <button onClick={() => { window.alert('hello') }}>行内绑定事件</button>
    </div>
)

ReactDOM.render(element, document.getElementById('app'))
```

### 8.1 事件绑定中 this 指向问题(坑)

**第一种方式 (不做任何处理)**

- `this` 执行 window (我这里是 undefined 笑哭...)
- 默认接收一个 `event` 事件源对象

```JSX
<button onClick={this.handleClick}>点击 change message</button>
```

**第二种方式 (bind)**

- `this` 执向组件实例
- 默认接受一个参数 `event`事件源对象
- 可以额外传递参数 
  - (在函数形参上) 手动传递的参数会放前面, event 会作为函数最后一个参数

```JSX
<button onClick={this.handleCLick.bind(this)}>点击 change message</button>

# 注意函数形参顺序
handleClick(params1, params2, e) {
    console.log(e.target)
    console.log(params1, params2)
}
```

**第三种方式: (使用箭头函数 我喜欢 √)**

- 自动 bind this
- 手动传递参数
- 参数顺序自己制定 `event` 也需要自己手动传递

```JSX
<button onClick={(e) => { this.handleClick(e, 123, 456)}}>点击 change message</button>

handleClick(e, params1, params2) {
    console.log(e.target)
    console.log(params1, params2)
}
```

**复习 bind函数**

```javascript
var user = {
    name: '小白'
}

function func(a, b, c, d, e, f) {
    console.log(a, b, c)
    console.log(d, e, f)
    console.log(this)
}

//  绑定的时候传参 绑定的时候 bind 不会自动地帮助函数执行, 只是改变this指向
//	即 预置传参, 不调用
var newFunc = func.bind(user, 1, 2, 3)

//  调用的时候传参, 这里的参数会和预传的参数合并一起作为函数参数
btn.onclick = function () {
    newFunc(4, 5, 6)
}
```



## Class 和 Style

class:

```jsx
<div className="box" title="stuff"></div>
```

style:

```jsx
<div style={{color: 'red', fontWeight: 'bold'}}></div>
```

### className

classNames 是一个第三方工具库, 可以很方便的帮我们根据条件拼接样式

[参考文档](https://github.com/JedWatson/classnames)

## 表单处理

[参考文档](https://reactjs.org/docs/forms.html)

## 组件

**React 允许将代码封装成组件** ( component), 然后类似插入普通 html 一般于网页中插入该组件

### 11.1 组件规则注意事项

- 组件类的第一个**首字母必须大写**
- 组件类必须有 **`render`** 方法
- 组件类必须有且只有一个 **根节点**
- 组件属性可以在组件的 **`props`** 获取
  - 函数需要声明参数: `props`
  - 类直接通过 `this.props`

### 11.2 函数式组件(无状态)

- 名字不能用小写
  - React 在歇息的时候, 是以标签首字母来区分的
  - 如果首字母是小写则当做 HTML 来解析
  - 如果首字母是大写则当做 组件 来解析
  - 所以组件 首字母必须大写

```jsx
//	函数式组件(静态组件)
function AppHeader() {
    return (
        <div className="header">
            <h1>头部</h1>
        </div>
    )
}
function AppMainAside() {
    return (
        <div className="aside">
            <ul>
                <li>正在热映</li>  
                <li>即将上映</li>  
            </ul>
        </div>
    )
}
function AppAppMainContent(props) {
    return (
        <div className="content">
            <div>{props.content}</div>
        </div>
    )
}
function AppFooter() {
    return (
        <div className="footer">
            <h1>底部</h1>
            <p>{this.state.foo}</p>
        </div>
    )
}
const element = (
    <div>
        <AppHeader />
        <div className="main">
            <h1>主体部分</h1>
            <AppMainAside />
            <AppAppMainContent content="内容部分233"/> 
        </div>
        <AppFooter />
    </div>
)
ReactDOM.render(element, document.getElementById('app'))
```

### 11.3 类方式组件 (有状态)

```JSX
//  (class 式组件)动态的组件
class AppFooter extends React.Component {
    constructor() {
        super()
        //  state 就是组件的状态, 也就是把书驱动视图的数据初始化到 state 中
        //  state 类似于 Vue 中的 data
        this.state = {
            foo: '哈哈哈'
        }
        setTimeout(() => {
            //  这样子不行
            //  this.state.foo = '2333, what Fuck!'
            //  正确修改 数据 的方式
            this.setState({
                foo: '2333, what Fuck!'
            })
        }, 2000);
    }
    render() {
        return (
            <div className="footer">
                <h1>底部</h1>
                <p>{this.state.foo}</p>
            </div>
        )
    }
}

const element = (
    <div>
        <AppFooter />
    </div>
)
ReactDOM.render(element, document.getElementById('app'))
```

#### **简单的组件类的定义**

```JSX
<div id="app"></div>

<script src="node_modules/@babel/standalone/babel.js"></script>
<script src="node_modules/react/umd/react.development.js"></script>
<script src="node_modules/react-dom/umd/react-dom.development.js"></script>
<script type="text/babel">
    class MyComponent extends React.Component {
        render() {
            return (
                <div>
                    <h1>My Component</h1>
                </div>
            )
        }
    }

    const element = <MyComponent />
    ReactDOM.render(element, document.getElementById('app'))
</script>
```

####**定义一个带有状态的组件**

```JSX
class MyComponent extends React.Component {
    constructor() {
        //  如果子类加入了 constructor 构造函数, 则必须手动调用父类构造函数即 super
        super()
        //  react 组件需要通过手动为组件类添加 state 成员来初始化: ViewModel
        //  state 等价于 vue 中的 data
        //  定义好数据之后就可以在该组件管理的模板中通过 {} 来绑定数据了
        this.state = {
            message: 'Hello MyComponent'
        }
    }
    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
                {/*事件绑定函数默认情况下:这里的this是undefined. 需要在事件绑定这里使用 bind 修改this 指向*/}
                <button onClick={this.handleClick.bind(this)} >点击改变数据</button>
            </div>
        )
    }
    //  约定: 处理事件的方法都去名为 handlexxx
    handleClick() {
        // console.log('handleClock 执行了')
        // console.log(this)
        // console.log(this.state.message)

        //  错误修改: 直接赋值不管用   React 不是使用的类似于 Vue 中的 Object.defineProperty()
        //  this.state.message = 'xxx'

        //  正确修改: 数据并且视图更新 调用 this.setState() 
        this.setState({
            message: 'Hello, change Message!'
        })
    }
}

const element = <MyComponent />
ReactDOM.render(element, document.getElementById('app'))
```

**this指向问题**

```JSX
class MyComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            message: 'Hello MyComponent'
        }
    }
    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
                {
                    /*
                            未改变this指向行的函数, 会给我们传递一个 event 事件源对象
                            1. this 为 undefined
                            2. 无法传参
                        */
                }
                <button onClick={this.handleClick} >点击改变数据,未改变this指向</button>

                {
                    /*
                            事件绑定函数默认情况下:这里的this是 undefined. 
                            需要在事件绑定这里使用 bind 修改this 指向
                            也给我们传了一个 event 事件源对象
                            可以传递参数
                            1. 可以指定 this
                            2. 支持传递其它参数, 函数中 event 源对象必须是最后一个形参 
                            这样就有个问题了参数位数必须对应
                        */
                }
                <button onClick={this.handleClick.bind(this, 123, 456)} >点击改变数据, 改变了this 指向</button>

                {
                    /*
                            点击 onclick 的时候, 调用了 绑定 this 的箭头函数
                            箭头函数内部的this就是组件实例,
                            所以我们可以直接在调用函数中再调用this.handleClick() 函数 
                            匿名函数没有 event 事件源对象, 我们必需要传递 event 参数 
                            这样写的好处是, 我们还可以传参
                            1. 可以传承
                            2. 可以自己制定传参顺序(第一个是event对象)
                        */
                }
                <button onClick={(e) => {this.handleClick(e, 123, 456)}} >箭头函数点我</button>
            </div>
        )
    }
    handleClick(e, params1, params2) {
        console.log(e.target)
        // console.log(this)
        console.log(params1, params2)
        // console.log(this.state.message)

        this.setState({
            message: 'Hello, change Message!'
        })
    }
}


const element = <MyComponent />
ReactDOM.render(element, document.getElementById('app'))
```



### 11.4 组件传值 props

### 11.5 组件状态 State

### 11.6 组件生命周期

---

## TodoMVC

**react**

- Vue Angular
  - 支持直接管理 DOM 模板
  - 虚拟 DOM 
- 所有拆分组件
  - 利用组件通讯来让他们协同互动
- MVVM 数据驱动视图
- 列表渲染
- 样式处理
- 条件
- 数据绑定
- 组件
  + props
  + 单项数据流
- 表单控件的处理
  + 没有双向数据绑定
  + 必须自己手动来处理表单数据体问题


- 路由

### 12.1 开始

下载模板:

```
git clone https://github.com/tastejs/todomvc-app-template.git --depth=1 todomvc-react
```

安装依赖:

```
cd todomvc-react
npm install
```

安装 `react` 开发环境依赖:

```
npm install --save babel-standalone react react-dom
```



---

## ES6 补充

### map

```javascript
let Arr = [{id:1,name:'小白'},{id:2,name:'无所畏惧'}]
Arr..map(item => item.title)	//	=> ['小白','无所畏惧']
```

### Class

**`class`** 构造函数语法糖

#### 基础语法



#### class 的继承

```javascript
class Parent {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    sayHi() {
        window.alert('hello small girl!')
    }
}
//  使用 extends 关键字 实现对父类的继承
//  不仅可以继承属性, 还可以继承父类的原型的方法
//  这里继承本质是实现 原型式 继承
#	注意: 如果继承了父类, 则必须在子类的构造函数中调用 super 父类构造函数
class Son extends Parent {
    constructor(name, age, gender, id) {
        //  super 就是父类构造函数
        //  借用父类构造函数
        super(name, age, gender)
        this.id = id
    }

    study() {
        console.log(this.name + '在学习!')
    }
}
const p1 = new Parent('老师', 19, 'superGirl')
const s1 = new Son('小白', 18, 'superman', 1888)
console.log(s1)
p1.sayHi()
s1.sayHi()
s1.study()
//  父类没有study 方法. 所以 error
p1.study()
```

