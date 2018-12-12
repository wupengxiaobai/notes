# 	ECMAScript 6

---

## let 和 const 命令

**let**  定义变量

- 不存在变量提升

- 相同作用域下, 不允许同一变量定义重复定义

- 暂时性死区(TDZ)

  ```javascript
  //	在某一个作用域下定义了变量, 在let之前是不允许使用该变量的
  let a = 10;
  function f() {
      alert(a);	//	error
      let a = 20;	//	作用域中定义了a, 没有该行的情况下, 弹窗10. 因为有了所以报错. a is not undefined
  }
  ```

**const** 定义常量

- 定义了 const 常量, 必须立即赋值
- 常量不允许重新赋值(对象操作是允许的,指针不改变即可)

**块级作用域** `{}`

> **es6 中存在块级作用域.**  es5中只有 function 存在作用域.(外部拿不到内部的变量) 
>
> 块级作用域中使用了 let 或者 const 定义变/常量, 外部是访问不到作用域内部的.
>
> 如此, 我们可以不用在使用自执行函数 `(function() {}())`  **使用  `{}`  代替独立作用域即可.**

- `if () {}`
- `for () {}`  `function() {}`

```javascript
for (var i=0; i<5; i++) {	//	此处 () 可视为全局的一个子作用域, 可以作为 {} 的父作用域
    var i = 1;
    console.log(1); //	正常打印五个1
}
```

**顶层对象**

<u>es6 定义的变量或常量 不属于 window 的属性</u>

---

## 解构赋值(定义变量)

> 解构赋值的时候, 右边的数据有 ` Iterator 接口` 的时候都是允许解构的
>
> **Array** **String** **NodeList** **arguments** **Set** **Map**

### 数组的解构赋值

`let [a, b, c] = [1, 2, 3] `  

```javascript
let [a, b, c] = [1, 2, 3] ;
let [a, b, c] = [1, [1, 2], 3];
let [a, [b, c], d] = [1, [2], 3];	//	没有对应的变量,值是undefined
let [a, [b], c] = [1, [2, 3], 4];	//	(不完全解构) 多了就多了, 无视
```

**默认值**

当右边与之对应的值 **严格是 undefined** 的时候就会使用 默认值

```javascript
let [a = 2] = [undefined];	//	2
let [a = 2] = [null];	//	null
```

当解构的默认值是一个表达式, 且没有必要用到该默认值的时候, 这个表达式是不会执行的(惰性)

```javascript
let x = function() {
    console.log('x函数运行');
    return 1;
};
let [a = x()] = [2];
console.log(a);	//	这里x函数不会运行
//	当然如果使用到了该默认值, x函数是绝对会运行的. 比如右边是 [undefined]
```

默认值的共享

`let [a, b=a] = [1];`

```javascript
//	不允许在解构前面的变量使用解构变量后面的值
let [a=b, b] = [,2]; 	//	error: b is not defined
```

### 对象的解构赋值

`let {a:x, b:y} = {a:1, b:2}` **对象的模式解构, 变量定义在值的位置. 属性只是和右边作属性匹配**

```javascript
//	对象的解构赋值, 变量定义在值的位置, 属性名只起着作属性匹配的中介作用
let {a:x, b:y} = {a:1, b:2};
//	console.log(a);	//error: a is not defined
console.log(x); //	1
//当属性名和变量名相同的时候, 可以简写
let {name: name, age: age} = {name: '小白', age: 18};
let{name, age} = {name: '小白', age: 18}
```

```javascript
//	运用
let ajax = function (mJson) {
    let {
        type = "GET", 
        url, 
        data, 
        async = true
    } = mJson;
    console.log(type, url, data, async);
};
ajax({type: 'POST', url: 'text.php', data: {name: '小白', age: 18}, async: false});
```

### 数组的扩展运算符

**`...` 将数组拆解成以 `,` 隔开的参数列表**

- 参数传递


- 数组拼接
- 复制数组(浅拷贝)
- 类数组 转 数组

```javascript
let arr = [1,2,3];
let f = function(a, b , c) {
    console.log(a);
    console.log(b);
    console.log(c);
}
f(arr);	//	[1,2,3] undefined undefined

//	... 数组扩展运算符
let arr = [1,2,3];
let f = function(a,b,c) {
    console.log(a);
    console.log(b);
    console.log(c);
}
f(...arr);	//	1, 2 ,3

//	数组拼接
let a = [1,2,3];
let b = [4,5,6];
let c = [...a,...b];

//	数组复制(浅拷贝)
let a = [1,2,3]
let b = [...a]
b.push(4);
console.log(a);
console.log(b);

//	类数组 -> 数组
let aP = document.getElementsByTagName('p');
let arrAP = [...aP];
console.log(arrAP);
arrAP.forEach(function (value, index) {
    console.log(value, index)
})

//	借助...计算最大/小值
let arr= [1,2,34,23,352,523];
//	Math.max.apply(Math,arr);
Math.max(...arr);
```

#### rest变量 (剩余参数数组)

```javascript
let [a, ...b] = [1,2,3,24,214];
console.log(a);	//	1
console.log(b);	// [2,3,24,214]	
```



## 扩展

### 字符串的扩展

- 模板字符串 ``
- 包含检测 includes startsWith endsWith
- 重复 repeat
- 补全 padEnd padStart

**模板字符串  ``** 

```javascript
//	模板字符串 ``
//	用于字符串拼接
let [name, age] = ["小白", 18];
let str = `${name} 是一名${age}岁的帅小伙`;
console.log(str);
//	可以换行, 保留空格输出
let str = `<ul>
			<li>${name}</li>
			<li>${age}</li>
		  </ul>`;
```

**`includes()`  `startsWith`   `endsWith()`  检测字符串包含关系, 返回 bool**

```javascript
//	includes() 字符串中是否包含某子字符, 返回 boolean
let str = '小白还是菜鸟';
console.log(str.includes('小白'));	

//	startsWith() 字符串开头是否是某子字符
str.startsWith('小白');

//	endsWith() 字符串结尾是否是某字符
str.endsWith('菜鸟');

//	以上三组方法都可以, 接收第二个参数, 表示从第几位开始
```

**`repeat()` 重复** 

```javascript
let str = '小白';
nowStr = str.repeat(2);	//	小白小白
```

**`padEnd`   `padStart` 补全** 

```javascript
let str = 'ab'.padEnd(5, 'x');	//	从后面补全
let str = 'ab'.padStart(5, 'x');	//	从之前补全
let str ='abcdefg'.padStart(5, 'x');	//	超则原样输出
//	'5'.padStart(2, '0');	//	05
```

### 数值的扩展

- 检测数值是否有限 `Number.isFinite()`
- 检测数值是否是NaN `Number.isNaN()`
- 强制提取数字 `Number.parseInt()` `Number.parseFloat()` 
- 检测是否是整数 `Number.isInterger()`

检测数值是否有限 `Number.isFinite()` 

```javascript
Number.isFinite(6);	//	true
Number.isFinite(Infinity);	//	false
//	不会隐式转换(不会调用number), 只要不是 Number 都是false
```

检测数值是否是NaN `Number.isNaN()`

```javascript
isNaN('5');	//	false
Number.isNaN('5');	//	false

//	Number.isNaN() 只有数值是NaN才会判断是true, 其他都是false
isNaN('小白');	//	true, es5的isNaN() 会进行隐式转换
Number.isNaN('小白');	//	false

//	有表达式会先进行运行, 再进行测试
Number.isNaN(undefined + 1);	//	true
```

强制提取数值 `Number.parseInt()` `Number.parFloat`  

检测是否为整数, 返回布尔值 `Number.isInteger()`

**Math的扩展**

***注意: 与 Number 的方法不相同的是, Math的方法大多数会使用 Number() 来先转换不标准的参数类型.***

- `Math.trunc()` 去除小数部分, 与 `Math.floor()` 再负数处理上有所区别
- `Math.sign()` 判断数值是正数/负数/0
- `Math.cbrt()` 立方根(开三次方) 
- `Math.hypot()` 勾股  或 参数的平方和的平方根

```javascript
//	trunc 和 floor 在负数处理上有所区别
Math.trunc(2.99);	//	2
Math.floor(2.99);	//	2
Math.trunc(-2.99);	//	-2
Math.floor(-2.99);	//	-3
//	sign
Math.sign(-5);	//	-1
Math.sign(5);	//	+1
Math.sign(0);	//	+0
Math.sign(-0);	//	-0
Math.sign('-5爱你');	//	NaN
//	cbrt
Math.cbrt(8);	//	2
//	hypot();
Math.hypot(3, 4);	//	5
Math.hypot(12, 13, 14);		//	22.561028345356956 该三个值的平方和的平方根
```

**指数运算符**

```javascript
let x = 2 ** 3;	//	8 几个2相乘
//	因此多了一个赋值运算符
let y = 2;
y **= 5;	//	32
```

### 数组的扩展

- Array.from() 将类数组转换为数组
- Array.of() 将一组值, 转换为数组
- includes() 检测存不存在某个数据
- fill() 填充数组, 可以指定位置, 返回一个新数组
- find() 找值, 没找到返回 undefined
- findIndex() 找序号, 没找到返回 -1
- copyWithin() 复制数据, 并且填充数组, 改变原数组

```javascript
//	类数组 -> 数组
Array.from() 
//	可以接收第二个值, 用来机进行逐个计算,并且返回新数组
var newA = Array.from([1,2,3], function(value, index){
    return value ** 2;	
})
console.log(newA); 	//	[1,4,9]

//	Array.of()
Array();	//	[]
Array(3);	//	[,,,]
Array(3,11,8);	//	[3,11,8]
Array.of();	//	[]
Array.of(3);	//	[3]
Array.of(3,11,8);	//	[3,11,8]

//includes()	检测是否含有数据,可以判断NaN
[1,2,3].includes(3);	//	true
[NaN,1,2,3].includes(NaN);	//	true

//fill()	填充数组, 可以指定位置, 返回一个新数组
[1,2,3].fill(7);	//	[7,7,7]
[1,2,3].fill(7,0,1);	//	[7,2,3]	

//find()筛选找值, 未找到返回 undefined findIndex() 筛选找值对应的索引未找到返回 -1
var num = [1,2,3,4,5,6].find(function(x){
    return x > 2;
})
console.log(num); 	//	3
var index = [1,2,3,4,5,6].findIndex(function(x){
    return x > 2;
})
console.log(index);	//	2

//copyWithin()
var arr = [1, 2, 3, 4, 5, 6, 7];    //[1,3,4,4,5,6,7]
arr.copyWithin(1, 2, 4);	//	复制第[2,4)索引位数据, 填充第索引为1开始
```



### 函数的扩展

**函数默认值**

***形参独立作用域问题***

***假设给形参加上默认值, 是不会被存在arguments中的.也不会被 f.length算在参数内***

```javascript
function f(a = 3, b = 8) {	//	建议有默认值的参数放在后面
    console.log(a, b);
}
f(5);

//	关于函数形参的独立作用域问题
let x = 10;
function fn(x, y = function(){x++}) {	//	(x, y = function(){x++}) 是外部的子作用域, 也是 之后 {} 的父作用域
    var x = 90;
    y();
    console.log(x);	//	90
}
fn(20);
console.log(x);	//	10

//	假设给形参加上默认值, 是不会被存在arguments中的.也不会被f.length算在参数内
```

#### 函数的默认值与解构(单个)

```javascript
function f([a=3, b]){
    console.log(a + b);
}
f([, 2]);	//	5
//	单个解构,赋值一一对应, 没有则 undefined, 即使用默认值
function f({x, y=5}) {
    console.log(x+y);
}
f({x:2});	//	7

//	解构赋值, 需要有迭代器(Iterator)
function f([a=3, b=5]){
    console.log(a + b);
}
f([]);	//	8
```

**函数中可以给整个参数传默认值**

```javascript
function f({x=4, y=5} = {}) {
    console.log(x+y);
}
f();	//	9
```

**特殊情况, 我们推荐使用这样的整体传参使用** `function f({x=4,y=5} = {}){}`

```javascript
//	在都不传参的情况下, 以下两种结果相同
function a({x,y} = {x:4,y:5}){
    console.log("a",x,y);
}
function b({x=4,y=5} = {}){	//	******
    console.log("b",x, y);
}
a();	//	a 4 5
b();	//	b 4 5

//	如果传递了参数, 则会显示不同的结果
function a({x,y} = {x:4,y:5}){
    console.log("a",x,y);
}
function b({x=4,y=5} = {}){	//	******
    console.log("b",x, y);
}
a({x:3});	//	a 3 undefined
b({x:3});	//	b 3 5

//	又如下
function a({x,y} = {x:4,y:5}){
    console.log("a",x,y);
}
function b({x=4,y=5} = {}){	//	******
    console.log("b",x, y);
}
a({z:3});	//	a undefined undefined
b({z:3});	//	b 4 5
```

#### rest 参数

```javascript
function f(...rest) {
    console.log(rest);
}
f(12,3,12,412,412);	//	(5) [12, 3, 12, 412, 412]	是一个严格的数组
//	我们推荐在es6中使用 rest参数 代替arguments的使用.
```

#### 箭头函数

- 一个参数, () 可省


- 一行 return 代码, {} 可省(隐式return)
- 如果返回一个对象, 添加()
- **`this` 指向定义语法作用域对象(箭头函数内部的this永远指向所在作用域的对象), 不能被call等方法改变. 不适合作事件函数,一般作回调函数**
- 不能当成构造函数
- 没有 `arguments` 对象, 可以使用 `rest` 参数代替
- 不能使用yield命令

```javascript
// 一般使用		
let a = function(x, y) {
	return x + y;
}
//	箭头函数写法
let a = (x,y) => x+y;
//	不止一行代码写法, 必须写 return 否则没有返回值
let a = x => {
    x = 3;
    let h = 1;
    let g = 2;
    return h + g;
}
//	返回对象写法 添加()
let a = (x,y) => ({x,y});	//	{x: 1, y: 2}
//	结合结构写法
let a = ([x,y]) => x+y;
cosnole.log(a([1,2]));	//	3

//	箭头函数this指向定义的语法作用域对象,不能被改变
//	箭头函数适合在回调场合使用
let arr = [12,2,312,412,412,4512512,51];
let b = arr.sort((a,b)=> a-b);
```

### 对象扩展

- 属性简洁表示法
- 属性名表达式
- Object.is()
- Object.assign()
- Object.keys()
- Object.values()
- Object.entries()

**属性的简介表示法**

ES6允许直接写入变量和函数, 作为对象的属性和方法.

```javascript
//	如果属性名和属性值相同的情况下, 可以略写
const foo = 'bar'
//	const obj = {foo: foo}
const obj = {foo}	//	->  obj = {foo: 'bar'}

//	方法也可以简写
const o = {
    method() {
        reurn 'hello world';
    }
}
```

**属性表达式**

JavaScript 定义对象的属性, 有两种方法

```javascript
//	方法一
obj.foo = true;
//	方法二
obj['a'+'bc'] = 123;	//	-> obj['abc'] = 123;

//	es5不允许使用字面量定义属性时传入表达式作为属性名, 只能如下写法
var obj = {
    foo: true,
    abc: 123
}
```

 ES6 允许字面量定义对象时, 使用表达式作为对象的属性名, 即把表达式放在 `[]` 内

```javascript
let propKey = 'foo';
let obj = {
    [propKey]: true,
    ['a'+'bc']: 123,
    //表达式还可以哟来定义方法名
    ['say' + 'Hi']() {
        return 'hi';
    }
}
obj.sayHi();
```

**Object.is()** 

严格判断传入的参数, 返回布尔值, 与 `===` 区别就是可以判断NaN

```javascript
let res = Object.is(NaN, NaN)	//	true
```

**Object.assign()** 合并对象(仅限可枚举属性)

```javascript
//	合并对象, 改变第一个参数对象
let target = {x:1};
let a = {y:2};
let b = {z:3};
let newObj = Object.assign(target, a, b);	//	{x: 1, y: 2, z: 3}
console.log(newObj === target);	//	true

//	另外的一种情况: 遇到相同的属性, 后者覆盖前者. 与传参顺序有关.
let target = {x:1};
let a = {y:2,x:2};
let b = {z:3,x:3};
let newObj = Object.assign(target, a, b);	//	{x: 3, y: 2, z: 3}

//	浅拷贝的作用
let a = {
    x: [1,2,3],
    y: 10
};
let b = Object.assign({}, a);
console.log(b);
//	规则对象深拷贝方法之一
let b = JSON.parse(JSON.stringify(a));

//	使用: 浅拷贝的功能实现
function Amsg(name, age, sex) {
    //this.name = name;
    //this.age = age;
    //this.sex = sex;
	Object.assign(this, {name,age,sex});
}
new Amsg('小白',18,'男');

//	利用assign()浅拷贝功能 在原型链上追加新的属性.
Object.assign(Amsg.prototype, {
    hh: 80,
    sayHi(){
        console.log('hi');
    }
})

//	在原本参数情况下添加一些默认值: 确定传递参数是一个JSON对象的时候, 譬如ajax请求成功回调处理, 添加一些其它默认值
const DEFAULTS  = {
    logLevel: 0,
    outputFormat: 'html'
}
function processContent(options) {
    options = Object.assign({}, DEFAULTS, options);
    console.log(options);
}
```

**Object.keys()  Object.values()  Object.entries()**

`Object.keys`方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

`Object.values`方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

`Object.entries`方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

```javascript
//	Object.keys() 拿到对象属性名集合	ES5
let obj = {
    name: '小白',
    age: 18,
    gender: '男'
}
Object.keys(obj);	//	["name", "age", "gender"]

//	ES6新增  Obeject.values() 拿到对象的值的集合  Object.entries() 拿到对象的属性名和属性值的集合
Object.values(obj);	//	["小白", 18, "男"]
Object.entries(obj);	//	[Array(2), Array(2), Array(2)]	数组的第一位是键, 第二位是值
```

#### 对象扩展运算符

##### 扩展运算符

（ `...` ）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```

这等同于使用 `Object.assign` 方法。

```js
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```

##### 解构赋值

```javascript
let {name, age, gender} = {name:'小白', age:'18', gender:"男"};
//	对象的扩展运算符 + 解构赋值
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

解构赋值必须是最后一个参数，否则会报错。

```js
let { ...x, y, z } = obj; // 句法错误
let { x, ...y, ...z } = obj; // 句法错误
```

注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2
```



## Symbol 数据

 **为啥需要Symbol**

ES5里面对象的属性名都是字符串，如果你需要使用一个别人提供的对象，你对这个对象有哪些属性也不是很清楚，但又想为这个对象新增一些属性，那么你新增的属性名就很可能和原来的属性名发送冲突，显然我们是不希望这种情况发生的。所以，我们需要确保每个属性名都是独一无二的，这样就可以防止属性名的冲突了。因此，**ES6里就引入了Symbol，用它来产生一个独一无二的值。**

**Symbol是什么**

Symbol实际上是ES6引入的一种原始数据类型，除了Symbol，JavaScript还有其他5种数据类型，分别是Undefined、Null、Boolean、String、Number、对象，这5种数据类型都是ES5中就有的。

**怎么生成一个Symbol类型的值**

```javascript
//	我们知道了Symbol是一种原始的数据类型, Symbol值是通过Symbol函数生成的, 如下
let s = Symbol();
console.log(s);	//	Symbol()
console.log(typeof s);	//	symbol
```

Symbol函数不是一个构造函数，前面不能用new操作符。所以Symbol类型的值也不是一个对象，不能添加任何属性，它只是一个类似于字符型的数据类型。

### Symbol函数的参数

**字符串作为参数, 表示对象的描述**

```javascript
let a = Symbol("abc");	//	abc仅仅是 symbol 数据的一个描述
let b = Symbol("abc");
console.log(a === b) //	false;
```

**Symbol 函数的参数是一个对象**

如果Symbol函数的参数是一个对象，就会调用该对象的toString方法，将其转化为一个字符串，然后才生成一个Symbol值。所以，说到底，**Symbol函数的参数只能是字符串**。

**Symbol 值不可以进行运算**

Symbol 值是不能进行运算的,不仅不能和Symbol值进行运算，也不能和其他类型的值进行运算，否则会报错。
Symbol 值可以显式转化为字符串和布尔值，但是不能转为数值。

#### Symbol作属性名

Symbol 就是为对象的属性名而生，那么Symbol值怎么作为对象的属性名呢？有下面几种写法：

```javascript
//	第一种	
let obj = {name:'小白',age:19,gender:'男'};
let sym = Symbol("小白");	//	新增sym	
obj[sym] = '新增的属性';	//	设置sym值				//	*
let sym2 = Symbol("懵宝");	//	新增sym2
obj[sym2] = '新增的属性2';	//	设置sym2		
console.log(obj);
console.log(obj[sym]);	//	新增属性
console.log(obj[sym2]);	//	新增属性2

//	第二种
let sym = Symbol('懵宝');
let obj = {
    name: '小白',
    [sym] = 'mySymbol'							//	*
}

//	第三种
let a = {};
let s4 = Symbol('懵宝');
Object. (a, s4, {value: 'mySymbol'});//	*
console.log(a);	//	{Symbol(懵宝): "mySymbol"}
console.log(a[s4]);	//  mySymbol
console.log(a.s4);  //  undefined
a.s4 = 's4';
console.log(a['s4']);  // s4
console.log(a.s4);  //  s4
```

1. 使用对象的Symbol值作为属性名时，获取相应的属性值不能用点运算符, 也不能用['']方式获取
2. 在对象内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中。

### Symbol 值作为属性名的遍历

使用 for...in 和 for...of 都无法遍历到Symbol值的属性，Symbol值作为对象的属性名，也无法通过 Object.keys() Object.getOwnPropertyNames() 来获取。

我们可以使用  **`Object.getOwnPropertySymbols()`**  方法获取一个对象上的 Symbol 属性名。

也可以使用 **`Reflect.ownKeys()`** 返回所有类型的属性名，包括常规属性名和 Symbol 属性名。

```javascript
let sym = Symbol('懵宝');
let sym2 = Symbol('小白');
let obj = {
    name: '小白',
    gender: '男',
    [sym]: '懵宝',
    [sym2]: '小白'
}
//	使用 Object.getOwnPropertySymbols(obj) 获取 Symbol 属性
console.log(Object.getOwnPropertySymbols(obj));	//	[Symbol(懵宝), Symbol(小白)]

//	使用 Reflect.ownKeys() 返回所有类型的属性名
console.log(Reflect.ownKeys(obj));	//	["name", "gender", Symbol(懵宝), Symbol(小白)]
```

利用Symbol值作为对象属性的名称时，不会被常规方法遍历到这一特性，可以为对象定义一些非私有的但是又希望只有内部可用的方法。

### Symbol.for() 和 Symbol.keyFor()

Symbol.for()函数也可以用来生成Symbol值，但该函数有一个特殊的用处，就是可以重复使用一个Symbol值。

```javascript
let s1 = Symbol.for("s11");
let s2 = Symbol.for("s11");

console.log(s1===s2);	//true

let s3 = Symbol("s33");
let s4 = Symbol("s33");

console.log(s3===s4);	//false

console.log(Symbol.keyFor(s3));	//undefined
console.log(Symbol.keyFor(s2));	//"s22"
console.log(Symbol.keyFor(s1));	//"s11"
```

**Symbol.for() **函数要接受一个字符串作为参数，先搜索有没有以该参数作为名称的Symbol值，如果有，就直接返回这个Symbol值，否则就新建并返回一个以该字符串为名称的 Symbol 值。

**Symbol.keyFor() **函数是用来查找一个Symbol值的登记信息的，Symbol()写法没有登记机制，所以返回undefined；而Symbol.for() 函数会将生成的Symbol值登记在全局环境中，所以Symbol.keyFor()函数可以查找到用Symbol.for()函数生成的Symbol值。

### 内置Symbol值

ES6提供了11个内置的Symbol值，分别是Symbol.hasInstance 、Symbol.isConcatSpreadable 、Symbol.species 、Symbol.match 、Symbol.replace 、Symbol.search 、Symbol.split 、Symbol.iterator 、Symbol.toPrimitive 、Symbol.toStringTag 、Symbol.unscopables 等。

> http://es6.ruanyifeng.com/#docs/symbol



## Set Map 数据结构

### Set

ES6 提供了新的数据结构 Set。它类似于数组，但是**成员的值都是唯一**的，没有重复的值。

Set 本身是一个构造函数，用来生成 Set 数据结构。

```javascript
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);	// 2 3 5 4
}
//通过 add 方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。
```

Set 函数可以接受一个数组作为参数，用来初始化。

```javascript
// 例一	去重
let fn = function () {}
const set = new Set([1, 2, 3, 4, 4, '1', '4', fn, fn, function () {}, function () {}]);
console.log([...set]); //   [1, 2, 3, 4, "1", "4", ƒ, ƒ, ƒ]

// 例二    Set数据结构存在 size 属性
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(items.size); // 5

// 例三   
function divs() {
    return [...document.querySelectorAll('div')];
}
const set = new Set(divs());
console.log(set);   //  Set(5) {div, div, div, div, div}
console.log(set.size);  // 5

//	例四
const set = new Set();
divs().forEach(div => set.add(div));
set.size // 5
```

**数组去重**

```javascript
let arr = [1, 224, 12, 421, 4, 21, 12, 121, 31, 312, 41221, 312, 12, 321, 32, 12, 13, 112];
console.log([...new Set(arr)]);	//	(14) [1, 224, 12, 421, 4, 21, 121, 31, 312, 41221, 321, 32, 13, 112]
```

1. 向 Set 加入值的时候，不会发生类型转换，所以`5`和`"5"`是两个不同的值。
2. Set 内部判断两个值是否不同，使用的算法叫做“Same-value equality”，它类似于精确相等运算符（`===`），主要的区别是`NaN`等于自身，而精确相等运算符认为`NaN`不等于自身。

**注意**：两个对象总是不相等的。

#### Set 结构的实例有以下属性：

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
- `Set.prototype.size`：返回`Set`实例的成员总数。

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

#### 四个操作方法：

- `add(value)`：添加某个值，返回 Set 结构本身。
- `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `clear()`：清除所有成员，没有返回值。

#### Array.from()可以将 Set 结构转为数组。

```js
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);	//	[1, 2, 3, 4, 5]
```

#### 遍历操作

Set 结构的实例有四个遍历方法，可以用于遍历成员。

- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员

 **keys()，values()，entries()**

`keys` 方法、`values` 方法、`entries ` 方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以 `keys ` 方法和 `values` 方法的行为完全一致。配合 `for of`

```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的 `values` 方法。

**forEach()**

Set 结构的实例与数组一样，也拥有 `forEach` 方法，用于对每个成员执行某种操作，没有返回值。

```js
//	set.forEach(func, this)
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

`forEach ` 方法还可以有第二个参数，表示绑定处理函数内部的 `this` 对象。

### WeakSet

**含义**

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别：

1. WeakSet 的成员只能是对象，而不能是其他类型的值。
2. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

**用法跟set差不多**

```js
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}

//下面的写法不行
const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
```

WeakSet 结构有以下三个方法。

- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

WeakSet 没有 `size` 属性，没有办法遍历它的成员。

### Map

**含义和基本用法**

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

```javascript
//	Map 基本操作
const m = new Map();
const o = {p: 'Hello World'};
//	一个对象作为键名
m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

```javascript
//	另种传值的方式
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

```javascript
const map = new Map();
const a = [];
map.set(a, 555);
map.set(a, 666);
map.get(a);	// 666

//	只对同一个对象的引用, Map结构才将其视为同一个键.
const map = new Map();
map.set([], 555);
map.set([], 666);
console.log(map.get([]));	//undefined
console.log(map);   //  Map(2) {Array(0) => 555, Array(0) => 666}
```

如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如`0`和`-0`就是一个键，布尔值 `true` 和字符串  `true`  则是两个不同的键。另外， `undefined` 和 `null` 也是两个不同的键。虽然 `NaN` 不严格相等于自身，但 Map 将其视为同一个键。

#### 实例的属性和操作方法

1. size属性		返回成员总数
2. set(key,value)       设置键值对，返回Map结构
3. get(key)          读取key对应的值，找不到就是undefined
4. has(key)         返回布尔值，表示key是否在Map中
5. delete(key)    删除某个键，返回true，失败返回false
6. clear()             清空所有成员，没有返回值

#### 遍历方法

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

- `keys()`：返回键名的遍历器。
- `values()`：返回键值的遍历器。
- `entries()`：返回所有成员的遍历器。
- `forEach()`：遍历 Map 的所有成员。

需要特别注意的是，Map 的遍历顺序就是插入顺序。遍历行为基本与set的一致。

#### 与其他数据结构的互相转换

##### Map 转为数组

```js
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
```

##### 数组 转为 Map

```js
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```

##### Map 转为对象

如果所有 Map 的键都是字符串，它可以转为对象。

```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

##### **对象转为 Map**

```js
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```

##### **Map 转为 JSON**

Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

```js
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'

```

另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

```js
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'

```

##### **JSON 转为 Map**

JSON 转为 Map，正常情况下，所有键名都是字符串。

```js
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}

```

但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是数组转为 JSON 的逆操作。

```js
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

### WeakMap

#### 含义

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。

`WeakMap`与`Map`的区别有两点：

1. `WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。
2. `WeakMap`的键名所指向的对象，不计入垃圾回收机制。

> **WeakMap**的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。

```js
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
//e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。
//一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。
```

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。

```js
const wm = new WeakMap();
const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"
```

 **WeakMap 的语法**

`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

无法被遍历，因为没有size。无法被清空，因为没有clear()，跟WeakSet相似。

**WeakMap 应用的典型**

```js
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);
```

上面代码中，`myElement`是一个 DOM 节点，每当发生`click`事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是`myElement`。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。



## Iterator 

**概念**

迭代器是一种接口、是一种机制。

为各种不同的数据结构提供统一的访问机制。**任何数据结构只要部署 Iterator 接口，就可以完成遍历操作**（即依次处理该数据结构的所有成员）。

Iterator 的作用有三个：

1. 为各种数据结构，提供一个**统一的、简便的访问接口**；
2. 使得数据结构的成员能够**按某种次序排列**；
3. 主要供 **`for...of`** 消费。

**Iterator本质上，就是一个指针对象。**

过程是这样的：

（1）创建一个指针对象，指向当前数据结构的起始位置。

（2）第一次调用指针对象的 `next` 方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的 `next` 方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的 `next ` 方法，直到它指向数据结构的结束位置。

**原生具备 Iterator 接口的数据结构如下:**

- Array
- Map
- Set
- String
- 函数的 arguments 对象
- NodeList 对象

下面的例子是数组的 `Symbol.iterator` 属性。

```javascript
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

下面例子是 String 使用 `for of`  遍历(String 本身携带Iterator)

```javascript
//	字符串是一个类似数组的对象，也原生具有 Iterator 接口。
let str = "小白真帅.";
console.log(typeof str[Symbol.iterator]);	// "function"
//	字符串的iterator方法执行
var iterator = str[Symbol.iterator]();
console.log(iterator.next());  // {value: "小", done: false}
console.log(iterator.next());  // {value: "白", done: false}
console.log(iterator.next());  // {value: "真", done: false}
console.log(iterator.next());  // {value: "帅", done: false}
console.log(iterator.next());  // {value: ".", done: false}
console.log(iterator.next());  // {value: undefined, done: true}
```

下面是一个类似数组的对象调用数组的 `Symbol.iterator` 方法的例子。

```js
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]//	类数组调用数组的 Symbol.iterator 实现iterator的增添
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}
```

注意，普通对象部署数组的 `Symbol.iterator ` 方法，并无效果。

```js
let iterable = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // undefined, undefined, undefined
}
```

下面是一种普通对象模拟实现 Iterator 接口的方法

```javascript
let obj = {
    a: 'a',
  	b: 'b',
  	c: 'c',
  	length: 3,
    [Symbol.iterator]: function () {
        let arr = [];
        let index = 0;
        let length;
        for (var key in this) {
            arr.push(this[key]);
        }
        length = arr.length;
        return {
            next: function () {
                let done = index >= length;
                return {
                    value: arr[index++],
                    done: done
                }
            }
        }
    }
};
for (let item of obj) {
  console.log(item); // 'a', 'b', 'c'
}
```

普通对象实现 `Iterator ` 接口, 实现 `解构赋值` 和 `for of` 遍历

```javascript
let obj = {
    "name" : "乌拉",
    "age" : 15
};
//	Object.entries() 实现对象->数组 数组本身携带 Iterator 接口
for (let [key,value] of Object.entries(obj)) {
    console.log(key,value);
}
//	给数组装配 迭代函数并执行
let arrN = temp[Symbol.iterator]();
console.log(arrN.next());	//	{value: Array(2), done: false}
console.log(arrN.next());	//	{value: Array(2), done: false}
console.log(arrN.next());	//	{value: undefined, done: true}
```



## Generator 迭代

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

### 跟普通函数的区别

1. `function` 关键字与函数名之间有一个星号；
2. 函数体内部使用 `yield` 表达式，定义不同的内部状态。
3. Generator函数不能跟new一起使用，会报错。

```javascript
function* helloWorldGenerator() {
	yield 'hello';
	yield 'world';
	return 'ending';
}
let hw = helloWorldGenerator();
```

上面代码定义了一个 Generator 函数 `helloWorldGenerator`，它内部有两个 `yield` 表达式（ `hello` 和 `world` ），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象。

下一步，必须调用遍历器对象的 `next` 方法，使得指针移向下一个状态。也就是说，每次调用 `next` 方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`表达式（或 `return` 语句）为止。换言之，Generator 函数是分段执行的，**`yield` 表达式是暂停执行的标记，而 `next` 方法可以恢复执行**

> ES6 没有规定，`function`关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

```javascript
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
obj = {
    *foo() {},
    foo2: function*() {}
}
```

### yield 表达式

```javascript
/*	//	普通函数实现回调地狱
function f() {
    file1.onload = function() {
        //code...
        file2.onload = function() {
            //code...
            file3.onload = function() {
                //....
            }
        }
    }
}
*/

// generator 函数实现
function* f() {
    console.log('第一次next!');
    yield 1;
    console.log('第二次next!');
    yield 2;
    console.log('第三次next!');
    yield 3;
    console.log('第四次next!');
    yield 4;
    console.log('第五次next!');
    yield 5;
    console.log('第六次next!');
}
let fn = f();
//	调用执行由自行决定
fn.next();
fn.next();
fn.next();
fn.next();
fn.next();
fn.next();
```

由于 Generator 函数返回的遍历器对象，只有调用 `next` 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。**`yield ` 表达式就是暂停标志**。

遍历器对象的 `next ` 方法的运行逻辑如下。

**（1）遇到 `yield` 表达式，就暂停执行后面的操作，并将紧跟在 `yield` 后面的那个表达式的值，作为返回的对象的 `value` 属性值。**

**（2）下一次调用 `next` 方法时，再继续往下执行，直到遇到下一个 `yield` 表达式。**

**（3）如果没有再遇到新的 `yield` 表达式，就一直运行到函数结束，直到 `return` 语句为止，并将 `return` 语句后面的表达式的值，作为返回的对象的 `value` 属性值。**

**（4）如果该函数没有 `return` 语句，则返回的对象的 `value` 属性值为 `undefined`。**

**`yield ` 表达式与 `return` 语句既有相似之处**

都能返回紧跟在语句后面的那个表达式的值。

**不同之处**

每次遇到 `yield`，函数暂停执行，下一次再从该位置继续向后执行，而 `return` 语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）`return` 语句，但是可以执行多次（或者说多个）`yield` 表达式。正常函数只能返回一个值，因为只能执行一次 `return` ; Generator 函数可以返回一系列的值，因为可以有任意多个 `yield`。

**注意：**

`yield` 表达式只能用在 Generator 函数里面，用在其他地方都会报错。

另外，`yield` 表达式如果用在另一个表达式之中，必须放在圆括号里面。

```js
console.log('Hello' + yield 123); // SyntaxError
console.log('Hello' + (yield 123)); // OK
```

### return()

Generator 函数返回的遍历器对象，还有一个 `return` 方法，可以返回给定的值，并且终结遍历 Generator 函数。

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
var g = gen();
g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

### next 方法的参数

`yield ` 表达式本身没有返回值，或者说总是返回 `undefined` 。**`next` 方法可以带一个参数，该参数就会被当作上一个`yield` 表达式的返回值。**

```js
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```

这个功能有很重要的语法意义。

Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过`next`方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。

```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }			y = 2 * 12
b.next(12) // { value:8, done:false }		z = 13
b.next(13) // { value:42, done:true }		x = 5
```

### for...of 循环

`for...of`循环可以自动遍历 Generator 函数时生成的`Iterator`对象，且此时不再需要调用`next`方法。

```js
function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

```js
function* fibonacci() {
  let [prev, curr] = [1, 1];
  while(true){
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  if (n > 10000000) break;
  console.log(n);
}

```

### yield*

如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。

```js
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  foo();
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "y"
```

`foo`和`bar`都是 Generator 函数，在`bar`里面调用`foo`，是不会有效果的。

这个就需要用到`yield*`表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。

```js
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

再来看一个对比的例子。

```js
function* inner() {
  yield 'hello!';
}

function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}

var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象
gen.next().value // "close"

function* outer2() {
  yield 'open'
  yield* inner()
  yield 'close'
}

var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"
gen.next().value // "close"

```

上面例子中，`outer2`使用了`yield*`，`outer1`没使用。结果就是，`outer1`返回一个遍历器对象，`outer2`返回该遍历器对象的内部值。

从语法角度看，如果`yield`表达式后面跟的是一个遍历器对象，需要在`yield`表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为`yield*`表达式。



## proxy 代理

### 概述

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

```javascript
let obj = {
    name: "懵宝",
    age: 18
}
//	使用代理进行拦截操作.	参数一 被代理对象 参数二 处理器
let proxyOfObj = new Proxy(obj, {
    get(target, key, pro) { //	target 拦截对象, key 拦截的值, pro 代理本身
        //	console.log("拦截了取值操作");
        return 'get return' + target[key];
    },
    set(target, key, value, pro) {
        if (key == 'name') {
            target[key] = value + '小伙很帅!';
        } else {
            target[key] = value;
        }
    }
});
proxyOfObj.name = '懵宝';
console.log(proxyOfObj.name);
```

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

```js
let proxy = new Proxy(target, handler);
```

Proxy 对象的所有用法，都是上面这种形式，不同的只是`handler`参数的写法。其中，`new Proxy()`表示生成一个`Proxy`实例，`target`参数表示所要拦截的目标对象，`handler`参数也是一个对象，用来定制拦截行为。

```js
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

如果 `handler` 没有设置任何拦截，那就等同于直接通向原对象。

```js
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```

上面代码中，`handler`是一个空对象，没有任何拦截效果，访问`proxy`就等同于访问`target`。

同一个拦截器函数，可以设置拦截多个操作。

对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。

**下面是 Proxy 支持的拦截操作一览，一共 13 种:**

- **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
- **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
- **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。
- **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
- **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
- **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
- **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
- **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
- **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。

例如：

`deleteProperty`方法用于拦截`delete`操作，如果这个方法抛出错误或者返回`false`，当前属性就无法被`delete`命令删除。

`apply`方法拦截函数的调用、`call`和`apply`操作。

`get`方法用于拦截某个属性的读取操作。

```js
let obj2 = new Proxy(obj,{
  get(target, propKey, receiver){
    console.log(`当前访问对象属性次数为：${propKey}`)
    return target[propKey]
  },
  deleteProperty(target, property){
    return false;
  },
  apply(target, ctx, args){
    return Reflect.apply(...[target,[],args]);;
  }
})
```

### Proxy.revocable()

`Proxy.revocable`方法返回一个可取消的 Proxy 实例。

```js
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```

`Proxy.revocable`方法返回一个对象，该对象的`proxy`属性是`Proxy`实例，`revoke`属性是一个函数，可以取消`Proxy`实例。上面代码中，当执行`revoke`函数之后，再访问`Proxy`实例，就会抛出一个错误。

`Proxy.revocable`的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

### this 问题

 虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的`this`关键字会指向 Proxy 代理。

```js
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true
//一旦proxy代理target.m，后者内部的this就是指向proxy，而不是target。
```



## Reflect

### 概述

`Reflect ` 对象与 `Proxy` 对象一样，也是 ES6 为了操作对象而提供的新 API。

### 设计目的

1. 将 `Object` 对象的一些明显属于语言内部的方法（比如 `Object.defineProperty `），放到 `Reflect` 对象上。现阶段，某些方法同时在 `Object ` 和 `Reflect` 对象上部署，未来的新方法将只部署在 `Reflect` 对象上。

2. 修改某些 `Object` 方法的返回结果，让其变得更合理。

   比如，`Object.defineProperty(obj, name, desc)  ` 在无法定义属性时，会抛出一个错误，而 `Reflect.defineProperty(obj, name, desc)` 则会返回`false`。

3. 让 `Object ` 操作都变成函数行为。某些 `Object` 操作是命令式，比如 `name in obj` 和 `delete obj[name]` ，而`Reflect.has(obj, name)` 和 `Reflect.deleteProperty(obj, name)` 让它们变成了函数行为。

4.  `Reflect `对象的方法与 `Proxy` 对象的方法一一对应，只要是 `Proxy` 对象的方法，就能在 `Reflect` 对象上找到对应的方法。这就让 `Proxy` 对象可以方便地调用对应的 `Reflect` 方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy` 怎么修改默认行为，你总可以在 `Reflect` 上获取默认行为。




## Promise 异步编程

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

所 `Promise` ，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

**特点**

1. 对象的状态不受外界影响。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

**状态**

`Promise` 对象代表一个异步操作，有三种状态：

`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。

只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

**缺点**

1. 无法取消 `Promise `，一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，`Promise` 内部抛出的错误，不会反应到外部。
3. 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

> 注意，为了行文方便，本章后面的 **resolved** 统一只指 **fulfilled** 状态，不包含 **rejected** 状态。

写js必然不会对异步事件陌生。

```js
settimeout(()=>{
  console.log("123");
},0)

console.log("abc");
//先输出谁？
```

如果abc需要在123执行结束后再输出怎么办？

当然，可以使用callback，但是callback使用起来是一件很让人绝望的事情。

```javascript
setTimeout(() => {
    console.log('123');
    setTimeout(() => {
        console.log('abc');
        setTimeout(() => {
            //......
        })
    },0)
},0)
```

> 这时：Promise这个为异步编程而生的对象站了出来....

```javascript
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    },0)
})
    .then(data => {	//	then() 第一个回调是成功的回调
        console.log(data);
        return 123;	//	return 的是作为一个全新的 Promise 给下一个 then 接收 
        //	如果 return 的不是一个 promise 对象, 会隐式调用 promise 中的 Promise.resolve() 方法
        //	return Promise.resolve(123); 供下一个 .then() 的参数进行后续操作.	
    })
    .then(data => {
        console.log(data);
        return Promise.reject('then2 error');	//	此阶段直接 return 一个失败, 会被 catch() 接收
    })
    //.then() ....
    .catch(error => {	//	catch() 捕获错误
        console.log(error);    
    })
```

这时候你应该有两个疑问：1.包装这么一个函数有什么用？ 2.resolve('123');这是做什么的？

`Promise` 实例生成以后，可以用 `then` 方法分别指定 `resolved` 状态和 `rejected` 状态的回调函数。

也就是说，状态由实例化时的参数（函数）执行来决定的，根据不同的状态，看看需要走then的第一个参数还是第二个。

**resolve() 和 reject() 的参数会传递到对应的回调函数的data或err**

> then返回的是一个新的Promise实例，也就是说可以继续then

### 链式操作的用法

所以，从表面上看，Promise 只是能够简化层层回调的写法，而实质上，Promise 的精髓是“状态”，用维护状态、传递状态的方式来使得回调函数能够及时调用，它比传递 callback 函数要简单、灵活的多。所以使用 Promise 的正确场景是这样的：

```js
function runAsync1(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;            
}
function runAsync2(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务2执行完成');
            resolve('随便什么数据2');
        }, 2000);
    });
    return p;            
}
function runAsync3(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务3执行完成');
            resolve('随便什么数据3');
        }, 2000);
    });
    return p;            
}
//---------------------------------------------
runAsync1()
    .then(function(data){	
        console.log(data);	
        return runAsync2();
    })
    .then(function(data){	
        console.log(data);	
        return runAsync3();
    })
    .then(function(data){	
        console.log(data);	
    });
    //异步任务1执行完成
    //随便什么数据1
    //异步任务2执行完成
    //随便什么数据2
    //异步任务3执行完成
    //随便什么数据3
```

在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中也可以接收到数据：

```js
runAsync1()
    .then(function(data){
        console.log(data);
        return runAsync2();
    })
    .then(function(data){
        console.log(data);
        return '直接返回数据';  //这里直接返回数据
    })
    .then(function(data){
        console.log(data);
    });
//异步任务1执行完成
//随便什么数据1
//异步任务2执行完成
//随便什么数据2
//直接返回数据
```

**reject的用法**

前面的例子都是只有“执行成功”的回调，还没有“失败”的情况，reject的作用就是把Promise的状态置为rejected，这样我们在then中就能捕捉到，然后执行“失败”情况的回调。

```js
let num = 10;
let p1 = function() {
   	return new Promise((resolve,reject)=>{
      if (num <= 5) {
        resolve("<=5，走resolce")
        console.log('resolce不能结束Promise')
      }else{
        reject(">5，走reject")
        console.log('reject不能结束Promise')
      }
    }) 
}

p1()
  .then(function(data){
    console.log(data)
  },function(err){
    console.log(err)
  })
//reject不能结束Promise
//>5，走reject
```

resolve和reject永远会在当前环境的最后执行，所以后面的同步代码会先执行。

如果resolve和reject之后还有代码需要执行，最好放在then里。

然后在resolve和reject前面写上return。

### Promise.prototype.catch()

`Promise.prototype.catch` 方法是 `.then(null, rejection)` 的别名，用于指定发生错误时的回调函数。

```js
p1()
  .then(function(data){
    console.log(data)
  })
  .catch(function(err){	//	只要走了reject() 当 then() 未指定 err 回调的时候就会统一走 catch() 一般我们不会写 err 回调, 在最后写 catch()
  	console.log(err)
  })
//	reject不能结束Promise
//	>5，走reject 	
```

### Promise.all()

`Promise.all ` 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。**整体**

```js
const p = Promise.all([p1, p2, p3]);
```

`p` 的状态由 `p1` 、  `p2` 、 `p3` 决定，分成两种情况。

1. 只有 `p1` 、 `p2` 、 `p3` 的状态都变成 `fulfilled` ， `p` 的状态才会变成 `fulfilled` 。 此时 `p1` 、 `p2` 、 `p3` 的返回值组成一个数组，传递给 `p` 的回调函数。
2. 只要 `p1` 、 `p2` 、 `p3` 之中有一个被 `rejected` ，`p` 的状态就变成 `rejected`，此时第一个被 `reject` 的实例的返回值，会传递给 `p` 的回调函数。

`promises` 是包含 3 个 Promise 实例的数组，只有这 3 个实例的状态都变成 `fulfilled`，或者其中有一个变为 `rejected`，才会调用 `Promise.all` 方法后面的回调函数。

如果作为参数的 Promise 实例，自己定义了 `catch` 方法，那么它一旦被 `rejected`，并不会触发 `Promise.all()` 的 `catch` 方法，如果没有参数没有定义自己的 catch，就会调用 `Promise.all()` 的 `catch` 方法。

### Promise.race()

`Promise.race ` 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。**竞速**

```js
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要 `p1`、`p2`、`p3 ` 之中有一个实例率先改变状态，`p` 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 `p `的回调函数。

### Promise.resolve()

有时需要将现有对象转为 Promise 对象，`Promise.resolve` 方法就起到这个作用。

```js
const jsPromise = Promise.resolve('123');
```

上面代码将123转为一个 Promise 对象。

`Promise.resolve` 等价于下面的写法。

```js
Promise.resolve('123')
// 等价于
new Promise(resolve => resolve('123'))
```

`Promise.resolve` 方法的参数分成四种情况。

1. **参数是一个 Promise 实例**

   如果参数是 Promise 实例，那么 `Promise.resolve` 将不做任何修改、原封不动地返回这个实例。

2. **参数是一个thenable对象**

   `thenable` 对象指的是具有 `then` 方法的对象，比如下面这个对象。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   ```

   `Promise.resolve `方法会将这个对象转为 Promise 对象，然后就立即执行 `thenable` 对象的 `then` 方法。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };

   let p1 = Promise.resolve(thenable);
   p1.then(function(value) {
     console.log(value);  // 42
   });

   ```

   上面代码中，`thenable` 对象的 `then` 方法执行后，对象 `p1` 的状态就变为 `resolved` ，从而立即执行最后那个 `then` 方法指定的回调函数，输出 42。

3. **参数不是具有then方法的对象，或根本就不是对象**

   如果参数是一个原始值，或者是一个不具有 `then` 方法的对象，则 `Promise.resolve` 方法返回一个新的 Promise 对象，状态为 `resolved`。

   ```js
   const p = Promise.resolve('Hello');

   p.then(function (s){
     console.log(s)
   });
   // Hello
   ```

   上面代码生成一个新的 Promise 对象的实例 `p`。由于字符串 `Hello` 不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是 `resolved`，所以回调函数会立即执行。`Promise.resolve `方法的参数，会同时传给回调函数。

4. **不带有任何参数**

   `Promise.resolve `方法允许调用时不带参数，直接返回一个 `resolved` 状态的 Promise 对象。

   所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用 `Promise.resolve` 方法。

   ```js
   const p = Promise.resolve();

   p.then(function () {
     // ...
   });
   ```

   上面代码的变量  `p` 就是一个 Promise 对象。

   需要注意的是，立即 `resolve` 的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

   ```js
   setTimeout(function () {
     console.log('three');
   }, 0);

   Promise.resolve().then(function () {
     console.log('two');
   });

   console.log('one');

   // one
   // two
   // three
   ```

   上面代码中，`setTimeout(fn, 0) `在下一轮“事件循环”开始时执行，`Promise.resolve()` 在本轮“事件循环”结束时执行，`console.log('one')` 则是立即执行，因此最先输出。

### Promise.reject()

`Promise.reject(reason)` 方法也会返回一个新的 Promise 实例，该实例的状态为 `rejected`。

```js
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

上面代码生成一个 Promise 对象的实例 `p`，状态为 `rejected`，回调函数会立即执行。

注意，`Promise.reject()` 方法的参数，会原封不动地作为 `reject` 的理由，变成后续方法的参数。这一点与 `Promise.resolve`方法不一致。

```js
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
```

上面代码中，`Promise.reject` 方法的参数是一个 `thenable` 对象，执行以后，后面 `catch` 方法的参数不是 `reject` 抛出的“出错了”这个字符串，而是 `thenable` 对象。

### Promise.nextTick()

```javascript
new Promise(fn1)
	.then(fn2)
Promise.nextTick(fn3)
//	Promise.nextTice() 永远是在 then() 之前执行的一个Promise方法
```



## async 异步编程

**ES2017(ES8) 标准引入了 async 函数, 使得异步操作更加方便.**

async 函数是 Generator 函数的语法糖

> 什么是语法糖？
>
> 意指那些没有给计算机语言添加新功能，而只是对人类来说更“甜蜜”的语法。语法糖往往给程序员提供了更实用的编码方式，有益于更好的编码风格，更易读。不过其并没有给语言添加什么新东西。
>
> 反向还有语法盐：
>
> 主要目的是通过反人类的语法，让你更痛苦的写代码，虽然同样能达到避免代码书写错误的效果，但是编程效率很低，毕竟提高了语法学习门槛，让人齁到忧伤。。。

`async`  函数使用时就是将 Generator 函数的星号（`*`）替换成 `async`，将 `yield` 替换成`await`，仅此而已。

`async`   函数对 Generator 函数的区别：

1. 内置执行器

   Generator 函数的执行必须依靠执行器, 但是 `async`  函数的执行, 与普通函数一模一样, 只要一行

2.  更好语法

   `async` 和 `await` 语义更加清楚. `async` 表示函数里有异步操作, **`await` 表示紧跟后面的表达式需要等待结果**.

3. **正常情况下, `await` 命令后面是一个 Promise 对象. 如果不是, 会被转换成立即 `resolve` 的 Promise 对象.**

4. **返回值是 Promise**

`async` 函数的返回值是 Promise 对象, 这比 Generator 函数的返回值是 Iterator 对象方便很多, 可以使用 `then` 进行下一步操作. 进一步说 `async` 函数完全可以看作多个异步操作, 包装成了一个 Promise 对象, 而 `await` 命令就是内部 `then` 命令的语法糖

### 错误处理

如果 `await` 后面的异步操作出错, 等同于 `async` 函数返回的 Promise 对象被 `reject`

```javascript
async function f() {
    await new Promise((resolve, reject) => {
        throw new Error('出错');
    });
}

f()
    .then(data => {
    	console.log(data)
	})
    .catch(err => {
    	console.log(err)
	})
```

上述代码中, `async` 函数 f 执行后, `await` 后面的 Promise 对象会抛出一个错误对象, 导致 `catch` 方法的回调函数被执行, 它的参数就是抛出的错误对象. 

防止出错的方法, 也是将其放在 `try{}catch(){}` 代码块中.

```javascript
async function f() {
    try {
        await new Promise((resolve, reject) => {
            throw new Error('粗错了');
        })
    } catch(e) {
    }
    return await('hello world');
}
```

如果有多个 `await` 命令, 可以统一放在 try...catch 结构中.

```javascript
async function main() {
    try {
    	const val1 = await firstStep();
        const val2 = await secondStep(val1);
        const val3 = await thirdStep(val2);
        console.log('final', val3);
    } catch (e) {
        console.log(e);
    }
}
```

### 应用

```javascript
//	使用 Generator 函数
var fn = function(time) {
    console.log('开始异步处理');
    setTimeout(() => {
        console.log(time);
        console.log('异步处理完成');
        iter.next();
    }, time);
};
function* g() {
    console.log('start');
    yield fn(3000)
    yield fn(500)
    yield fn(1000)
    console.log('end');
}
let iter = g();
iter.next();

//	使用 async 函数
let fn = function (time) {
    return new Promise((resolve, reject) => {
        console.log('开始异步处理');
        setTimeout(() => {
            resolve();
            console.log(time);
            console.log('异步完成')
        }, time)
    })
};
let f = async function () {
    console.log('start');
    await fn(3000);
    await fn(500);
    await fn(1000);
    console.log('end');
};

f();
```

```javascript
async function f() {
    let msg = await new Promise(() => {
        $.ajax({
            success(msg){
                resolve(msg);
            }
        })
    })
    console.log(msg);	//..直接同步操作般书写代码即可,会等待异步执行完成后再执行
}
```



## Fetch 获取数据

传统 Ajax 指的是 XMLHttpRequest（XHR），现在和未来已被 [Fetch](https://fetch.spec.whatwg.org/) 替代。 

Fetch API 是基于 Promise 设计，旧浏览器不支持 Promise，需要使用 polyfill [es6-promise](https://github.com/jakearchibald/es6-promise) 。 

**何为Fetch**

XMLHttpRequest 是一个设计粗糙的 API，配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 Promise，generator/yield，async/await 友好。 

Fetch 的出现就是为了解决 XHR 的问题。

```js
//	使用 XHR 发送一个 json 请求一般是这样：
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.responseType = 'json';

xhr.onload = function() {
  console.log(xhr.response);
};

xhr.onerror = function() {
  console.log("Oops, error");
};

xhr.send();
```

使用 Fetch 后，顿时看起来好一点

```js
fetch(url)
.then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
}).catch(function(e) {
  console.log("Oops, error");
});

//	更简写法
fetch(url)
	.then(JSON.parse)	//	这里是拿着请求结果内部使用JSON.parse方法转换为对象后, 返回解析后的对象. 给后then使用
    .then(function(data) {
    	console.log(data)
	})
    .catch(function(err) {
    	console.log(err)
	})
//	还可以直接少个then
fetch(url)
    .then(data => {
    	let data = JSON.parse(data);
    	console.log(data);
	})
    .catch(err => {
    	console.log(err);
	})
```

使用 ES6 的箭头函数后：

```js
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e))
```

使用 async / await 来做最终优化： 

```js
async function f() {
    try {
        let response = await fetch('txt.php');
        let data = await response.json();
        console.log(data);
    } catch (e) {
        console.log("Oops, error", e);
    }
}
f();
```

### 用法

```js
fetch(url, [options]).then(function(response) {
  // handle HTTP response
}, function(error) {
  // handle network error
})
```

#### url

定义要获取的资源。这可能是：

- 一个 `USVString` 字符串，包含要获取资源的 `URL`。
- 一个 `Request` 对象。

#### options（可选）

一个配置项对象，包括所有对请求的设置。可选的参数有：

- `method`: 请求使用的方法，如 `GET`、`POST`。
- `headers`: 请求的头信息，形式为 `Headers` 对象或 `ByteString`。
- `body`: 请求的 `body` 信息：可能是一个 `Blob`、`BufferSource`、`FormData`、`URLSearchParams` 或者 `USVString` 对象。注意 `GET` 或 `HEAD` 方法的请求不能包含 `body` 信息。
- `mode`: 请求的模式，如 `cors`、 `no-cors` 或者 `same-origin`。
- `credentials`: 请求的 `credentials`，如 `omit`、`same-origin` 或者 `include`。
- `cache`: 请求的 `cache` 模式: `default`, `no-store`, `reload`, `no-cache`, `force-cache`, 或者 `only-if-cached`。

### response

一个 `Promise`，`resolve` 时回传 `Response` 对象：

- 属性：
  - `status (number)` - HTTP请求结果参数，在100–599 范围
  - `statusText (String)` - 服务器返回的状态报告
  - `ok (boolean)` - 如果返回200表示请求成功则为true
  - `headers (Headers)` - 返回头部信息，下面详细介绍
  - `url (String)` - 请求的地址
- 方法：
  - `text()` - 以`string`的形式生成请求text
  - `json()` - 生成`JSON.parse(responseText)`的结果
  - `blob()` - 生成一个`Blob`
  - `arrayBuffer()` - 生成一个`ArrayBuffer`
  - `formData()` - 生成格式化的数据，可用于其他的请求

### 使用案例

**post**

```js
fetch('/users', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})
```

### Fetch 优点

1. 语法简洁，更加语义化
2. 基于标准 Promise 实现，支持 async/await

**BUT**

原生支持率并不高，幸运的是，引入下面这些 polyfill 后可以完美支持 IE8+ ：

1. 由于 IE8 是 ES3，需要引入 ES5 的 polyfill: [es5-shim, es5-sham](https://github.com/es-shims/es5-shim)
2. 引入 Promise 的 polyfill: [es6-promise](https://github.com/jakearchibald/es6-promise)
3. 引入 fetch 探测库：[fetch-detector](https://github.com/camsong/fetch-detector)
4. 引入 fetch 的 polyfill: [fetch-ie8](https://github.com/camsong/fetch-ie8)
5. 可选：如果你还使用了 jsonp，引入 [fetch-jsonp](https://github.com/camsong/fetch-jsonp)
6. 可选：开启 Babel 的 runtime 模式，现在就使用 async/await


## class 类

```javascript
/* //	使用 es5 定义构造函数
function Fn() {}
Fn.prototype.xx = function() {}
Fn.xx = '静态属性'
*/

//	使用 class 定义构造函数
//	内部定义在原型上的方法不可枚举
//	内部不支持原型属性的定义, 可以在外部定义
class Fn{
    //	构造函数
    constructor(name, age) {
        this.name = name;
        this.age = age; 
    }
    
    //	静态方法(只能通过函数本身访问的属性,属性在外部定义)
    static x() { //	static 关键字
     	return '520';
    }
    
    // 原型 
    showName() {
        alert(this.name);
    }
    showAge() {
        alert(this.age);
    }
}
Fn.prototype.hobby = 'running';
let f = new Fn('小白', 18);
```

### Class 表达式

与函数一样，类也可以使用表达式的形式定义。

```js
const MyClass = new class {
  getClassName() {
    return Me.name;
  }
};

//	采用 Class 表达式，可以写出立即执行的 Class
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('小白');

person.sayName(); // 小白
```

上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是 `MyClass` 而不是 `Me`，`Me` 只在 Class 的内部代码可用，指代当前类。

### constructor

`constructor` 方法是类的默认方法，通过 `new` 命令生成对象实例时，自动调用该方法。一个类必须有 `constructor` 方法，如果没有显式定义，一个空的 `constructor` 方法会被默认添加。

```js
class Fn {
}

// 等同于
class Fn {
  constructor() {}
}
```

`constructor` 方法默认返回实例对象（即 `this` ），完全可以指定返回另外一个对象。

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
//constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。
```

### 原型的属性

**class定义类时，只能在constructor里定义属性**，在其他位置会报错。

如果需要在原型上定义方法可以使用：

1. Fn.prototype.prop = value;
2. Object.getPrototypeOf()获取原型，再来扩展
3. Object.assign(Fn.prototype,{在这里面写扩展的属性或者方法})

### class 的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。

如果在一个方法前，加上 `static` 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

ES6 明确规定，class 内部只有静态方法，没有静态属性。

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}
//	静态属性可以在外部定义
Foo.xx = 'xxx';
```

### get、set

存值函数和取值函数，不多说，看代码

```js
class Fn {
    constructor() {
        this.arr = []
    }
    get bar() {
        return this.arr;
    }
    set bar(value) {
        this.arr.push(value)
    }
}
let obj = new Fn();
obj.bar = 2;
console.log(obj.arr)//[2]
```

### 继承

Class 可以通过 `extends` 关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

```javascript
class Point {
}

class ColorPoint extends Point {
}
```

上面代码定义了一个 `ColorPoint` 类，该类通过 `extends` 关键字，继承了 `Point` 类的所有属性和方法。

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的 constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

上面代码中，**`constructor`方法和`toString`方法之中，都出现了`super` 关键字，它在这里表示父类的构造函数，用来新建父类的`this`对象。**

**子类必须在`constructor` 方法中调用`super`方法**，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。**如果不调用`super`方法，子类就得不到 `this` 对象。**

ES5 的继承，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面（`Parent.apply(this)`）。ES6 的继承机制完全不同，实质是先创造父类的实例对象`this`（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。

如果子类没有定义`constructor`方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有`constructor`方法。

```javascript
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

一个需要注意的地方是，**在子类的构造函数中，只有调用 `super` 之后，才可以使用 `this` 关键字**，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有 `super` 方法才能返回父类实例。

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);
    this.color = color; // 正确
  }
}
```

下面是生成子类实例的代码。

```javascript
let cp = new ColorPoint(25, 8, 'green');

cp instanceof ColorPoint // true
cp instanceof Point // true
```

上面代码中，实例对象 `cp` 同时是 `ColorPoint` 和 `Point` 两个类的实例，这与 ES5 的行为完全一致。

最后，父类的静态方法，也会被子类继承。

```javascript
class A {
  static hello() {
    console.log('hello world');
  }
}

class B extends A {
}

B.hello()  // hello world
```

上面代码中，`hello()`是`A`类的静态方法，`B`继承`A`，也继承了`A`的静态方法。



#### Object.getPrototypeOf()

`Object.getPrototypeOf` 方法可以用来从子类上获取父类。

```js
Object.getPrototypeOf(Fn2) === Fn
// true
```

因此，可以使用这个方法判断，一个类是否继承了另一个类。



####super 关键字

`super` 这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

第一种情况，**super 作为函数调用时，代表父类的构造函数**。ES6 要求，**子类的构造函数必须执行一次 `super` 函数**。

> 作为函数时，`super()` 只能用在子类的构造函数之中，用在其他地方就会报错。

```js
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```

注意，super 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B，因此 super() 在这里相当于 `A.prototype.constructor.call(this)`。

```javascript
class A {
  constructor(name) {
    this.name = name;
   	cosnole.log(new.target)
  }
}
class B extends A {
  constructor(name,hobby) {
    super(name);
    this.hobby = hobby
  }
}
new A() // A
new B() // B
```

上面代码中，**`new.target`指向当前正在执行的函数**。可以看到，在`super()`执行时，它指向的是子类`B`的构造函数，而不是父类`A`的构造函数。也就是说，`super()` 内部的`this`指向的是`B`。

第二种情况，**super 作为对象时，在普通方法中，指向父类的原型对象**；在静态方法中，指向父类。

```js
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
```

上面代码中，子类 B 当中的 super.p()，就是**将 super 当作一个对象使用**。这时，super  在普通方法之中，**指向A.prototype**，所以 super.p() 就相当于 A.prototype.p()。

**ES6 规定，在子类普通方法中通过 `super` 调用父类的方法时，方法内部的 `this` 指向当前的子类实例。**

```javascript
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```

上面代码中，`super.print()`虽然调用的是`A.prototype.print()`，但是`A.prototype.print()`内部的`this`指向子类`B`的实例，导致输出的是`2`，而不是`1`。也就是说，**实际上执行的是`super.print.call(this)`**。

由于 this 指向子类，所以如果**通过 super 对某个属性赋值**，这时 **super 就是 this**，赋值的属性会变成子类实例的属性。

```javascript
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;	//	super 对某属性赋值, 这是 super 就是 this
    console.log(super.x); // undefined	super作为对象调用, 指向父类原型
    console.log(this.x); // 3
  }
}

let b = new B();
```

如果x定义在 A的原型上就可以获得, **因为 super 作对象调用 是 指向父类原型**

```javascript
class A {}
A.prototype.x = 2;

class B extends A {
  constructor() {
    super();
    console.log(super.x) // 2	super作为对象调用, 指向父类原型
  }
}

let b = new B();
```

上面代码中，属性`x`是定义在`A.prototype`上面的，所以`super.x`可以取到它的值。

**如果 `super` 作为对象，用在静态方法之中，这时 `super` 将指向父类，而不是父类的原型对象。**

```javascript 
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2
```

上面代码中，**`super` 在静态方法之中指向父类，在普通方法之中指向父类的原型对象**。

注意，使用 `super` 的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

```javascript
class A {}

class B extends A {
  constructor() {
    super();
    console.log(super); // 报错
  }
}
```

上面代码中，`console.log(super)`当中的`super`，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。这时，如果能清晰地表明`super`的数据类型，就不会报错。

```javascript
class A {}

class B extends A {
  constructor() {
    super();
    console.log(super.valueOf() instanceof B); // true
  }
}

let b = new B();
```

最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用`super`关键字。

```
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```

#### 类的 prototype 属性和 \_\_proto__属性

大多数浏览器的 ES5 实现之中，每一个对象都有 `__proto__` 属性，指向对应的构造函数的 `prototype` 属性。Class 作为构造函数的语法糖，同时有`prototype` 属性和 `__proto__` 属性，因此同时存在两条继承链。

（1）子类的 `__proto__` 属性，表示构造函数的继承，总是指向父类。

（2）子类 `prototype` 属性的 `__proto__` 属性，表示方法的继承，总是指向父类的 `prototype` 属性。

```javascript
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

#### extends 的继承目标

`extends` 关键字后面可以跟多种类型的值。

```javascript
class B extends A {
}
```

上面代码的`A`，只要是一个有`prototype`属性的函数，就能被 `B` 继承。由于函数都有 `prototype` 属性（除了`Function.prototype`函数），因此`A`可以是任意函数。

第一种特殊情况，子类继承`Object`类。

```javascript
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```

第二种特殊情况，不存在任何继承。

```javascript
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```

第三种特殊情况，子类继承 `null`。

```javascript
class A extends null {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true
```

`__proto__`指向`undefined`，即实质上执行了下面的代码。

```javascript
class C extends null {
  constructor() { return Object.create(null); }
}
```

#### Mixin 模式的实现

Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。

```javascript
const a = {
  a: 'a'
};
const b = {
  b: 'b'
};
const c = {...a, ...b}; // {a: 'a', b: 'b'}
```

下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。

```javascript
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix.prototype, mixin); // 拷贝实例属性
    copyProperties(Mix.prototype, Object.getPrototypeOf(mixin)); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```

上面代码的`mix`函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

```javascript
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```