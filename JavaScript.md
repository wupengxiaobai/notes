#  JavaScript 学习笔记

## 历史

### web 发展史

**Mosaic** 是互联网历史上第一个获普通使用和能显示图片的网页浏览器, 于1993年问世.

**1994年4月** Netscape Navigator 浏览器问世, 11月更名 "**Netscape Communication Corporation**" , 此后沿用至今, 中译为 **"网景"**. 微软的 IE 及 Mozilla Firefox等, 早期版本皆以 Mosaic 为基础开发的.  

**Mozilla Firefox** 则是 **网景** 通讯家开放源码后所衍生出的版本.



### JavaScript 历史

**1996** 年诞生. 最初目的是改善网页的用户体验

作者: Brendan Eich

初期被命名为 **LiveScript**, 后因市场宣传更名 **JavaScript**

后 Sun 公司被 Oracle 收购, JavaScript 版权归 Oracle 所有.



### 浏览器组成

- **shell** 部分
- **内核** 部分
  - 渲染引擎 (语法规则和渲染)
  - js引擎
  - 其他模块

**js引擎**

2001年 ie6 首次实现对js引擎的优化和分离.

2008年 Google 发布最新浏览器 Chrome, 采用优化后的javascript引擎, 引擎代号V8, 能把js代码直接转化为机械码来执行, 进而以速度快而闻名.

后 Firefox 也推出了具备强大功能的js引擎

Firefox3.5 traceMonkey (对频繁执行的代码做了路径优化)

Firefox4.0 JeagerMonkey

**几大主流浏览器及其内核**

- **IE				trident**
	 **Chrome	   		webkit/blink**
	 **firefox			Gecko**
	 **Opera			presto**
	 **Safari			webkit**

---

## JavaScript 分步

- 是**解释性语言** (翻译一行, 执行一行)
- **单线程** 
- **ECMAScript 标准**

**JS执行队列**

轮转时间片: 任务切片, 随机执行时间片.

### JS三大部分

- **ECMAScript**
- **DOM**
- **BOM**

---

## ECMAScript

 **Javascript 引入**

```html
<script type="text/javascript" src="xxx.js"></script>
```

### 基础语法

#### 变量

- 变量声明
  - **声明** / **赋值** 分解
  - 单一 var 

```javascript
var a;	//变量声明
a = 100;	//变量赋值
var b = 100;	//变量声明 + 赋值
//	开发写法: 单一 var 模式
var a,
    b = 10,
    c = '哈喽c',
    d;
```

- 命名规则

  - 变量名必须以 `英文字母`   `_`    `$`  开头
  - 变量名可以包括 字母  _   $   数字 
  - 不可以使用关键字和保留字

- `var`  关键字声明的对象存在变量提升，提升范围不会超过 `script` 标

- **变量声明未赋值，如果该变量与全局已有属性命名冲突，则不会修改全局已有属性对应的值。[变量提升]**

  ```JS
  //	name 在全局（window）已存在值是一个空值 "", name 比较操蛋， 赋予什么值都会转为 字符串
  var name;	//	定义name未赋值
  console.log(name)	//	未赋值的全局已有属性不会被覆盖
  console.log(typeof name)	//	string
  ```

##### 变量作用域

```
1. 首先查看当前作用域
2. 查看当前作用域的上级有没有
3. ...直到全局作用域
```

#### 值类型(数据类型)

**原始值(不可改变的原始值: 栈内存 stack)** 

>	 **原始类型的变量，存放具体的值**
>	 遵循规则：
>
>	 ​	first in -> last out 先进最后出.
>	 ​	栈内存之间的赋值是拷贝.
>	 ​	重新赋值重新房间. 变量和原房间关系切断[不可改变的原始值].
>	 ​	数据的更改, 原来的栈内存值并没有改变, 只是名归为原来的房间的号码, 值不会被清除, 只会累积下来, 直至内存沾满之后从头开始, 覆盖名为房间号的值

  - **number**
  - **boolean** （true，false）
  - **string**
  - **undefined**
    - 一个变量被声明但是未赋值即 undefined 类型的值
    - 一个变量声明了但是被赋值了 undefined
    - 一个对象中, 不存在的属性的值也是 undefined
  - **null**

**引用值(栈：指针，堆：内容)**

> **引用类型的变量， 栈内存存储引用地址的指针， 开辟的堆内存中存储内容**
>
> 遵循规则：
>
> ​	引用值之间的赋值是复制栈内存中引用地址的指针, 地址指向堆内存中的房间. 
>
> ​	引用值之间的赋值是指针的形式，赋值指针
>
> ​	一个新的引用值等于开一个新的房间, 栈内存中的存储地址指向该新房间.
>
> ​	凡是出现引用值(对象字面量)，都会在堆内存中生成一个新的引用空间。

- **Array**   []
- **Object**  {}
- **function**
- **Date**
- **正则**

**js 中的垃圾回收机制**

> js 垃圾回收器，会定期发现内存中无法访问的对象[垃圾]，垃圾回收器在合适的时间将其占用地内存释放


#### 语法的基本规则

- 语句后面用分号结束 `;` 

- js语法错误会引发后续代码终止, 但不会影响其它代码块

  ```html
  <script>
  	console.log(b);
  </script>
  <script>
      var a = 5; 
      console.log(a);
  </script>

  //Uncaught ReferenceError: b is not defined
  //5
  ```

- 书写格式规范

#### JS运算符（操作符）

##### 算术运算符

- `+` 
  - 数学运算
  - 字符串连接(任何和字符串执行+号运算的结果就是字符串)
- `-`   `*`    `/`   `%`  `**`

> **细节**
>
> js 中数值运算不精确。如5.2-5.1
>
> 除数为0， 被除数是正数得到正无穷 Infinity，负数得到 -Infinity， 被除数是0，得到 NaN
>
> 求余结果正负只跟被除数有关系，与除数无关。如 10/-3   ==> 1    -10/-3 ==> -1

> **其它类型使用算术运算符**
>
> 1. 除加号之外的
>
>    将原始类型转为数字类型，再运算
>
>    boolean： true  -- 1  false -- 0
>
>    string：内部是正确数字，直接变为数字。非数字则为 NaN（能识别Infinity，不能把字符串内部东西当作表达式, 如果字符串是一个空字符串，转换为0. 字符串转换时会忽略前后空格)
>
>    null： 0
>
>    undefined: NaN
>
>    对象： 先将对象转为字符串格式 "[object Object]", 再转为数字。 使用算术运算符，结果NaN
>
> 2. 是加号运算符
>
>    一边有字符串，表是字符串拼接。 将另一边的其它类型转为字符串
>
>    ​	数字， 直接转为数字字符串
>
>    ​	布尔， 布尔字符串
>
>    加号一边没有字符串，另一边有对象。 先将对象转为字符串，按照字符串拼接。 

**练习题**

```js
console.log(1 + 2 * 3)	//	7
console.log(1 + 3 % 2)	//	2
console.log("" + 3 % 2) //	"1"
console.log(+"" + 3 % 2)	//	0 + 1 -> 1
console.log(+{} + "")	//	+"[object Object]" + ""	-> NaN + "" -> "NaN"
console.log(100 % 4 /0)	//	0 / 0 -> NaN
console.log(null / null) // 0 / 0 -> NaN
var a;
console.log(a + {} + 124)	//	undefined + "[object Object]" + 123 -> undeinfed[object Object]123
console.log(1 + "" + 2 + 3) // "123"
console.log({} * null)	//	"[object Object]" * 0 -> NaN * 0 -> NaN
console.log(+"" + 100)	//	0 + 100 -> 100

//	温度转换器 （设置变量保存摄氏温度C,转为华氏温度F：F = (9/5)C + 32）
var fFunc = c => (9 / 5) * c + 32;
//	利息计算器 （设置变量，分别保存本金，月数，年利率，计算利息）
var rateFunc = (money, month, rate) => money * (rate / 100 / 12) * month;
```

**优先级**

赋值的顺序: 自右向左

计算的顺序: 自左向右, 优先级不同特殊处理

> **细节**
>
> 自增子减表达式
>
> x++: 将变量x自增1，得到的表达式的值是自增之前的值 x = 0; console.log(x++) 0
>
> ++x: 将变量x自增1，得到的表达式的值是自增之后的值 x = 0; console.log(++x) 1 
>
> **优先级运算细节***
>
> ​	从左到右依次查看, 遇到括号算括号里面
>
> ​	如果遇到操作数将数据的值取出
>
> ​	如果遇到相邻两个运算符，并且左侧运算优先级大于等于右侧运算符，则直接运行左边的运算符

**练习**

```JS
var a = 1；
console.log(1 + a++ * ++a)

var b = 1;
console.log(b + b++ + ++b + b*3 * ++b)

var c = 1；
consle.log(c * (c++ + ++c) - c++ -++c / ++c * c++)
```

##### 比较运算符

`>=` `==` `===`

> 返回值 boolean
>
> 优先级小于算术运算符
>
> **细节**
>
> 1. 两个字符串比较比较的是字符编码
>
> 2. 其中一个不是字符串并且两个都是原始类型，将他们都转换为数字进行比较
>
> ​	NaN与任何数字比较，得到结果都是 false, 包括自身
>
> ​	无穷大比任何数字都大，负无穷大比任何数字都小
>
> ​	undefined 和 null
>
> ​		undefined -> NaN
>
> ​		null -> 0
>
> 3. 其中一个是对象，将对象转为原始类型（"[object Object]"）。
> 4. 两个对象比较，比较指针地址

```JS
console.log("11" > "2")	//	false
console.log("11" > 2)	//	true
console.log("wft" > 0) //	false
console.log(undefined > 0) 	//	NaN > 0 ==》 false
console.log(null > 0) // 0 > 0 ==》 false
console.log({} > 0) //	"[objet Object]" > 0 ==》 NaN > 0 ==》 false
console.log(null == undefined) // true
console.log(null === undefined) // false
console.log(null >= 0) //	true
console.log(null == 0) //	false
```

##### 逻辑运算符

`&&`  `||`  `!`

- 针对非布尔值

```javascript
/* &&运算符 */	
//	先看运算符前面的表达式转化为布尔值是否为真, 如果为真, 看第二个表达式转化为布尔值的结果. (以此规矩往下走, 遇假就停, 返回该值)
var a = 1 && 2 && 0 && 5;	//	0
//	如果只有两个表达式的话. 表达式1为真, 返回表达式2. 表达式1为假, 返回表达式1. (遇假就停)
var a = 0 && 5	//	0
//	短路语句的运用
data && fn(data);

/* ||运算符 */	
//	如果是真就返回该值.(遇真就停)
var a = 0 || false || 5	//	5
```

- 针对布尔值判断(if)

```javascript
/*	&& 全真才真	*/
var a = 1 && 5 && 2 && '前端' && 0;	//	false
/*	|| 全假才假	*/
var a = 0 || false || '' || 1 	//	true
/*	! 先转布尔值再取反 -> 结果为布尔值	*/
var a = !520	//	false
```

**运用**

```JS
var x = 1;
console.log(x++ >= 1 && x++ >= 2 && x++ >=3 && x++ >=5 || (x = 5)); //	5
console.log(x++ >= 1 && x++ >= 2 && x++ >=3 && ++x >=5 && (x = 520));	//	520
```

##### 三目运算符

`表达式一 ? 表达式二 : 表达式三`

```js
var x = 2;
x = x++ >= 3 ? x++ * ++x - x++ / --x : x++;
```

##### 一元运算符 void | typeof

> void(1+2) 运行表达式, 返回 undefined (void 1+2 NaN)
>
> typeof(1+3) 运行表达式, 返回表达式结果类型

##### 逗号运算符

> 依次运行表达式, 返回后面表达式结果
>
> 1+2, 2+3, 3+4, 4+5
>
> 逗号运算符优先级比赋值运算符还低



#### 数字的存储[拓展]

##### 问题

- JS 中小数运算精确的吗
- JS 中整数运算精确的吗
- JS 中表示的整数是连续吗
- JS 中表示最大的数字是多少
- JS 中能表示的有效位数是多少

```JS
//	小数运算不一定精确
console.log(0.2 + 0.1)	//	0.30000000000000004
console.log(0.5 + 0.5)	//	1
# 当 js 数值很大的时候会出现以下情况
//	整数运算不一定精确
//	表示的整数不一定连续

//	最大数字(连续整数)
Number.MAX_SAFE_INTEGER	//	9007199254740991	
//	有效位数 16 ~ 17
```

##### 原因

> **二进制**
>
> ​	现实世界中: 十进制, 逢10进1
>
> ​	计算机世界: 二进制, 逢2进1

**二进制转十进制**
$$
二进制 1011 转十进制数:  1*2^3 + 0*2^2 + 1*2^1 + 1*2^0 结果为 11
$$

$$
二进制 10.11 转十进制数: 1*2^1 + 0*2^0 + 1*2^{-1} + 1*2^{-2} 结果为 2.75
$$

**十进制转二进制**

```JS
11 / 2	商 5 余 1
5  / 2  商 2 余 1
2  / 2  商 1 余 0
1  / 2  商 0 余 1
//	--》  倒序查看即得 1011

# 小数二进制 2.75
//	整数部分相同
2.75
2 / 2 商 1 余 0
1 / 2 商 0 余 1
//	商0为止--》倒序查看 10
0.75 * 2 小数部分 0.5
0.5 * 2  小数部分 0
//	小数部分0为止--》正序查看 11
//	-- 整数+小鼠 10.11
```

**为什么JS小数运算不准确?**

> **因为十进制转二进制可能会进入无限状态**

```js
//	以 0.3 举例 
0.3 * 2  0.6  0
0.6 * 2  1.2  1
0.2 * 2  0.4  0
0.4 * 2  0.8  0
0.8 * 2  1.6  1
0.6 * 2  1.2  1
0.2 * 2  0.4  0
0.4 * 2  0.8  0
//	得出结果是进入了一个无线循环的过程, 省却后面的数据
所以结果是 0.01001100......
//	(0.3).toString(2) => "0.010011001100110011001100110011001100110011001100110011"
```

**计算机中整数和浮点数的存储都以浮点方式**

```js
#	[第一段][第二段][第三段]
//	第一段只有一位表示符号 0表示正  1表示负
//	第二段有 11 位表示整数部分
//	第三段 52 位表示小数部分

# 特殊值存储
0 11111111111 000..	//	Infinity(2*1024)
1 11111111111 000..	//	-Infinity
1 11111111111 023.. //  NaN
0 11111111111 023.. //  NaN
//	正常数字第二段部分最多取到2046
```

**能表示的最大数字**

```js
0 11111111110 111...
//	Number.MAX_VALUE
//	1.7976931348623157e+308
1 11111111110 111...
//	Number.MIN_VALUE
//	5e-324
```

**能表示的最大有效安全整数**

```JS
2**53 -1
//	Number.MAX_SAFE_INTEGER
//	9007199254740991
```

#### 位运算[拓展]

> 将一个整数的二进制格式进行运算
>
> **在 js 中，如果对一个数据进行位运算，它首先会将其转换为整数（小数省略），并且按照 32 为整数制排列**
>
> 举例： 2.7 =》2 =》 0000 0000 0000 0000 0000 0000 0000 0010
>
> (Infinity, -Infiinity, NaN 全部作0处理)

##### 与运算

> 整数1 & 整数2
>
> 两个整数每一位进行比较， 都为一，结果1，否则结果0

```JS
//	8 & 5
0000 0000 0000 0000 0000 0000 0000 1000
0000 0000 0000 0000 0000 0000 0000 0101
0000 0000 0000 0000 0000 0000 0000 0000	//	输出 0
```

##### 或运算

> 整数1 | 整数2
>
> 两个整数每一位进行比较, 都为0, 结果为0, 否则结果为1

```JS
//	8 | 5
0000 0000 0000 0000 0000 0000 0000 1000
0000 0000 0000 0000 0000 0000 0000 0101
0000 0000 0000 0000 0000 0000 0000 1101	//	输出 13
```

##### 否(非)运算

> ~整数
>
> 将整数按位取反(快速运算: - 数 -1)

JS中最快取整方式:  `~~数值`

```JS
~~2.88 // -2 -1 => 3 - 1 => 2
```

##### 异或运算

> 数1 ^ 数2
>
> 将数1和数2按位比较, 不同取1, 相同取0

```js
//	8 ^ 5
0000 0000 0000 0000 0000 0000 0000 1000
0000 0000 0000 0000 0000 0000 0000 0101
0000 0000 0000 0000 0000 0000 0000 1101	//	13
//	交换数值变量值
var a = 1, b = 2;
//	01, 10
a = a ^ b;	// 	a = 11
//	11, 10
b = a ^ b;	//  b = 01	--> 1
//	11, 01
a = a ^ b; //  a = 10	--> 2
```

**应用场景: 开关叠加**

```JS
# 权限控制 read write create
var power = {
    read:  0b001,	//	读
    write: 0b010,	//	写
    create:0b100	//	创建
}
//	用户b保存可读可写权限
var p = power.read | power.write;	//	p = 0b011
//	去掉可读权限
p = p | power.read ^ power.read;	//	p = 0b010
//	判断p是否有可读权限
p & power.read === power.read? console.log('可读') : console.log('不可读')
```

##### 位移运算

> 左位移 <<   
>
> ​	数字1 << 数字2
>
> ​		将数字1的二进制(除符号位外) 左移数字2次数
>
> ​		结果: 数字1 * 2 ^ 数字2
>
> 右位移 >>
>
> ​	数字1 >> 数字2
>
> ​		将数字1的二进制(符号除外)右移数字2次数
>
> 全右位移 >>>

##### 求余和求模

> **%**(js中的求余) 
>
> 求余: 求余的值的符号与被除数相同 公式 **x - n * y** (n 是 x / y 取整(向0取整))
>
> 求模(js中没有求模) 求模的符号与出书相同 公式 **x - n * y** (n 是 x / y 取整(向下取整))
>
> **所以说: 在值为正数时, 求余和求模没有区别, 在值为负数是, 重点是 n 的取值**

```JS
//	7 % 3 或 -7 % -3 时，值为正数。此时求余和求模的值是相同的
7 % 3 = 7 - ~~(7/3) * 3 = 1
//	当值为负数时， 求余的值与被除数相同， 而求模的值与除数相同
7 % -3 = 7 - ~~(7/(-3)) * (-3) =  7 - (-2)*(-3) = 1
//	求模伪代码和结果如下
7 % -3 = 7 - (7/(-3))【向下取整 -2.33 -> -3】 * (-3) = 7 - (-3) * (-3) = -2
```

### 流程控制

#### typora流程图绘制指南

```sequence
小白->大神: Hello 大神, how are you?
note right of 大神: 小白,thinks
大神->小白: I am fine, thinks
note left of 小白: ohmygod
小白-->二代神: and you?
note right of 二代神: 真暖
二代神-->小白: 很好谢谢
```

```FLOW
st=>start: 小白逻辑
ed=>end: 结束
cond=>condition: 有看到卖西瓜的车吗?
op=>operation: 买两个桃子
op2=>operation: 买西瓜
st->cond
cond(yes)->op2->ed
cond(no)->op->ed
```

#### 条件语句

**if语句**

> **一个if语句**
>
> 1. 如果某个条件满足，则直接忽略后面的所有条件
> 2. else if 可以有多个（包括0个）
> 3. else 可以有一个或0个
> 4. else 可以换行编写
> 5. if只能出现一次
> 6. 代码块只有一行，花括号可以省略

#### 条件语句

```javascript
if (条件) {	//	条件为真, 执行code 
    code...
} else if(条件2) {	//	条件2满足执行   
    code2..   
} else {	//	条件为其它, 执行code3
	code3...
}
```

**练习**

```js
if(!x){
    x = 0; 
}
if(x++ >= 1){
    var x;
    x++;
}else if(++x >=2){
    x++;
}else{
    x--;
}
console.log(x)	//	3
```

**作业练习**

```JS
# 1.提示用户输入一个三位数，不是三位数，提示输入有误。是三位数，判断能否被13整除
# 2.让用户输入一个成绩（0-100），判断该成绩所属范围并输出结果（a:90-100/b:70-89/c:60-69/d:40-59/e:0-39），若输入的不是0-100的数字，输出输入有误
# 3.根据世界卫生组织推荐的计算方法
	# 男性标准体重计算方法（身高cm - 80）× 70%
    # 女性标准体重计算方法（身高cm - 70）× 60%
    # 标准体重正负 10% 为正常体重，低于标准体重 10%为瘦，高于标准体重10%为胖
    # 编写程序让用户输入性别，身高，体重判断健康状况
    	# 体重正常，继续保持
        # 体重偏胖，加强锻炼
        # 体重偏瘦，补充营养
var height = +prompt('输入身高（cm）'),
    weight = +prompt('输入体重（kg）'),
    gender = prompt('输入性别（男|女）');
if(isNaN(height) || isNaN(weight) || (gender !=='男' && gender !=='女')) {
	console.log('输入有误');
}else{
    var standardWeight;
    if(gender === '男') {
        standarWeight = (height - 80) * 0.7;
    }else {
        standarWeight = (height - 70) * 0.6;
    }
    if(weight < standarWeight * 0.9) {
        console.log('体重偏瘦，补充营养')
    }else if (weight > standarWeight * 1.1) {
        console.log('体重偏胖，加强锻炼')
    }else{
        console.log('体重正常，继续保持')
    }
}
# 4.某理财公司推出一种理财服务，服务规则如下
	# 用户理财金额在五十万以下，每年收益按4% 计算
    # 用户理财金额在五十万以上（包括五十万），每年按 4.5%计算
    # 若用户理财金额超过200万，除了理财收益以外，还要额外给予用户收益金额的10%
    # 编写程序，让用户输入理财金额和理财年限，计算到期后的收益
# 5.编写石头剪刀布游戏，用户输入单个数值123，分别代表石头剪刀布(其他数值默认判定用户出错，判定用户输)，跟电脑对比判断胜负
var fist = prompt('请出拳（剪刀/石头/布）');
if(fist === '剪刀' || fist === '石头' || fist === '布') {
    //	1.模拟电脑出拳
    var pcFist,
        rd = Math.random();
    if(rd < 0.3333) {
        pcFist = "剪刀"
    }else if(rd < 0.6666) {
        pcFist = "石头"
    }else {
        pcFist = "布"
    }
    //	2.比较胜负
    console.log('你出拳：' + fist + ' 电脑出拳： ' + pcFist)
    if((fist === '剪刀' && pcFist === '布') || (fist === '石头' && pcFist === "剪刀") || (fist === "布" && pcFist === "石头")) {
        cosnole.log('你赢了！')
    }else if(fist === pcFist) {
        console.log('平局！')
    }else {
    	console.log('你输了！')
    }
}else {
    console.log('输入有误')
}
```



`switch` 执行全真判断所选if语句另外一种形式

```javascript
switch(变量){
    case '条件1':    //	 条件1 === 变量, 执行code1代码
        //code1..
        break;		//    如果符合, 隔断语句往后执行 break 关键字
    case '条件2':
        //code2..
        break;
    case '条件3':
        //code3..
        break;
    default:		//	 其它值的处理
        //code4..
        break;
}
//	极其不负责任, 没有break的情况下. 也执行之后的代码
```

#### 循环语句

`for(){}` 语句

``` javascript
for (var a=1; a < 100; a++) {
    console.log(a);
}
//	① var a = 1;
//	② a < 100;
//	③ console.log(a);
//	④ a++;
//	⑤ a < 100;
//	⑥ console.log(a);
//	.......
```
```FLOW
st=>start: for开始
ed=>end: for结束
cd=>condition: 条件判断满足
op1=>operation: 初始化参数（var i=0）
op2=>operation: 修改初始化参数（i++）
op3=>operation: 执行code块

st->op1->cd
cd(yes)->op3->op2->cd
cd(no)->ed
```

`while(){}` 满足条件执行

```javascript
var a = 0;
while(a < 100){
    console.log(a++);
}
```
```FLOW
st=>start: while循环开始
ed=>end: while循环结束
cd=>condition: 条件判断满足
op1=>operation: 执行代码块

st->cd
cd(yes)->op1->cd
cd(no)->ed
```

`do{}while()` 先执行一次
```FLOW
st=>start: dowhile开始
ed=>end: dowhile结束
cd=>condition: 条件判断满足
op1=>operation: 执行代码块

st->op1->cd
cd(yes)->op1
cd(no)->ed
```
**`break`** 关键字 ： 跳出循环结构

**`continue`** 关键字 :  中止本次, 继续下次循环

##### 循环的应用

```JS
# 累计
//	1~100数字相加之和
//	思路： 准备一个变量
var sum = 0;
for(var i=1; i<=100; i++) {
    sum += i;
}

# 查找 
//	查找范围内是否存在能被13整除的数字
var isFind = false;
var min = 110,
    max = 200;
for(var i = min; i<= max; i++) {
    if(i%13 === 0) {
        isFind = true;
        break;
    }
}
if(isFind) {
    console.log('存在')
}else {
    console.log('不存在')
}

//	判断一个数值是不是素数
var num = 108,
    isFind = false;
for(var i = 2; i < num; i++) {
    if(num % i === 0){
        isFind = true;
        break;
    }
}
if(num === 1) isFind = false;
if(isFind){
    console.log('不是素数');
}else{
    console.log('是素数');
}

# 嵌套循环： 分层进行分析嵌套循环
//	输出 1~100 所有素数
//  判断一个数是不是素数
function isSs(number) {
    var isFind = false;
    for (var i = 2; i < number; i++) {
        if (number % i === 0) {
            isFind = true;
            break;
        }
    }
    if (number === 1) isFind = true;
    if (isFind) {
        // console.log('不是素数')
    } else {
        // console.log('是素数')
        return true;
    }
}
//  收集范围内所有素数
var ret = [];
for (var i = 0; i < 100; i++) {
    if (isSs(i)) {
        ret.push(i);
    }
}
console.log(ret);
```


---



### 基本方法

#### typeof

> typeof 用于数据类型判断, 判断未定义的值. 返回字符串的 undefined 

**六种数据类型**

- number
- string
- boolean
- undefined
- object (null)
- function

```javascript
// mytype封装
function mytype(target) {
    var template = {
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Number]": "number-object",
        "[object Boolean]": "boolean-object",
        "[object String]": "string-object"
    };
    // 原始值,引用值
    // 区别 function
    // 区别 null
    // 区分引用值
    if (target === null) {
        return 'null';
    } else if (typeof(target) === 'object') {
        var str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        return typeof(target);
    }
}
```

#### 类型转换

##### **显示类型转换**

- Number()

```javascript
Number('123');	//	number 123
Number(null)	//	number 0
//	不能转换成数字的, 则会转成 NaN
Number('123abc')	//	NaN
Number(undefined)	//	NaN	*****
```

- parseInt()	数字类开始到非数字类截止

**转为整数**

```javascript
//	转化为整数
parseInt('123.2')	//	number 123
//	尽量把数转为整数
parseInt('123abc')	//	number 123
//	非数值则NaN
parseInt(true)		//	NaN
parseInt('false')	//	NaN
```

**转换进制**

```javascript
//	parseInt(params, radix);
//	radix参数: 2~36
//	将 parmas 以radix进制为基底转为十进制 
parseInt(10, 16)	//	16
parseInt(b, 16)		//	11
```

- parseFloat()	 

**转为浮点数**

```javascript
//	数字类开始至非数字类结束
parseFloat('123.13@%')	//number 123.13
```

- String()

**转为字符串**

```javascript
String(true)	//	string true
String(123) 	//  string 123
```

- Boolean()

**转为布尔值**

```javascript
Boolean(0)	//	boolean false
Boolean(1)	//	boolean true
Boolean('')	//	boolean false
```

- toString()

**转为字符串**

```javascript
123.toString() //	string 123
//	undefined null 不能使用toString方法
```

**以十进制为基底转为目标进制以字符串表示**

```javascript
100.toString(2)	//	1100100
```

##### **隐式类型转换**

- `isNaN()`

```java
//	内部调用 Number() 方法, 转换后在和NaN进行比对 , 输出布尔值
isNaN('123')	//	false
isNaN('123abc') //	true
isNaN('true')	//  false
isNaN(null)		//	false
isNaN(undefined)//  true		
```

- `++` `--` `+` `-` (一元正负)

```javascript
//	先调用 Number() 方法
+ 'abc'	//	NaN
+ undefined	// NaN
```

- `+`

```javascript
//	调用 String() 方法
a + 1 // string	a1
```

- `-` `*` `/` `%`

```javascript
//	调用 Number()
```

- `&&` `||` `!`

```javascript
//	调用Boolean()
```

- `<` `>` `<=` `>=`


- `==` `!=` 

##### 不发生类型转换

`===`  `!==`

**比较值的时候, 如果是引用值还比较指针地址**

---

### 字符串常用方法

- 字符串替换

  ```javascript
  str.replace(新值, 旧值)
  ```

---

### 函数(function)

`function test() {}`

> 高内聚 弱耦合 

**定义**

- 函数声明
- 函数表达式

```javascript
//	函数声明
function test() {}
//	函数表达式(命名函数)
var test = function test() {}
var test = function() {}	//	(匿名函数)
```

**组成形式**

- 函数名称
- 参数
  - 形参
  - 实参
  - 实参列表(不定参) `arguments` 
- 返回值 `return`
  - 终止函数执行
  - 返回值

```javascript
//	形参
function test(a, b) {
    //	var a, b;
    console.log(arguments)	//	实参列表
    //	arguments[0] 和 a 是俩人, 但是他们内部存在映射关系 
    //	argument 的长度 与 实参的长度联系 *
	return 'hello';	//	①终止函数 ②返回值
    console.log(1);	//	return 之后的不执行
}
//	实参
test(5, 2)
```

 **递归 : 先执行的最后执行完成**

> ①找规律 ②找出口
>
> 典型实例: 阶乘 菲波那切数列

```javascript
/* 阶乘 */
function jc(n) {
    if (n < 2) return n;
    return n * jc(n - 1);
}
console.log(jc(5));


/* 菲波那切数列 */
//  1 1 2 3 5 8 11
function fbnqsl(n){
    if(n<=2) return 1;
    return fbnqsl(n-1) + fbnqsl(n-2);
}

console.log(fbnqsl(5));
```

####  js运行三部曲

1.语法解析（通篇扫描，是否有语法错误）

##### 2.**预编译**(发生在函数执行的前一刻)

**前奏**

- imply global 暗示全局变量: 任何变量, 如果变量**未经声明就赋值,** 此变量就为**全局对象(window)所有**.  `a=123`


- 一切声明的全局变量, 全是**window**的**属性**.  `window.a`

```javascript
//	1.函数声明, 整体提升
function test() {console.log(b)}	//	函数块整体提升
//	2.变量声明或变量声明并赋值 声明提升
var test = 233; //	a 提升
//	3.函数声明权重大于变量声明
```

**局部预编译四部曲 √**

1. **创建 AO(Activation Object) 对象 (执行期上下文)**
2. **找形参和变量声明, 将变量和形参名作为AO的属性名, 值为undefined**
3. **将实参值和形参值统一**
4. **在函数体里面找函数声明, 值赋予函数体**

```javascript
function test(a){
    console.log(a)
    var a = 123
    console.log(a)
    function a() {}
    console.log(a)
    var b = function() {}
    console.log(b)
    function d() {}
}
test(1)

//	ƒ a() {}
//	123
//	123
//	ƒ () {}

//	1.创建AO对象
//	A0{}
//	2.找形参和变量声明, 将变量和形参名作为AO的属性名, 值为undefined
//	3.实参形参统一
//	AO{
//    a: 1,
//    b: undefined,
//}
//	4. 在函数体里面找函数声明, 值赋予函数体
//AO{
//    a: function() {},
//    b: undefined,
//    d: function d() {}
//}

//	解释执行
//AO{
//    a: 123,
//    b: function() {},
//    d: function d() {}
//}
```

**全局预编译三部曲 √**

- 创建GO对象 (Global Object)
- 找变量声明, 变量声明作为GO的属性名, 赋值undefined
- 找函数声明, 赋值函数体

```javascript
console.log(a)
var a = 123
function a() {}
console.log(a)
//	ƒ a() {}
//	123

//	1.创建GO对象
//GO{}
//	2.找变量声明, 变量声明作为GO属性名, 赋值undefined
//GO{
//    a: undefined
//}
//	3.找函数声明, 赋值函数体
//GO{
//    a: function a() {}
//}

//	解释执行
//GO{
//    a: 123
//}


```

3.解释执行（解释一行，执行一行）

#### 作用域

> **[[scope]]**: 每个javascript函数都是一个对象, 对象中有些属性我们可以访问, 但是有些不可以, 这些属性仅供javascript引擎存取, [[scope]] 就是其中一个. [[scope]] 指的就是我们所说的作用域, 集中存储了**运行期上下文的集合**.
>
> **作用域链**: [[scope]] 中所存储的执行期上下文对象的集合, 这个集合呈链式链接, 这种链式链接叫做作用域链.
>
> **执行期上下文**(预编译): 当函数执行时, 会创建一个称为**执行期上下文**的内部对象(AO). 一个执行期上下文定义了一个函数执行时的环境, **函数每次执行时对应的执行上下文都是独一无二的**, 所以多次调用一个函数会导致创建多个执行期上下文, 当**函数执行完毕**, 它所**产生的执行期上下文被销毁**
>
> **查找变量**: 从作用域链的顶端一次向下查找.

```javascript
function a() {
    var temp = 5;
    function b() {
        var parmas = 100;
    }
    b();
}
var gloab = 100;
a();
//	a函数定义的时候, [[scope]] 存储的就是a函数所在的环境的执行期上下文对象
//	a函数执行时, 产生了a函数的执行期上下文(AO)对象, 保存着当前执行环境所处的对象 
//	a函数的执行, 导致b函数的定义, b函数的定义时的 [[scope]] 存储的是a的执行期上下文的引用.
//	b函数执行, 产生b函数的独一无二的执行期上下文
//	函数执行往后, 执行期上下文被销毁
```

![a被定义时,发生如下过程](.\javascript\1528522518338.png)

![a函数被执行时,发送如下过程](.\javascript\1528523036575.png)

![b定义时所处的环境](.\javascript\1528523995508.png)

![b函数执行时,发生的变化](.\javascript\1528524240574.png)

```javascript
function a() {
    function b() {
        function c(){} 
        c();
    }
    b();
}
a();

// 	解析如下
a defined	->	a [[scope]]	->  GO
a doing 	->	a [[scope]]	->	0: aAO
							    1: GO

b defined	-> 	b [[scope]]	->	0: aAO
							    1: GO
b doding 	->	b [[scope]]	->	0: bAO
						   	    1: aAO
                              	2: GO
                             
c defined	->	c [[scope]] ->	0: bAO
							    1: aAO
                              	2: GO
                                
c doing		->	c [[scope]] ->  0: cAO
							    1: bAO
                                2: aAO
                                3: GO
```

#### 作用域链

由于作用域是相对而言的, 如果存在多级作用域, 这个变量又来自于哪里? 我们把这个变量的查找过程称之为作用域链

**意义**: 查找变量 (确定变量来自于哪里, 变量是否可以访问)

简单的来说, 作用域链可以用以下几句话来概括(却额定一个变量来自于哪个作用域)

​	查看当前作用域, 如果当前作用域声明了这个变量, 就确定结果

​		查找当前作用域的上级作用域, 也就是当前函数的上级函数, 看看上级函数中有没有声明

   			再查看上级函数的上级函数, 直到全局作用域为止

​				如果全局作用域中也没有, 我们就认为这个变量未声明

#### 闭包

> 当内部函数被保存到了外部时，将会产生闭包. 闭包会导致原有作用域链不释放, 造成内存泄露.

**闭包的应用场景**

1. 模块化

2. 防止变量污染

```js
/*
	模块化小例子
*/
var ktv = (function () {
    //  保护了 smallPrice和total变量, 外部不能直接访问.
    var smallPrice = 1000;
    var total = 0;
	//	自执行函数直接返回一个对象, 对象包括了该模块的一些方法(闭包函数)
    return {
        buy(price) {
            price = price || 0;
            total += price;
        },
        pay() {
            console.log(total < smallPrice ? ('当前商品总价为' + total + '未到最低消费标准, 请继续购买~') : ('现可以付钱, 一共需要支付 ' + total + ' 元'));
        },
        //	必须拥有一定权限方可对私有变量最低消费进行修改
        editPrice(jurisdictionCode, newPrice) {	
            if (jurisdictionCode === 888) {
                smallPrice = newPrice;
                console.log('当前最低消费额度修改为: ' + newPrice)
            } else {
                console.log('对不起, 您权限不够!')
            }
        }
    }
})()
```

- 实现公有变量 (函数累加器)

```javascript
//  闭包作用(1): 公有变量(函数累加器)
function add(){
    var num = 0;
    function a (){
        return ++num;
    }
    return a;
}
var myAdd = add();
console.log(myAdd());
console.log(myAdd());
console.log(myAdd());
console.log(myAdd())
```

- 作缓存 (存储结构)

```javascript
//   闭包作用(2):  缓存(存储结构)
function test(){
    var food = "apple";
    var obj = {
        eatFood(){
            if(food != ""){
                console.log("I am eating "+ food);
                food  = "";
            }else{
                console.log("It is noting");
            }
        },
        pushFood(myfood){
            food = myfood;
        }
    }
    return obj;
}

let MYFOOD = test();
MYFOOD.eatFood();
MYFOOD.eatFood();
MYFOOD.pushFood('banner');
MYFOOD.eatFood();
```

- 实现封装, 属性私有化

```javascript
var inherit = (function() {
    var F = function() {};
    return function(Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin.prototype;	
    }
}())
```

- 模块化开发, 防止污染全局变量

```javascript
var init = (function() {
    var name = '小白';
    var gender = '男';
    function change() {
        //code..
    }
    function callName() {
        console.log(name);
    }
    return function() {
        callName();
        change();
    }
}())
```

**闭包的释放**

```js
var bbfun = (function(){return{fun1(){},func2(){}}})()
//	闭包释放问题, 直接为null | undefined
bbfun = null;
```

#### 立即执行函数

> 立即执行函数 :  此类函数未声明, 在一次执行过后立即释放. 

`(function () {})()`

```javascript
//	只有表达式才能被执行符号执行*
- function() {}()
+ function() {}()
~ function() {}()
! function() {}()
//	能被执行符号执行的表达式, 函数名自动忽略
+ function test() {}()
```

 ```javascript
function test() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        (function (i) {
            arr[i] = function () {
                document.write(i + ' ');
            }
        })(i)
        /*(function (i) {
                //  var i = 1;
                arr[i] = function () {
                    document.write(i + ' ');
                }
            })(i)
            (function (i) {
                //  var i = 2;
                arr[i] = function () {
                    document.write(i + ' ');
                }
            })(i)
            ...*/
    }
    return arr;
}
var myArr = test();
for (var j = 0; j < 10; j++) {
    myArr[j]();
}
 ```

#### arguments

- arguments.callee 	函数本身引用

```javascript
var jc = (function(n) {
    if (n <= 1) return 1;
    return n * arguments.callee(n - 1)
}(5))
```

- func.caller 		谁调用了该函数的引用

#### 深度克隆

```javascript
function clone(obj){
    var temp;
    if(obj instanceof Array){
        temp = [];
        var length = obj.length;
        while(length--){
            temp[length] = clone(obj[length])
        }
        return temp;
    }
    if(obj instanceof Object){
        temp  = {};
        for (var key in obj) {
            temp[key] = clone(obj[key]);
        }
        return temp;
    }
    return temp = obj;
}

var obj = [1,3,4,5,{'a':2,'b':5}];
var obj2 =  clone(obj);

obj2.push(6);
console.log(obj);
```

#### 函数的四种调用及this指向问题

##### 函数的调用方式

```js
/*
	函数调用, this 指向 window
*/
var age = 18;
function fn(){
    console.log(this.age)
}
fn()	//	18 

//	特殊例子
var p = {
    age: 15,
    say:function(){
        console.log(this.age)
    }
}
var f1 = p.say
f1()	//	18

```

##### 方法的调用方式

```js
/*
	方法的调用, this 指向调用方法的对象
*/
function Person(){
    this.age = 20;
}
Person.prototype.run = function(){
    console.log(this.age)
}
var p1 = new Person()
p1.run()	//	20


var p2 = {
    height: 167,
    travel: function(){
        console.log(this.height)
    }
}
p2.travel()	//	167


//	特殊例子
var length: 50;
var clear = function(){
    console.log(this.length)
}
var tom = { lenghh:100, c: clear };
tom.c()	//	100

var tony = { d:clear, length:30 }
tony.d()	//	30
```

##### 构造函数的调用方式

```js
/*
	通过 new 关键字调用, 函数内部this指向构造函数的实例
*/
function fn(name){
    this.name = name
}
var _n = new fn("小白");	//	_n 有个name属性, 值为 小白


//	特殊例子
function jQuery(){
    var _init = jQuery.prototype._init;
    return new _init();
}
jQuery.prototype = {
    constructor:jQuery,
    length:100,
    _init:function(){
        //	此时的 _init.prototype 并不是 jQuery.prototype, _init 内部没有length属性,所以为 undefined
        console.log(this.length)
    }
}
jQuery()	//	undefined   -------  通过new 调用 _init() 其内部 this 指向 _init 构造函数的实例


//	修改特殊例子
function jQuery() {
    var _init = jQuery.prototype._init;
    return new _init();
}
jQuery.prototype = {
    constructor: jQuery,
    length: 100,
    _init: function () {
        //	this指向init构造函数的实例
        console.log(this.length)
    }
}
//	修改函数 _init 的原型, 直接指向 jQuery 的原型
jQuery.prototype._init.prototype =  jQuery.prototype
jQuery()	//	100
```

**tip: ** 对象属性查找规则

```
 //	->	首先查看本身有无 length 属性
 //	->	如果本身没有, 去原型对象中查找
 //	->	如果原型对象中没有, 去原型对象的原型对象中找, 直到根对象(Object.prototype)
 //	-> 	再没有, 我们认为该对象没有该属性, 即访问对象不存在的属性, 值为 undefined
```

##### 上下文调用方式

```js
/*
	call/apply
		方法的第一个参数决定了函数内部this的值
*/
function f1(){
    console.log(this)
}
f1.call([1,2,3])
f1.call({a:1,b:2})
f1.call(1)
f1.call("abc")
f1.call(true)
f1.call(null)
f1.call(undefined)
```

**tip**: call/apply 方法的第一个参数

1. 如果是一个对象类型, 那么函数内部的 this 指向该对象

2. 如果是 undefined/null, 那么函数内部的 this 指向window

3. 如果是数字 this 指向对应的Number 构造函数的实例   1 ---> new Number(1)

   如果是字符串, this 指向对应 String 构造函数的实例 "abc" ---> new String("abc")

   如果是布尔值, this 指向对应 Boolean 构造函数的实例 true ---> new Boolean(true)

**call/bind 区别: 函数传参形式不同**

```js
/*
	bind 只改变函数this指向, 不帮助函数执行.
*/
var obj = {
    age: 18,
    run: function(){
        setTimeout(function(){
            console.log(this.age)	//	18? 此时 this 指向 window, 所以这里正确打印的应该是 undefined
        },50)
    }
}

//	修改, 通过bind改变this指向
var obj = {
    age: 18,
    run: function(){
        setTimeout((function(){
            console.log(this.age)	//	18? 此时 this 指向 window
        }).bind(this),50)	//	通过bind修改this指向为 obj, 所以此时打印 18
    }
}
obj.run()	//	18

//	例子2
function speed(){
    console.log(this.seconds)
}
//	指向了bind方法之后, 产生一个新函数, 这个新函数的逻辑和原来的还是一样, 唯一的不同就是 this指向被修改了
var speedBind = speed.bind({ seconds:100 })
speedBind()	//	100

//	简化写法如下
(function speed(){
    console.log(this.seconds)
}).bind({ seconds:100 })()	//	100

//	例子3
var obj2 = {
    name: "西瓜",
    drink: (function(){
        console.log(this.name)
    }).bind({ name: "橙汁" })
}
obj2.drink()	//	橙汁
```

##### 实现bind方法

```js
//  手动实现bind方法
//1. bind 方法应该放在函数的原型中
//2. bind 方法不代替函数执行

Function.prototype._bind = function (target) {
    //  target 表示新函数的内部 this 的值
    //  利用闭包创建一个内部函数, 返回所谓的新函数
    return () => {
        this.call(target)
    }
    /* var _this = this;
      return function () {
        _this.call(target)
      } */
}

function fn() {
    console.log(this)	//	{ gender: '男' }
}
fn._bind({ gender: '男' })();
```



---

### 对象(Object)

> 特指的某个事物, 具有属性和方法(一组无序的属性集合)

- 属性的 增 删 改 查
- 对象的创建方法
  - 字面量(plainObject)	{}
  - 构造函数  new Object()
  - Object.create()  

 ```javascript
var obj = {
	name: '小白',
    age: 18,
    sex: '男',
    hobbies: ['listen', 'sing'],
    change: function() {
        document.write(this.age --);
    }
}
//	增
obj.look = 'face to face';
obj['look'] = 'face to face';
//	删
delete obj.look;
//	查
obj.look;
//	改
obj.look = 'see me some time'
 ```

```javascript
//	对象的创建方法二 	第一个参数是原型对象, 第二个参数是属性的一个镀锡集合
var obj = Object.create({}, {
    "name": {
        value: '小白',
        writable: true,		//	可写
        enumerable: true,	//	可枚举
        configurable: true	//	可配置
    },
    "age": {
        value: 18,
        writable: true,
        enumerable: true,
        configurable: true
    }
})
```



#### 包装类

> 原始值是不能有属性和方法的.
>
> null 和 undefined 不能有属性和方法.
>
> 用处: 容错

```javascript
var num = 4;
num.len = 3;
//new Number(4).len = 3;	delete
console.log(num.len);	//	undefined
//new Number(4).len		
//-------------------------------------------
var str = 'abcd';
str.length = 2;
//	new String('abcd').length = 2;	delete
console.log(str.lenth);	//	4
```



#### 面向对象编程

> 面向对象: 提出需求, 找对象, 对象解决, 注重的是结果
>
> 特征: 封装, 继承, 多态(抽象性)

编程思想: **根据需求, 抽象出相关对象, 总结对象的特征和行为, 把特征变成属性, 行为变成方法, 定义js构造函数, 实例化对象, 通过对象调用属性和方法, 完成相应需求.**

#### 构造函数

**特点**: 大驼峰式命名

**内部原理** (有了new 之后)

- 函数体最前面隐式加上 this = {}
- 执行 this.xxx = xxx
- 隐式的返回 this

```javascript
//	工厂模式函数
function student(name, age, gender) {
	var obj = {};
    obj.name = name;
	obj.age = age;    
    obj.gender = gender;
    obj.sayHi = function() {
        document.write('Hello C');
    }
    return obj;
}
var student = student('小白', 18, '男');

//	自定义构造函数
function Student(name, age, gender) {
    //	this = {
    //		name = "",
	//		age = "",
    //		gender = "",  
    //		__proto__: Student.prototype
    //}
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.grade = 2017;
    //	return this;
}
var student1 = new Student('小白', 18, '男');
var student2 = new Student('懵宝', 23, '男');

//	实例化对象和构造函数的关系	-> 	实例对象通过构造函数创建的, 这个过程叫实例化

//	如何判断对象是不是由这个构造函数实例化的: 
//	① 通过构造器的方式   实例对象.构造器 === 构造函数名称 (student1.constructor === Student) 
//	② 通过 对象 instanceof 构造函数名	√
```

#### 原型

 `prototype`

> **定义**: 原型是function对象的一个属性, 它定义了构造函数制造出来的对象的公共祖先. 通过该构造函数产生的对象, 可以继承该原型的属性和方法. 原型也是对象
>
> - 可以提取共有属性: 实现数据共享, 减少内存空间的占用.
> - `__proto__`  原型链
> - `constructor` 指向构造函数本身
>

 构造函数有一个属性 **prototype**, 是原型.

 实例对象中的 **\_\_ proto\_\_**  是原型.

 实例化对象中的 **\_\_proto\_\_** 指向就是该实例化对象的构造函数中的 **prototype** 

 构造函数中的 **prototype** 里面的属性和方法. 可以直接通过实例化对象调用 

```javascript
//Person.prototype 		原型
//Person.prototype = {}	是祖先

Person.prototype.sayHi = function(){	//	共有部分提取: 实现数据共享, 减少内存空间 *
    document.write('hello dear!')
}
Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
};
var parson = new Person('小白', 18, 'man');
```

**原型的 增 删 改 查**

```javascript
//	增 改
Person.prototype.lastName = '懵宝'
//	删
delete Person.prototype.lastName
//	查
Person.prototype
```

**原型的对象式写法**

```javascript
function MyInfo(name, age, sex) {
            this.name = name;
            this.age = age;
            this.sex = sex;
        }
        /* MyInfo.prototype.showInfo = function (name,age,sex) {
            return `${name}的年龄是${age},性别是${sex}!`;
        };
        MyInfo.prototype.showOther = () => `这是MyInfo构造函数的showOther方法`; */
        //  对象式写法
        MyInfo.prototype = {
            constructor: MyInfo, //  修正原型指向
            showInfo: (name, age, sex) => `${name}的年龄是${age},性别是${sex}!`,
            showOther: () => `这是MyInfo构造函数的showOther方法`,
        }

        let man1 = new MyInfo('小白', 19, '男');
        let man2 = new MyInfo('懵宝', 23, '男');

        console.log(man1.showInfo('小白', 19, '女'));
        console.log(man1.showOther());
        console.log(man2.showInfo('懵宝', 23, '男'));
```

  #### 原型链

> 原型链  
>
> 绝对大多数的对象最终都会继承自 Object.prototype  -->  ps: 除了 Object.create(null)
>
> Object.create(原型) 

**因为Object.create()的存在, 可以创建没有prototype的对象 `Object.create(null)`**

```javascript
//	Grand.prototype --> Object.prototype
Grand.prototype.lastName = "祖先"
function Grand() {}
var grand = new Grand()
Father.prototype = grand
function Father() {}
var father = new Father()
Son.prototype = father
function Son() {}
var son = new Son()
document.write(son.lastName)
```

#### apply call

> 作用: 修改 this 指向(借用别人的函数, 实现自己的需求)
>
> 区别: 传参形式不同

```javascript
//	test()	->	test.call()
//	test.call(this指向, 参数1, 参数2, ...)
//	test.apply(this指向, [参数1, 参数2, 参数...])
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}
function Other(height, weight) {
    this.height = height;
    this.weight = weight;
}
function Student (name, age, sex, tel, hobbise, height, weight) {
    Other.apply(this, [height, weight]);
    Person.call(this, name, age, sex);
    this.tel = tel;
    this.hobbies = hobbise;
}
var student = new Student('小白', 18, '男' , '1234567890', ['football', 'sing', 'listen'], 167, 55);
```

#### bind

> bind:	改变 this 指向, 不代替函数执行
>
> 其实就是复制一份
>
> 参数1 --- 指定的this作用对象.

```javascript
function ShowRandom() {
    this.number = parseInt(Math.random() * 10 + 1);
}

ShowRandom.prototype.show1 = function () {
    setInterval(this.show2.bind(this), 300);	// 	bind 改变了定时器中this指向
};
ShowRandom.prototype.show2 = function () {
    console.log(this.number);
};

var show = new ShowRandom();
show.show1();
```



#### 继承模式

**继承发展**

- 传统模式	(原型链)

> 原型链继承: 过多的继承了没用的属性

```javascript
Grand.prototype.lastName = "祖先";
function Grand() {}
var grand = new Grand();
Father.prototype = grand;
function Father() {}
var father = new Father();
Son.prototype = father;
function Son() {}
var son = new Son();
console.log(son.lastName)
```

- 借用构造函数

> 不能继成借用构造函数的原型
>
> 每次构造函数都要多走一个函数

```javascript
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}
function Student(name, age, sex, grade) {
    Person.call(this, name, age, sex);
    this.grade = grade; 
}
var student = new Student();
```

```js
//	例子2
function Fn(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex
}
Fn.prototype.say = function () {
    console.log('hello, myName is', this.name)
}
var person1 = new Fn('小白', 19, '男')
person1.say()


//  借用构造函数实现继承
function Fn2(name, age, sex, girlName) {
    Fn.apply(this, [name, age, sex])
    this.say = Fn.prototype.say;
    this.girlFriend = girlName
}
Fn2.prototype.sayMore = function () {
    console.log('My name is ' + this.name + ', I have a girlFriend and her name is ' + this.girlFriend)
}
var person2 = new Fn2('小白菜', 19, '男', 'GEM')
person2.say()
person2.sayMore()
```



- 共享原型

> 不嗯能够随便改动自己的原型

```javascript
Father.prototype.lastName = "小白"
function Father() {}
function Son() {}
Son.prototype = Father.prototype
var son = new Son();
var father = new Father();
console.log(son.lastName, father.lastName);
```

```javascript
//	inherit方法封装: 用于共享原型的实现
function inherit(Target, Origin) {
    Target.prototype = Origin.prototype;
}
inherit(Son, Father);
```

- **圣杯模式***

```javascript
function inherit(Target, Origin) {
	function F() {};
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;
    Target.prototype.uber = Origin.prototype;	//	存储超类
}
```

```javascript
//	闭包实现私有化变量
var inherit = (function() {
    var F = function() {};
    return function(Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin.prototype;	
    }
})();
```

```js
 /* function inherit(Target, Origin) {
            function F() {};
            F.prototype = Origin.prototype;
            Target.prototype = new F();
            Target.prototype.constructor = Target;
            Target.prototype.uber = Origin.prototype; //	存储超类
        } */


//	闭包实现私有化变量
var inherit = (function () {
    var F = function () {};
    return function (Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin.prototype;
    }
}());

function Fa() {}
Fa.prototype = {
    show() {}
}
function So() {}

inherit(So, Fa);

So.prototype.show = '2333';
console.log(new So());
console.log(new Fa());
```

#### 命名空间

> 管理变量, 防止污染全局, 适用于模块化开发

```javascript
//	以往命名空间
var org = {
    department1: {
        xiaobai: {
            change: function() {}
        },
        mengbao: {
            change: function() {}
        }
    }
}
var xiaobai = org.department1.xiaobai;
xiaobai.change();
 

//	我们可以使用闭包来解决变量污染问题 : 
let init = (function(){
    let name = "小白";
    function callName(){
        console.log(name);
    }
    return function(){
        callName();
    };
})()

init();
```

#### 对象的枚举(遍历)

- for in
  - hasOwnProperty()	过滤原型链上的属性
  - in     属性是否是对象上的属性(继承也算)
  - instanceof       `A instanceof B` 判断A的原型链上有没有B的原型

```javascript
var arr = [1, 2, 3, 12412412, '小白', '爱思雅'];
var obj = {
    name: '小白',
    arr : arr,
    __proto__: {
        lastName: '原型链属性'
    }
};
for (var key in obj) {
    if (obj.hasOwnProperty(key)) {	//	hasOwnProperty() 排除原型链上的属性
        document.write(obj[key] + '<br>')
    }
}

//	in 操作符
'name' in obj	//判断name是否是obj的属性(包括继承)

//	instanceof 操作符
//A instanceof B //	;判断A的原型链上有没有B的原型*
[] instanceof Object	//true

//	区分数组和对象
//① 变量 instanceof Array	//true -> 变量则是数组  false 变量则是对象
//② toString()
Object.prototype.toString.call([])	//[object Array]
```

#### this

- 函数预编译过程 this -- window
- 全局作用域里  this -- window
- call/apply 可以改变函数运行时this指向
- obj.func()  func() 里面的 this 指向 obj

```javascript
var name = '222';
var a = {
    name: '111',
    say: function() {
    	console.log(this.name)	
	}
}
var fun = a.say;
fun();			//222
a.say()			//111
var b = {
    name: '333',
    say: function(fun) {
        fun(); 
    }
}
b.say(a.say);	//222
b.say = a.say;
b.say(); 		//333
```



---

### 数组

> Array

**创建方式**

- []
- new Array()

**读写操作**

- arr[index]
- arr[xxx] = xxx

#### **常用方法**

##### **改变原数组**

- `pop()`	剪切数组最后一位
- `push()`     在数组最后一位添加

```javascript
Array.prototype.mypush = function() {
    for(var i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
}
```

- `unshift()` 在数组第一位前添加

```javascript
Array.prototype.myunshift = function () {
    var temp = this.reverse();
    for (var key in arguments) {
        temp.push(arguments[key]);
    }
    temp.reverse();
    return temp.length;
}
```

- `shift()`     剪切数组第一位
- `sort()`       数组排序

```javascript
//接受一个函数
arr.sort(function (a, b) {   //  冒泡排序算法
    //  必须两个形参, 看返回值
    //  ①返回值是负数的时候, 前面的数在前
    //  ②返回值是正数时, 后面的数在前
    //(a > b) ? 1 : -1; //  升序
    return a - b;	
    //return b-a; 	// 降序
    //return Math.random() - 0.5	//	随机
})
```

- `reverse()`   翻转数组
- `splice()`     删 增 改, 可倒着来(-1)

```javascript
//	从第几位开始截取, 截取多少的长度, 在切口处添加新的数据
array.splice(0,1,'啊啊啊啊');
```

##### **不改变原数组**

- concat	合并数组

```javascript
 arr = [1,2,3]
var newA = arr.concat([2,3,4]);
console.log(newA)
```

- `slice() ` 从该位开始截取, 截取到该位	

只有一个参数.从该位开始 截取到最后.

不传参数. 全部截取: 用于类数组转为真数组.

- `join()`  拆分数组， 以 参数 链接成字符串

```javascript
var newa = arr.join('-'); ['1',2,3] => '1-2-3'

//	字符串有个可逆的方法 字符串 -> 数组 
str.stringify()
```

**数组去重**

```javascript
Array.prototype.uniq = function () {
    if (this.length <= 1) return this;
    var aResult = [];
    for (var i = 0, length = this.length; i < length; i++) {
        if (_notHas(aResult, this[i])) aResult.push(this[i]);
    }
    function _notHas(temp, o) {
        if (temp.length <= 1) return true;
        for (var k = 0, length = temp.length; k < length; k++) {
            if (temp[k] === o) return false;
        }
        return true;
    }
    return aResult;
}

//对象式去重
Array.prototype.uniq = function() {
    var temp = {}, 
        arr = [], 
        length = this.length;
    for (var i = 0; i < length; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = 'abc';
            arr.push(this[i]);
        }
    }
    return arr;
}
```

#### 类数组

```javascript
var obj = {
    "0": 'a',
    "1": 'b',
    "2": 'c',
    "length": 3,
    "push": Array.prototype.push
}
//	类数组: 属性要为索引(数字)属性, 必须有length属性, 最好加上push方法
//	如果给类数组添加数组的splice方法就可以让该类数组使用数组所有方法了, 还可以用对象的方法.
```

```javascript
var obj = {
    "2": 'a',
    "3": 'b'
    "length": 2,
    "push": Array.prototype.push
}
obj.push('c');
obj.push('d');
//obj -> ???
obj = {
	"2": 'c',
    "3": 'd',
    length: 4,
    push: Array.prototype.push
} 
```

#### 小结: 数组

```js
# 创建数组
new Array()
[]

# 添加数组
var newAttr = "new Attr"
arr.push(newAttr)	//	最后添加一项
arr.unshift(newAttr)	//	起始添加一项
arr.splice(下标, 0, newAttr) //	从指定下标,删除0位,添加newAttr属性,下标超范围,按边界处理
arr[arr.length] = newAttr
//	push unshift splice 可以添加多个数据

# 删除数组
delete arr[index] //	会使数组疏松化, 不推荐
arr.pop() //	删除数组最后一项, 返回最后一项(被删除数据)
arr.shift() //	删除第一项, 返回第一项(被删除数据)
arr.splice(起始下标,删除数量,添加的数据) //	从指定下标开始,删除指定数量数据,在该位置添加新数据,如果下标超范围,按照范围边界处理.返回新数组(记录被删除的数据)

# 其它
arr.slice(起始下标,结束下标) //	将起始下标到结束下标之间的数据拿出来,得到一个新数组.不包含结束下标数据;如果起始下标为负数,从后面开始.不传参截取全部(浅克隆)
//	数组清空
arr.length = 0
arr.splice(0,arr.length)
//	查找数组某项下标
arr.indexOf('attr') //	从arr开头开始查找 attr 属性,找到最新 attr 属性出现位置. 返回下标位置,没找到返回-1
arr.lastIndexOf('attr') // arr 末尾开始查找 attr 属性,找到返回最后 attr 属性出现位置. 没有返回-1
//填充数组
arr.fill(数据) //	将arr所有项填充为数据.
arr.fill(数据, 开始下标) //将arr从开始下标位置开始,直到最后, 填充为数据.
arr.fill(数据, 开始下标, 结束下标) //	将arr从开始下标位置开始填充数据,直到结束下标为止.不包括结束下标的位置
```

##### 作业

```JS
1. 提示用户输入数组的长度，以及数组每一项的值，然后输出该数组 
2. 初始化一个数字数组，然后求该数组所有项之和
3. 初始化一个数字数组，然后输出数组中所有的奇数
4. 初始化一个数字数组，然后输出数组中所有的素数
5. 斐波拉契数列是这样一种数列：1  1  2  3  5  8  13 ......
数列前两位为1，第n位=第n-1位+第n-2位
让用户输入斐波拉契数列的长度，在控制台中打印该长度的斐波拉契数列
var num = +prompt("请输入斐波拉且数列长度查看数列");
var arr = [];
if (isNaN(num) || num < 1) {
	console.log('输入有误');
} else {
	for (var i = 0; i < num; i++) {
		// 第一项or第二项为 1
		if (i === 0 || i === 1) {
			arr[i] = 1;
		} else {
			arr[i] = arr[i - 1] + arr[i - 2];
		}
	}
}

6. 定义一个用户数组，数组的每一项是一个用户对象，用户对象中包含账号和密码，随意初始化一些对象放入数组中。然后提示用户输入账号和密码，判断是否登录成功
7. 初始化一个5*5的二维数组，数组每一项是一个数字，计算对角线之和
8. 初始化一个数字数组（数据随意），对该数组进行升序排序，然后输出结果
思路提示：
数组的排序有多种算法可以完成，这里介绍其中一种：冒泡排序算法
冒泡排序算法的原理如下：
- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
- 针对所有的元素重复以上的步骤，除了已排好序的元素。

//  第一次 四次比较   1+4 = 5 arr.length
// 1231 312312 212 12 12
// 1231 212 312312 12 12
// 1231 212 12 312312 12
// 1231 212 12 12 312312

//  第二次 三次比较  
// 212 1231 12 12 312312
// 212 12 1231 12 312312
// 212 12 12 1231 312312

//  第三次 2次比较
// 12 212 12 1231 312312
// 12 12 212 1231 312312

//  第四次 1次比较
// 12 12 212 1231 312312

var arr = [1231, 312, 312312312,312, 212, 12, 12];
for (var i = 0; i < arr.length -1; i++) {
  for (var j = 0; j < arr.length - i; j++) {
    if (arr[j] > arr[j + 1]) {
       // 交换位置
       var tmp = arr[j];
       arr[j] = arr[j + 1];
       arr[j + 1] = tmp;
    }
  }
}

9. 有一个数组，存放了一些数字，找出出现频率最高的数字
    var arr = [1231, 312, 312312312, 312, 212, 12, 12, 12331312, 32112, 1254, 6754, 75, 1, 1231];
    var tmpObj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!tmpObj[arr[i]]) {
        tmpObj[arr[i]] = 1;
      } else {
        tmpObj[arr[i]]++;
      }
    }
    var maxObj;
    for (var key in tmpObj) {
      if (!maxObj || tmpObj[key] > maxObj["count"]) {
        maxObj = {
          num: key,
          count: tmpObj[key]
        }
      }
    }
    
10.初始化一个数字数组，求最大和最小值
```

### JSON 数据格式

> JSON是一种传输数据的格式(以对象为样板, 本质上就是对象, 但用途有区别,json是用来传输的).
>
> 约定属性名添加 双引号, 依次与对象分别

```javascript
//	JSON.stringify()	JSON -> string
//	JSON.parse()		string -> JSON
```

### 容错机制 try..catch

`try{}catch(e){}`

```javascript
try {
    console.log(1);
    console.leg(2);
    console.log(1);
} catch(e) {
    console.log(e.name, '\n'+ e.message);	//	只有try中出错的时候, 这里会执行 e 是捕捉到的错误对象
}
console.log(5);
//	在try里面发生错误, 不会执行错误后的try里面的代码
//	第一条执行, 最后一条执行. 
```

**错误类型**

- ReferenceError *	  非法或不能识别的引用数值(变量未声明就使用/调用等)
- RangeError             数值越界
- SyntaxError            语法解析错误
- TypeError                操作数类型错误

### es5标准模式

> "use strict"  es5.0严格模式启动
>
> - 在 script 代码最顶端 -- 全局启动
> - 在 function 代码 最前端 -- 局部启动

**严格模式的启动意味着代码必须遵从es5.0规范**

- `arguments.callee`   `func.caller`   `with()` 不可用

```javascript
//	arguments.callee 指代函数本身
//	func.caller  指代调用函数的对象
//	with(对象){}  如果参数是一个对象, 就是把该对象所在的执行期AO对象 作为某个环境中最顶端, 改变作用域链结构.
```

- 变量必须先声明再赋值 
- 局部的 this 必须被赋值(apply/call), 没有赋值就是 undefined  
- 拒绝重复属性和参数
- 不能使用 eval() 可以将字符串当做代码来使用. eval是魔鬼.

---

## BOM



---

## DOM

> Document Object Model 文档对象模型
>
> DOM 定义了表示和修改文档所需的方法. DOM对象即为宿主对象, 由浏览器厂商定义, 用来操作html和xml功能的一类对象的集合, 也有人称DOM是对HTML以及XML的标准编程接口  

### DOM 结构树

![52877441167](.\javascript\1528774411674.png)

### DOM基本操作

`getElementById` 方法只在 **Documement.prototype** 上定义, 即 `Element` 节点无法使用.

`getElementsByClassName`, `querySelector`, `querySelectorAll` 在 **Document.prototype** 和 **Element.prototype** 上均有定义.

`getElementsByTagName` 方法定义在了 **Document.prototype** 和 **Element.prototype**.

**HTMLDocument.prototype** 上定义了一些常用属性, `body`, `head`等, 分别指html文档中的 `body`  和 `head` 节点

**Document.prototype** 上定义了documentElemnt 属性, 指文档根元素 `html`.

**查**

- **document.getElementById()**	       静态
- **element.querySelector()**                    静态 IE9+
- **element.querySelectorAll**                  静态 IE9+
- **element.getElementsByTagName()**  IE9+
- **element.getElementsByName()**        form 的 name属性获取
- **element.getElementsByClassName()**

**遍历节点树**

- **element.parentNode**   父元素节点, 顶端是document
- element.childNodes       所有子节点 (包含非元素节点)
- element.firstChild           第一个子节点
- element.lastChild            最后一个子节点
- **element.nextSibling**     后一个兄弟节点
- element.previousSibling 前一个兄弟节点

**基于元素节点的遍历** 

- element.parentElement    当前元素节点的父元素节点  IE9+
- **element.children**                当前元素节点的子元素节点们
- element.firstElementChild   当前元素节点的第一个元素子节点  IE9+
- element.lastElementChild   当前元素节点的最后一个元素子节点  IE9+
- **element.nextElementSibling**  当前元素节点的下一个兄弟元素节点  IE9+
- element.previousElementSibling  当前元素节点的上一个兄弟元素节点  IE9+

**节点的四个属性**

- nodeName  元素节点的标签名称, "大写表示", 只读
- nodeValue   文本节点或者注释节点()的文本内容, 可读写
- **nodeType**   节点类型, 只读 (元素 1, 属性 2, 文本3 , 注释 8, document 9)
- attributes    Element 节点属性集合

**节点的一个方法**

- has childNodes()   判断有无子节点(包含非元素节点)

**增**  

- **document.createElement()**  创建一个元素节点
- document.createTextNode()   创建文本节点
- docuemnt.createComment()  创建注释节点
- **document.createDocumentFragment()** 创建一个文档碎片节点

**插**

- **element.appendChild()**  剪切操作, 也可以移动原有节点位置
- **element.insertBefore()**  插入节点在某子节点之前

**删**

- **element.removeChild()**  父节点剪切子节点(返回值是被剪切的子节点)
- **element.remove()**   节点自杀, 无法保存

**替换**

- element.replaceChild()  用新节点替换原来的节点, 返回被替换的节点
- **element.innerHTML**  识别标签, 读/写 内容
- element.innerText      读/写文本内容 火狐使用 textContent

**节点的标签属性方法**

- **element.setAttribute(**) 给节点设置标签属性
- **element.getAttribute()** 获取节点标签属性

**元素节点克隆**

- element.cloneNode()   布尔传值确定克隆后代节点

### **滚动条滚动距离监听**

window.pageYOffset / window.pageXOffset

document.body.scrollLeft /  document.body.scrollTop

document.documentElement.scrollLeft /  document.documentElement.scrollTop

```javascript
// 兼容封装
var pageOffset = (function() {
    var pageX = window.pageXOffset || (document.body.offsetLeft + document.documentElement.scrollLeft);
    var pageY = window.pageYOffset || (document.body.offsetTop + document.documentElement.offsetTop);
    return {
        'pageX': pageX,
        'pageY': pageY
    };
}())

console.log(pageOffset)
```

### **可视区窗口尺寸**

document.compatMode (CSS1Compat 为标准模式)

window.innerWidth / window.innerHeight

document.documentElement.clientWidth / document.documentElement.clientHeight

document.body.clientWidth / document.body.clientHeight

```javascript
//	兼容封装
var clientOffset = (function() {
    var clientW,
        clientH;
    if (document.compatMode == 'CSS1Compat') { //	标准模式下
        clientW = window.innerWidth || document.documentElement.clientWidth;
        clientH = window.innerHeight || document.documentElement.clientHeight;
    } else { //	怪异模式下
        clientW = document.body.clientWidth;
        clientH = document.body.clientHeight;
    }
    return {
        'clientW': clientW,
        'clientH': clientH
    };
}())

console.log(clientOffset)
```

### 元素尺寸/位置

**非实时获取**

document.getBoundingClientRect() 

**element.offsetWidth / element.offsetHeigh**t   (border+padding+content)

**实时获取**

**window.getComputedStyle(element, null)['prop']** 

element.currentStyle('prop')	IE兼容

> 返回CSSStyleDeclaration, 该节点的最终样式表(只读)
>
> 第二个参数 一般为null, 如果我们想获取元素的伪元素的样式表可以 填写 affter 等

```javascript
//	兼容封装
function cssStyle(element, prop) {
    return parseFloat(window.getComputedStyle(element)[prop] || element.currentStyle(prop));
}
```

**元素位置**

**element.offsetTop / element.offsetLeft**    相对定位父级位置(忽略自身是否定位)

**element.offsetParent**  返回最近定位父级节点

```javascript
//	获取元素相对文档的偏移量
function offsetPosition(element) {
    var totaltLeft = null,
        totalTop = null,
        parent = element.offsetParent;
    totaltLeft += element.offsetLeft;
    totalTop += element.offsetTop;
    while (parent) {
        totaltLeft += parent.offsetLeft;
        totalTop += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return {
        'totaltLeft': totaltLeft,
        'totalTop': totalTop
    };
}
```

### 滚动条滚动事件

window.onscroll = function(){}	监听滚动条滚动

window.scroll() / window.scrollTo()  滚动条滚动到指定距离

window.scrollBy()  滚动条滚动到指定位置, 在指尖数据基础上累积

---

## 日期**对象**

**`new Date()`** 

- getDate()   日
- getDay()    星期 -1 
- getMonth()   月 -1
- getMinutes()  分钟
- getFullYear()   年
- getSeconds()  秒
- getTime()   至今毫秒数
- getTimeZoneOffset()  本地时间与格林威治时间分钟差

---

## 定时器 / 运动函数

`setTimeout()`  `setInterval()`

> 内部 this 指向 window
>
> 移除方法: **clearInterval()**  **clearTimeout() ** 接收定时器执行的返回值
>
> setTimeout("内容", 1000)  这里可以将 "内容" 的代码作 javascript 代码执行

#### 运动函数

`window.requestAnimationFrame` 

```javascript
//	运动函数兼容
window.requestAnimationFrame = window.requestAnimationFrame || function(callback){ return setTimeout(callback, 1000/60) };

window.cancelAnimationFrame = window.cancelAnimationFrame || window.clearTimeout;

//	简单使用
document.onclick = function () {
    var speed = 5;
    var cssL = parseFloat(window.getComputedStyle(op)['left']);
    (function run() {
        op.style.left = cssL + speed++ + 'px';
        if (parseFloat(window.getComputedStyle(op)['left']) < 500) {
            window.requestAnimationFrame(run)
        }
    })()
}
```



---

## 事件

### 事件绑定和解绑

**绑定事件**

- element.onclick = function() {}   一个元素的同一事件只能绑定一个处理反馈
- element.addEventListener('click', function() {}, false) / element.attachEvent('click', function() {})   一个元素的同一事件可以绑定多个处理反馈

```javascript
//	句柄绑定方式
//	元素.on事件名 = 方法
//	addEventListener 绑定方式
ele.attachEvent('click', function() {
	//	内部 this 指向 window
})
```

**解绑事件**

- element.onclick = null 
- element.removeEventListener() / element.detachEvent()

### 事件对象

**`event`**  对象

**`event.target`**  事件源

```javascript
element.onclick = function(event) {
    var event = event || window.event;
    var target =  event.target || event.srcElement;	//	事件源 可以作事件委托
    if (target.nodeName != 'UL') {
        console.log(target.innerHTML)
    }
}
```

### 事件处理模型

> 事件处理模型: 冒泡 捕获 (同一个对象的同一个类型只存在一种处理模型)
>
> **冒泡**: 结构上存在父子关系, 如果把事件绑定给子元素身上, 父元素的事件也会被触发(从内向外一层层冒泡)
>
> **捕获**: 结构上存在父子关系, 会存在事件捕获的功能, 同一事件 自外向里捕获, IE不存在捕获
>
> 执行顺序: 先捕获 后冒泡

**取消冒泡**

event.stopPropagation()	IE9+

event.cancelBubble = true

```javascript
function stop(event) {
    window.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
}
```

**阻止默认**

return false

event.preventDefault()	主流

event.returnValue = false   IE

```javascript
document.addEventListener('contextmenu', function (ev) {
    var ev = ev || window.event
    ev.preventDefault ? ev.preventDefault() : (ev.returnValue = false);
    return false;
})
```

**简单事件封装**

```javascript
var xiaobaiEvent = {
    readyEvent: function (callback) {	//文档结构树完成执行
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', function () {
                callback();
                document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            }, false);
        } else {
            document.attachEvent('onreadystatechange', function () {
                callback();
                document.detachEvent('onreadystatechange', arguments.callee);
            })
        }
    },
    //	注册事件
    addEvent: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, function () {
                handler.call(element);
            })
        } else {
            element['on' + type] = handler;
        }
    },
    // 移除事件
    removeEvent: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    //阻止冒泡
    stopPropagation: function (event) {
        this.getEvent();
        if (window.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    //默认行为阻止
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.renturnValue = false;
        }
    },
    //获取事件源
    getTarget: function (event) {
        return event.target || event.SrcElement;
    },
    //获取event
    getEvent: function (event) {
        return event = event || window.event;
    }
};
```



### 鼠标事件

- click	单击
- mouseenter / mouseleave 鼠标移入移出 不冒泡
- mouseover / mouseout 鼠标移入移出 冒泡
- mousedown 鼠标按下
- mouseup 鼠标抬起
- mousemove 鼠标按下情况再移动

**区分鼠标键值**
`event.button` 

- 左键 0
- 右键 2

### 键盘事件

- keydown 按下
- keypress  抬起, 只响应字符类键盘按键
- keyup      抬起

**键值**

**`keyCode`**

```javascript
document.addEventListener('keyup', function (ev) {
    console.log(ev.keyCode);
    if (ev.keyCode == 39) {
        ppp.style.left = (count+=10) + 'px';
    }
}, false)
```

#### input事件

- change 文本内容改变(失去焦点)
- focus    获得焦点
- blur      失去焦点

**窗体事件**

scroll   滚动条滚动触发

load     文档加载完毕



---

## 异步加载JS

### 绘制页面

domTree (深度优先原则) -> cssTree -> randerTree

**页面重排 reflow** (dom结构重新生成, 重新渲染)

dom节点的删除, 添加, 宽高变化, 位置变化, display, offsetWidth

**页面重绘 repaint** (局部重绘)

dom 颜色更改等

### 异步加载js

> js加载的缺点: 加载工具方法没有必要阻塞文档, 过多js加载会影响页面效率, 一旦网速不好, 整个网站将等待js加载而不进行后续渲染等工作.
>
> 有些工具方法需要按需加载, 用到再加载.

**javascript 异步加载的三种方式**

- defer 异步加载, 弹药等到dom文档全部解析完才会被执行. 只有IE能用, 也可以将代码写到标签内部.

```html
<script type="text/javascript" src="xxx.js" defer="defer"></script>
```

- async 异步加载, 加载完就指向, async 只能加载外部脚本, 不能把js写在script 标签里. 主流IE9+

```html
<script type="text/javascript" src="xxx.js" aysnc="sysnc"></script>
```

- 创建 script, 插入到DOM中, 加载完毕后callBack *

```javascript
loadScript('tools.js', function () {
    test();
});
//	异步加载JS
function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others: Firefox, Safari, Chrome, and Opera
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.body.appendChild(script);
}
```

### JS时间线

>① 创建Document对象 开始解析web页面   (document.readyState = 'leading')
>
>② 遇到 link 外部 css ,创建线程加载, 并继续解析.
>
>③ 遇到外部 script, 未设定async defer 浏览器加载, 阻塞以致加载完毕才继续解析.
>
>④ 遇到外部 script 设定了 async defer, 浏览器创建线程, 对于 defer 的script脚本,等待文档解析完毕再执行 , 对于 anync 的 script 脚本, 加载完立即执行, 继续解析.
>
>⑤ 遇到 img 等, 正常解析dom结构, 异步加载 src , 继续解析.
>
>⑥ 文档解析完毕 (document.readyState = 'interactive').
>
>⑦ 文档解析完成, 所有设置了 defer 的 script脚本按序执行.
>
>⑧ document 对象触发 DOMContentLoaded 事件, 标志着从程序执行.
>
>⑨ 所有的 async 脚本加载完成并执行后, img等加载完毕后 (readyState = 'complete')
>
>⑩ 异步响应方式处理用户输入, 网络事件

### DOM结构加载完成执行代码

```javascript
function domReady(callback) {
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            callback();
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
        }, false)
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState == 'complete') {
                callback();
                document.detachEvent('onreadystatechange', arguments.callee);
            }
        })
    }
}
```



---

## 正则表达式 RegExp

转义字符 `\`

特殊:  `\n` 换行    `\r` 行结束   `\t` 缩进

`正则表达式`

> 匹配特殊字符或有特殊搭配原则的字符集的最佳选择

方式

- `/规则/修饰符`  直接量
- new RegExp(规则, 修饰符)  正则对象

>  一般我们选择直接量方式, 对象方式创建可以传变量

修饰符:

- `i` 忽略大小写
- `g` 全局匹配
- `m` 多行匹配

### 支持正则方法

- **test()**


- **match()** 字符串方法

```javascript
//	test() 和 match() 的使用
var reg = /^a/gm;
var str = 'abcde\na';
reg.test(str);	//true
str.match(reg);	//['a', 'a']
```

- **search()** 字符串方法, 返回匹配位置 匹配不到返回 -1
- **split()**  字符串方法, 按规则切割字符串
- **replace()**  字符串方法, 替换匹配内容 `$` 引用子表达式

```javascript
//	replace() 非正则表达式
var str = 'aabc';
str.replace('a', 'b'); //'babc'	替换一次	
//	正则表达式形式
str.replace(/a/g, 'b'); // 'bbbc' 全局匹配替换

//	倒序演示  aabb - > bbaa  使用 $ 来反向引用
var reg = /(\w)\1(\w)\2/g;
var str = "aabb";
str.replace(reg, '$2$2$1$1');	//	bbaa

//	可以传递一个 function, return 结果就是输出结果
str.replace(reg, function($, $1, $2){	//	bbaa
    return $2 + $2 + $1 + $1;	
})
```

- **reg.exec()** 配合 **reg.lastIndex(游标)** 属性的使用 *

```javascript
//	reg.exec() 的使用 , 挂载全局匹配的情况
var reg = /ab/g;
var str = 'ababab';
console.log(reg.lastIndex); //	0
console.log(reg.exec(str));	//	["ab", index: 0, input: "ababab", groups: undefined]
console.log(reg.lastIndex); //	2
console.log(reg.exec(str));	//	["ab", index: 2, input: "ababab", groups: undefined]
console.log(reg.lastIndex);	//	4
console.log(reg.exec(str));	//	["ab", index: 4, input: "ababab", groups: undefined]
console.log(reg.lastIndex);	//	6
console.log(reg.exec(str));	//  null
console.log(reg.lastIndex);	//	0
console.log(reg.exec(str));	//	["ab", index: 0, input: "ababab", groups: undefined]

//	更改lastIndex(游标)后的情况: 控制游标匹配位置
var reg = /ab/g;
var str = 'ababab';
console.log(reg.lastIndex); //	0
console.log(reg.exec(str));	//	["ab", index: 0, input: "ababab", groups: undefined]
reg.lastIndex = 0;	//   设置游标位置 
console.log(reg.exec(str));	//	["ab", index: 0, input: "ababab", groups: undefined]
console.log(reg.lastIndex); //	2
reg.lastIndex = 0;	//   设置游标位置 
console.log(reg.exec(str));	//	["ab", index: 0, input: "ababab", groups: undefined]

//	reg 没有全局匹配的情况下, 游标永远是 0, 匹配到的永远是第一个
```

### 正则规则

**表达式**

`[]` 一个表达式表示一个字符

`^`  查找任何不在表达式中的内容

`()`  一个区间, 查找任何设置的选项

```javascript
var reg = /[^a][0-9A-z]/g;
var str = 'ab1cd';
str.match(reg);	//	['b1', 'cd']

//() 查找任何设置的选项
var reg = /(red|blue|green)[0-9]/g;
var str = 'red520';
str.match(reg);	//	['red5']
```

**元字符**

`.`  查找单个字符, 除了换行和行结束符 `[^\r\n]`

`\w`  单词字符 `[0-9A-z_]`      	`\W`  非单词字符  `[^\w]`

`\d`  数字字符 `[0-9]`   	`\D` 非数字字符  `[^\d]`

`\s`  空白字符 `[\t\n\t\v\f]` 	    `\S`  非空白字符 

`\b` 单词边界 	 `\B` 非单词边界

```javascript
var reg = /\bhello\b/g;
var str = 'hello world';
str.match(reg); //	hello
```

`\uxxxx`  匹配 unicode 字符 (啥都可以匹配)

`[\w\W]` 匹配所有

**量词**

`n+`  {1, } 至少一个n的字符串

`n{1, }`

`n*`  {0, } 逻辑上可以匹配空值

`n?`  {0, 1}

`n{x} `  {x} 个

`n{x, y}` {y-x} 个

```javascript
//	* => {0, } 逻辑上有位置的, 空.  贪婪匹配原则
var reg = /\d*/g;
var str = 'abc';
str.match(reg);	// ['', '', '', '']	

var reg2 = /\w*/g;
str.match(reg2); //	['abc', '']

var reg3 = /\d+/g;
str.match(reg3); //	['abc']
```

`^n`  `n$ `  以n开头 n结尾 

**子表达式** `()` 配合 `\num`  的使用  ---  **反向引用字表达式中的内容**

```javascript
//	\num 复制第num个子表达式内容
var str = 'aaaa';
var reg = /(\w)\1/g;
str.match(reg);	//	\1 在这里的作用是 复制一次第一个子表达式中内容

//	匹配aabb
var reg = /(\w)\1(\w)\2/g; 

//	子表达式 配合 exec()类数组集合.第一位是匹配的源字符串, 第二位是第一个子表达式, 以此类推
var str = 'aabb';
var reg = /(\w)\1(\w)\2/g; 
console.log(reg.match(str));//	['aabb'] 非全局匹配的情况行如exec结果, 如果使用全局匹配, 直接返回 匹配结果.
console.log(reg.exec(str));	//	(3) ["aabb", "a", "b", index: 0, input: "aabb", groups: undefined]
```

**正向预查(正向断言)** and **非正向预查**

`?=`   `?!`

```javascript
var str = 'abaaaa';
var reg = /a(?=b)/g;	//	a后面跟着b  b只是参与修饰, 不参与匹配
str.match(reg); //	['a']

// 非正向预查
var reg2 = /a(?!b)/g;	//	a后面不是b的a 
str.match(reg2); //	['a', 'a', 'a', 'a'];
```

**非贪婪匹配规则**

`{n, }? ` `*?` `+?`  `??`  `{m, n}?`



### 简单练习

```javascript
//	字符串去重
var str = 'aaaaaaabbbbbbbbbbbccccccccccc';
var reg = /(\w)\1*/g;
str.replace(reg, '$1');

// 100.1000.000	形式
var str = '10000000000000';
var reg = /(?=(\B)(\d{3})+$)/g;			
str.replace(reg, '.');	//	100,000,000,000,000
//	从后往前 3个字母 匹配多个 /((\d{3})+$)/g
//	空的后面带上述条件 /(?=(\d{3})+$)/g   匹配空: 不写
//	去除单词开头	/(?=(\B)(\d{3})+$)/g   
```

### 常用正则

```js
//	去除两边空格
function trim(str) {
    return str.replace(/^\s+|\s+$/g, "")
}

//  手机号码
function phoneTure(phonenumber){
    return /^1[34578]\d{9}$/.test(phonenumber)
}
```



---

# 不知道的 JavaScript

## 原理

### 浏览器常驻的线程

- js引擎线程
- GUI线程(绘制界面,与js引擎程互斥)
- http网络请求线程
- 定时触发器线程
- 浏览器事件处理线程

**Js执行机制 - 单线程: 同一时间只能做一件事**

关于定时器

```JS
var startTime = +new Date()
function test(time) {
    for (var i = 0; i < time; i++) {
        console.log(i)
    }
}
console.log('startTime--', startTime)
setTimeout(() => {
    console.log('distanceTime--', +new Date - startTime)	//	~700ms
}, 100)
test(10000)
```

setTimeout等待事件结束后并不是直接执行的，而是先推入浏览器的一个任务队列，在同步队列结束后依次调用任务队列中的任务

setInterval 是每隔一段时间把任务放到 Event Queue（事件队列） 中

### call/apply 模拟实现

```JS
Function.prototype.myCall = function () {
    var ctx = arguments[0] || window;
    var params = [];
    for (var i = 1; i < arguments.length; i++) {
        params.push('arguments[' + i + ']')
    }
    console.log(params)
    ctx.fn = this
    eval('ctx.fn(' + params.join(',') + ')')
    delete ctx.fn
}


Function.prototype.myApply = function (ctx, arr) {
    if (!arr) {
        ctx.fn = this;
        ctx.fn()
    } else {
        ctx.fn = this;
        ctx.fn(...arr);
    }
    delete ctx.fn;
}
```

## 函数式编程



# es6常用

##### 模板字符串

1. 解决字符串和变量拼接
2. 解决字符串换行

```js
let variable = '一个变量';
s4 = `abc${variable}`;	//	'abc一个变量'
```

##### 解构赋值

1. 节省字符
2. 区分变量

```js
let obj = { name:'abc', age: 18 }
//	使用解构赋值方式获取 name , age
let { name } = obj
console.log(name) 	//	'abc'

//	方便对比
function fn({
    name,
    age,
    gender
}, options) {
    console.log(name, age, gender, '\n');
    console.log(options.hobbies, options.likeGirlType)
}

fn({
    name: '小白',
    age: 18,
    gender: '男'
}, {
    hobbies: '吃,唱歌,代码',
    likeGirlType: '上得厅堂下得厨房,独立自信'
})

//	解构并赋予别名, 使用别名进行访问
let obj = { name: '小白', age: 18, gender: '男' }
let { name:objName, age:objAge, gender } = obj
console.log(objName, objAge) //	小白 18

//	补充: 属性的简写
var a = 3;
var c = 5;
var b = { a, c };
//	b对象有一个a属性, a属性的值来自于a变量
//	b对象还有一个c属性, c属性的值来自于c变量
console.log(b);	//	{ a: 3, c:5 }
```

### 函数扩展

##### rest 参数

解决箭头函数中不能使用 arguments 实参列表, 此时可以使用 rest 参数代替

```js
// arguments 实参列表
function fn() {
    for (const key in arguments) {
        console.log(arguments[key])
    }
}
fn(1, 2, 3, 4, 5)

//	rest 参数
function fn2(...args) {
    //  此时 ...args 就是 rest 参数
    //	---> 是一个变量, 这个变量是一个数组, 数组里面包含了这个函数调用时传递的所有实参. 
    console.log(args) //  (5) [1, 2, 3, 4, 5]
    //	验证rest参数数据类型
    //	console.log(args instanceof Array)	//	true
    //	console.log(Array.isArray(args))	//	true	es5
    //	console.log(Object.prototype.toString.call(args))	//	"[Object Array]"
}
fn2(1, 2, 3, 4, 5)


//	例子
;((...args) => {
    console.log(args); //  (6) [1, 2, 3, 4, 5, 520]
})(1, 2, 3, 4, 5, 520)
```

**补充: 判断数据类型**

```
+ typeof 
	typeof 只能判断 数字, 字符串, 布尔值, undefined, 函数
+ Object.prototype.toString.call()
	- 5 	---> 	'[Object Number]'
	- "abc"	--->	'[Object String]'
	- true 	--->	'[Object Boolean]'
	- null	--->	'[Object Null]'
	- undefined --->'[Object Undefined]'
	- [1,2,3]	--->'[Object Array]'
	- function(){} ---> '[Object Function]'
	- new Date()--->'[Object Date]'
    - /abc/	--->	'[Object RegExp]'
```

##### 箭头函数

1. 替换匿名函数
2. 没有独立的作用域

```js
//	一个参数 () 可以省略
var fn = function (name){}
var fn = name => {}

//	0个或多个参数, ()不能省略
var fn = function (){}
var fn = () => {}
var fn = (name, age) => {}

//	只有一条return语句, {} 可以省略
var fn = function (){ return 'abc' }
var res1 = ()	=> 'abc'
console.log(res1)	//	abc

var res2 = (name => name)('小白')
console.log(res2)	//	小白

//	例子
var students = [1, 3, 5, 520]
students.forEach(value => {})

/*
	this指向例子
		普通匿名函数和具名函数可以决定函数内部的this值, 箭头函数不可以
*/	
var p = {
    age: 18,
    run:()=>{
        setTimeout(()=>{
            console.log(this);	//	window
        })
    },
    travel(){
        setTimeout(()=>{
            console.log(this);	//	p
        })
    }
}
p.run()
p.travel()
```

**tips: **箭头函数和匿名函数的区别

1. 箭头函数内部的this对象, 就是定义时所在的对象, 而不是使用时所在的对象
2. 不可以当做构造函数, 也就是说, 不能通过 new 命令, 否则会抛出错误
3. 不可以使用 arguments 对象, 该对象在箭头函数内部不存在, 可以使用 rest 参数代替
4. 不可以使用 yield 命令, 因此箭头函数不能用作 Generator 函数

### 对象的扩展

##### Object.assign

进行对象的浅拷贝

```js
var source = {
    age: 18,
    height: 170,
    className: '三年二班'
}
//	克隆一个新对象处理
var newObj = Object.assign({}, source)
newObj.name = '小白'

//	克隆另一种方式
var newObj2 = {
    name: '乖宝宝',
    likeGirlType: '感性'
}
Object.assign(newObj2, source)

console.log('source对象: ', source)
console.log('拷贝后的新对象: ', newObj)
console.log('拷贝后的新对象2: ', newObj2)
```

##### 对象的扩展运算符

```js
//	使用对象扩展运算符实现克隆
var obj = { age: 18, gender: '男' }
var obj2 = { ...obj }
var obj3 = { ...obj, name:'小白' }
var obj4 = { ...obj, gender: '女', name: "小妹" }
var arr = [1,2,4,520]
var arr1 = [ ...arr,250 ]
console.log('obj: ',obj,'obj2: ',obj2,'obj3: ',obj3,'obj4: ',obj4,'arr:',arr,'arr1:',arr1)
```



### Promise/Async

#### Promise

为什么要有promise: 解决回调地狱的问题

```js
$.get("/getUser",function(res){
    $.get("/getUserDetail",function(){
        $.get("/getCart",function(){
            $.get("/getBooks",function(){
                //	...
            })
        })
    })
})
```

##### 基本用法

```js
//	把异步操作放到 promise 中
function fn(options){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            //	其实异步操作逻辑到这里就已经执行完毕了
            //	就可以告诉外界,可以执行其它操作了
            //	如何告诉外界,让其得知?
            resolve(options)
        },100)
    })
}

fn('你好, 这是第一步').then(res=>{
    console.log(res)
    fn('你好, 这是第二步').then(res=>{
        console.log(res)
    })
})
```

**promise 如何解决回调地狱?**

```js
function f1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('第一步')
            //	执行完毕, 并告知外界执行完毕
            resolve()
        },1000)
    })
}
function f2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('第二步')
            resolve()
        },1000)
    })
}
function f3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('第三步')
            resolve()
        },1000)
    })
}

f1().then(res => {
    //	返回一个promise对象
    return f2();
}).then(res=>{
    return f3();
}).then(res => {
    setTimeout(() => {
        console.log('完成')
    },1000)
})

```

**promise执行**

```js
var promise = new Promise((resolve, reject) => {
    //  b  把需要的执行的异步操作放在这里
    $.get("/getUser", res => {
        //  获取数据的异步操作已经完毕, 等待下一步执行, 通过调用 resolve 函数, 告诉外界你可以执行下一步操作了
        //  c
        resolve(res)
        //  而执行的下一步操作, 其实就是写在 then 的回调函数中的
    })
})

//  a
promise.then(res => {
    //  d 执行后续的操作
    console.log(res)
})
```

##### Promise错误处理

```js
function getBooks(){
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: "/getBooks",
            success(res){
                //	成功获取数据. 并传递res结果
                resolve(res)
            },
            error(err){
                //	如果失败了, 执行reject函数, 并传递error数据
                reject(err)
            }
        })
    })
}

//	第一种方式
getBooks().then(res=>{
    //	resolve了
    console.log('成功了: ',res)
},err=>{
    //reject 了
    console.log(err)
})

//	第二种方式(推荐使用)
getBooks().then(res=>{
    //	resolve了
    console.loig('成功了: ',res)
}).catch(err=>{
    //	捕获了错误
    console.log('发生错误: ',err)
})
```

```
上述2种错误处理方式, 第二种更加推荐使用
	a. 不仅仅可以捕获到reject传递的参数
	b. 还可以捕获到 成功回调中发送的错误
```

```js
function f1(name){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(name === 'success'){
                resolve('成功')
            }else{
                reject('失败')
            }
        })
    })
}

f1('success').then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})

//	catch 还可以抛出在成功/失败回调中出现的错误
f1('success').then(res=>{
    console.log(res)
    res();	//	这是一行会发生错误的代码
}).catch(err=>{
    console.log(err)	
})
```

#### Async

async 其实就是 Promise 的语法糖

##### **基本使用**

```js
function f1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('你好~')
            resolve()
        }, 1000)
    })
}


;(async () => {
    await f1()
    console.log('第一步执行完毕')
    await f1()
    await f1()
    console.log('完成执行')
})()

console.log('asyncFunc 外部代码')
```

**async 函数处理返回值**

```js
function f1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('你好~')
        }, 1000)
    })
}

;(async () => {
    let res1 = await f1()
    console.log('第一次执行f1完毕: ', res1)
    let res2 = await f1()
    console.log('第二次执行f1完毕: ', res2)
    let res3 = await f1()
    console.log('第三次执行f1完毕: ', res3)
    console.log('完毕')
})()


//	需求提升
function q() {
    return new Promise((resolve, reject) => {
        resolve('resolve q方法')
    })
}

var o1 = {
    say: async () => {
        console.log('say方法: ')
        const res = await q()
        console.log(res)
    },
    run: async () => {
        console.log('run方法: ')
        const res = await q()
        console.log(res)
    }
}
//  需求: 要求先执行say方法, 在say执行完后执行run方法
;(async () => {
    await o1.say()
    console.log('暂停区-----')
    await o1.run()
})()
```

##### async 函数错误处理

```js
function f1() {
    return new Promise((resolve, reject) => {
        reject('你好')
    })
}

;(async () => {
    try { //  非失败情况执行
        const res = await f1()
        console.log('成功了: ',res)
    } catch (e) {
        //  失败情况执行
        console.log('失败了: ',e)
    }
})()
```

```
+ await 可以执行异步操作, 但是 await 必须放在 async 函数中执行
+ await 操作可以有返回值, 这个返回值表示promise操作成功的返回值
+ 如果await 里面执行的异步操作发生了 reject, 或发生了错误, 那么只能使用 try..catch 语法进行错误处理
```

### class 类

class 是 原型构造函数的语法糖

##### 定义一个类

```js
function Person(name, age){
    this.name = name;
    this.age = age
}
Person.prototype.run = function(){
    console.log(`一个${this.age}岁的大哥在跑步!`)
}
var p1 = new Person("小白", 18)


//	class 类
class Student{
    //	构造方法
    constructor(name, age){
        this.name = name;
        this.age = age
    }
    run(){
        console.log(`一个${this.age}岁的大哥在跑步!`)
    }
}
var s1 = new Student("小白菜", 19)
```

##### 静态成员

1. 静态属性: 通过类本身访问: Person.maxAge
2. 静态方法: 通过类本身访问: Person.born()

```js
class Animal {
    constructor() {
    }
	//	定义静态方法
    static born() {
        console.log('小呆萌出生了')
    }
}
//  静态属性定义需要在class外面
Animal.maxAge = 200;
//  执行静态方法
Animal.born()
```

##### 类的继承

```js
//	父类
class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    sayHi() {
        console.log(`hello! my name is ${this.name}. I am ${this.age} years old.`)
    }
}

//	子类继承父类
class Man extends Person {
    constructor(name, age, gender, hobies) {
        // 规定必须调用父类构造方法, 不调用报错
        super(name, gender, age)
        //	调用父类构造法方法, 从而给子类的实例添加 name, gender, age 属性
        this.hobies = hobies
    }
    sayHobby() {
        console.log(`我的爱好有${this.hobies}`)
    }
}

var p1 = new Person('小白', 18, '男')
var m1 = new Man('小白菜', 19, '男', '大眼睛可爱感性')
```

### 模块化

```
//	导出
export default {}

//	引入
import {} from '../module.js'
```



# Jquery
