#   HTML-CSS 学习笔记

## 初级篇
-   html    ->  hyperText markup language(超文本标记语言)
### 基础标签
-   根标签  `<html lang="en">`
    +   lang="en" -> en, zh 告诉搜索引擎爬虫, 我们的网站是关于什么内容的
-   结构标签    `<body />` , `<head />`
    +   段落标签   `<p />`  
-   标题标签    `<h1 />` ~ `<h6 />`
-   常用修饰标签 
    +   加粗标签    `<strong />`
    +   斜体标签    `<em />`  
    +   中划线标签  `<del />`   
    +   地址标签    `<address />`  独段展示/斜体
-   容器标签    作用:  结构化/绑定化操作
    +   盒子标签    `<div />`
    +   文本标签    `<span />`  

-   空格/回车   ->  文本分隔符, 会被解析为一个
    +   html 编码 `&xxx;`
        *   `$nbsp;`空格符
        *   `&lt;`  小于符
        *   `&gt;`  大于符  
    +   换行标签    `<br>`
### 高级标签

-   有序列表    `ol>li`
    ```html
    <ol type="" reversed="" start=""> <!--type 值为序列标识符: 1,a,A,i,I ; reversed 倒序排列 ; start 从多少开始排列,值为int-->
        <li>返老还童</li>
        <li>速8</li>
        <li>了不起比尔盖</li>
    </ol>
    ```
-   无序列表    `ul>li`    
    ```html
    <ul type="circle">
        <li>草莓</li>
        <li>苹果</li>
        <li>梨子</li>
    </ul>
    ```
-   图片标签    `<img>`
    +   src 图片位置
        *   网上的url
        *   本地绝对路径
        *   本地相对路径
    +   alt     图片占位符: 代替图片路径出错时所展示的文字
    +   title   图片提示符
-   链接标签   `<a />`  超文本引用, 可以包裹任意形式的东西    
    +   href 链接目标地址
    +   target 打开方式 
        *   _blank 新标签下打开
    ```html
    <!--超链接-->
    <a href="https://www.baidu.com" target="_blank">
    <!--锚点-->
    <a href="#ad_one">
    <!--打电话-->
    <a href="tel:18958815093">
    <!--协议限定符--> 
    <a href="javascript:while(1){alert('让你玩!');}">你敢点我么?</a>   
    ```
- 表单标签    `<form />`  ->  form>xx+xx+..
    +   method  发送数据方式
    +   action  发送目标
    +   子组件  `<input>`
        *   type    文本域类型  ->  test/password/file/submit/...
        *   name    提交标识
        *   value   文本域内容
    ```html
    <form method="" action="">
        <!--文本输入-->
        <input type="text" name="user" value="">
        <!--单选框 checked 默认选择--> 
        <input type="radio" name="render" value="male" checked>
        <input type="radio" name="render" value="female">
        <!--复选框, 没有设置value的复选框提交的值是 on,以[]结尾的多选框是以数组的方式提交值到后端-->
        <input type="checkbox" name="hobby[]" value="">
        <input type="checkbox" name="hobby[]" value="">
        <input type="checkbox" name="hobby[]" value="">
        <input type="checkbox" name="hobby[]" value="">    
        <!--下拉菜单 提交值以value优先 selected 为默认选中值-->  
        <select name="">
            <option value=""></option>            
            <option value=""></option>
            <option value=""></option>            
        </select>    
    </form>
    ```
    > **注意**
    >
    > - 给 form 添加 `novalidate` 属性就可以关闭客户端的自动验证 type 
    > - 给 form添加 `autocomplete="off"` 属性,关闭自动完成(记录历史)功能
    > - 需要上传文件需要给 form 添加 `enctype="multipart/form-data"`

### 基础CSS

>   html    css    javascript
>   结构    样式    行为

-   引入CSS
    +   行间样式    
    ```html
    <div style="width:100px;"></div>
    ```
    +   页面级样式
    ```html
    <style type="text/css">
        #div{width:100px;}
    </style>
    ```
    +   外部样式文件
    ```html
    <link rel="stylesheet" type="text/css" href="demo.css" >
    ```
-   CSS基础选择器  
    +   `#`   id选择器, 唯一
    +   `.`   class选择器
    +   `p`   标签选择器
    +   `*`   通配选择器
    +   `!important` 
    +   `行间样式` 
    +   `[id]` 属性选择器
        *   `[id="only"]`   id属性为only的元素
-   CSS选择器权重
    +   !important     Infinity
    +   行间样式        1000
    +   id选择器        100
    +   class|属性|伪类 10
    +   标签|伪元素     1
    +   通配选择器      0
    > 权重的底层: **256进制**, 并非10个class选择器就能顶上一个id选择器的权重(进位是256)
-   CSS复杂选择器
    +   div span    父子选择器/派生选择器
    +   div>span    直接子元素选择器
    +   div.demo    并列选择器(多个条件选择一个元素)
    +   div, p      分组选择器(多个元素使用相同样式)
    +   :hover      伪类选择器之一, 鼠标移入样式
    > 浏览器底层事实: **自右向左** 的顺序(这样找寻步效率快)
- CSS基础属性
    +   `font-style`    设置字体倾斜
    +   `font-weight`   设置的粗细值取决于字体包中是否有该粗细值
    +   `font-family`   arial  (互联网最常见的字体:乔布斯发明)
    +   `color`         设置字体颜色 
        *   土鳖式(纯英文单词, 仅测试使用)
        *   颜色代码(开发适用: #ff4400 十六进制)
        *   颜色函数(rgb)
    +   `border`        边框
        *   每边可以拆分设置
        *   border-color/border-style/border-width
        *   **transparent** 透明色
        *   使用border绘制三角形
        ```css
        #div{
            width:0px;
            height:0px;
            border-width:100px;
            border-top-color:transparent;
            border-right-color:transparent;
            border-bottom-color:#f40;
            border-left-color:transparent;
        }
        ```
    +   `text-align`    单行文本对齐方式
    + `line-height`   单行文本行高设置

        >  单行文本垂直居中: 文本行高 = 容器高度
    + `text-indent`   文本缩进

        >  em 相对单位 1em = 1 * font-size  
        >  px 相对单位
    +   `text-decoration`
        *   line-through    文本中划线
        *   underline       文本下划线
        *   overline        文本上划线
    +   `cursor`    鼠标样式
        *   pointer         小手
        *   help              帮助
        *   s-resize/...    方向
        *   move            移动 

**基础归纳**
-   元素: **通过display:block/line/inline-block/..修改**
    +   行级元素 feature:
        *   内容决定元素所占位置
        *   不可以通过css改变宽高
        >   span strong em a del
    +   块级元素 feature:
        *   独占一行
        *   可以通过css改变宽高
        >   div p ul li ol form address
    +   行级块元素
        *   内容决定大小
        *   可以设置宽高
        >   带有inline的元素, 都有文字特性(图片的BUG:4px距离)
        >   解决1: 测试的时候使用margin-left:-6px可展现正常效果.
        >   解决*: **把img标签与其它标签之间的空格去掉, 完美解决**
        >   上线前会压缩去掉空格和回车, 无需担心空格问题.
- 企业开发经验
    +   先定义功能 (先写CSS)
    +   后选配功能 (再写HTML)

    >  **公共需求样式整合抽取**, 很适用模块化开发
    >  标签选择器的主要功能: 自定义标签默认样式
    >  通配符标签`*`主要功能:初始化所有标签 ​

------

##  高级篇

### 盒模型
-   组成
    +   盒子壁      border
    +   盒子内容    width + height
    +   内边距      paddding
    +   外边距      margin
    >   可视区宽高计算: border + width/height + padding
    >   border 有个默认的外边距 8px
### 层模型
>   `position` 让特定的元素出现在特定位置

-   absolute    绝对定位
    +   脱离原来的位置进行定位

    >   absolute定位元素相对于最近有定位的父级进行定位, 如果没有, 相对于文档进行定位.
-   relative    相对定位
    +   保留原来位置进行定位
    >   relative定位元素相对于本身原来位置进行定位
- fixed       固定定位

    +   相对文档定位
### 浮动模型
 **`float` 让特定元素浮动(站队排列)**
>   最初使用: 报纸类布局(文字环绕图片)   给img添加浮动即可, 因为文本是可以看到浮动元素的

>   **float 触发的问题**
>   -   浮动元素产生了浮动流. 对后面元素的影响
>       +   块级元素看不到浮动元素
>       +   **产生了bfc的元素和文本类属性的元素(inline)以及文本元素看得到浮动元素**.
>   -   ​父级包裹不住浮动元素
>       +   让最后一个元素清除浮动 clear: botn
>       +   使用 `::after` 清除浮动
>       +   触发 BFC 的父元素元素也可以包裹住 (设置了position和float的元素内部会把元素转换为inline-block)

-   伪元素  `::before` `::after` 天生行级元素
```css
/* 使用伪元素清除浮动 */
clearF::after{
    display: block;
    content: ""; /*修改伪元素内容 */
    clear: both; /*生效条件必须是块级元素*/
}
```
### 必须掌握的小知识点
**居中**
```CSS
#div{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -w/2;
    margin-top: -h/2;
}
```
**两栏布局** 
- 一栏压二栏 

    >   一栏使用 `position:absolute;right:0;`.
- 二栏让出一栏位置

    >   二栏设置 `margin-right:width`, 让出一栏位置, 达到自适应效果

![1540715865877](.\html\1540715865877.png)

**两个经典BUG**
>   **margin塌陷**: 垂直方向的margin, 父与子的位置会同时变化.
```CSS
/*  1.父级使用border 避免问题, 我们一般不会这么选择, 影响页面的布局 */
#div{
    border-top:1px solid transparent;
}
/* 2.通过 改变父级BFC(block format context) 避免问题 
触发一个盒子的bfc, 配合使用, 不出现新的情况下选择使用 */
#div{
    /* position:absolute; */
    /* display:inline-block; */
    /* float:left/right; */
    overflow:hidden;
}
```
>   **margin合并**: margin, 兄弟之间的外边距会合并. 
>   父级触发BFC就可以避免该BUG, 我们选择不避免该问题, 通过数学计算来避免外边距大小问题 



------

## 升华篇

### 文本溢出

-   单行文本处理: 打点
```css
p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```
-   多行文本处理: 截断
```css
/* 显示N行: height = N * line-height */
div{
    height: 40px;
    line-height: 20px;
    overflow: hidden;
}
```

### 背景图片
 `background`
-   background-image    图片路径
-   background-repeat   图片平铺
-   background-position 图片定位
-   background-size     图片大小
  

**图片代替文字: 即使在网络很慢的情况下也可以正常使用网站的功能**
```CSS
/* html部分 */
<a href="https://www.taobao.com" target="_blank">淘宝网</a>

/* css部分 */
a{
    width:190px;
    height:90px;
    background: url('xxx.png') no-repeat cover;
    /* 第一种方式 */
    text-indent: 9999px;
    white-space: nowrap;
    overflow: hidden;
}
a{
    width: 190px;
    height: 0;
    /* 第二种方式: 使用padding-top支撑元素的高度 */
    padding-top: 90px;
    background: url('xxx.png') no-repeat cover;
    overflow: hidden;
}
```

### 补充css知识点
-   图片的文本特性解决方案: **把img标签与其它标签之间的空格去掉, 完美解决**
-   设置了 `position:absolute` 和 `float:left` 的行级元素会 **默认成为行级块元素**
-   文本的对齐机制: 文本基线对齐 **含文本内容的块元素内的文本内容** 和 **元素外的文本内容** 会默认 **基线对齐**
    +   `vertical-align` 可以调整文本对齐方式
---
##  其它
### 编码
-   utf-8   万国码

### 主流浏览器及其内核
- 主流浏览器及其内核
    +   sheel  外观
    +   内核   处理速度

    IE          trident
    Firefox     Gecko
    chrome      Webkit/blink
    Safari      webkit
    Opera       presto

---

## **常用布局小技巧**

### 经典两栏

**使用float实现两栏布局**

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		.box{
			height: 300px;

		}
		.left{
			float: left;
			width: 80px;
			height: 100%;
			background: deeppink;
		}
		.right{
			height: 100%;
			background: pink;
			overflow: hidden;
		}
	</style>
</head>
<body>
    <div class="box">
        <div class="left">经典两栏布局</div>
        <div class="right">经典两栏布局经典两栏布局经典两栏布局经典两栏布局经典两栏布局经典两栏布局经典两栏布局经典两栏布局经典两栏布局经典两栏布局经典两栏布局经典两栏布局</div>
    </div>
</body>
</html>
```

### 页面超出滚动[并且隐藏滚动条]

```less
//	父元素样式
dad{
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: url(../../../static/image/talks_bg4.jpg) no-repeat center/cover;
    son{
        position: absolute;
        top: 0;
        width: calc(100% + 17px);
        right: -17px;
        bottom: 0px;
        overflow-x: hidden;
        overflow-y: scroll;
    }
}
```





---

## less

**安装**

`npm i -g less`

**编译less文件**

`lessc test.less test.css`

**配置自动编译过程(基于webstrom)**

确定全局安装好了 less 并且指定 npm 安装目录的less.cmd文件位置的正确选择. ok即可.

**使用**

### 变量

```less
@width: 10px;
@height: @width + 10px;
@color: #f40;
@bg: #ddd;
#header {
  width: @width;
  height: @height;
}
```

输出：

```css
#header {
  width: 10px;
  height: 20px;
}
```

**选择器**

```less
// Variables
@my-selector: banner;

// Usage
.@{my-selector} {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

编译为：

```css
.banner {
  font-weight: bold;
  line-height: 40px;
  margin: 0 auto;
}
```

### Mixin 混入

**类混入**

```less
.w50 {
  width: 50%;
}
.f_left {
  float: left;
}
.f_right {
  float: right;
}
/*类混入*/
.w50-f_left {
  .w50();
  .f_left();
}
```

**函数混入 √**

```less
/*函数混入*/
/*定义函数*/
.w50() {
  width: 50%;
}
.float(@float: left) {
  float: @float;       
}
/* 定义兼容性的样式函数 */
.borderRadius(@width:100%) {
  border-radius: @width;
  -webkit-border-radius: @width;
  -moz-border-radius: @width;
  -o-border-radius: @width;
  -ms-border-radius: @width;
}
/* 执行函数混入 */
.w50-fl{
  .w50();
  .float(left);
  .borderRadius(100px);
}
```

编译后

```css
.w50-fl {
  width: 50%;
  float: left;
  border-radius: 50px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  -o-border-radius: 50px;
  -ms-border-radius: 50px;
}
```

### 嵌套

Less使您能够使用嵌套代替或与级联结合使用。假设我们有以下CSS：

```css
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

在更多的情况下，我们也可以这样写：

```less
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

### 导入

```less
//	在 main.less 中导入其它的 less 文件
@import 'topBar';
@import 'banner';
```

### 内置函数

**运算**

```javascript
@num: 5;
ul{
    width:100%*@num;
    li{
        width:25%
    }
}
```

**内置函数**

```
color(@string); // 将字符串解析为颜色值
desaturate(@color, 10%); // 饱和度降低 10%
lighten(@color, 10%); // 亮度增加 10%
darken(@color, 10%); // 亮度降低 10%
fade(@color, 50%); // 设定透明度为 50%
abs(number); // 数字的绝对值
round(number, [places: 0]); // 四舍五入取整
sqrt(number); //  计算数字的平方根
pow(@base, @exponent); // * 返回@base的@exponent次方
......
```

```less
@back:#333;
.test{
  border: 1px solid @back*2;
  background: lighten(#000, 10%); /* lighten 亮*/
  color:darken(#000, 10%);
}
```

### 在浏览器上使用less

```html
<head>
    <!--引入less文件-->
    <link rel="stylesheet" type="text/less" href="test.less">
    <!--引入 less.js 插件, 保证浏览器上使用less-->
    <script src="less.js" type="text/javascript"></script>
</head>
```