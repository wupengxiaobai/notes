#	 JavaScript常见设计模式



##	单例设计模式

###	 概念

> 单例就是保证一个类只有一个实例, 实现方法一般是判断实例是否存在, 如果存在直接返回, 如果不存在先创建了再返回, 确保一个类只有一个实例对象. 在JavaScript 中, 单例作为一个命名空间提供者, **从全局命名空间里提供一个唯一的访问点来访问该对象.**

### 作用和注意事项

**作用**

- 模块间通信
- 系统中某个类的对象只能存在一个
- 保护自己的属性和方法

**注意事项**

- 注意 this 的使用
- 闭包容易造成内存泄露, 不需要的要干掉
- 注意 new 的成本 (继承)

### 代码实战和总结

```javascript
/***
 * 单例模式代码实战和总结
 * 1. 两个独立的对象 一个xiaobai 一个xiaohei
 * 2. 让xiaobai和xiaohei通过门铃进行通讯
 * 3. 先看下xiaobai家有没有门 如果有门直接通过门铃通讯didi 如果没有先建门
 * 4. 两个单例之间开始通信
 ***/
var xiaobai = (function (argument) {
    var xiaobaijia = function (message) {
        this.menling = message;
    }
    var men;
    var info = {
        sendMessage: function (message) {
            if (!men) {
                men = new xiaobaijia(message);
            };
            return men;
        }
    };
    return info;
})();
var xiaohei = {
    callXiaobai: function (msg) {
        var _xh = xiaobai.sendMessage(msg);
        alert(_xh.menling);
        _xh = null; //等待垃圾回收
    }
}
xiaohei.callXiaobai('didi');
```

**使用**

```javascript
//  页面上右6个按钮
//  a b c => top
//  d e f => banner
var head = {
    init: function () {
        this.render();
        this.bind();
    },
    a: 4,
    render: function () {
        var me = this;
        me.btna = $('#a');
    },
    bind: function () {
        var me = this;
        me.btna.click(function () {
            //业务逻辑去出去
            me.test();
        })
    },
    test: function () {
        a = 5;
        console.log(this.a);
    }
}

var banner = {
    init: function () {
        this.render();
        this.bind();
    },
    a: 4,
    render: function () {
        var me = this;
        me.btna = $('#d');
    },
    bind: function () {
        var me = this;
        me.btna.click(function () {
            //业务逻辑去出去
            me.test();
        })
    },
    test: function () {
        head.a = 6;
        console.log(this.a);
    }
}

head.init();
banner.init();
// $('#a').click(function () {
//     //  逻辑
// })
// $('#b').click(function () {
//     //  逻辑
// })
// $('#c').click(function () {
//     //  逻辑
// })
// $('#d').click(function () {
//     //  逻辑
// })
// $('#e').click(function () {
//     //  逻辑
// })
// $('#a').click(function () {
//     //  逻辑
// })
```



----

## 构造函数模式

### 概念

> 构造函数用于创建特定类型的对象 --- 不仅声明了使用对象, 构造函数还可以接收参数以便第一次创建对象的时候设置对象的成员值. 我们可以自定义自己的构造函数, 然后在里面声明自定义类型对象的属性或方法.
>
> 在JavaScript 中， 构造函数通常是认为用来实现实例的, JavaScript 中没有类的概念, 但是有特殊的构造函数. 通过 new 关键字来调用自定义的构造函数, 在构造函数内部, this关键字引用的是新创建的对象.

### 作用和注意事项

**作用**

- 用于创建特定类型的对象
- 第一次声明的时候给对象赋值
- 自己声明构造函数, 赋予属性和方法

**注意事项**

- 声明函数的时候处理业务逻辑
- 区分和单例的区别,配合单例实现初始化
- 构造函数大写字母开头
- 注意 new 的成本 (继承)

	##		实战和总结

```javascript
var AA = {
    Zaomen: function (hauwen) {
        console.log(this);
        if (!(this instanceof AA.Zaomen)) {
            return new Zaomen();
        };
        var _huawen = '普通';
        if (hauwen) {
            _huawen = hauwen;
        }
        this.suo = '普通';
        this.huawen = _huawen;
        this.create = function () {
            return '[锁]' + this.suo + ' [花纹]' + this.huawen;
        }
    }
}
var BB = {
    Zaomen: function (hauwen) {
        if (!(this instanceof BB.Zaomen)) {
            return new Zaomen();
        };
        var _huawen = '普通';
        if (hauwen) {
            _huawen = hauwen;
        }
        this.suo = '普通';
        this.huawen = _huawen;
        this.create = function () {
            return '[锁]' + this.suo + ' [花纹]' + this.huawen;
        }
    }
}

var xiaobai = new AA.Zaomen();
alert(xiaobai.create());
var xiaohei = new BB.Zaomen('小黑家的花纹');
alert(xiaohei.create());
```



------

## 建造者模式

### 概念

> 建造者模式可以将一个复杂的对象的构建与其表示相分离, 使得同样的构建过程可以创建不同的表示. 也就是说明我们用了建造者模式, 那么用户就需要指定需要建造的类型就可以得到它们, 而具体的建造的过程和细节就不需要知道了. 建造者模式实际, 就是一个指挥者, 一个建造者, 一个使用指挥者调用具体建造者工作得出的结果的客户.
>
> 建造者模式主要用于 "分步骤构建一个复杂的对象", 在其中 "分步骤" 是一个稳定的算法, 而复杂对象的各个部分则经常变化.

### 作用和注意事项

**作用**

- 分步创建一个复杂的对象
- 解耦封装过程和具体创建的组件
- 无需关心组件如何组装

**注意事项**

- 一定要一个稳定的算法进行支持
- 加工工艺是暴露的

### 实战和总结

```javascript
 /**
 * 1.产出的东西是房子
 * 2.baogontou 调用 工人进行开工, 而且他要很清楚工人们具体的某一大项 
 * 3.gongren 是盖房子的 工人可以键我是 建客厅..
 * 4.包工头只是一个接口而已. 向外暴露一个管理的智能
 * **/

function Fangzi() {
    this.woshi = '';
    this.keting = '';
    this.chufang = '';
}

function Baogongtou() {
    this.gaifangzi = function (gongren) {
        gongren.jian_keting();
        gongren.jian_chufang();
        gongren.jian_woshi();
    }
}

function Gongren() {
    this.jian_woshi = function () {
        alert('卧室建好了')
    }
    this.jian_keting = function () {
        alert('客厅建好了')
    }
    this.jian_chufang = function () {
        alert('厨房建好了')
    }
    this.jiaogong = function () {
        var _fangzi = new Fangzi();
        _fangzi.woshi = 'ok';
        _fangzi.keting = 'ok';
        _fangzi.chufang = 'ok';
        return _fangzi;
    }
}

var gongren = new Gongren();
var baogongtou = new Baogongtou();
baogongtou.gaifangzi(gongren);
var myfangzi = gongren.jiaogong();
console.log(myfangzi)
```



---

## 工厂模式

### 概念

> 工厂模式定义一个用于创建对象的接口, 这个接口由子类决定实例化哪一个类. 该模式使一个类的实例化延迟到了子类. 而子类可以重写接口方法以便创建的时候指定自己的对象类型(抽象工厂).
>
> 这个模式非常有用, 尤其是创建对象流程赋值的时候, 比如依赖很多设置文件, 并且我们经常在程序里看到工厂方法, 用于让子类定义需要创建的对象类型

### 作用和注意事项

**作用**

- 对象的构建十分复杂
- 需要依赖具体的环境创建不同的实例
- 处理大量具有相同属性的小对象

**注意事项**

- 不能滥用工厂, 有时候仅仅是给代码增加复杂度

### 实战和总结

```javascript
/**
 *  1. 工厂应该有厂长, 来决定运行到那条产品线
 *  2. 消费者决定做啥 -> 子类
 * ***/
var Gongchang = {};
Gongchang.chanyifu = function(){
    this.gongren = 50;
    alert('我们有'+ this.gongren);
}
Gongchang.chanxie = function(){
    alert('产鞋子');
}
Gongchang.yushu = function(){
    alert('运输')
}
Gongchang.changzhang = function(para){
    return new Gongchang[para]();
} 
var me = Gongchang.changzhang('chanyifu');
alert(me.gongren)
```

一个简单的工厂模式

```js
//  这是一个简单的工厂模式, 获取一个xhr对象
var XMLHttpFactory = function(){

};
XMLHttpFactory.createXMLHttp = function(){
    var XMLHttp = null;
    //  XMLHttpFactory.createXMLHttp()这个方法根据当前环境的具体情况返回一个XHR对象
    if (window.XMLHttpRequest) {
        XMLHttp = new XMLHttpRequest();
    } else if (window.AcativeXObject) {
        XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return XMLHttp;
}
var AjaxHander = function() {
    var XMLHttp = XMLHttpFactory.createXMLHttp();
}
```

抽象工厂

```js
//这是一个抽象工厂模式
var XMLHttpFactory = function(){

};
XMLHttpFactory.prototype = {    
    //如真的要调用这个方法, 会抛出一个错误, 塔不能被实例化, 只能用来派生子类
    createFactory: function(){
        throw new Error('This is an abstract class');
    }      
}   
//  子类继承抽象工厂功能
var XHRHandler = function(){
    XMLHttpFactory.call(this);
}
XHRHandler.prototype = new XMLHttpFactory();
XHRHandler.prototype.constructor = XHRHandler;
//  子类重写createFactory
XHRHandler.prototype.createFactory = function(){
    var XMLHttp = null;
    if (window.XMLHttpRequest){
        XMLHttp = new XMLHttpRequest();
    } else if(window.AcativeXObject){
        XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return XMLHttp;
}
```

---

## 外观模式

### 概念

> 外观模式 为 子系统中的一组接口提供了一个一致的界面, 此模块定义了一个高层接口, 这个接口使得这一子系统更加容易使用.
>
> 外观模式不仅简化类中的接口, 而且对接口与调用者之间进行了解耦,被认为开发者必备, 可以将一些简单复杂操作封装起来, 并创建一个简单接口调用.

### 作用和注意事项

**作用**

- 在设计初期, 应该要有意识地将不同的两个层分离, 比如经典的三层结构
- 在开发 阶段, 子系统往往因为不断重构演化而变得越来越复杂, 增加外观 Facade 可以提供一个简单的接口, 减少他们之间的依赖
- 在维护一个遗留的大型系统时, 为系统开发一个外观 Facade 类, 为设计粗糙和高度复杂的遗留代码提供比较清晰的接口, 让新系统和 Facade 对象交互.

**注意事项**

- 外观模式被开发者连续使用时会产生一定的性能问题, 因为每次调用时都要检测功能的可用性.

### 实战和总结

```javascript
var fuhao = {}
fuhao.huofang = function () {
    return '馒头';
}
fuhao.chuliliangshi = function () {
    return '面粉';
}
fuhao.mantou = function(){
    console.log(this.chuliliangshi());
    console.log(this.huofang());
}
// 人们想要拿到馒头, 第一个需要做的就是让系统产生馒头
fuhao.men = function() {
    return this.mantou();
}
fuhao.men();// 生产馒头. 不需要做什么,直接调用已经处理的方法.
```

```javascript
var stopEvent = function(e){
    //同时阻止事件默认行为和冒泡
    e.stopPropagation();
    e.preventDefault();
}

//  stopEvent 本身就是生产门面, 我们不需要知道函数stopEvent内部处理了什么, 只需要知道它用来做什么的.
ele.clcik = function(e) {
    stopEvent(e);
}
```



---

##	 代理模式

### 概念

> 代理, 顾名思义技术帮助别人做事, GoF对代理模式的定义如下:
>
> ​	代理模式 (Proxy) , 为其他对象提供一种代理以控制对这个对象的访问
>
> 代理模式使得代理对象控制具体对象的引用. 代理几乎可以是任何对象: 文件, 资源, 内存中的对象, 或者是一些难以复制的东西.

### 作用和注意事项

**作用**

- 远程代理 (一个对象将不同空间的对象进行局部代理)
- 虚拟代理 (根据需要创建开销很大的对象入选人网页暂时用占位代替代替真图)
- 安全代理 (控制真实对象的访问权限)
- 智能指引 (调用对象代理处理另外一些事情如垃圾回收机制)

**注意事项**

- 不能滥用代理, 有时候仅仅是给代码增加复杂度

### 实战和总结

```javascript
/**
* 代理模式需要3方
* **/
//买家
function maijia() {
    this.name = '小白';
}
//中介
function zhonjie() {}
zhonjie.prototype.maifang = function () {
    new fangdong(new maijia()).maifang('20万');
}
//房东: 坐等收钱
function fangdong(maijia) {
    //  买方
    this.maijia_name = maijia.name;
    this.maifang = function (money) {
        alert('收到了来自' + ' [' + this.maijia_name + '] 买房的' + money + '人民币')
    }
}
(new zhonjie()).maifang();
```



---

## 观察者模式

### 概念

> 观察者模式又叫发布订阅模式, 它定义了一种一对多的关系, 让多个观察者对象同时监听某一个主题对象, 这个主体对象的状态发生变化时就会通知所有的观察者对象, 使得他们能够自动更新自己.

### 作用和注意事项

**作用**

- 支持简单的广播通信, 自动通知所有已经订阅过的对象
- 页面载入后䯮对象很容易与观察者存在一种动态关联, 增加了灵活性
- 目标点UI小与观察者之间的抽象耦合关系能够单独扩展以及重用

**注意事项**

- 监听要在触发之前

### 实战和总结

```javascript
(function () {
    var o = $({});
    $.jianting = function () {
        o.on.apply(o, arguments);
    }
    $.fabu = function () {
        o.trigger.apply(o, arguments);
    }
    $.qingchu = function () {
        o.off.apply(o, arguments);
    }
})();
$.jianting('/test/ls', function (e, a, b, c) {
    alert(a + ' | ' + b + ' | ' + c);
})
$.jianting('/test/ls', function (e, a, b, c) {
    alert('ok')
})
setTimeout(() => {
    $.fabu('/test/ls', [1, 2, 3]);
}, 1000);
```



------

## 策略模式

### 概念

> 策略模式定义了算法家族, 分别封装起来, 让他们之间可以互相替换, 此模式让算法的变化不会影响到使用算法的客户.



### 作用和注意事项

**作用**

- 所有的这些算法都是做相同的事情, 只是实现不同
- 以相同的方式调用所有的方法, 减少了各类算法类之间的耦合
- 单独定义算法类, 也方便了党员测试

**注意事项**

- 不仅可以封装算法, 也可以用来封装几乎任何类型的规则, 是要在分析过程中需要在不同时间应用不同业务, 就可以考虑是要策略模式来处理各种变化

### 实战和总结

```javascript
var $input = $('#input').val();
var val = {
    isEmpty:function(){
        //code.
        return false;
    },
    isTel:function(){
        //code.
        return true;
    }
}
var ise = val.isEmpty($input);
var isTEl = val.isTel($input);

if(!ise && isTEl) {
    console.log('审核通过')
}
// $.fn.val
$.input.val({
    isEmpty: false,
    isTel:true
})
```



------

## 命令模式

### 概念

> 命令模式是用来进行参数化处理和传送, 经过这样处理过的方法调用可以在任何需要的时候执行. 也就是说该模式旨在将函数的调用/请求和操作封装成一个单一对象, 然后对这个对象进行一系列的处理. 它也可以用来消除调用操作的对象和实现操作对象之间的耦合. 这为各种具体的类的更换带来了极大的灵活性

### 作用和注意事项

**作用**

- 将函数的封装/请求/调用结合为一体
- 调用具体的函数解耦命令对象与接收对象
- 提高程序模块化的灵活性

**注意事项**

- 不需要接口一致, 直接动调用函数即可, 以免造成浪费

### 实战和总结

```javascript
var lian = {};
lian.paobing = function (pao_num) {
    //code..
    alert(pao_num + ' 炮开始战斗');
}
lian.bubing = function (bubing_num) {
    alert(bubing_num + ' 名步兵开始战斗');
}
lian.lianzhang = function (mingling) {
    lian[mingling.type](mingling.num);
}

//  总司令发令, 连长传递执行
lian.lianzhang({
    type: 'paobing',
    num: 100
});
lian.lianzhang({
    type: 'bubing',
    num: 500
})
```



------

## 迭代器模式

### 概念

> 迭代器模式提供一种方法顺序访问一个聚合对象中各个元素, 而又不需要暴露该方法中的内部表示.
>
> jquery中我们经常会用到一个each函数就是迭代器模式

### 作用和注意事项

**作用**

- 为遍历不同的集合结构提供一个统一的接口, 从而支持同样的算法在不同的集合结构上进行操作
- 对于集合内部结果常常变化各异, 我们不想暴露其内部结构的话, 当又想让客户端能 透明访问其中的元素, 这种情况下我们可以使用迭代器模式

**注意事项**

- 一般的迭代, 我们至少要有两个方法, hasNext() 和Next(), 这样才能做到遍历所有对象.
- 便利的同时更改迭代器所在的集合结构可能会导致问题

### 实战和总结

```js
var arr = ['小白', '像你', 1, 5];
var diedai = (function () {
    var length = arr.length,
        index = 0;
    return {
        hasNext: function () {
            return index < length;
        },
        next: function () {
            return arr[index++];
        },
        reset: function () {
            index = 0;
        }
    }
})();
while (diedai.hasNext()) {
    console.log(diedai.next());
}
// $(arr).each(function(index,item){
//     console.log(index,item)
// })
```



------

## 职责链模式

### 概念

> 职责链模式是使多个对象都有机会处理请求, 从而避免请求的发送者和接受者之间的耦合关系. 将这个对象连成一条链, 并沿着这条链传递该请求, 直到有个对象处理他为止
>
> 链中收到请求的对象要么亲自处理它, 要么转发给下一个后选者. 提交方并不明确有多少个对象会处理它, 任一候选者都可以响应相应的请求, 可以再运行时刻决定哪些候选者参与到链中

### 作用和注意事项

**作用**

- dom的冒泡有些类似职责链
- nodejs当controller中有很多负责操作逻辑的时候拆分中间件
- 解耦发送者和接受者

**注意事项**

- javascript中每一次 `.` 都是有代价的, 要在有必要的时候应用

### 实战和总结

```javascript
function laoban(xiangmujingli) {
    if (xiangmujingli) {
        this.xiangmujingli = xiangmujingli;
    }
}
laoban.prototype.write = function (php) {
    this.xiangmujingli.write(php);
}

function xiangmujingli(coder) {
    if (coder) {
        this.coder = coder;
    }
}
xiangmujingli.prototype.write = function (php) {
    this.coder.write(php);
}

function coder(php) {}
coder.prototype.write = function (php) {
    alert('coding...' + php);
}

new laoban(new xiangmujingli(new coder().write('写代码')))
```



------

## 适配器模式

### 概念

> 适配器模式 (Adapter) 使将一个类(对象)的接口(方法或属性) 装换成客户希望的另外一个接口(方法或属性), 适配器模式使得原本由于接口不兼容而不能一起工作的那些类 (对象) 可以一起工作

### 作用和注意事项

**作用**

- 使用一个已存在的对象, 但其方法或接口不符合你的要求
- 创建一个可复用的对象, 该对象可以与其它不相关或不可见的对象协同工作
- 使用已经存在的一个或多个对象, 但是不能进行继承已匹配它的接口

**注意事项**

- 与代理模式的区别, 代理模式是不改变原接口的. 适配是原接口不符合规范

### 实战和总结

```javascript
// var aa = {
//     test:function(){
//     },
//     go:function(){
//     }
// }
// aa.test();
//进入休假美好时光
// 大佬看我的代码太low, 就使用面向对象的方式修改了.
function pp() {
    this.test = function () {
        console.log('我是新的test');
    }
}
pp.prototype.go = function () {
    console.log('我是新的gogo')
}
//  大神代码比较复杂，我不喜欢，所以适配转为自己习惯的方式
function shipeiqi() {
    var s = new pp;
    var aa = {
        test: function () {
            s.test();
        },
        go: function () {
            s.go();
        }
    }
    return aa;
}
var aa = shipeiqi();
aa.test();
aa.go();
```



---

## 模板方法

### 概念

> 模板方法 (TemplateMethod) 定义了一个操作中的算法的股价, 而将一些步骤迁迟到子类中, 模板方法使得子类可以不改变一个方法的结构就可以重新定义该算法的某些特定步骤.
>
> 模板方法是一种代码复用的基本技术, 在类库中尤为重要, 因为他们提取了类库中的公共行为. 模板方法导致一种反向的控制结构, 这种结构就是传说中的 "别找我们, 我们找你", 这指的是父类调用一个类的操作, 而不是相反, 具体体现是面向对象编程语言里的抽象类 (以及其中的抽象方法), 以及继承该抽象类 (和抽象方法) 的子类.

### 作用和注意事项

**作用**

- 一次性实现一个算法的不变的部分, 并将可变的行为留个子类来实现
- 各子类中公共的行为应被提取出来并且集中到一个公共父类中, 避免代码重复, 不同之处分离为新的操作, 最后是一个调用这些新操作的模板方法来替换这些不同的代码
- 控制子类扩展, 模板方法只在特定点调用 "hook" 操作, 这样就允许在这些点进行扩展

**注意事项**

- 和策略模式不同, 模板方法使用继承来改变算法的一部分, 而策略模式使用委托来改变整个算法

### 实战和总结

```javascript
/*基本模板*/
function shangdi(){};
shangdi.prototype.zaoren_yanjing = function(){
    console.log('眼睛');
}
shangdi.prototype.zaoren_bizi = function(){
    console.log('鼻子');
}
shangdi.prototype.zaoren_zuiba = function(){
    console.log('嘴巴');
}
shangdi.prototype.aihao = function(){
    throw new Error('我是一个钩子， 不需要你自己去探索');
}
/*小明 子类*/
function xiaobai(){
    shangdi.call(this);
}
xiaobai.prototype = new shangdi();
xiaobai.prototype.aihao = function(){
    console.log('小白爱讲笑话');
}
new xiaobai().zaoren_yanjing();
new xiaobai().zaoren_bizi();
new xiaobai().zaoren_zuiba();
new xiaobai().aihao();
```



------

## 原型模式

### 概念

> 原型模式 (prototype) 是指用原型实例指向创建对象的种类, 并且通过拷贝这些原型创建新的对象.

### 作用和注意事项

**作用**

- 原型对象本身就是有效地利用了每个构造器创建的对象

**注意事项**

- 注意依然是浅拷贝和深拷贝的问题, 免得出现引用问题
- 现有文献里查看原型模式的定义, 没有正对JavaScript 的, 我们可能发现很多讲解的都是关于类的, 但是现实情况是基于原型继承的javascript完全避免了类的观念.

### 实战和总结

```javascript
//原型
var myobj = {
    arr: ['123', '3221', 888, 'javascript'],
    name: '小白',
    hobbies: {
        'ball': ['足球', '地球', '乒乓球'],
        'play': ['电竞', '实操']
    },
    age: 18
}
//深拷贝
function clone(obj) {
    var temp, key, b;
    if ((b = (obj instanceof Array)) || obj instanceof Object) {
        temp = b ? [] : {};
        for (key in obj) {
            if ((obj[key] instanceof Array) || (obj[key] instanceof Object)) {
                temp[key] = clone(obj[key]);
            } else {
                temp[key] = obj[key];
            }
        }
    }
    return temp;
}
var new_obj = clone(myobj);
console.log(myobj);
new_obj['hobbies']['play'][0] = '鄙视电竞';
console.log(new_obj);

// ECMAScript 5.1 中的 Object.create();
//	属于浅拷贝对象的原型
```

