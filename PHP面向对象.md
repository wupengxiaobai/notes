# **PHP**面向对象



## **学习目标**

- 面向对象和面向过程的编程思想
- 类和对象的关系
- 类定义 成员属性 成员方法 类常量
- 类的实例化
- $this 关键字和 self 关键字
- 静态属性和静态方法
- 构造方法和析构方法
- OOP中内存分配情况
- 类的封装性
- 类的继承性
- 类的多态性
- 最终类和最终方法
- 抽象类和抽象方法

## 基本概念

### 面向对象和面向过程的编程思想

**什么是面向过程的编程思想**

- 面向过程是一种编程思想, 例如递归思想 冒泡思想 二分法查找等.
- 面向过程是以过程(步骤)为中心的编程思想.
- 习惯: 大问题分解成一个个小问题, 逐个击破.

举例: 上传一个产品

1. 制作一个产品的表单: 标题 编号 价格 描述 产品图片.
2. 网站后台: 对上传的产品数据进行处理.
   1. 判断表单来源是否合法(安全问题)
   2. 获取表单提交数据
   3. 上传产品图片
   4. 连接MySQL服务器
   5. 选择MySQL数据库
   6. 构建SQL语句: 图片文件路径保存到数据库
   7. 执行SQL语句
   8. 跳转长产品列表页
   9. 链接数据库
   10. 选择数据库
   11. 执行查询sql语句
   12. 获取数据, 渲染列表
   13. 数据分页

**什么是面向对象的编程思想**

- 面向对象是一种编程思想
- 面向对象是以事务(对象)为中心的编程思想
- 面向过程着重于做什么, 面向对象着重于谁来做.

面向对象来实现产品上传修改

1. 判断表单来源是否合法(安全问题)
2. 获取表单提交数据
3. 上传产品图片: 加水印 缩略图等 (**图像处理对象**)
4. 连接MySQL服务器 (**数据库对象**)
5. 选择MySQL数据库  (**数据库对象**)
6. 构建SQL语句: 图片文件路径保存到数据库  (**数据库对象**)
7. 执行SQL语句  (**数据库对象**)
8. 跳转长产品列表页
9. 链接数据库  (**数据库对象**)
10. 选择数据库  (**数据库对象**)
11. 执行查询sql语句  (**数据库对象**)
12. 获取数据, 渲染列表  (**数据库对象**)
13. 数据分页 (**分页对象**)

<u>面向对象适合大项目, 面向过程适合小项目.</u>

### 类和对象的关系

**类的概念**

类就是 分类 类别 概念 理论 无形的 看不见 摸不着 不存在的

可以理解为 '汽车模型', '图纸'.

类是由相同的属性和方法构成.

例如: 学生都具有相同的属性(特征): 学号 姓名 性别 籍贯 相同的动作(行为): 动作. 就可以归为一个类 "学生类".

**对象的概念**

对象就是一个一个实体. 有形的 看得见 摸得着

对象也是由属性和方法组成

现实中, 先有对象后有类.

在计算机中, 先有类后有对象.

## 基础学习

### 类的定义

**什么类的语法格式**

```php
class ClassName{
    attr1;
    attr2;
    method1;
    method2;
}
```

语法格式说明: 

1. class 是声明类的关键字, 不区分大小写
2. 类名 函数名 关键字, 都不区分大小写
3. ClassName 是类的名称, 类名的命名规则与变量一样, 但不带 $ 符号
4. 类名可以由字母, 数字, 下划线构成
5. 类名不能以数字开头, 可以以字母, _ 开头
6. 类名尽量使用 "驼峰" 命名: 如 StudentController StudentModel
7. 类名后不跟小括号
8. 大括号中定义的是类的**成员属性**和**成员方法**

举例说明: 

![53885989391](.\php\1538859893912.png)

**类中只有两个内容, 分别为: 成员属性和成员方法. 类的成员就是对象, 因此, 又被称为 "对象属性" "对象方法".**

#### 定义类的成员属性(public,protected,private)

1. 成员属性介绍

   成员属性就是普通变量.

   成员属性和普通变量区别:

   - 成员属性一定要有前提, 就是 "谁的属性", 普通变量一般都是全局变量.
   - 成员属性一定要加**权限控制符**, 而普通变量不需要

2. 成员属性的定义格式

   ```php
   //	权限控制符 变量名 =  变量值;
   public $name = '小白';
   ```

3. 访问修饰符: **用来保护数据的安全**

   ```php
   //  public(共权限): 在任何地方都可以访问, 主要指类的内部 外部 子类中都可以进行访问
   //  protected(受保护的权限): 只有在本类中, 子类中被访问, 在类外不能被访问
   //  private(私有的权限): 只能在本类中被访问, 在子类和外部都不能被访问
   ```

   ![53881795968](.\php\1538817959688.png)

#### 定义类的成员方法(public,protected,private)

1. 成员方法介绍

   成员方法就是普通函数

   成员方法与普通函数的区别:

   - 成员方法一定是某个对象的方法, 不能单独存在.
   - 成员方法要加 **权限控制符**, 普通函数不需要.
   - **成员方法可以省略权限控制符, 默认是 public, 建议不省略.**

   **成员方法和普通函数一样, 都有返回值和参数**

2. 成员方法定义格式

   ```php
   权限控制符 function functionName(形参){
       //	方法的功能
       [return 参数]
   }
   ```

   ![53881852835](.\php\1538818656946.png)

### 创建类的实例对象(new)

1. 实例对象含义
   - 类可以产生 N 多个对象.
   - 类几乎不占内存, 但是每个对象都是占用内存的.
   - 平常只有对象才可以帮我们做工作. 不是类
   - 在 JS 中, 创建类的对象方法. 例如 var obj = new Date()
   - 在 PHP 中, 创建类的对象的方法. 例如 $obj = new Student()
   - 使用 new 关键字来创建类的对象.


2. 语法格式

   ```php
   //  创建类的对象的语法(类的实例化)
   $obj = new Student(); //  无参数, 有括号
   $obj2 = new Student; //  无参数, 无括号
   $obj3 = new Student(实参1, 实参2, ...); // 有参数
   ```

   ![53881926132](.\php\1538819261327.png)

注意: **对象不能单独存在, 对象必须归属于哪个类. 没有类, 一定没有对象**

![53881986782](.\php\1538819867820.png)

### 对象的操作

#### 对象属性的操作

1. 访问对象的属性

   在 JS 中, 访问对象的属性和方法, 使用小数点(.)来访问: window.alert()

   在 PHP 中, 访问属性和方法使用 箭头`->` 来访问: $obj1->name

   ```php
   echo $obj->name, '<br>';
   echo $obj->age, '<br>';
   echo $obj->sex, '<br>';
   ```

   ![53882108954](.\php\1538821089543.png)

2. 对象属性的操作: 增/删/改/查

   ```php
   //	修改属性
   $obj->name = '懵宝';
   //  添加新属性: 给不存在的属性赋值
   $obj->hobby = '吃饭睡觉打豆豆';
   //  删除属性
   unset($obj2->sex);
   //  读取属性
   echo "{$obj->name}的年龄是{$obj->age}岁";
   ```

   ![53882145435](.\php\1538821951672.png)

#### 对象方法的操作

访问对象的方法

![53882239011](.\php\1538822390113.png)

### 伪变量 $this 的使用(this)

1. $this 变量的含义

   JS 中有个关键字 this 代表当前对象. 

   PHP 中 $this 变量就代表当前对象.

   - $this 代表当前对象, **用来调用对象的属性和方法**.
   - **$this变量 只能在成员方法中存在**, 其它地方都不能使用.
   - $this 对象是怎么来的? 当使用\$obj对象调用成员方法时, 自动将当前对象性的\$obj传递到成员方法中. 在成员方法中, 使用 \$this变量代替传递过来的 \$obj 变量

   ![53882309671](.\php\1538823096719.png)

2. 举例说明

   ```php
   class Student
   {
       //  成员属性
       public $name = '小白';
       public $age = 18;
       public $sex = '男';
       //  成员方法
       public function showInfo()
       {
           $str = "<h2>{$this->name}的基本信息</h2>";
           $str .= $this->showLIne();
           $str .= "{$this->name}的年龄是{$this->age}岁!";
           return $str;
       }
       //  私有的成员方法: 返回一条水平线
       private function showLIne()
       {
           return '<hr>';
       }
   }

   $obj = new Student();
   echo $obj->showInfo();
   ```

   ![53882355976](.\php\1538823559760.png)

### 定义类的常量(const)

**类常量介绍**

- 常量: 值永远不变的量, **常量不能修改**, 不能删粗.
- 提示: 在一次 HTTP 请求过程中, 常量不能修改.
- 类常量定义 **使用 const 关键字**. define()定义常量为全局常量
- **类常量就是类的常量. 与对象无关.**
- **类常量, 只能通过类来调用**(**类名::常量**), 成员的东西只能通过对象来调用.
- 访问类常量, 通过 **范围解析法(::)** 来访问类的常量. 例如 **Student::TITLE**
- 访问对象的内容, 是通过箭头(**->**) 访问.  例如 $obj->name
- 类常量在内存中只有一份, 不会随着对象的更加而增加. **类常量可以被所有对象共享**
- 好处: **节省内存**. 例如班级名称 ICP备案号等

**定义格式**: `const 常量名 = 常量值`

**举例说明**: 

```php
<?php 
// 定义类的常量
// const 常量名 = 常量值
//  语法说明:
//  常量没有访问权限符
//  常量名不加 $ 符号, 尽量全大写
//  常量的值必须是一个固定的值.
class Student
{
    //  类常量: 没有权限
    const DB_HOST = 'localhost';
    const DB_USER = 'root';
    const DB_PASS = 'root';
    //  定义公共的成员方法
    public function showInfo()
    {
        $str = "主机名: " . Student::DB_HOST . "<br>登录名: " . Student::DB_USER . "<br>登录密码: " . Student::DB_PASS;
        echo $str;
    }
}

//  直接访问类的常量 (静态化调用方式)
$str = "主机名: " . Student::DB_HOST . "<br>登录名: " . Student::DB_USER . "<br>登录密码: " . Student::DB_PASS;
echo $str,'<hr>';

//  创建对象 -> 通过调用类的成员方法
$obj = new Student();
$obj->showInfo();
```

![53885283732](.\php\1538852837320.png)

### 静态属性和静态方法(static)

1. 概念

   - Static 关键字修饰的属性, 就是静态属性.
   - Statc 关键字修饰的方法, 就是静态方法.
   - **静态属性**, 就是类的属性, **与类相关与对象无关**.
   - **静态方法**, 就是类的方法, **与类先关与对象无关.**
   - 静态属性和静态方法, 是通过  **`类名::静态属性/方法`** 方式访问
   - **静态属性和静态方法, 在内存中只有一份, 不会随着对象的增加而变化**
   - **好处: 节省内存. 可以被所有对象去共享**
   - **静态属性的值是可以改变的. 可以被对象共享**
   - **静态属性和静态方法是有权限限制的.**

2. 如何区分常量和静态属性

   举例:

     	"班级名称" 用 类常量 来定义比较好

    	"全班人数" 用 静态属性 来定义比较好

    特点: 上面两个名称都是所有同学**共享**, 类常量是永远不变(班级名称), 静态属性可能会变(班级人数)

3. 举例说明 

   ```php
   <?php 
   header('content-type:text/html;charset=utf-8');

   class Student
   {
       //  公共的静态属性
       public static $title = '<h2>小白萌新班</h2>';
       //   私有的静态方法(类的方法)
       private static function showLine()
       {
           return '<hr>';
       }
       //  公共的成员方法
       public function showInfo($name, $age)
       {
           $str = Student::$title;
           $str .= Student::showLine();
           $str .= "{$name}的年龄是{$age}岁!";
           echo $str;
       }
   }
   //  创建学生类对象
   $obj = new Student();
   $obj->showInfo('懵宝', 19);

   $obj2 = new Student();
   $obj2->showInfo('萌新', 17);
   ```

   ![53885474094](.\php\1538854740945.png)

   ![53885496102](.\php\1538854961023.png) 

### **Self 关键字**

- **$this 代表当前对象, self 代表当前类**
- **$this 用来调用对象的东西: 成员属性/成员方法**
- **Self 用来调用类的东西(类常量/静态属性/静态方法)**
- **$this 使用 `->` 来调用**成员属性/成员方法
- **Self 使用 `::` 来调用**类常量/静态属性/静态方法
- **$this 只能用在成员方法中, Self 可以要在成员方法/静态方法中**

举例说明

```php
class ItcastStudent
{
    //  公共的静态属性
    public static $title = '<h2>小白萌新班</h2>';
    //   私有的静态方法(类的方法)
    private static function showLine()
    {
        return '<hr>';
    }
    //  公共的成员方法
    public function showInfo($name, $age)
    {
        $str = self::$title;
        $str .= self::showLine();
        $str .= "{$name}的年龄是{$age}岁!";
        echo $str;
    }
}
```

![53885566648](.\php\1538855666480.png)

### 构造方法(__construct)

1. 什么是构造方法

   - 当使用 **new** 关键字, 创建一个类的对象时, 第一个**自动调用的方法**, 就是构造方法.
   - 构造方法的名称是固定的: **`__construct()`**
   - 构造方法可以有参数, 也可以没有参数
   - **当 new 一个类时, 类名后跟的小括号的参数, 就是传递给构造方法的**. 例如: `new Student('懵宝',19)`
   - 构造方法的作用: **对象初始化**. 例如: 给对象私有属性赋值 数据库对象初始化(连通/选择数据库)
   - 构造方法只有一个, 构造方法可有可无.
   - **构造方法必须是成员方法.**
   - **构造方法一定返回对象, 不推荐给构造方法设置返回值**

2. 语法格式:  **`权限控制符 function __construct(参数1,参数2,..){对象初始化代码}`**

3. 举例说明

   ```php
   <?php 
   header("content-type:text/html;charset=utf-8");
   //  定义手机类
   class Mobile
   {
       //	定义私有的成员属性
       private $name;  //  手机
       private $brand; //  品牌
       private $price; //  价格
       private $city;  //  场地
       //  公共的构造方法
       public function __construct($name, $brand, $price, $city)
       {
           $this->name = $name;
           $this->brand = $brand;
           $this->price = $price;
           $this->city = $city;
       }
       //  公共的成员方法: 自我显示信息
       public function showInfo()
       {
           $str = "手机名称: {$this->name}";
           $str .= "<br>手机品牌: {$this->brand}";
           $str .= "<br>手机价格: {$this->price}";
           $str .= "<br>手机产地: {$this->city}";
           return $str;
       }
   }
   //	实例化对象并给类的构造方法传递参数
   $obj = new Mobile('荣耀8', '华为荣耀', '1588', '中国');
   //	调用实例对象的公共成员方法
   echo $obj->showInfo();
   ```

   ![53885734770](.\php\1538857347706.png)

### 析构方法(__destruct)

1. 什么是析构方法

   - 当销毁一个对象前, **自动调用** 的方法, 就是析构方法
   - 析构方法名称是固定的  **`__destruct()`**
   - **析构方法一定没有参数, 析构方法一定是成员中的方法**
   - 析构方法的**作用: 垃圾回收**. 例如: 可以断开数据库的链接 在线人数统计等

2. 语法格式: **`权限控制符 function __destruct(){垃圾回收代码}`**

3. 举例说明: 对象什么时候销毁

   - 网页执行完毕, 所有变量**自动销毁**, 包括对象变量

   ```php
   <?php 
   header("content-type:text/html;charset=utf-8");
   //  定义学生类
   class Student
   {
       public function __destruct()
       {
           echo '对象即将销毁';
       }
   }
   //  创建对象
   $obj = new Student;
   echo "这是网页的最后一行代码!<br>";
   ```

   ![53885861033](.\php\1538858610331.png)

   - 手动销毁

   ```php
   class Student
   {
       public function __destruct()
       {
           echo '对象即将销毁<br>';
       }
   }
   //  创建对象
   $obj = new Student;
   //  手动销毁
   unset($obj);
   echo "这是网页的最后一行代码!<br>";
   ```

   ![53885880465](.\php\1538858804655.png)

4. **实例: 统计在线人数**

   ```php
   <?php 
   header("content-type:text/html;charset=utf-8");
   //  定义学生类
   class Student
   {
       //  私有的静态的属性: 保存在线人数
       private static $count = 0;
       //  公共的构造方法
       public function __construct()
       {
           self::$count++; //  翻开后: self::$count = self::$count +1;
       }
       //  公共的析构方法
       public function __destruct()
       {
           self::$count--;
       }
       // 获取在线人数的方法: 共享方法
       public function getCount()
       {
           return self::$count;
       }
   }

   //  创建对象
   $obj = new Student;
   $obj2 = new Student;
   $obj3 = new Student;
   $obj4 = new Student;
   $obj5 = new Student;
   $obj6 = new Student;
   echo "当前共有" . $obj->getCount() . "个人在线!";
   ```

   ![53885969923](.\php\1538859699231.png)

### OOP 中内存的分配情况

![53889889375](.\php\1538898893752.png)

![53889961997](.\php\1538899619972.png)

#### 数据传递

**PHP 有8种数据类型**:

- 标量数据类型
  - 字符串
  - 整型
  - 浮点型
  - 布尔型
- 复合数据类型
  - 数组
  - 对象
- 特殊数据类型
  - 资源
  - NULL

在PHP中

​	**字符串型 整型 浮点型 布尔型 数组 默认都是"值传递"**

​	**对象 资源 默认都是 "引用传递"**

##### 值传递

什么是"值传递"? 将**一个变量的 "值", 复制一份, 传递给另外一个变量, 两个变量互不影响.** 修改其中一个变量, 另外一个不会受影响

![53890022039](.\php\1538900591817.png)

"值传递"在内存中如何表现?

​	**标量数据类型的变量, 在内存中如何存储? 将变量名和变量的值, 都存储在 "栈内存中".**

​	![53890097517](.\php\1538900975173.png)

特点: "栈内存" 速度快, 但是存储内容不能太多.

##### 引用传递

**"引用传地址" 将一个变量的 "数据地址", 复制一份, 传递给另一个变量; 两个变量指向了 "同一数据"; 修改其中一个变量的数据, 另外一个变量也会一起变.**

PHP 中默认的 "引用传地址" 的数据类型是: 对象和资源(数据资源).

![53890177108](.\php\1538901771089.png)

引用传递值在内存中的表现形式: 

![53890222433](.\php\1538902224334.png)

##### 其它类型变成引用传递

**在PHP中, 使用 "&" 符号, 可以将标量数据类型和数组变成 "引用传递地址"**

![53890283680](.\php\1538902836805.png)

给函数形参添加 "&" 符, 实现引用传地址

![53890293619](.\php\1538902936192.png) 

### 类的封装性

1. 什么是类的封装性

   - **类的封装性: 将敏感数据保护起来, 不被外界访问**
   - 类的封装性再次理解: 将一个功能的方方面面, 封装成一个类. 例如: 数据库工具类, 把数据库操作的所有方面全面封装到类中, 因此, 在该类以外, 不能再使用 "mysqli_*" 开头的函数.
   - **类的封装性实现, 就是通过权限控制符来实现**
   - 在项目中. 所有成员属性, 一般都是 private, protected 权限

2. 访问权限修饰符介绍

   - public(公共权限): 在任何地方都可以被访问, 主要是: 类内, 类外, 子类中.
   - protected(受保护的权限): 只能在本类, 子类中被访问. 在类外不能访问.
   - private(私有权限): 只能在本类中被访问.
   - 成员属性/静态属性 必须要加权限控制符, 不能省略.
   - 成员方法/静态方法 可以不加权限控制符, 默认 public. 建议都加上.

3. 举例说明(类的封装性)

     ```php
      <?php
       // 定义图书类
       class Book
      {
         //  常量类的定义
         const COMPANY = "<h2>小白图书</h2>";
         //  私有的静态的保存数量的属性
         public static $count = 0;
         //  私有的图书属性
         private $name;  //  书名
         private $author;    //  作者
         private $price; //  价格
         private $publish; //  出版社
         //  构造方法: 对象初始化
         public function __construct($arr)
         {
             $this->name = $arr['name'];
             $this->author = $arr['author'];
             $this->publish = $arr['publish'];
             $this->price = $arr['price'];
             self::$count++;
         }
         //  受保护的显示水平线
         protected static function showLine()
         {
             return "<hr>";
         }
         //  公共的自我显示的方法
         public function showInfo()
         {
             $str = self::COMPANY;
             $str .= self::showLine();
             $str .= "书名: {$this->name} 
           <br>作者: {$this->author} 
           <br> 价格: {$this->price} 
           <br>出版社: {$this->publish} 
           <br>当前共有" . self::$count . "本书!";
             return $str;
         }
      }
      //  创建一个图书对象
      $arr = array(
         'name' => 'PHP从入门到放弃',
         'author' => '大白',
         'price' => '999.99',
         'publish' => '大白出版社'
      );
      $obj = new Book($arr);
      echo $obj->showInfo();
      //  创建第2个图书对象
      $arr2 = array(
         'name' => 'javascript从入门到入坑',
         'author' => '小白',
         'price' => '999.99',
         'publish' => '小白出版社'
      );
      $obj2 = new Book($arr2);
      echo $obj2->showInfo();
     ```

   ![53891331408](.\php\1538913733540.png)

4. 实例: 数据库工具类

   ```php
   <?php 
   //  设置页面字符集
   header("content-type:text/html;charset=utf-8");

   /**
    * 定义数据库操作类(工具类)
    */
   class Db
   {
       //  私有的数据库配置信息
       private $db_host;   //  主机名
       private $db_user;   //  用户名
       private $db_pass;   //  密码
       private $db_name;   //  数据库名
       private $charset;   //  字符集
       private $con;   //  连接数据库变量

       //  构造方法: 数据初始化, 数据库连接
       public function __construct($config)
       {
           $this->db_host = $config['db_host'];
           $this->db_user = $config['db_user'];
           $this->db_pass = $config['db_pass'];
           $this->db_name = $config['db_name'];
           $this->charset = $config['charset'];
           $this->connectDb(); //  连接数据库
           $this->selectDb();  //  选择数据库
           $this->setCharset();    //  设置字符集
       }

       //  私有的链接数据库服务器的方法
       private function connectDb(){
           $this->con = mysqli_connect($this->db_host,$this->db_user,$this->db_pass);
           if(!$this->con){
               die('PHP连接MYSQL服务器失败');
           }
       }  
       
       //  私有的选择数据库的方法
       private function selectDb(){
           if(!mysqli_select_db($this->con,$this->db_name)){
               die("选择数据库{$this->db_name}失败!");
           }
       }

       //  私有的设置字符集的方法
       private function setCharset(){
           mysqli_query($this->con, "set names {$this->charset}");
       }
   }

   //  创建数据库的对象
   $arr = array(
       'db_host' => 'localhost',
       'db_user' => 'root',
       'db_pass' => 'woaiwo',
       'db_name' => 'my_studyphp',
       'charset' => 'utf8'
   );

   $db = new Db($arr);
   // var_dump($db);
   ```

   ![53892144422](.\php\1538921444224.png)

### 类的继承性(extends)

1. 继承相关概念

   - 举例: css继承: 将上层标签定义的样式, 继承到子标签来使用. 多个标签如果具有相同样式, 只需要在父标签定义, 再继承到子标签中使用. 相同的样式只需要定义一次.
   - 继承: 如果一个B类拥有了 A 类的**所有特征**, 则我们就认为B类继承了A类.
     - A类: 父类(上层类/基础类), 是最顶层的类 
     - B类: 子类(下层类/派生类)
   - 为什么要继承? 继承是为了更好地 **实现项目的升级和扩展**. 如果项目不需要升级和扩展, 则不用继承.
     - 功能升级: 原来有的功能, 对现在的功能进行更加完善的处理.
     - 功能扩展: 原来没有的功能, 增加一个新功能. 
   - **如果项目需要升级和扩展功能, 不能修改原类, 需要创建一个子类, 并继承父类. 在子类中进行改善操作.**

2. 继承的语法格式

   ```php
class SubClass extends ParentClss{}
   ```

   ![53892366364](.\php\1538923663649.png)

3. 单继承和多继承

   - 单继承: 只能从一个父类继承功能. 例如 PHP JAVA 等主流的程序语言

     ![53892429047](.\php\1538924290471.png)

   - 多继承: 可以从多个父类来继承功能. 例如 C++

     ![53892440219](.\php\1538924402196.png)

![53892448982](.\php\1538924489829.png)

**单继承演示**

```php
<?php 
//  父类
class Student{
    const TITLE = "<h2>小白班</h2>";
    public static $count = 60;
    public $name = "懵宝";
    public $age = 19;
    public function showInfo(){
        $str = self::TITLE;
        $str .= "{$this->name}的年龄是{$this->age}岁!";
        $str .= "<br>全班共有".self::$count."个学生!";
        echo $str;
    }
}
//  定义一个小白学生类
//  继承: 将父类所有内容全部拿过来(私有的除外).
class XbStudent extends Student{
}
//  创建小白学生类对象
$obj = new XbStudent;
//  调用小白学生类的方法
$obj->showInfo();
```

![53892661909](.\php\1538926619095.png)

**继承还可以理解为 "引用传地址"**

![53892814693](.\php\1538928146938.png)

![53892842558](.\php\1538928425587.png)

**构造方法和析构方法的继承**

![53892848111](.\php\1538928481116.png)

子类有则调用子类的构造方法, 没有则使用父类的构造方法. 析构亦是如此

#### parent 关键字

- self 代表当前类, parent 代表父类
- self 可以调用本类的内容: 类常量 静态属性 静态方法 成员方法
- parent 可以调用父类的内容: 类常量 静态属性 静态方法 成员方法

演示: 

![53893115981](.\php\1538931159817.png)

### 类的多态

1. 什么是类的多态

   - 类的多态就是类的多种形态

   - 类的多态, 主要指 **方法重载** 和 **方法重写**

     - 方法重载: 在同一作用域下, 定义两个同名方法; **PHP不支持** (函数重载: 在同一个脚本文件中, 定义两个同名函数; **PHP不支持**)

       ![53895863916](.\php\\1538958639169.png)

     - **方法重写: 父类有一个方法, 在子类用同样的名称再定义一次.**

       - 功能升级: 父类有的功能 , 子类的功能相比更加完善, 通过方法重写来实现

       ![53895847534](.\php\\1538958475347.png)

     - 如果不需要升级, 也不需要扩展, 继承就没有意义

2. **方法重写的要求**

   - 方法重写的前提: 必须 **先继承再重写**


   - 子类中重写的方法名称, 要与父类**方法名称一致**
   - 子类中重写的方法的参数个数, 必须与父类**方法参数个数一致**
   - 子类中重写的方法的类型必须要与父类**方法的类型一致**(成员/静态).
   - 子类中重写的**方法权限, 不能低于父类方法的权限**
     - 如果父类方法权限为 public, 则重写方法权限必须是 public
     - 如果父类方法权限为 protected, 则重写的方法权限必须是 public或protected
     - 如果父类方法权限为 private, 则子类无法继承


3. 举例说明:

   ![53896024933](.\php\\1538960249331.png)

### 最终类和最终方法(final)

1. 概述

   - Final 关键字修饰的类, 就是最终类
   - Final 关键字修饰的方法, 就是最终方法
   - 最终类: 该类不能被继承, 直接实例化. 该类已经十分完善了, 不需要升级和扩展.
   - 最终方法: 该方法不能被重写, 直接调用即可. 该方法已经十分完善, 不需要升级.
   - 例如: 数据库操作类, 也可定义为最终类
   - 最终类和最终方法不能共存

2. 举例说明

   ![53896067721](.\php\\1538960677216.png)

   ![53896081690](.\php\\1538960816904.png)

### 抽象类和抽象方法(abstract)

1. 介绍

   - abstract 关键修饰的类, 就是抽象类

   - abstract 关键字修饰的方法, 就是抽象方法

   - 抽象类: 该类**只能被继承, 不能直接实例化**. 常用于 "基础类"

     ![53896136121](.\php\\1538961361219.png)

   - 抽象方法: 该方法**没有方法体, 抽象方法必须先继承, 后重写**.

   - **如果一个类中有一个抽象方法, 那么该类必须声明抽象类**

   - **抽象方法的作用: 方法的命名规范, 是一种监督的机制.**(抽象方法未全部重写的情况下, 语法不通过)

     ![53896187767](.\php\\1538961877671.png)

     ![53896191336](.\php\\1538961913365.png)

   -  抽象类中, 也可能有其它元素: 成员属性 成员方法 静态属性 静态方法 常量

   - 抽象方法不能是静态方法, 只能是成员方法

     ![53896223690](.\php\\1538962236909.png)

2. 举例说明

   ![53896276545](.\php\\1538962765457.png)

### 接口技术(interface/implements)

1. 为什么需要接口
   - **php 只支持单继承**, 只能从一个父类来继承功能; **如果PHP想从多个父类来继承功能**, 怎么办?**可以使用接口来实现. ** **接口也是子类中方法的命名规范**.
   - 接口就是特殊的抽象类

2. 接口定义的实现要点

   - **interface 关键字**, 用来声明一个接口. **接口是一种特殊类**
   - **implements 关键字**, 创建一个子类, **来实现接口**.
   - 同类的东西, 使用 extends 关键字; 不同类的东西, 使用 implements 关键字.
   - 例如: 子类继承父类, 接口继承接口, 类实现接口.
   - 接口只能存在两样东西, **类常量, 抽象方法**.
   - 接口中的方法默认都是抽象方法, **不加 abstract 关键字**.
   - 接口中方法的权限必须是 public
   - 接口中的方法**可以是成员方法, 也可以是静态方法**.
   - 接口中所有的抽象方法, 在子类中必须要重写
   - 接口中的常量不能重写, 只能被继承.
   - **PHP 中的"重写", 不一定是方法重写, 还可以是常量重写, 静态属性重写, 静态方法重写**

3. 接口定义语法

   ```php
   //  interface 关键字, 用来声明一个接口. 接口就是一种特殊类
   //  implements 关键字, 创建一个子类, 来实现接口.
   //  1. 定义第一个接口
   interface Inter1{
       const TITLE = "小白终极版";
       public function showInfo($a,$b);
   }
   //  2. 定义第二个接口
   interface Inter2{
       public static function readMe();
   }
   //  3. 创建抽象类的学生, 并实现多个接口
   abstract class Student implements Inter1,Inter2{
       //  重写接口中的 showInfo() 方法
       public function showInfo($name,$age){}
       //  重写接口中的 readMe() 方法
       public static function readMe(){}
   }
   //  4. 创建单个学生类, 并继承抽象类
   final class XbStudent extends Student{
   }
   //  5. 实例化对象
   $obj = new XbStudent();
   ```

   ![53898480383](.\php\\1538984803837.png)

4. **接口应用**


   ![53898566994](.\php\\1538985769220.png)

### 常规的类的自动加载(__autoload)

1. 为什么需要类的自动加载?

   - 程序员在做开发的时候, 会把每一个功能, 都定义成一个**独立的类文件**, 类文件是以 "**.class.php**" 结尾. 一个大项目有50个功能, 就需要定义50个类文件. 在应用页面, 就需要把相关的类文件 require(require_once) 包含进当前页面. 因此在页面的开头就会有50个 require_once() 语句, 如此极大的浪费了空间, 不需要的类也加载了.
   - 如何解决文件加载的问题? **按需加载**

2. **常规的自动加载类函数: __autoload()**

   - **类文件的命名规则**
     - 将每一个功能单独定义成一个类文件.
     - 每一个类文件尽量以"**.class.php**" 结尾. 例如 Student.class.php
     - 类文件的主名, 要与类名一致. 例如: class Student{}
     - 类名的命名方式, 使用大驼峰式命名. 例如 class ConnMySQL
     - 方法的命名方式, 使用小驼峰式命名. 例如 getInfo()
     - 属性命名方式,  使用小驼峰名.
   - **__autoLoad() 函数的语法**
     - __autoload() 是系统函数, 不是方法, 名称是固定的
     - 我们需要定义该函数的内容
     - 该函数有一个**唯一的参数, 就是类名**参数
     - **当使用一个不存在的类时, __autoload($className) 会自动调用**
       - 当使用 new 关键字, 创建一个不存在的类的对象时, __autoload()自动调用; 例如 $obj = new Studenet()
       - 当使用静态化方式调用不存在类的属性或方法时, __autoload() 自动调用 例如 Student::getCode()
       - 当继承一个不存在的父类时, __autoload() 自动调用. 例如: class itcastStudent extends Student{}
       - 当实现一个不存在的接口类时, __autoload()自动调用. 例如 class Student implements Inter{}
     - 自动加载类的函数的内容包含两方面:
       - 构建类文件的真实路径
       - 判断并包含类文件代码

3. 示例说明

   ```php
   function __autoload($className){
       //  构建类文件的真实路径
       $filename = "./libs/$className.class.php";
       //  如果类文件存在, 则包含
       if(file_exists($filename)) require_once($filename);
   }
   ```

   ![53901068404](.\php\\1539010684049.png)

### 自定义类文件加载函数(spl_autoload_register)

1. 描述

   - **__autoload()** 有局限性, 如果类文件位于不同的目录, 类文件名命名方式也不尽相同.
   - 自定义类文件加载函数: spl_autoload_register(), 主要应用在项目中, 可以对不同的情况
   - **spl_autoload_register()** 注册多个类加载函数, 形参**一个类文件的队列**, **按照注册时的顺序**, 依次执行. 哪个类文件存在, 就包含哪个类文件.
   - **每个函数都是一种类文件的加载规则**

2. 语法格式

   - 有名函数定义文件

   ```php
   spl_autoload_register('func1');
   //  2. 参数也可以是匿名函数, 函数传地址
   spl_autoload_register('func2');

   function func1($className){
       //  构建类文件路径
       $filename = "./libs/$className.class.php";
       //  如果文件存在, 则包含
       if(file_exists($filename)) require_once($filename);
   }

   function func2($className){
        //  构建类文件路径
        $filename = "./public/$className.class.php";
        //  如果文件存在, 则包含
        if(file_exists($filename)) require_once($filename);
   }
   ```

   ![53901421918](.\php\\1539015238576.png)

   - 匿名函数自定义文件加载

   ![53901579495](.\php\\1539015794953.png)

### 对象克隆(clone)

1. 什么是对象克隆

   - 创建对象的几种方式

     - 使用 new 关键字
     - 使用 clone 关键字

   - $obj2 = \$obj1 是创建对象么? 将 \$obj1 的地址赋值给 \$obj2, 两个对象指向同一个地址. 并非创建新对象

     ![53901619763](.\php\\1539016197638.png)

2. 使用克隆创建一个对象演示

   ```php
   class Student{
       private $name = "懵宝";
       private $age = 19;
       //  当对象克隆完成时, 魔术方法 __clone() 会自动调用, 并非
       public function __clone(){
           $this->name = "小白";
           $this->age = 23;
       }
   }
   $obj1 = new Student;
   //  克隆产生新对象
   $obj2 = clone $obj1;
   var_dump($obj1,$obj2);
   ```

   ![53901661465](.\php\\1539016614657.png)

#### 遍历对象属性

![53901725125](.\php\\1539017251250.png)

#### 魔术方法

1. **__toString()**

   - 描述: 将对象转成字符串时, 魔术方法 __toString() 会自动调用
   - 语法: **public function__toString()**

   ![53901877476](.\php\\1539018774769.png)

2. **__invoke()**

   - 描述: 当把对象当成函数调用时, 魔术方法 __invoke() 自动调用
   - 语法: mixed__invoke()

   ![53901907928](.\php\\1539019079287.png)




## 面向对象设计模式

**面向对象设计模式**

1. **什么是设计模式**
   - 设计模式, 就是面向对象**代码设计经验的总结**
   - 设计模式, 可以实现代码重用, 节省时间, 对于后期维护十分方便
2. 常用的设计模式
   - **单例模式: 一个类只能创建一个对象, 不管用什么办法, 都无法创建第2个对象.** 例如: 数据库对象.
   - **工厂模式: 根据传递的不同类名, 来创建不同类的对象的工厂.**

### **单例设计的要求(三私一公)**

- 一私: **私有的静态的保存对象的属性**
- 一私: **私有的构造方法, 阻止类外 new 对象**
- 一私: **私有的克隆方法, 阻止类外 clone 对象**
- 一公: **公共的静态创建对象的方法.**

1. **instanceof 关键字**

   - 描述: 判断一个对象是不是某个类产生的
   - 语法: $obj instanceof ClassName
   - 返回: 如果$obj是ClassName的对象, 则返回 TURE ,否则返回 FALASE

2. 单例设计举例说明

   ```php
   //   创建单例的数据库类 "三私一公"
   class Db{
       //  私有的静态的保存对象的属性
       private static $obj = NULL;
       //  私有的构造方法: 阻止类外 new
       private function __construct(){}
       //  私有的克隆方法: 阻止类外 clone
       private function __clone(){}
       //  公共的静态的创建对象的方法
       public static function createInstance(){
           //  判断当前对象是否存在, 如果不存在创建一个
           if(!self::$obj instanceof self){
               self::$obj = new self;
           }
           // 返回当前对象
           return self::$obj;
       } 
   }

   //  创建数据库类的对象
   $db = Db::createInstance();
   ```

   ![53904267877](.\php\\1539042678772.png)

#### **单例设计综合案例(数据库操作类)**

**数据库操作类(./libs/Db.class.php)**

```php
<?php 

//  定义最终类的单例的数据库操作类
final class Db{
    //  私有的静态的保护对象的属性
    private static $obj = NULL;

    //  私有的数据库配置信息
    private $db_host;   //  主机名
    private $db_user;   //  用户名
    private $db_pass;   //  密码
    private $db_name;   //  数据库名
    private $charset;   //  字符集
    private $con;   //  数据连接操作

    //  私有的构造方法, 阻止类外 new 对象
    private function __construct($config){
        //  初始化数据库配置信息, 并作基本连接操作
        $this->db_host = $config['db_host'];
        $this->db_user = $config['db_user'];
        $this->db_pass = $config['db_pass'];
        $this->db_name = $config['db_name'];
        $this->charset = $config['charset'];
        $this->connectDb(); //  连接sql服务器
        $this->selectDb();  //  选择数据库
        $this->setCharset();//  设置字符集
    }
    //  私有的克隆方法, 阻止类外 clone 对象
    private function __clone(){}
    //  公共的静态的创建对象的方法
    public static function createInstance($config){
        //  判断当前对象是否存在
        if(!self::$obj instanceof self){
            self::$obj = new self($config);
        }
        //  如果对象已经存在, 直接返回对象
        return self::$obj;
    }
    
    //  私有的连接数据库服务器方法
    private function connectDb(){
        //  初始化连接数据库返回信息
        $this->con = mysqli_connect($this->db_host,$this->db_user,$this->db_pass);
        // var_dump($this->con);
        if(!$this->con){
            //  链接数据库失败
            die("PHP链接数据库失败!");
        }
    }

    //  私有的选择数据库的方法
    private function selectDb(){
        if(!mysqli_select_db($this->con,$this->db_name)){
            //  选择数据失败
            die("PHP选择数据失败!");
        }
    }

    //  私有的设置字符集
    private function setCharset(){
        $this->exec("set names {$this->charset}");
    }

    //  公共的执行SQL语句的方法: insert update delete set create drop等(处理返回值是bool值的方法)
    public function exec($sql){
        //  将SQL语句转成全小写 
        $sql = strtolower($sql);
        //  如果$sql语句是select语句, 阻止执行
        if(substr($sql,0,6)=="select"){
            die('该方法不能执行SELECT语句, 请使用另外方法!');
        }
        //  如果是非SELECT语句, 则正常执行, 并返回布尔值
        return mysqli_query($this->con,$sql);
    }

    //  私有的执行SQL语句的方法: 处理select的SQL方法
    private function query($sql){
        //  将SQL语句转成全小写 
        $sql = strtolower($sql);
        //  如果$sql语句是select语句, 阻止执行
        if(substr($sql,0,6)!="select"){
            die('该方法不能执行非SELECT语句!');
        }
        //  如果是SELECT语句, 则正常执行, 并返回结果集
        return mysqli_query($this->con,$sql);
    }

    //  公共的获得单行记录的方法
    public function fetchOne($sql,$type=3){ //  $type 表示返回数组类型, 默认关联
        //  执行 SQL语句, 并返回结果集
        $result = $this->query($sql);
        //  定义返回的数组的类型
        $types = array(
            1 => MYSQLI_NUM,
            2 => MYSQLI_BOTH,
            3 => MYSQLI_ASSOC
        );
        //  返回一条记录
        return mysqli_fetch_array($result,$types[$type]);
    }

    //  公共的获得多条记录的方法
    public function fetchAll($sql,$type=3){
        $result = $this->query($sql);
        $types = array(
            1 => MYSQLI_NUM,
            2 => MYSQLI_BOTH,
            3 => MYSQLI_ASSOC
        );
        //  循环从结果集中取出所有记录并存入一个新数组中, 返回新数组
        $arr = array();
        while($row=mysqli_fetch_array($result,$types[$type])){
            $arr[] = $row;
        }
        return $arr;
    }

    //  公共的获取记录数的方法
    public function rowCount($sql){
        //  执行SQL, 并返回结果集
        $result = $this->query($sql);
        //  返回记录数
        return mysqli_num_rows($result);
    }
}
```

**连接数据库的公共文件(./conn.php)**

```php
<?php 

//  类的自动加载
function __autoload($className){
    //  构建类文件的真实路径
    $filename = "./libs/$className.class.php";
    //  如果类文件存在, 则包含
    if(file_exists($filename)) require_once($filename);
}

//  创建数据库类的对象
$arr = array(
    "db_host"=>"localhost",
    "db_user"=>"root",
    "db_pass"=>"woaiwo",
    "db_name"=>"my_studyphp",
    "charset"=>"utf8"
);
$db = Db::createInstance($arr);
// var_dump($db);
```

**显示信息操作(./info.php)**

```php
<?php
    require_once('./conn.php');
    //  获取多行数据
    $sql = "select * from n_news order by pub_time desc";
    $arrs = $db->fetchAll($sql);
    // var_dump($arrs);
    //  获取记录数
    $rescount = $db->rowCount($sql);
    // var_dump($rescount);
    //  获取单条记录
    $sql2 = "select * from n_news order by pub_time desc limit 1";
    $one = $db->fetchOne($sql2);
    // var_dump($one);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>信息页面</title>
</head>
<body>
    
    <div style="text-align:center;padding:10px">
        <h2>信息页面</h2>
        <a href="#">添加学生</a>
        <p>共<span>250</span>个学生</p>
        <hr>
        <table width='800' border="1" bordercolor='#ccc' align='center' cellpadding='5'>
            <thead>
                <tr>
                    <th>编号</th>
                    <th>标题</th>
                    <th>发布人</th>
                    <th>发布时间</th>
                    <th>内容</th>
                    <th>是否置顶</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>5</td>
                </tr>
            </tbody>
        </table>
</body>
</html>
```

![53905002966](.\php\\1539050029660.png)

### 工厂模式

1. **什么是工厂模式**

   - 工厂模式: **根据传递的不同类名, 创建不同类的对象**
   - 工厂模式: 就是生产不同类对象的工厂,  避免使用 new 关键字
   - 还可以理解为: **改变了创建对象的方式.**

2. **工厂模式的设计要求**

   - 工厂模式: 可以设计一个工厂类
   - 工厂类中有一个**私有的静态的数组属性, 用来存储不同类的对象**.
   - 工厂类中有一个**公共的静态的创建对象的方法.**
   - 静态方法的功能代码: 判断当前类的对象是否存在, 如果存在直接返回, 不存在则创建一个对象再返回
   - 注意: **该工厂类不创建对象**. **工厂类本身不是单例的**

3. 举例说明(**单例的工厂类**):

   ```php
   final class Factory{
       //  私有的静态的保存对象的数组属性
       private static $arr = array();
       //  公有的静态的创建不同类对象的方法
       public static function createInstance($className){
           /**
            *   判断当前类的对象是否存在
            *  $arr['Student'] = 学生类对象
            *  $arr['Teacher'] = 教师类对象
            */
           if(!isset(self::$arr[$className])){
               //  如果不存在, 创建一个新的对象
               self::$arr[$className] = new $className;
           }
           return self::$arr[$className];
       }
   }
   ```

   ![53924703168](.\php\\1539247031685.png)

   ![53924694784](.\php\\1539246947847.png)

### 重载

1. **什么是重载?**

   - PHP中的 "重载" 与绝大多数面向对象语言不同. 传统的 "重载" 是用于提供多个同名类的方法, 但各方法的参数类型和个数不同.
   - PHP所提供的"重载(overloading)" **是指动态地"创建" 类属性和方法**. 我们是通过 **魔术方法来实现**的.
   - **当调用了当前环境下未定义或不可见的了属性或方法,重载方法会被调用.**
   - 所有的重载方法都必须声明为 **public**
   - 属性重载只能在对象中进行. 在静态方式中, 这些魔术方法将不会被调用. 所以这些方法都不能被 声明为 static
   - **这些魔术方法的参数都不能通过引用传递.**

2. **属性重载**

   - __set()

     - 描述: **在给不可访问的属性赋值(没定义魔术方法会报错)时, __set() 会被调用.**

     - 语法:  public function __set(\$name,$value)

       ```php
       //	使用魔术方法, 变向地在类外实现给私有变量赋值
       class Student{
           private $name;
           private $age;
           //  当在外部给私有属性赋值时, ___set() 方法自动调用
           public function __set($name,$value){    //  $name 就是私有属性名
               // $this->name = $value;
               $this->$name = $value;
           }
       }
       $obj = new Student;
       $obj->name = '懵宝';
       ```

       ![53924792878](.\php\\1539247928784.png)

   - __get()

     - 描述: 在读取不可以访问的属性时, 会自动调用魔术方法 __get()

       ![53924825015](.\php\\1539248250151.png)

   - \_\_isset() 和 \__unset()

     - 描述: 判断私有属性是否存在和删除私有属性时 会自动调用魔术方法

       ![53924866207](.\php\\1539248662079.png)

3. **方法重载**

   - ___call()

     - 描述: 在对象中调用一个不可访问方法时, __call() 会被调用.

       ![53924940208](.\php\\1539249402088.png)

   - __callStatic()

     - 描述: 用静态方式调用一个不可访问的方法时, __callStatic() 自动调用

       ![53924964989](.\php\\1539249649891.png)

### 静态延时绑定

- PHP 5.3.0 起, PHP 增加了一个叫做 **后期静态绑定** 的功能, **用于在继承范围内引用静态调用的类**. "后期绑定" 的意思是说, **static::** **不再被解析为定义方法所在的类, 而是在实际运算时计算的**. 也可以称之为 "静态绑定", 因为它可以用于 (但不限于) 静态方法的调用.

- **我们需要一个在调用执行时才确定当前类的一个特征, 就是说将 static 关键字对某个类的绑定推迟到调用执行时, 就叫静态延迟绑定**

- 语法: **static::静态属性/静态方法/成员方法/类常量**

- 举例说明:

  - 一个类的情况

    ![53925267557](.\php\\1539252675572.png)

  - 在继承环境下的情况: self 永远代表本类, 而static 代表最后执行的类

    ![53925300583](.\php\\1539253005832.png)

### 常用魔术常量

- \__LINE__ 获取当前行号
- \__FILE__ 当前文件名
- \__DIR__ 当前目录名
- \__FUNCTION__ 当前函数名
- \__CLASS__ 当前类名
- \__METHOD__ 当前方法
- \__NAMESPACE__ 当前空间名

![53925760738](.\php\\1539257968058.png)

### 常用类和对象的操作函数

1. 判断类, 接口, 方法, 属性是否存在

   - class_exists() 判断类是否存在
   - interface_exists() 判断接口是否存在
   - method_exists() 判断方法是否存在
   - property_exists() 判断属性是否存在

   ![53926314000](.\php\\1539263140006.png)

2. 获取类名

   - get_class() 根据对象会获取类名
   - get_parent_class() 获取父类名

   ![53926337886](.\php\\1539263378866.png)

---

## 命名空间

### 命名空间基础

> **定义: **命名空间 namespace, 是指人为地将内存进行 `分隔`, 让不同内存区域的同名结构共存. 从而解决在大项目中可能存在的重名结构问题.

1. **基本语法: ** `namespace 空间名字;`

   ```php
   <?php 
   //  创建命名空间
   namespace my_space;
   ```

2. **命名空间的命名规则**

   - 由字母, 下划线, 和数字组成
   -  可以以字母和下划线开头
   - 较少出现多单词空间名, 一般使用下划线法

3. 命名空间的作用: 能够创建同名结构, 包含**函数, 常量, 类**

   ```php
   <?php 
   //  创建命名空间
   namespace my_space;

   //  创建命名空间
   namespace space1;

   //  定义函数, 类, 常量
   function display(){
       echo __NAMESPACE__,'<br>';
   }
   const PI = 3;
   class Human{

   }

   //  创建空间
   namespace space2;
   class Human{

   }
   const PI = 3;
   ```

4. 命名空间里内容

   - 空间里可以定义同名的函数, 常量和类(结构): 因为此类结构不允许同名, 这些是命名空间规范的目标(称为空间元素)
   - 命名空间里可以有其他代码

   ```php
   $a = 100;
   names space;
   class Human{}
   function display(){}
   const PI = 3.14;
   echo $a;
   ```

5. 命名空间注意事项: 命名空间的声明(第一次) 必须在所有代码之前

   ```php
   //	命名空间之前不能有任何代码
   namespace space1;	//	正确
   ```

   ```php
   echo "test";
   namespace space1;	//	错误
   ```

   ![53926977061](.\php\\1539269770610.png)

   注意: 命名空间在一个脚本中只会定义一个(最开始).

> **总结**

1. 命名空间是使用 namespace + 空间名字 定义

2. 不同命名空间里可以定义同名的函数, 常量, 类(同名结构)

3. 命名空间的定义必须在脚本最前面

4. 命名空间里可以写任意代码

5. 一个脚本通常只会定义一个命名空间

6. 命名空间其实好比是磁盘上划分的不同文件夹, 用来保存同名文件

   ​

> 引人: 命名空间本身就是建立一种虚拟的 "围栏", 用来区分不同位置的同名结构. 既然可以在内存中设置一层 "围栏", 那么自然也可以设置多层, 这个叫做 `子空间`

### 命名空间子空间

> 定义: 子空间, 即在已有空间之上, 再在内部进行空间划分, 让每个小空间独立起来.

1. 命名空间子空间是直接通过 namespace + 路径符号 `\` 实现

   ```php
   namespace space; 	//	创建一个一级空间
   function display(){}
   //	创建子空间
   namespace space\space1; //	在space空间下创建一个叫做space1的子空间
   function display(){}
   ```

2. 子空间的创建不一定非要在前面创建了上级空间, 既可以直接在某个脚本中创建子空间

   ```php
   //	脚本最上面
   namespace space\space2;
   function display(){}
   ```

> **总结**

1. 子空间也是通过 namespace 实现, 用 namespace+`\` 区分上下级空间名
2. 基于一个脚本中通常只有一个空间名, 所以子空间的创建可以直接创建(不用一定先创建一级空间)
3. 子空间理论上可以创建无限多层, 但是实际层次根据项目需求确定 (一般不超四层)





> **引入: ** 其实空间就像文件夹一样, 同一个文件夹里不能有同名文件, 但是不同文件夹下肯定可以出现同名文件的. 而如果要进行访问的话, 就需要进入到不同的空间进行访问.

### 命名空间的访问

> **定义**:  命名空间访问, 是指访问不同空间里的结构元素, 如果空间里除了函数, 常量和类的其他代码, 会自动执行, 只有空间元素本身(函数, 常量和类) 是需要通过空间进行访问的. 在PHP命名空间中, 提供了三种空间元素的访问方式: `非限定名称`, `限定名称` 和 `完全限定名`

1. 非限定名称访问: 即直接访问空间元素的名字, 此类访问的是当前代码所属空间内的元素.

```php
<?php 
namespace space1;
function display(){
    echo __NAMESPACE__."<br>";  //输出当前所在命名空间空间名
}
function show(){}

namespace space2;
function display(){
    echo __NAMESPACE__."<br>";
}

//	访问空间元素: 非限定名称(直接使用结构名字)
display();	//	输出space2
//	show();	//	非限定名只访问当前空间的结构, 这里报错
```

![53927342735](.\php\\1539273427356.png)

**注意: ** 非限定名访问就好比是访问当前自己文件夹下的所有文件

2. 限定名称访问, 即在访问元素前面使用响应的空间名字, 非限定名称的访问时基于子空间来实现的

```php
//	定义子空间
namespace space\space1;
function display(){
    echo __NAMESPACE__."<br>";
}

//	定义子空间
namespace space\space2;
function display(){
    echo __NAMESPACE__."<br>";
}

//	所属父空间
namespace space;
function display(){
    echo __NAMESPACE__."<br>";
}

//	访问, 非限定名访问
display();
//	限定名称访问, 使用自己当前的子空间名字 + \ + 元素名进行访问
space1\display();
space2\display();
```

![53927392570](.\php\\1539273925703.png)

**注意: ** 限定名称访问好比访问当前文件下的子文件夹内容

3. 完全限定名称访问, 即从更目录 (全局空间) 开始访问, 使用 `\` 作为全局空间开始符号

```php
//	接上述代码
\space\space1\display();
\space\display();
```

![53927444222](.\php\\1539274442221.png)

**注意: ** 完全限定名称访问好比从磁盘更目录访问对应路径下的内容(绝对路径)

> **总结**

1. 命名空间的访问分为三种模式: 
   1. 非限定名称访问, 直接访问元素本身, 代表当前所属空间 (当前目录)
   2. 限定名称访问, 使用空间名+元素, 代表访问当前空间子空间 (当前目录子目录)
   3. 完全限定名称访问, 使用全局空间开始, 代表从全局开始进行访问 (根目录)
2. 任何空间元素访问针对的都是类, 常量, 函数 (其他代码会自动执行)

### 全局空间

> **定义: ** 全局空间, 即空间元素在没有定义空间的情况下所属的空间, 也就是所有定义的空间的顶级空间 (即所有空间都是从全局空分离出来的).

1. 没有指定空间的元素所属的空间属于全局空间

```php 
<?php 
//  创建函数: 属于全局空间
function display(){
    echo __NAMESPACE__."<br>";
}
display();
```

2. 所有的空间本质都是在全局空间下的划分

```php
//	定义空间
namespace space;
function display(){
    echo __NAMESPACE__."<br>";
}

//	space空属于从全局空间里划分出一部分用于space空间管理
```

3. 全局空间元素的访问: 使用完全限定名称访问

```php
<?php 
//  创建函数: 属于全局空间
function display(){
    echo __NAMESPACE__."<br>";
}

//  访问全局空间
display();	//  使用非限定名进行访问: 本身当前就是全局空间内, 所以可以访问
\display();	//  使用完全限定名称访问: 全局符号 "\" + 全局空间元素
```

![53927566223](.\php\\1539275662231.png)

4. 一旦命名空间出现, 那么空间元素 (类, 常量和函数) 的访问就被限定在空间内, 如果**使用非限定名称访问, 那么系统会以下解析逻辑** (**限定名称或者完全限定名称是直接按路径准确找**)

   - 首先一定是在自己空间内查找
   - 如果找不到元素, 不同空间元素的不同处理
     - **系统类是不会自动去全局空间找的** (保存, 提示当前所属空间元素找不到)
     - **系统常量, 系统函数如果找不到, 会自动去全局空间找** (也就是能找到)

   ```php
   <?php 
   //  定义空间
   namespace space;
   function display(){
       echo __FUNCTION__,'<br>';
   }
   const PHP_VERSION = 7;

   //  访问空间元素: 常量
   echo PHP_VERSION,"<br>";    // 正确: space空间下已经设置了PHP_VERSION

   //  访问空间元素: 函数
   echo count(array(1,2,3,4,5));   //  正确: space下没有count函数, 但是全局空间有 (系统函数属于全局空间)

   //  想访问系统类
   // new mysqli('localhost','root','woaiwo','my_study');  //报错: 系统只会在当前空间里找类元素, 提示 space\mysqli不存在

   $con = new \mysqli('localhost','root','woaiwo','my_studyphp');
   ```

5. 同样的, 如果一个文件有空间, 包含了一个没有空间的文件, 那么要访问文件中的内容, 需要使用全局空间

   ```php
   <?php 
   //  无空间文件: 07nospace.php
   function display(){ //  属于全局空间
       echo 'nospace','<br>';
   }
   ```

   ```php
   <?php 
   //  有空间文件: 07hasspace.php
   namespace space;
   function display(){
       echo 'hasspace','<br>';
   }
   //  访问空间元素: 常量
   echo PHP_VERSION,"<br>";    // 正确: space空间下PHP_VERSION常量, 全局空间下有
   //  未限定的空间名访问函数
   //  函数访问
   echo count(array(1,2,3,4,5)),"<br>";   //  正确: space下没有count函数, 但是全局空间有 (系统函数属于全局空间)
   $con = new \mysqli('localhost','root','woaiwo','my_studyphp');

   //  包含无空间的文件
   include_once('./07nospace.php');
   //  访问元素
   display();  
   //  无限定名称访问空间函数: 先从本空间中找是否存在display方法, 有则执行本空间内的display() ,如果没有则执行全局空间的display()
   //  访问全局空间的display函数
   \display();
   ```

   ![53927805724](.\php\\1539278057247.png)

   ![53927808680](.\php\\1539278086804.png)

> **总结**

1. 全局空间就是没有使用 namespace 定义的空间(所有空间本质都是在全局空间下划分)
2. 全局空间的元素访问使用完全限定名称访问 (当前文件中, 非限定名称一样可以访问)
3. 系统内置的函数, 常量和类都属于全局空间
   1. 系统函数, 常量在空间中访问的时候回自动在自己空间中找, 如果找不到,会自动去全局空间找.
   2. 系统类必须使用全局空间访问: `\类名`



> 引入: 实际开发中, 一个脚本只会有一个空间, 因为一个脚本中通常只有一个类或者一些功能函数. 因为开发的结构性, 不通文档所属的功能是不同的. 因此也是存放在不同的文件夹的. 因此在实现业务的时会进行文件包含, 也就产生空间包含的问题, 所以就会需要多种访问方式来访问.

### 命名空间应用案例

> **定义**: 命名空间应用是模拟真是开发环境, 来运用命名空间的规则.

1. 创建文件夹: 模拟项目不同文件 PHP 文件放到不同文件夹下

```
--|root 				------根目录
--|--|controller		 ------业务模块
--|--|model				------数据模块
--|--|core 				------核心工具
```

2. 业务说明

   - root 根目录, 存放用户可以直接访问的文件, 文件都是请求controller 里的文件
   - controller目录, 存放业务逻辑文件, 所有业务逻辑都是类文件, 业务要从安装数据库, 请求model里的文件, 属于controller空间
   - model目录, 存放数据操作的类文件, 一张表一个类文件, 属于model空间
   - core目录, 核心工具的存放, 属于core空间

3. 创建三个文件, 分别代表root目录下, controller目录下的controller空间, model目录下的model空间

   ```php
   /**
   *	controller空间下的 User 类, 用于实现用户的业务逻辑操作.
   */	
   <?php 
   //  命名空间
   namespace controller;
   //  加载model下的user类
   include_once('E:\studyphp\namespace\root\model\User.class.php');

   class User{
       public function index(){
           //  需要获取user表的数据: 交给model下的user.class.php实现数据的查找
           $u = new \model\User();
           $u->getAllUser();

           echo "实现用户的业务操作!";
       }
   }
   ```

   ```php
   /**
   *	model空间下的 User 类, 用于执行对数据库的操作
   */	
   <?php 
   //  命名空间
   namespace model;
   //  引入DB类
   include_once('E:\studyphp\namespace\root\core\DB.class.php');

   class User{
       //  方法能够查询所有的用户信息
       public function getAllUser(){
           $sql = "select * from user";
           //  实例化数据库连接
           //  $db = new DB(); //  非限定名称, 意味着在model下找DB, 不能实现
           //  $db = new core\DB();    //  限定名 => model\core\DB(), 不能实现
           $db = new \core\DB();   //  使用完全限定名称实现在core空间下找DB类, 并实例化
           $db->query($sql);
       }
   }
   ```

   ```php
   /**
   *	core空间, 这里是数据库操作
   */	
   <?php 
   //  命名空间
   namespace core;

   //  创建类
   class DB{
       public function __construct(){
           echo "实现了初始化数据库连接成功!<br>";
       }
       public function query(){
           echo "能够实现数据的查询操作!<br>";
       }
   }
   ```

   ```php
   /**
   *	index.php 全局空间下的入口文件
   */   
   <?php 
   header('content-type:text/html;charset=utf8');
   //  直接访问 controller 的 user类 并实例化
   include_once('controller/User.class.php');
   //  实例化
   $u = new controller\User(); //  所属全局空间, => \controller\User
   $u->index();
   ```

4. 代码说明

   - index.php 在root目录下, 未定义空间, 内部属于全局空间: index.php 包含了子目录 controller 下的 User.class.php(用于实现业务逻辑的代码), 而User类属于controller空间, 所以在index.php中访问 User类的使用, 可以使用限定名称(`controller\空间元素`). 或完全限定名(`\子空间\空间元素`) 进行访问
   - controller/User.class.php 在 root/controller 文件夹下, 定义了空间 controller, 所以文件里面所有的访问, 默认都是在 controller 下找, controller/User 类中用了 model/User类, 所以需要使用完全限定名称访问(同级别不同空间) `\model\User`
   - model/User.class.php 在 root/model 文件夹下, 定义了空间 model. 所以文件里所有的访问, 默认都是在 model下找, model/User 类中用到了 core/DB 类, 所以需要使用完全限定名称访问 `\core\DB`
   - core/DB.class.php在 root/core 文件下. 定义了空间core

> **总结**

1. 空间的实际应用是以文件为单位定义空间的
2. 空间的划分是按业务对应的脚本进行划分的, 如业务 controller, 数据model之类
3. 文件的包含和空间的保函没有联系, 二者是独立的:文件是在加载文件时, 而空间是进入内存后
4. 空间应用, 通常是采用非限定名称(自己空间里), 和完全限定名称访问(其他空间)





> **引入**:  实际开发中, 一般都会进行优化, 不会直接使用完全限定名称访问. 并且考虑到继承之类的, 会出现各种文件的包含和空间的交互, 因此为了能够简单的使用, 可以采用 `空间元素` 引入

### 命名空间引入

> **定义: ** 命名空间引入其实就是将另外一个空间的元素 (类, 函数和常量) 引入到当亲空间来, 当做当前空间的元素访问, 从而减少复杂的完全限定名称访问, 取而代之的是非限定名称的访问.

1. 空间引入方式: use 关键字

```php
namespace space;
class Man{}

namespace space2;
use space\Man;
new Man();
```

**注意: ** use 进入空间包含的时候, 默认是从全局空间开始构建路径的 (不是自己空间空间的相对路径)

```php
//	上述的空间引入等价于如下
namespace space;
class Man{}
namespace space2;
use \space\Man;
new Man();
```

2. 空间引入的元素默认是类, 如果要引入其他元素, 就必须使用相应关键字: function 和 const

```php
<?php 
//  命名空间引入
namespace space1;
function show(){
    echo __METHOD__."<br>";
}
const P = 3;
class Student{
    public function __construct(){
        echo __METHOD__."<br>";
    }
}

namespace space2;
//  引入默认是类, 不需要添加关键字
use space1\Student;
new Student;
//  引入方法必须添加 function 关键字
use function space1\show;
show();
//  引入常量必须添加 const 关键字
use const space1\P;
echo P."<br>";
```

3. 如果引入的元素在当前空间已经存在, 则会出现重名, 解决方法是使用别名 `as 别名`, 既已使用了别名, 则使用别名进行操作

```php
namespace space2;
function show(){
    echo __METHOD__."<br>";
}
//  引入方法必须添加 function 关键字, 指定别名
use function space1\show as oShow;
//	使用别名进行操作
oShow();
```

4. 如果一个空间有多个元素需要引入, 那么可以进行一次引入多个, 使用都好分隔.



> **总结: **

1. 空间引入是解决访问时的麻烦: 由完全限定名称 (限定名称) 变成非限定名称访问
2. 空间元素都可以引入, 但是引入方式有所区别
   - 类直接引入
   - 函数需要在 use 之后跟关键字 function
   - 常量需要在 use 之后关键字 const
3. 空间引入过程中, 如果出现重名, 需要使用别名来处理, 引入后在空间里可以直接访问别名方式进行
4. 可以一次性引入一个空间内的多个元素
5. 如果必要的情况下, 也可以直接使用空间引入, 但是要注意被引入空间的元素不允许直接使用非限定名称访问, 必须使用被引入空间的 **最后一级空间+元素访问** (不常使用, 引入方便但是使用不方便=>限定名称)




##  PDO

> **思考:** PHP 支持很多数据库, 因此有很多扩展提供给开发者使用, 而绝大部分数据库的支持都需要开发者再次进行封装的 (因为初始化不一样, 其它操作类似), 那么这个时候如果一个团队需要要做成支持多数据库的话, 需要封装所有要支持书库的操作类.

> **引入:** 如果按照数据库支持的角度出发, 的确镇谷底不同的数据库需要封装不同的数据库操作类, 而且为了确保使用者的操作方便, 需要使用接口或者抽象类来进行规范数据库类的实现, 但是PHP制作团队已经考虑到了用户的使用便捷性,  提供了一种窗体的数据库方式, 那就是PDO.

- PDO类: 统一的数据库的初始化操作, 包括连接认证和执行sql指令
- PDOStatement类: 数据解析操作, 主要针对数据结果的操作 (有数据结果返回)
- PODException类: 异常处理操作, 正对所有 PDO 操作可能出现的错误采用的异常模式处理.



> **引入**: PDO扩展在进开发的时候, 考虑到不同的应用场景和PHP版本, 为了让PDO扩展的使用更加简洁,所以分成了多个工具类

### PDO扩展介绍 

> **定义: ** PDO扩展, 即PHP提供的一套帮助用户实现多数据库操作的统一接口, 通过使用PDO, 开发人员不需要额外自定义数据库对应的操作类, 从而简化开发过程.

1. PDO 在 php5 之前, 需要手动加载扩展, 在 php.init 配置文件中, 找到 扩展pdo, 开启即可(注: php5之后就自动加载了)

```php
;extension = pdo	#	高版本php自动加载 pdo, 无需配置
```

2. PDO是一种针对多种数据库的扩展, 意味着POD很庞大, 所以为了保PHP运行效率(系统会自动在开始时加载扩展), 默认并没有开启对数据库产品的对应扩展, 因此还需要在 **php.ini** 中开启目前项目所需要的PDO对应数据库产品的支持.

![53966953215](.\php\\1539669532154.png)

3. 加载 PDO 对 mysql数据库产品的扩展, 重启 Apache, 然后通过 **phpinfo()** 函数局可以查看PDO的加载情况了, 至少有两个加载才算成功: PDO本身和PDO针对的数据库产品

![53966989606](.\php\\1539669896069.png)

> **总结: ** 

1. PDO是一种外部提供的扩展, PHP如果想直接调用需要加载扩展
2. PDO因为支持产品很多, 所以分解成PDO支持扩展和PDO对应数据库产品的支持, PDO扩展在PHP5之后自殴打你开启, 而数据库产品的支持需要开发者根据实际项目所有数据库来选择性开启



### PDO操作

> **引入: ** 
>
> 使用扩展库最简单的一种方式就是遵循别人提供的操作手册, 操作手册里有各种方法的介绍, 还会有很多其他使用者所提供的案例以及问题的解决方案. 
>
> PDO是一种纯面向对象方式实现的扩展, 需要在掌握面向对象之后, 方便理解, 实际开发追踪, 现在基本都是通用PDO来实现数据库操作

#### PDO类的基本应用

> 定义: PDO 是 **PHP Data Object** 的简称, 代表PHP数据对象, 是一种纯面向对象的方式的数据库操作扩展.

1. PDO类虽然提供了很多方法, 常用的方法如下

```php
PDO::__construct();	//	实例化POD对象
PDO::exec();	//	执行一个 写操作 的sql指令, 返回的是受影响行数
PDO::query();	//	执行 读操作 的sql指令, 返回的是 PDOStatement类对象(后者进行数据库解析操作)
PDO::errorCode(); 和 PDO::errorInfo(); //	获取上次错误的信息(错误代码和错误描述数组)
```

2. PDO 实例化对象: 利用构造方法 __construct(string $dsn, string \$user, string \$pass[,array \$drivers])实现, 前三参数为必须参数, 最后一个可选参数

   - $dsn 数据库基本信息字符串, 包含数据库产品, 主机地址等
     -  驱动名字 (数据库产品), 使用英文 `:` 分隔, 如 mysql: 表示使用mysql数据库
     - 驱动选项 (主机地址), 使用host=具体主机地址, 跟在驱动名字之后, 如 `mysql:host=localhost`
     - 驱动选项 (端口) 使用port=端口号, 默认3306可以不写, 拼凑在驱动名字后, 不区分先后顺序. 如 `mysql:host=localhost;port=3306` 或者 `mysql:port=3306;host=localhost`, 使用分号和其它驱动选项分开.
     - 驱动选项 (数据库名字), 使用 dbname=数据库名字 (可以没有, 后来添加)
   - $user: 用户名, 如果数据库允许匿名用户出现, name可以没有该参数, 只有 \$dsn.
   - $pass: 密码, 意义同上
   - $drivers: PDO 属性设置, 是一个关联数组. 利用 PDO 内部常量进行设置

   ```php
   //	方案1 :直接写入数据进行数据库初始化
   $pdo = new PDO('mysql:host=localhost;port=3306;dbname=my_studyphp','root','woaiwo');
   //	方案2 :利用变量保存数据实现数据库初始化 (数据来源可以是其他配置文件: 安全)
   $dsn = 'mysql:host=localhost;dbname=my_studyphp';
   $user = 'root';
   $pass = 'woaiwo';
   $Pdo = new PDO($dsn, $user, $pass);
   ```

   ![53967229330](.\php\\1539672293308.png)

3. 得到对象后, 我们可以利用PDO对象调用相关方法执行SQL操作:  exec执行数据返回sql, query执行有结果返回sql; 

4. 如果PDO对象在执行SQL 时出现错误, 即SQL本身有错误, name可以通过PDO类提供的 **errorCode()** 和 **errorInfo()** 行数进行检测

   ```php
   <?php
   //  初始化 pdo
   $dsn = 'mysql:host=localhost;dbname=my_studyphp';
   $user = 'root';
   $pass = 'woaiwo';

   $pdo = new PDO($dsn,$user,$pass);

   //  写操作 
   $sql = "insert into n_newss values(null,'测试pdo',2,'测试内容','测试作者','1312312')";
   $row = $pdo->exec($sql);

   //  错误提示
   if($row === false){
       echo '错误代码是:'.$pdo->errorCode();
       echo '<br>错误信息是:'.$pdo->errorInfo()[2];    
   }

   //  读操作
   $sql = "select * from n_news";
   $res = $pdo->query($sql);
   var_dump($res);
   ```

   ![53967388883](.\php\\1539673888835.png)

> **小结: **

1. PDO是一中外部提供的扩展, 可以通过通过查阅资进行自主学习

2. PDO类主要用来实现数据的初始化操作和 SQL 指令的执行

3. SQL 执行的结果不论是写操作还是读操作都有可能出错, 我们可以使用 errorCode() 显示错误代码函数和 errorInfo() 显示错误信息函数来进行错误处理

   ​



> **引入: ** 其实PDO的写操作非常简单, 在进行PDO实例化之后, 我们就可以简单的利用 exec() 方法实现, 但是实际开发中, 我们需要让我们的代码更加成熟.

#### PDO 写操作

> **定义: **写操作, 即利用PDO实现数据库的增删改操作, 操作过程中要考虑到 SQL 本身可能出现的错误处理, 以及对结果操作的处理.

1. 初始化PDO, 每次操作需要用到PDO实例化: 我们选择封装

   ```php
   //	初始化 pdo: 增加错误抑制符, 一致在初始化过程中可能出现的错误
   function pdo_init(){
       $dsn = 'mysql:host=localhost;dbname=my_studyphp';
       $user = 'root';
       $pass = 'woaiwo';
       $pdo = @new PDO($dsn,$user,$pass);
       if(!$pdo) die('数据库连接认证失败!');
       //  设置字符集
       $pdo->exec("set names utf8");
       return $pdo;
   }
   ```

2. SQL 通过应该是外部传入, 外部需要的接收结果, 不考虑过程, 所以在实际开发时要考虑二次封装. 即外部传入 SQL, 内部指向并控制错误, 最终返回结果

   ```php
   //  pdo 写操作函数
   function pdo_exec($pdo,$sql){
       $row = $pdo->exec($sql);
       if($row === false){
           echo '错误代码为: '.$pdo->errorCode();
           echo '错误信息是: '.$pdo->errorInfo()[2];
       }
       return $row;
   }
   ```


   **注意: ** 一般写操作都是受影响行数, 但是如果是插入操作, 有时候需要新增记录的自增长 ID , 可以通过**PDO::lastInsertId()** 来获取

   ```php
//	接上述代码
$id = $pdo->lastInsertId();	//	实际开发也应封装
echo '新增成功! 新增ID为'. $id;
   ```

   ![53970207484](.\php\\1539702074849.png)

> **总结**

1. 实际使用PDO的时候, 都会进行二次封装, 因为 PDO的操作哟很多本身不够完善

2. PDO类可以单独完成写操作功能, 而不需要使用其他两个工具类

3. PDO的写操作本质要注意的是执行SQL时可能出现的错误处理

4. **写操作中唯一不同的是插入操作, 因为可能需要获取自增长ID, 此时需要多一个步骤(功能 lastInsertId)**

   ​



> 思考: 如果执行查询操作, PDO一个类还不能完成, 该如何实现呢?
>
> **引入:** PDO的本质目的是为了进行初始化和SQL执行, 而数据库数据结果通常还需要额外的功能才能真正被PHP理解和访问, 所以PDO查询之后得到的结果会自动转入到PDOSTatement类对象中, 我们可以再利用PDOStatement类的方法来实现对数据的查询操作.

#### PDO 读操作

> **定义: ** 查询操作, 即通过执行SQL指令后从数据库获取相应的数据, 然后对数据加功能编程PHP可识别的格式

1. 查询是建立在连接之上, 因此需要使用到初始化pdo对象功能

```php
/**
 * 初始化 pdo
 * @return void PDO对象
 */
function pdo_init(){
    $dsn = 'mysql:host=localhost;dbname=my_studyphp';
    $user = 'root';
    $pass = 'woaiwo';
    $pdo = @new PDO($dsn,$user,$pass);
    if(!$pdo) die('数据库连接认证失败!');
    //  设置字符集
    $pdo->exec("set names utf8");
    return $pdo;
}
```

2. 查询的SQL也是可能出现问题的部分, 因此同样需要进行错误检查: 另外PDO查询使用的是 **POD::query()** 方法

```php
/**
 * pdo 读操作函数
 * @param [type] $pdo PDO对象
 * @param [type] $sql SQL语句
 * @return void PDOStatement对象
 */
function pdo_query($pdo,$sql){
    $stmt = $pdo->query($sql);
    if($stmt === false){
        //	获取出错信息
        echo "SQL错误: <br>";
        echo "错误代码为: ".$pdo->errorCode().'<br/>';
        echo "错误原因是: ".$pdo->errorInfo()[2];
        exit;
    }
    //	返回执行结果: PDOStatement对象
    return $stmt;
}
```

3. 此时得到读取操作结果是一个对象, 不能提供任何PHP可访问的数据结果, 还需要对结果进行处理, 而我们查询数据的时候通常是两种操作: 根据具体条件获取一条记录或多条记录, 因此返回的数据是不同的, 解决方案也有多种方式: ①创建多个函数来实现不同效果; ②**创建一个函数, 但是通过参数来控制实现不同效果**

   **fetch** 系列方法默认返回的数据是重复的: 数据的索引方式和关联方式个出现一次, 而我们在实际开发中, 通常是通过该数据表字段名作下标进行值的访问, 所以此时我们可以**通过设置 fetch系列 的条件参数来指定我们需要的数据格式**

```php
/**
 *  处理读操作获取数据
 * @param $stmt PDO读操作完成返回的 PDOStatement 对象
 * @param boolean $only 确定默认是取一个值
 * @param [type] $fetch_style 确定获取的数组默认是关联数组  FETCH_ASSOC FETCH_BOTH FETCH_NUM
 * @return void 返回数据
 */
function pdo_get($stmt,$only=true,$fetch_style=PDO::FETCH_ASSOC){
    if($only){
        //  获取一条
        return $stmt->fetch($fetch_style);
    }else{
        //  获取全部
        return $stmt->fetchAll($fetch_style);
    }
}
```

4. 已实现查询数据的功能, 顺序调用即可

```php
//  引入
include_once('pdo_func.php');
//  初始化连接
$pdo = pdo_init();
//  读操作
$sql = "select * from n_news";
$stmt = pdo_query($pdo,$sql);
//  调用方法获取全部数据
$res = pdo_get($stmt,false);
var_dump($res);
```

![53974478752](.\php\\1539744787525.png)

> **总结**

1. PDO 读操作的实现, 通过 **PDO::query()** 执行查询SQL得到 **PDOStatement** 对象, 然后 PDOStatement 对象下有系列 **fetch** 方法可实现数据的查询, 得到 PHP 可以识别的数组数据

2. PDO 实现查询通常也进行二次封装, 保证 SQL 执行安全, 也方便用户获取目标数据.

   ​



> **引入: ** 事务本质是一种 SQL 操作, 也就是利用前面的写操作就可以实现. 在PDO中, 当然也提供了一定的封装来实现这个功能, 从而避免一些简单的固定SQL指令的操作.

#### PDO事务功能

> **定义**:PDO事务功能, 并非 pdo 额外多出一项功能, 而是原来 MySQL所支持的事务操作进行了一定的封装实现. 
>
> **注意: ** 事务执行是否成功取决于 MySQL 对应的存储引擎是否支持决定 

1. 事务回顾: 事务是指改变默认的一次操作, 一次写入数据表的机制, 而是通过事务日志记录操作, 在最后通过一次性操作写入导数据表. 过程如下
   - 开启事务: **start transaction**, 写操作停止直接写入数据表
   - 事务操作: 具体的写操作, 通常多个步骤多条指令
     - 成功提交 commit 所有事物日志内容同步到数据表, 并清空当前事务日志
     - 失败回滚 rollback, 直接清空当前事务日志
2. PDO类中提供一套方案来实现事务操作
   - **PDO::beginTransaction()** 开始事务
   - **PDO::exec()** 执行事务(写操作)
   - **PDO::rollBack()** 回滚所有事物
   - **PDO::commit()** 成功提交所有事物

```php
//	实例化PDO
$pdo = new PDO('mysql:host=localhost;dbname=my_studyphp','root','woaiwo');
//	开启事务
$pdo->beginTransaction() or die('事务开启失败');
//	执行事务
$pdo->exec('insert into n_news values(...)');
//	终止事务
$pdo->commit();		//	成功提交
$pdo->rollback();	//	失败回滚
```

3. mysql事务操作中, 有一种回滚机制, 在PDO中没有实现, 如果有必要, 可以通过SQL指令设置来实现.

```php
//	实例化PDO
$pdo = new PDO('mysql:host=localhost;dbname=my_studyphp','root','woaiwo');
//	开启事务
$pdo->beginTransaction() or die('事务开启失败');
//	执行事务
$pdo->exec('insert into n_news values(...)');

//	设置回滚点
$pdo->exec('savepoint sp1');
//	继续执行其他事务
$pdo->exec("update n_news set title='xxx' where id = 1");
//	回滚事务
$pdo->exec('rollback to sp1');

//	终止事务
$pdo->commit();		//	成功提交
$pdo->rollback();	//	失败回滚
```

> **总结**

1. 事务本质是由既定SQL指令完成, 而事务具体操作内容一定是外部指定的 SQL(写操作) 来处理

2. PDO提供了事务固定内容的封装, 包括开启事务(PDO::beginTransaction) 和 终止事务(PDO::commit()和rollback())

3. 回滚点可以通过 PDO::exec() 方法来设定和回滚

4. 如果不采用PDO的事务机制, 也完全可以利用 PDO::exec() 来实现事物的回滚(MySQL事务操作)

   - PDO::exec("start transaction") 开启事务

   - PDO::exec("commit") 提交事务

   - PDO::exec("rollback") 回滚事务

     ​

### PDO异常

> **思考: ** 我们碰到的错误基本都是一旦出错, 系统就会给出错误信息, 不过很多错误都是直接给出的, 这样的话用户体验很不好.
>
> **引入: ** PHP因为是从面向过程发展而来, 系统基本承担了所有编译层以及执行层出现的问题, 即使现在到面向对象, 系统也直接报错 (生产环境可以通过错误的设置或者 php.init配置抑制错误). 开发的时候, 我们希望我们能抓住错误点, 而且通过合适的方式保存或者提示给用户,此时需要用到 **异常处理**

#### 异常机制

> **定义: ** 异常机制 Exception, 是面向对象中一种错误捕捉机制. 用来捕捉一些执行层面的问题 (语法问题会在编译时出现. 开发时可以避免) 通常是因为一些不确定的内容导致代码无法正常运行, 然后我们按照设定的逻辑来处理这些问题

1. 异常定义: 异常exception是面向对象的一种错误处理机制, 它允许开发人员将可能出现的错误被对象(Exception类)捕捉, 然后在特定位置通过盖度下进行处理.如

```php
$res = 4/0;
```

上述代码再编译时不存在问题, 但是在运行的时候因为被除数为0, 所以会出现错误. 而这个时候默认的, 就是系统无法正确执行, 里面给出错误(php默认的规则), 这种错误直接给出的方式不属于异常捕捉, **异常捕捉需要用到异常类 Exception 类来进行**捕捉, **使用 throw手动抛出错误**

```php
<?php 
$v1 = $_GET["v1"];
$v2 = $_GET["v2"];
if($v2==0){
	//	如果被除数为0, 不能操作: 抛出异常
    throw new Exception("第二个参数不能为0");
}
$res = $v1/$v2;
//	没有问题继续执行
echo $res;
```

![53974827854](.\php\\1539748278546.png)

由此看出, 使用面向对象的方式会额外增加代码来事件错误处理, 但是在面向对象中, 异常机制通常很成熟, 并不需要写额外很多代码, 而且绝大部分事件里, 我们并不会处理 "不可能" 出现的代码

#### PDO错误机制

> **定义: ** PDO错误机制, 是指PDO在使用过程中出现了错误 (大多是SQL 指令执行错误) 的时候, PDO处理错误的方式.

1. PDO中提供了三种错误机制, 是通过PDO的常量 **PDO::ATTR_ERRMODE** 来选择.
   - **PDO::ERRMODE_SILENT**: **静默模式**, 出错了不处理(默认的)
   - **PDO::ERRMODE_WARNING**: 警告模式, 出错了立马给出错误提示
   - **PDO::ERRMODE_EXCEPTION**: 异常模式, 出错了将错误交给异常 PDOException 对象

- PDO::ERRMODE_SILENT 静默模式(默认)

  ```php
  $pdo = new PDO('mysql:host=localhost;port=3306;dbname=my_studyphp','root','woaiwo');
  $pdo->exec('insert into n_news values()');
  ```

  ![53975674028](.\php\\1539756740283.png)

- PDO::ERRMODE_WARNING 警告模式

  ```php
  $pdo = new PDO('mysql:host=localhost;port=3306;dbname=my_studyphp','root','woaiwo');
  //  修改 错误处理模式 为警告
  $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);
  $pdo->exec('insert into n_news values()');
  ```

  ![53975713909](.\php\\1539757139094.png)

- PDO::ERRMODE_EXCEPTION 异常模式

  ```php
  $pdo = new PDO('mysql:host=localhost;port=3306;dbname=my_studyphp','root','woaiwo');
  $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
  $pdo->exec('insert into n_news values()');
  ```

  ![53975738765](.\php\\1539757387657.png)

  **使用 try catch 捕捉异常错误**

  ````php
  //	修改代码
  try{
      $pdo->exec('insert into n_news values()');  //  异常模式下,错误会被捕捉到
  }catch(PDOException $e){
      echo "SQL错误: <br>";
      echo "错误文件是: ".$e->getFile();
      echo "<br>错误行是: ".$e->getLine();
      echo "<br>错误代号是: ".$e->getCode();
      echo "<br>错误提示是: ".$e->getMessage();
  }
  ````

  ![53975782581](.\php\\1539757825811.png)

  ![53975855532](.\php\\1539758555329.png)

> **总结: **

1. PDO提供多种错误处理机制: 静默模式, 警告模式和异常模式, 默认是静默模式
2. PDO可以通过PDO::setAttribute() 方法来设定错误处理模式
3. PDO异常模式使通过 **PDOException** 来捕捉异常的



> **引入: ** 其实PDO之所以提供了这么多模式, 就是要使用人员根据实际情况来选择模式. 如果一个项目中, 需要我们去控制项目 bug, name就是和使用异常模式来进行处理.

#### PDOException异常处理

> **定义: ** PDOException, 是PDO从 Exception 继承的一个用于处理PDO错误的异常类. 一般如果作扩展, 都会从继承 Exception类来实现一套明确的机制

1. 要使用PDOException异常处理, 需要设定PDO的错误模式为异常模式, 在PDO 中可以通过两种模式来实现异常模式的设定
   - 在初始化PDO的时候, **利用第四个参数**来设定
   - 在初始化PDO之后, **利用PDO::setAttribute()** 方法来修改错误模式

```php
//	1. 在初始化PDO的时候设定错误模式
$drivers = array(
	//	可以设置多种驱动(属性设置)
	PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
);
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=my_studyphp','root','woaiwo',$drivers);

//	2. 使用属性设置
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=my_studyphp','root','woaiwo');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
```

2. 当确定了我们要使用的异常处理之后, 我们就可以针对可能出现的错误的位置使用异常来捕捉了(通常在执行SQL的时候)

```php
//  实例化pdo 
try{
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=my_studyphp','root','woaiwo',$drivers);
}catch(PDOException $e){
    echo "SQL连接失败: <br>";
    echo "错误文件是: ".$e->getFile();
    echo "<br>错误行是: ".$e->getLine();
    echo "<br>错误代号是: ".$e->getCode();
    echo "<br>错误提示是: ".$e->getMessage();
    exit();
}
```

3. 从PDO执行来讲, 因为PDO异常模式的设置时在POD实例化之后,那么如果PDO实例化的时候错误, 此时好像PDOException就无法工作了, 事实上 PDO也考虑到了这点, 所以PDO实例化的时候, 本身是可以使用 try{}catch(){}来捕获的.

```php
<?php 
//  实例化PDO可传递的第四个参数
$drivers = array(
    PDO::ATTR_ERRMODE =>PDO::ERRMODE_EXCEPTION
);
//  实例化pdo 
try{
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=my_studyphp','root','woaiwo',$drivers);
}catch(PDOException $e){
    echo "SQL连接失败: <br>";
    echo "错误文件是: ".$e->getFile();
    echo "<br>错误行是: ".$e->getLine();
    echo "<br>错误代号是: ".$e->getCode();
    echo "<br>错误提示是: ".$e->getMessage();
    die();
}
```

4. PDO执行过程中, 如果碰到了以外 (逻辑无法继续执行, 那么也可以主动抛出异常) 使用 **throw**

```php
$res = $pdo->exec('delete from n_news where id = 2');
if(!$res) throw new PDOException('检测到该id值不存在, 删除失败!');
```

5. 异常处理比较常用, 所以我们对其进行封装

```php
/**
 * 异常处理封装 function: 因为异常使用比较多, 我们可以对异常处理进行封装
 * @param PDOException $e 错误对象
 */
function my_exception(PDOException $e){ //  强类型
    echo "SQL 执行失败!<br>";
    echo "错误文件是: ".$e->getFile();
    echo "<br>错误行是: ".$e->getLine();
    echo "<br>错误代号是: ".$e->getCode();
    echo "<br>错误描述是: ".$e->getMessage();
    die();
}  
```

**完整示例**

```php
<?php 

/**
 * 异常处理封装 function: 因为异常使用比较多, 我们可以对异常处理进行封装
 * @param PDOException $e 错误对象
 */
function my_exception(PDOException $e){ //  强类型
    echo "SQL 执行失败!<br>";
    echo "错误文件是: ".$e->getFile();
    echo "<br>错误行是: ".$e->getLine();
    echo "<br>错误代号是: ".$e->getCode();
    echo "<br>错误描述是: ".$e->getMessage();
    die();
}  

//  实例化PDO可传递的第四个参数, 修改错误为抛出异常
$drivers = array(
    PDO::ATTR_ERRMODE =>PDO::ERRMODE_EXCEPTION
);

//  实例化pdo, 抓书库连接错误异常
try{
    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=my_studyphp','root','woaiwo',$drivers);
}catch(PDOException $e){
    my_exception($e);   //  异常处理函数调用
}

//  抓数据操作异常
try{
    $res = $pdo->exec('delete from n_news where id = 2');
    if(!$res) throw new PDOException('检测到该id值不存在, 删除失败!');
}catch(PDOException $e){
    my_exception($e);
}
```

![53979352613](.\php\\1539793526137.png)

> **总结**

1. PDOException 是一种用来捕捉异常PDO (PDOStatement) 类使用过程中产生的错误

2. PDOException 在使用执勤啊需要开启 PDO 的异常模式 (PDO的实例化除外, 可以直接捕捉)

3. PDOException 一般是在 SQL 执行过程中出错, 如果其它代码执行过程中, 业务逻辑不符合要求 (代码没问题), name也可以使用 throw new PDOException() 来实现抛出异常

   ​

### 预处理

> **引入: ** SQL的执行从数据库端来讲, 都是一条一条执行的. SQL 在 MySQL服务器执行的逻辑是先编译后执行的, 意味着即使是同一条SQL, 每次发送到服务器端, 都会经历编译, 执行的过程, 如果SQL量特别大, 那么效率就会打折扣. 为此, MySQL提供了一套 **`预处理`** 机制, 可以实现效率的提升.

#### MySQL预处理

> **定义: ** 预处理**prepare**, 是指客户端将要执行的 SQL 现发给服务器, 服务器先开始编译, 不执行. 等到客户端需要服务器执行的时候, 发送一条执行指令, 让服务器再执行依据提前处理好 (预处理) 的SQL指令.

1. 预处理流程: 预处理流程是相对普通SQL执行流程的, 普通的是客户端与服务器一对一一次性的服务器, 而预处理可能是一对一但是多次服务

   **普通SQL执行流程**

   ```sequence
   MySQL客户端->MySQL服务端: 发送指令
   note right of MySQL服务端:接收指令->编译->执行
   MySQL服务端->MySQL客户端: 返回执行结果
   note left of MySQL客户端: 接收执行结果->解析结果
   MySQL客户端->MySQL服务端: 再次发送SQL指令(可能相同)
   note right of MySQL服务端: 接收指令->编译->执行
   MySQL服务端->MySQL客户端: 返回执行结果
   note left of MySQL客户端: 接收执行结果->解析结果
   ```

   **MySQL预处理执行流程**

   ```sequence
   MySQL客户端->MySQL服务端: 发送SQL指令(预处理包装)
   note right of MySQL服务端: 接收指令->编译
   MySQL服务端->MySQL客户端: 返回预处理编译结果
   note left of MySQL客户端: 接收编译结果->解析结果
   MySQL客户端->MySQL服务端: 发送预处理执行指令
   note right of MySQL服务端: 接收指令->执行编译后的预处理指令
   MySQL服务端->MySQL客户端: 返回执行结果
   note left of MySQL客户端: 接收执行结果->解析结果
   note over MySQL客户端,MySQL服务端: 只要通过预处理执行, 服务端都不需要再次进行\n额外的编译, 直接执行编译好的内容即可
   ```

2. 实现预处理: 预处理的步骤最开始会比普通SQL执行多一步, 但是后续会节省服务器的响应时间, 提升服务端的服务效率, 预处理操作步骤如下

   1. 发送预处理: `prepare 预处理名字 from '需要重复执行的SQL指令'`
   2. 执行预处理: `execute 预处理名字`

   ```mysql
   -- 发送预处理
   prepare news_select from 'select * from n_news';
   -- 执行预处理
   execute news_select;
   ```

   ![53983836821](.\php\1539838368219.png)

3. 预处理占位: 如果一条SQL本身就是重复多次, 不见得预处理的优势.实际开发中, 更多的时候需要条件变化的, 因此预处理可以进行预处理占位, 在执行的时候把数据填入即可回想那不同SQL 查询结果

   1. 预处理占位符: 在预处理指令中要执行的SQL指令, 使用 `?` 来代替位置数据部分
   2. 预处理执行(using): 在执行预处理的时候将对应的数据携带到预处理指令中

   ```mysql
   -- 发送预处理(带占位)
   prepare news_select from 'select * from n_news where id = ?';
   -- 定义参数
   set @id = 5;
   -- 预处理执行, 使用using携带参数
   execute news_select using @id;
   ```

   ![53983875666](.\php\1539838756663.png)

4. 预处理可以同时设定多个占位符, 在执行预处理的时候传入对应的参数即可(顺序匹配)

   ```mysql
   -- 定义预处理
   prepare n_select from "select * from n_news where title=? and publier=?";
   -- 执行预处理
   excute n_select using @v1,@v2;
   ```

   ![53983923661](.\php\1539839236612.png)

5. 预处理在MySQL中, 针对一个客户端不能出现同名预处理, 如果预处理使用完毕, 我们可以把预处理给删除, 以保证后续使用的方便, 语法 `drop prepare 预处理名字`

   ```mysql
   drop prepare n_select;
   ```

   ![53983946350](.\php\1539839463507.png)

> **总结**

1. 预处理 **prepare** 是 **MySQL** 提供的一套可以优化服务器重复执行SQL的方法, 可以提升服务器的性能
2. 预处理是一套提前让服务器编译的机制, 一次编译多次执行, 节省后续编译的成本
3. 预处理分两个步骤: 
   1. 发送预处理指令 `prepare 预处理名字 from '预处理SQL'` 
   2. 执行预处理指令 `execute 预处理名字`
4. 预处理可以进行数据更换执行, 利用预处理指令的占位符 `?` 和执行时携带数据 `using`
5. 同一个客户端不允许设定同名预处理, 因此在执行预处理的时候, 如果不再使用应该删除
6. 预处理不只是针对查询操作, 增删改查操作都可以使用预处理



> **引入: ** 其实所有的SQL指令, 理论上都可以通过 PDO::exec() 和 PDO::query() 来执行, PDO中为了用户方便, 制作了一套预处理流程

#### PDO预处理

> **定义: ** PDO预处理, 是PDO封装的一套特定的方法, 在方法中做了一些优化操作, 使得开发人员可以便捷的用来实现预处理

1. PDO中预处理提供了一套方法机制, 主要由以下几个方法组成

   - PDO::prepare() 发送预处理指令, 只需要提供要执行的指令即可, 不需要prepare名字from. 成功得到一个 PDOStatement 类对象, 失败得到一个false或者异常错误
   - PDOStatement::bindValue() 绑定预处理所需要的参数, 可以绑定值(值传递)
   - PDOStatement::bindParam() 绑定预处理所需要的参数, 只能绑定变量(引用传递)
   - PDOStatement::execute() 执行预处理, 成功返回true, 失败返回 false

2. PDO发送预处理指令: 即利用 PDO::prepare() 方法将要执行的sql指令先发送给服务器编译

   ```php
   //  链接数据库
   $pdo = new PDO('mysql:host=localhost;port=3306;dbname=my_studyphp','root','woaiwo');
   //  发送预处理指令
   $pre_sql = "select * from n_news where title=:title and publiser=:publisher";
   $stmt = $pdo->prepare($pre_sql);
   ```

3. 绑定预处理参数: 如果预处理本身是需要携带参数的, 那么可以使用PDOStatement::bindValue() / PDOStatement::bindParam() 进行参数绑定

   **注意**: 如果在发送预处理指令的时候, 使用 "?" 作占位符, 那么我们在进行数据绑定的时候, 是按照顺序进行绑定的, 其实位置的占位符需要为1, 如果多个占位符, 依次类推

   ```php
   //	接上述代码
   $id = 3;
   $stmt->bindParam(':id',$id);
   ```

4. 执行预处理: 利用 PDOStatement::execute() 方法

   ```php
   //	接上述代码
   $stmt->execute();
   ```

5. 流程如下

   ![53984260287](.\php\1539842602874.png)

   ![53984312444](.\php\1539843124447.png)

> **总结: **

1. PDO预处理除了本身实现了 MySQL的预处理, 还额外优化了占位符: 使用 `:名字` 作占位符
2. PDO利用了 **PDO::prepare()** 发方法来发送预处理SQL指令, 成功得到 **PDOStatement** 对象
3. PDO利用 **PDOStatement::bindValue()/PDOStatement::bindParam() 来实现预处理数据绑定**
4. PDO利用 **PDO::execute() 来实现调用预处理**
5. 如果利用PDO预处理来实现数据查询, 那么在执行完成预处理之后, 还需要调用 **PDOStatement::fetch()** 方法来获取预处理得到的数据

#### PDO预处理数据绑定

> 数据绑定, 是指在进行预处理指令定义时使用了占位符, 为了保证后续代码正确的执行

1. 在PDO中, PDOStatement::exec 本身是可以进行数据绑定的, 即在参数中早呢更加对应的占位符数据, 以数组形式传入

   ```php
   //	预处理形式使用原始占位符 ?
   $stmt = $pdo->prepare("select * from n_news where id = ?");
   $stmt->execute(array(3));	//	array代表是数组, 3代表替换之, 如果有多个元素, 依次放入即可
   //	预处理形式使用 POD占位符 :名字
   $stmt = $pdo->prepare("select * from n_news where id = :id");
   $stmt->execute(array(':id'=>3));	//	使用占位符作为数组元素下标
   ```

   ![53984409089](.\php\1539844090895.png)

2. PDOStatement::bindValue() 和 PDOStatement::bindParam() 区别

   -  二者都可以实现占位符的数据绑定
   - bindValue() 绑定数据的方式灵活, 可以是变量也可以是数据常量; 而bindParam()只能是变量
   - 因为bindParam绑定的是变量(引用传值), 所以如果被绑定的变量发生变化, 会直接影响后续execute结果

   ```php
   //  链接数据库
   $pdo = new PDO('mysql:host=localhost;port=3306;dbname=my_studyphp','root','woaiwo');
   $pdo->exec('set names utf8');
   //  发送预处理指令
   $pre_sql = "select * from n_news where id = :id";
   $stmt = $pdo->prepare($pre_sql);
   $id = 1;
   //  使用bindValue绑定
   //	$stmt->bindValue(':id',$id);
   //  使用bindParam绑定
   $stmt->bindParam(':id',$id);
   for(;$id<20;$id++){
       $stmt->execute();
       var_dump($stmt->fetch(PDO::FETCH_ASSOC));
   }
   ```

   ![53984465420](.\php\1539844654202.png)

   ![53984469026](.\php\1539844690261.png)

> **总结**

1. PDO绑定预处理数据的方式有多种: PDOStatement::bindValue()/bindParam()/execute()
2. 如果数据简单且不需要重复, 使用 bindValue 和 execute
3. 如果数据是变化的. 而且有规则(数组遍历出来的结果), 那么可以使用 bindParam() 来节省操作 


### 封装PDO

> **定义: ** 对PDO进行二次封装, 从而让原本多处需要使用PDO的地方, 能够直接使用二次封装的类, 简化数据库操作.

1. 明确PDO需要封装的内容

   - 使用命名空间方便
   - PDO的实例化: 得到PDO对象, 而且PDO对象需要在不同的方法中使用, 可以考虑PDO得到的对象保存在属性中
   - 写操作: 包含普通SQL执行返回受影响行数和获取自增长ID
   - 查操作: 包含单行查询和多行查询
   - 隐藏操作: 异常处理封装
   - 其他操作: 根据需求增加对应功能即可

2. 开始封装

   1. 增加命名空间

      ```php
      //  命名空间: 因为PDO通常属于核心类, 使用核心关键字 core命名
      namespace core;

      //  有了命名空间, 所以PDO的三个类不能直接使用, 使用完全限定名称访问, 引入PDO三类
      use \PDO,\PDOStatement,\PDOException;
      ```

   2. 定义类: 增加必要的属性(PDO对象)

      ```php
      class Dao{
          //  属性
          private $pdo;
          private $fetch_mode;
      }
      ```

   3. 增加初始化方法: 得到PDO对象, 考虑参数的外部传入和默认值, 数据较多可以采用关联数组

      ```php
      //  构造方法
      public function __construct($info=array(),$drivers=array()){
          $type = $info['type'] ?? 'mysql';
          $host = $info['host'] ?? 'localhost';
          $port = $info['port'] ?? '3306';
          $user = $info['user'] ?? 'root';
          $pass = $info['pass'] ?? '123456';
          $dbname = $info['dbname'] ?? 'my_studyphp';
          $charset = $info['charset'] ?? 'utf8';
          $this->fetch_mode = $info['fetch_mode'] ?? PDO::FETCH_ASSOC;

          //  驱动控制: 异常模式处理
          $drivers[PDO::ATTR_ERRMODE] = $drivers[PDO::ATTR_ERRMODE] ?? PDO::ERRMODE_EXCEPTION;

          //  实例化PDO对象
          try{
              $this->pdo = new PDO($type.':host='.$host.';port='.$port.';dbname='.$dbname,$user,$pass,$drivers);
          }catch(PDOException $e){
              echo "数据库连接错误!";
              echo '<br>错误文件是: '.$e->getFile();
              echo '<br>错误行号是: '.$e->getLine();
              echo '<br>错误代号是: '.$e->getCode();
              echo '<br>错误描述是: '.$e->getMessage();
              die();
          }

          //  设置字符集
          try{
              $this->pdo->exec("set names {$charset}");
          }catch(PDOException $e){
              echo "SQL执行错误!";
              echo '<br>错误文件是: '.$e->getFile();
              echo '<br>错误行号是: '.$e->getLine();
              echo '<br>错误代号是: '.$e->getCode();
              echo '<br>错误描述是: '.$e->getMessage();
              die();
          }
      }
      ```

   4. 我们发现异常处理需要经常使用, 所以进行了封装

      ```php
      //  SQL执行错误的异常处理
      private function dao_exception(PDOException $e){
          echo "SQL执行错误!";
          echo '<br>错误文件是: '.$e->getFile();
          echo '<br>错误行号是: '.$e->getLine();
          echo '<br>错误代号是: '.$e->getCode();
          echo '<br>错误描述是: '.$e->getMessage();
          die();
      }
      ```

   5. 编写写操作: 对外调用

      ```php
      //  SQL写操作
      public function dao_exec($sql){
          try{
              return $this->pdo->exec($sql);	//	返回受影响行数
          }catch(PDOException $e){
              $this->dao_exception($e);
          }
      }
      ```

   6. 完善写操作: 早呢更加对外提供自增长ID的方法

      ```php
      //  获取自增长ID
      public function dao_insert_id(){
          return $this->pdo->lastInsertId();
      }
      ```

   7. 编写读操作, 对外调用

      ```php
      //  SQL读操作:一条或多条, 默认一条
      public function dao_query($sql,$only=true){
          try{
              //  执行查询操作
              $stmt = $this->pdo->query($sql);

              //  设置查询返回结果类型 fetch_model
              $stmt->setFetchMode($this->fetch_mode);

              //  解析数据
              if($only){
                  $row = $stmt->fetch();
                  //  如果没有数据, 主动抛出错误
                  if (!$row) throw new PDOException('您的查询没有结果!');
                  return $row;
              }else{
                  $rows = $stmt->fetchAll();
                  if (!$rows) throw new PDOException('您的查询没有结果!');
                  return $rows;
              }

          }catch(PDOException $e){
              $this->dao_exception($e);
          }
      }
      ```

3. **一个基础的pdo完整封装**

   ```php
   <?php 
   /**
    * 基础增删改查操作的pdo二次封装类
    */

   //  定义命名空间: 核心类
   namespace core;

   //  引入全局空间类: PDO三类
   use \PDO,\PDOStatement,\PDOException;

   //  创建Dao类
   class Dao{
       //  属性
       private $pdo;
       private $fetch_mode;
       
       //  构造方法
       public function __construct($info=array(),$drivers=array()){
           $type = $info['type'] ?? 'mysql';
           $host = $info['host'] ?? 'localhost';
           $port = $info['port'] ?? '3306';
           $user = $info['user'] ?? 'root';
           $pass = $info['pass'] ?? '123456';
           $dbname = $info['dbname'] ?? 'my_studyphp';
           $charset = $info['charset'] ?? 'utf8';
           $this->fetch_mode = $info['fetch_mode'] ?? PDO::FETCH_ASSOC;

           //  驱动控制: 异常模式处理
           $drivers[PDO::ATTR_ERRMODE] = $drivers[PDO::ATTR_ERRMODE] ?? PDO::ERRMODE_EXCEPTION;

           //  实例化PDO对象
           try{
               $this->pdo = new PDO($type.':host='.$host.';port='.$port.';dbname='.$dbname,$user,$pass,$drivers);
           }catch(PDOException $e){
               echo "数据库连接错误!";
               echo '<br>错误文件是: '.$e->getFile();
               echo '<br>错误行号是: '.$e->getLine();
               echo '<br>错误代号是: '.$e->getCode();
               echo '<br>错误描述是: '.$e->getMessage();
               die();
           }

           //  设置字符集
           try{
               $this->pdo->exec("set names {$charset}");
           }catch(PDOException $e){
               $this->dao_exception($e);
           }
       }

       //  SQL执行错误的异常处理
       private function dao_exception(PDOException $e){
           echo "SQL执行错误!";
           echo '<br>错误文件是: '.$e->getFile();
           echo '<br>错误行号是: '.$e->getLine();
           echo '<br>错误代号是: '.$e->getCode();
           echo '<br>错误描述是: '.$e->getMessage();
           die();
       }

       //  SQL写操作
       public function dao_exec($sql){
           try{
               return $this->pdo->exec($sql);
           }catch(PDOException $e){
               $this->dao_exception($e);
           }
       }
       //  获取自增长ID
       public function dao_insert_id(){
           return $this->pdo->lastInsertId();
       }

       //  SQL读操作:一条或多条, 默认一条
       public function dao_query($sql,$only=true){
           try{
               //  执行查询操作
               $stmt = $this->pdo->query($sql);

               //  设置查询返回结果类型 fetch_model
               $stmt->setFetchMode($this->fetch_mode);

               //  解析数据
               if($only){
                   $row = $stmt->fetch();
                   //  如果没有数据, 主动抛出错误
                   if (!$row) throw new PDOException('您的查询没有结果!');
                   return $row;
               }else{
                   $rows = $stmt->fetchAll();
                   if (!$rows) throw new PDOException('您的查询没有结果!');
                   return $rows;
               }

           }catch(PDOException $e){
               $this->dao_exception($e);
           }
       }
   }
   ```


```php
//  测试
$info = array(
    'pass'=>'woaiwo',
    'charset'=>'utf8'
);
$drivers = array(
    PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION
);
dao = new Dao(info,$drivers);
res = dao->dao_query('select * from n_news where id = 3');
var_dump($res);
```
![53985143444](.\php\1539851434440.png)

> **总结**

1. PDO的使用是经常性的, 所以我们需要将PDO 变得更加灵活, 更加贴近我们的项目, 从而实现更多代码的复用, 因此需要对PDO进行二次封装
2. PDO的封装要根据项目需求来实现的, 如果只是基础功能, 那么实现了增删改查即可, 而如果项目里要用到更多内容, 如事务, 预处理等, 需要进行更多的封装

---

## MVC

> **引入: **  PHP学习开始, 我们的代码先是出现在HTML混合状态下, 然后慢慢的独立出来, 后来又将代码再分离到不同的脚本中, 互相加载调用彼此. 
>
> 其实从实现业务功能而言, 那种模式都可以, 但是项目开发往往属于团队协作, 讲究团队配合以及后期代码的可维护性, 从而就出现了代码的分类, 分文件的做法. 对于代码的发展, 我们有不同的定位, 每种方法都有其独特的优缺点

### 代码发展历程

> **定义:** 代码发展历程其实也是随着软件工程思想的成熟, 并依赖硬件水平的提高而形成的度自然过渡. 在过渡的过程中,主要形成了一下几种开发方式.

1. 混编方式: 即PHP代码与HTML相互嵌入
   - 优点: 服务器解析效率最高
   - 缺点: 代码复用性极低, 视觉效果差, 可维护性查
2. 模块技术: 将PHP代码与HTML 代码进行分离, PHP中实现业务逻辑和数据处理, HTML只进行数据的显示.
   - 优点: 代码复用性增强, 视觉效果增强, 前后端分离有助于前后端工程师维护
   - 缺点: 小项目开发效率降低, 服务器解析效率降低
3. MVC思想: 在模板技术之上, 将PHP 代码的业务逻辑处理部分和数据操作部分继续分离, 独立维护
   - 优点: 分类好管理, 视觉效果好, 维护性强
   - 缺点: 前期开发效率第, 服务器解析效率最低
4. 发展历程
   1. 混编模式是PHP早期的设计模式, 当时要完成的内容很简单(如个人博客), 硬件效率也不是很高(网络传输效率不高)
   2. PHP逐渐被开发人员所喜欢, 开始进行一些较大项目, 为了方便维护, 就进行了前后盾分离, 出下了模板技术.
   3. 面向对象开发作为编程主流, PHP也朝着这个方向发展, 作为大型项的支撑, 需要有更好的代码结构, 实现代码的复用和后续维护, 因此出现了 MVC思想

>  **总结**

1. PHP随着时代发展, 经历了三个阶段: 混编阶段, 模板技术(前后端分离) 和 MVC思想设计
2. 每个阶段都有彼此优缺点 
3. MVC思想符合人类思维模式, 缺点是服务器解析成本高, 不过随着硬件的发展和网络的发展, 这些效率相对开发维护而言, 已经不足为虑.



> **引入: ** MVC思想代码分离的逻辑就是 "专人专事", 该谁做的事情就归结到某一个具体的 "对象" 来完成, 一旦某些功能已经出现过, 那么后续所有需要使用该功能的其他文件就可以直接使用(面向对象继承)

### MVC概述及案例

> **定义: ** MVC思想, 并非一种特定的技术, 而是一种基于 **面向对象思想** 形成的有利于代码复用的设计行为. 基于MVC思想开放的代码更加符合人类行为特性, 也更利于后期项目的维护和扩展.

1. MVC是一种缩写结构: **在MVC中, 每个模块只做自己的事情**

- M: Model, 数据模型. 专门负责数据操作, 针对数据库部分的代码. 一个模型(类) 针对一张数据表
- V: View, 视图. 专门负责结果数据渲染 (HTML+CSS+JavaScript)
- C: Controller, 控制器. 负责所有的业务处理. 一个控制器控制(类) 一类业务

#### MVC各部分功能

- **Controller(控制器)**: **负责与客户打交道**, 包括: 获取客户请求, 返回结果给客户, 逻辑处理, **调用Model来获取数据**, **调用View 来格式化数据**. 可以理解为 "**调度中心**"
- **Model(s数据模型)**: **负责数据处理**. **与 MySQL直接打交道**. 数据的所有操作, 都由Model来处理. 数据获取到后, 再交给控制器
- **View(视图)**: **负责数据的展示, 格式化**. 主要涉及前端相关技术
- MVC适合大项目, 适合多人合作开发.

**在一次HTTP请求过程中, Controller负责与客户交互, Controller 找 Model 来获取数据, View负责展示或格式化数据.**

![53994516103](.\php\1539945161035.png)

2. MVC思想设计下的代码工作逻辑

- 用户发起请求: 请求控制器C
- 处理器处理业务逻辑
  - 遇到数据处理需求: 请求模型M实现数据库操作
  - 处理结果展示: 调用视图V显示渲染数据

```sequence
浏览器->服务器:发送请求
服务器->控制器:控制器接收请求
note right of 控制器:控制器接受请求\n业务处理
控制器-->模型:数据处理需求
模型-->控制器:返回数据
控制器-->视图:数据渲染处理
视图-->控制器:返回渲染结果
控制器->服务器:控制器处理完毕交给服务器
服务器->浏览器:服务器返回执行结果给浏览器
note left of 浏览器:解析渲染后的数据结构
```

3. 在面向对象的MVC中, 因为模型是针对具体数据表, 意味着每个模型都需要进行数据库的链接操作, 这个时候通常会设计一层专门负责数据库初始化部分的(类似二次封装PDO, 没有具体数据业务, 只负责数据库底层操作) 我们把这层叫做 DAO(Data Access Object) 数据访问对象

![53985363196](.\php\1539853631961.png)

> **总结**

1. MVC并非一种技术, 而是一种代码分离设计思想
2. MVC是会让代码运行变慢, 但是语句现在硬件性能, 这个效率影响一般可以忽略
3. MVC由控制器, 模型, 视图三部分组成
   - 控制器: 负责所有事务处理, 也包括调用模型和视图
   - 模型: 只负责数据逻辑处理, 包括操作数据库
   - 视图: 只负责数据渲染, 主要是HTML+CSS+JavaScript
4. 通常情况下, 面向对象中还有会在模型和数据库之间增加一层DAO来专门负责数据库底层实现


#### MVC简单演示

**Controller(控制器)代码**

```php
<?php 
header('content-type:text/html;charset=utf-8');
//  包含模型类文件
require_once("./Model.class.php");

//  1.获取客户传递的参数
$type = isset($_GET['type']) ? $_GET['type'] : 3;

//  2. 调用Model获取数据, 一般是Model类
$modelObj = new DateTime2();
//  根据用户传递的参数调用不同的方法
switch($type){
    case 1:
        $str = $modelObj->getDate();
        break;
    case 2:
        $str = $modelObj->getTime();
        break;
    default:
        $str = $modelObj->getDateTime();
}

//  3. 调用View来展示数据
include "./view.html";

```

**Model(数据类型)代码**

```php
<?php 
//  定义一个日起事件类
class DateTime2{
    //  获取日期的方法
    public function getDate(){
        return date("Y-m-d");
    } 
    //  获取时间的方法
    public function getTime(){
        return date("H:i:s");
    } 
    //  获取日期时间的方法
    public function getDateTime(){
        return date("Y-m-d H:i:s");
    } 
}

```

**View(视图)代码**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>View</title>
</head>
<body>
    <!--省略控制器名(请求地址): Controller.php-->
    <a href="?type=1">显示日期</a> |
    <a href="?type=2">显示时间</a> |
    <a href="?type=3">显示日期时间</a><hr>
    <h4>当前是: <?php echo $str;?></h4>
</body>
</html>
```

![53994745958](.\php\1539947459586.png)

#### MVC原理实例

![54026227575](.\php\1540262275752.png)

**使用 MVC 思想 展示学生列表数据**

1. 控制器文件 Controller.php

   ```php
   <?php 
   header("content-type:text/html;charset=utf-8");

   //  1. 包含学生控制器
   require_once("./StudentModel.class.php");
   //  2. 创建学生模型类对象
   $modelObj = new StudentModel();
   //  3. 获取多行数据
   $arrs = $modelObj->fetchAll();

   // print_r($arrs);
   //  4.  调用时图展示数据
   include "./studentView.html";
   ```

2. 数据文件 StudentModel.class.php

   ```php
   <?php 
   //  包含数据库工具类
   require_once("./Db.class.php");

   //  定义最终的学生模型类
   final class StudentModel{
       //  获取多行数据公共方法
       public function fetchAll(){
           //  创建数据库类的对象
           $arr = array(
               'db_host'=>'localhost',
               'db_user'=>'root',
               'db_pass'=>'woaiwo',
               'db_name'=>'my_studyphp',
               'charset'=>'utf8'
           );
           //  创建DB对象
           $db = Db::createInstance($arr);
           //  构建查询的SQL语句
           $sql = "select * from student order by id desc";
           //  执行SQL语句并返回结果(二维数组)
           return $db->readAll($sql);
       }
   }
   ```

3. 视图文件 stuentView.html

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="ie=edge">
       <title>学生信息管理</title>
   </head>
   <body>
       <div style="text-align:center;padding-bottom:10px;">
           <h2>学生信息管理中心</h2>
           <a href="javascript:;">添加学生</a> | 
           共有<span style="color: red">233</span>个学生
       </div>
       <table style="margin:0 auto;border:1px solid #ddd;">
           <thead width='780' boder='1' cellpadding='5' rules="all">
               <tr bgcolor='#f0f0f0'>
                   <th>编号</th>
                   <th>姓名</th>
                   <th>年龄</th>
                   <th>性别</th>
                   <th>班级</th>
                   <th>爱好</th>
                   <th>操作</th>
               </tr>
           </thead>
           <tbody>
               <?php foreach($arrs as $arr){ ?>
               <tr style="text-align:center;">
                   <td><?php echo $arr['id'];?></td>
                   <td><?php echo $arr['name'];?></td>
                   <td><?php echo $arr['age'];?></td>
                   <td><?php echo $arr['gander'];?></td>
                   <td><?php echo $arr['class'];?></td>
                   <td><?php echo $arr['hobbies'];?></td>
                   <td>
                       <a href="javascript:;">修改</a>
                       <a href="javascript:;">删除</a>
                   </td>
               </tr>
               <?php }?>
           </tbody>
       </table>
   </body>
   </html>
   ```

4. 数据库工具类

   ![53995234641](.\php\1539952346413.png)

实例一: 

![53995261847](.\php\1539952618477.png)

![53995264247](.\php\1539952642476.png)

**使用 MVC思想删除学生数据**

起点: StudentView.html 的删除按钮被点击才执行删除

问题: 所有和用户交互都由 controller(控制器)控制, 那么我们如何区分各个不同操作呢? **根据传值** 

![54000205547](.\php\1540002274672.png)

修改控制器代码, 根据传入的参数不同, 进行不同的处理

![54000785124](.\php\1540007851241.png)

修改学生的数据模型: 增加一个删除学生的公共方法, 因为链接数据库的经常性, 所以我们提取为构造函数, 并且设定$db为私有的属性, 实现函数内共用

![54000807861](.\php\1540008078614.png)

Db类中的执行数据库写入代码

![54000814071](.\php\1540008140717.png)

####  MVC总结

- MVC是一种思想, 是软件设计的典范
- MVC由 model view controller 三个模块构成, 完成了用户的输入, 处理, 输出工作


- **一个项目由若干个功能模块**构成: 新闻管理, 学生管理, 产品管理, 文章管理, 分类管理等等.
- **一个功能只对应一个控制器**, 例如: NewsController, StudentController, ProductController
- **一个控制器只对应一个模型类**, 例如: NewsModel, StudentModel. ProductModel
- **一个模型类一般只对应一个数据表的操作**, 例如: news, student, product
- **一个控制器可以对应多个视图文件**, 例如: StudentListView.html, StudentAddView

##### mvc版本一: 整合学生模块和新闻模块

1. 需求分析: 

   1. 同时实现两个模块功能: 学生模块和新闻模块
   2. 新闻模块, 也是 NewsController, NewsModel, NewsView.html 三部分构成
   3. 创建首页, index.php 文件, 跳转到默认的学生控制器
   4. 在视图文件的开头, 添加一个简单的导航, 用于跳转到不同模块

2. 实现步骤

   1. 创建新闻控制器, 新闻视图, 新闻数据模型三个文件

      ![54001377438](.\php\1540013774381.png)

   2. 新闻控制器 NewsController.php的编辑

      ![54001379459](.\php\1540013794595.png)

   3. 新闻模型类 NewsModel.class.php 的编辑

      ![54001381388](.\php\1540013813888.png)

   4. 新闻视图 NewsView.html 的编辑

      ![54001392916](.\php\1540013929164.png)

   5. 创建网站首页 index.php, 跳到默认控制器(StudentController.php)

      ![54001406866](.\php\1540014068667.png)

##### mvc版本二: 基础模型类的实现

1. **需求分析**: 多个模型类共有的, 我们会将其提取出来, 放到基础模型类中, 子模型类继承基础模型类, 同样实现功能.

![54002082547](.\php\1540020825471.png)

2. 创建基础模型类文件 BaseModel.class.php

![54002095096](.\php\1540020950964.png)

3. 其它模型类继承基础模型类, 删除多余的共同代码

![54002110932](.\php\1540021109321.png)

##### mvc版本三: 模型类的单例工厂类

1. 需求分析: 创建一个工厂模型类, 用于生产不同模型类对象的工厂.

   - 工厂模型类, 既是单例, 也是工厂
   - 工厂模型类本身不创建对象
   - 工厂模型类. 改变了创建不同模型类的一种方式

2. 创建工厂模型类 FactoryModel.class.php

   ![54002337269](.\php\1540024684590.png)

3. 测试工厂模型类, 是否是单例

   ![54002500962](.\php\1540025009625.png)

4. 所有控制器中创建模型类方式, 都改用为工厂模式

   ![54002460349](.\php\1540024603491.png)



##### mvc版本四: 控制器类的实现

1. 需求分析:

   1.  **在MVC中, 除了视图以外,  都是类文件**
   2.  将上个版本上升为控制器类
   3. 修改所有控制器文件, 以 ".class.php" 结尾
   4. 相应的视图文件的路径修改
   5. 首页文件跳转地址修改
   6. **控制器类的实现**

2. 修改控制器文件名称

   ![54002553736](.\php\1540025537362.png)

3. 修改index.php文件

   ![54002557967](.\php\1540025579678.png)

4. 修改相应视图文件路径

   ![54002565987](.\php\1540025659872.png)

5. **控制器类的实现**(过程代码->类)

   - 控制器提升为函数(过程式代码->函数式代码)

     ![54002615184](.\php\1540026151845.png)

   - 控制器提升为类(函数式代码->类)

     ![54002656795](.\php\1540026567954.png)

##### mvc版本五:添加学生信息

1. 学生列表页, StudentView.html 添加学生链接地址的修改

   ![54003111753](.\php\1540031117537.png)

2. 学生控制器

   1.  控制器增加一个条件判断的执行方法(获取表单工作)

      ![54003297082](.\php\1540032970824.png)

   2. StudentController类中添加一个显示表单的方法(包含视图文件 StudentAddView.html)

      ![54003300004](.\php\1540033000045.png)

   3. 添加学生表单视图文件的编写

      ![54003273350](.\php\1540032733500.png)

      ![54003266196](.\php\1540032661961.png)

   4. 控制器增加一个条件判断的执行方法(表单写入工作)

      ![54003305073](.\php\1540033050739.png)

   5. StudentController类中增加一个插入数据的方法  

      ![54003333655](.\php\1540033336552.png)

3. 学生模型类 StudentModel 写入数据方法的而构建(直接调用db写入操作)

   ![54003359151](.\php\1540034109553.png)

##### mvc版本六: 控制器进一步优化

观察条件判断

![54003507038](.\php\1540035070386.png)

我们发现, 控制器中条件的判断和方法名是一样的, 所以我们这样

![54003502390](.\php\1540035023904.png)

##### **MVC流程小结**

![54008851572](.\php\1540088515723.png)

##### mvc版本七: 基础控制器的实现

1. 观察控制器的相同部分

   ![54008903135](.\php\1540089031358.png)

2. 根据相似点, 编写基础控制器

   ![54008974671](.\php\1540089746716.png)

3. 其它控制器包含基础控制器并且继承基础控制器, 并且修改子类控制器的内容

   ![54009047575](.\php\1540090475755.png)

##### mvc版本八:  学生信息的修改

1. 学生首页视图 StudentView.html修改

   ![54009153000](.\php\1540091530009.png)

2. 学生控制器 StudentController.class.php 

   1. 添加一个显示修改表单页面的方法(包含视图文件)

      ![54009343205](.\php\1540093611608.png)

      ![54009354049](.\php\1540093540495.png)

   2. 编写修改 StudentEditView.html

      1. 修改学生视图的提交地址

         ![54009364983](.\php\1540093649836.png)

      2. 其它内容修改

         ![54009459014](.\php\1540094590146.png)

      3. 隐藏域保存ID

         ![54009461067](.\php\1540094610675.png)

   3. 修改视图提交表单处理: 添加一个更新数据的方法: 注意传值方式. 需要修改的和不需要修改的(id)分开传递

      ![54009515764](.\php\1540095157648.png)

3. 学生模型类 StudentModel.class.php

   1. 取值方式的简化(foreach遍历)

      ![54009553773](.\php\1540095537732.png)

   2. 学生模型类更新方法

      ![54009569803](.\php\1540095872380.png)

##### mvc版本九: 文件分目录

1. 需求分析

   1. 将所有文件按 MVC  进行分目录
      - Controller 目录: 放置所有的子控制类文件
      - Model 目录: 放置所有子模型类文件
      - View 目录: 放置所有视图文件
      - Frame 目录: 放置公共的类文件
   2. 将所有的类文件的包含语句全部移到index.php中
   3.  修改控制器中加载视图的路径

2. 创建目录文件, 移动相关文件, 修改相应文件名

   ![54010300175](.\php\1540103001753.png)

   ![54010309316](.\php\1540103093162.png)

3. 修改 index.php文件(所有的类加载全部移动到index.php中)

   ![54010373238](.\php\1540103732381.png)

4. 修改控制器中加载视图的路径

   ![54010376024](.\php\1540103760247.png)

##### mvc版本十: 前端控制器(请求分发器)

1. **需求分析**:

   前端控制器(请求分发器): 就是指index.php文件

   - 客户的现在的每个请求, 要携带两个参数: c参数和a参数.
   - c参数就是 controller 的简称, a就是action的简称
   - 现在的请求地址为: **index.php?c=控制器名&a=用户动作** 来进行访问 
   - 举例(访问新闻控制器的index方法): **index.php?c=News&a=index**

2. 修改 index.php文件

   ![54010506144](.\php\1540105061440.png)

3. 修改视图文件中的访问地址

   ![54010658344](.\php\1540106583441.png)

##### mvc版本十一: 平台概念的引入

1. 需求分析: 

   - 平台就是指一个独立的应用. 一个应用中有很多的功能模块
   - 平台就是指网站的前台和后台, 代理平台.
   - 网站后台是一个 "平台", 是一个"独立应用", 包括: 新闻管理, 学生管理, 用户管理, 产品管理等
   - 网站的前台也是一个 "平台", 是一个 "独立应用", 包括: 新闻管理, 学生管理.
   - 每个功能模块, 都是Model, View,  Controller 三个部分构成
   - 在 平台 概念下, 客户的请求必须传递 3 个参数: p参数, c参数, a参数
   - **p 参数是 platform(平台), c参数是 contrller(控制器), a参数是 action(动作)**
   - 请求的格式地址: **index.php?p=Home&c=Student&a=edit&id=56**

2. 最终的 MVC 目录结构

   ```php
   /*MVC的最终目录结构
   -----index.php	//	入口文件
   -----Frame/		//	公共类文件
   -----App/		//	应用目录
   --------Home/		//	前端应用	
   -----------Conf/		//	前端配置
   -----------Controller/	 //	 控制器
   -----------Model/		//	模型
   -----------View/		//	视图目录
   --------Admin/	//	后台应用
   -----------Conf/		//	后台配置
   -----------Controller/	//	控制器
   -----------Model/		//	模型
   -----------View/		//	视图目录
   -----Public/	//	静态资源目录
   --------Home/			//	前台资源
   -----------Images/			//	图片
   -----------JS/				//	js
   -----------CSS/				//	CSS
   --------Admin/			//	后台资源
   ------------Images/			//	图片
   ------------JS/				//	js
   ------------CSS/			//	CSS
   -----Uploads/	//	上传文件目录
   ```

3. 修改index.php

   ![54011094040](.\php\1540110940407.png)

4. 修改控制器中加载视图文件路径

   ![54011106212](.\php\1540111062124.png)

   ![54011109831](.\php\1540111098314.png)

5. 修改视图文件中的地址

   ![54011117406](.\php\1540111174069.png)

6. 修改控制器中跳转地址

   ![54011122539](.\php\1540111225396.png)

##### mvc版本十二: 类的自动加载

在 index.php入口文件中, 实现类的自动加载

![54011347885](.\php\1540113478855.png)

##### mvc版本十三, 常用常量的设置

**修改 index.php  入口文件, 将常用的目录定义为常量, 方便加载**

![54011464908](.\php\1540114649081.png)

控制器中加载视图文件路径修改

![54011508601](.\php\1540115086010.png)

##### mvc十四: 框架初始类

1. index.php文件的修改

   ![54011740677](.\php\1540117406778.png)

2. 配置文件(./App/Conf/config.php)

   ![54011775380](.\php\1540117753800.png)

3. 创建框架初始类文件(./Frame/Frame.class.php)

   ![54011933619](.\php\1540119336198.png)

   ![54011938494](.\php\1540119384946.png)

4. 基础模型类修改(BaseModel.class.php)

   ![54011955076](.\php\1540119550760.png)

5. 修改数据库工具类(Db.class.php)

   ![54011986815](.\php\1540119868157.png)

   ​


> **引入** 其实, MVC思想的使用是很类似我们的生活的. 所以在使用起来, 比较容易上手, 主要考虑如何区分业务, 以及识别业务中数据逻辑部分.

### MVC代码设计

> **定义: ** MVC代码设计, 就是当一个系统要实现时, 我们如何区分哪里该由控制器处理, 哪里该由模型处理, 最后如何在试图中渲染.

1. 区分业务设计控制器: 根据业务相关性和相似性, 将对应业务划分到一起, 由一个控制器来实现, 控制器设计成类, 不同方法代表不同业务处理, 如后台的注册, 登录以及注销这块, 都属于权限功能, 可以划分到一起; 控制器可以区分前后台(看系统需求是否需要区分), 可以早呢更加相应的命名空间; 为了后期代码好维护, 可以增加控制器后缀 controller

   ```php
   //	后台权限控制器
   //	命名空间
   namespace admin\controller;	//	表名是后台代码, 而且是控制器

   calss privilegeController{
       //	一个方法实现一个小业务: 一次请求完成用户一次需求
       public function login(){
           //	可以单独的获取表单登录表单, 也可以在里面使用判定方式实现获取表单和完成登录两个小功能
           if(isset($_POST['username'])){
               //	用户又提交用户名, 说明当前是要完成登录功能
               //	代码实现登录功能: 调用模型的登录
           }else{
           	//	没有提交表单: 说明当前是用来获取登录表单的
               //	加载登录页视图(view)
           }
       }
       
       //	注册功能
       public function register(){
           //	实现注册功能(注册和加载注册表单)
       }
   }
   ```

2. 区分数据增加模型: 模型的设计通常是基于表的, 即一张表会有一个队应的模型类, 对应类的所有操作(增删改查...) 都会由当前模型类来实现, 所有的SQL指令都是封装到当前模型中, 与控制器一样, 也因该增加相应的命名空间, 以及模型后缀model

   ```php
   //	后台管理模型
   namespace admin\model;
   class AdminModel{
   	//	模型针对表, 所以通常会在模型中早呢更加一个表名:因为所有方法都涉及到sql,便于以后维护
       provate $table = 'admin';
       
       //	根据用户获取信息
       public function getUserinfoByUsername($username){
           //	组织SQL
           $sql = "select * from {$this->table} where username='{$username}'";
           
           //	执行: 通常调用DAO执行即可
           
           //	返回数据执行结果
           return $res;
       }
       
       //	获取所有用户信息
       public function getAll(){
           $sql = "select * from {$this->table}";
           
           //	调用DAO执行SQL并返回结果
           return $users;
       }
   }
   ```

3. 选择合适视图: 视图通常是前端提供好的, 后端人员要做的就是如何去在视图中增加对应的php输出指令, 将数据放到合适的位置, 假设当前或取得时用户的登录信息

   ```php
   <?php foreach($logininfo as $k=>$info):?>
       <tr>
       	<td><?php echo $k+1;?></td>
       	<td><?php echo $info['username'];?></td>
       	<td><?php echo $info['login_time'];?></td>
       </tr>
   <?php endforeach;?>
   ```

4. 在实际开发项目中, 会有很多控制器, 每个控制器本质要做的事情都差不多, 只是具体的业务逻辑不一样, 此时就会出现很多类似的功能, 如果操作成功, 失败, 页面找不到等等, 此时如果在所有控制器中都去写对应的方法, 肯定是有资源浪费的, 此时就可以从这些控制器中抽离一部分公共代码出来, 形成父类, 从而实现代码的复用

   ```php
   //	父类控制器: 通常在核心中
   namespace core;

   class Controller{
       //	公共代码
       public function __construct(){
           //	控制器的初始化操作
       }
       protected function success(){
           //	成功操作
       }
       protected function error(){
           //	失败操作
       }
       //	...
   }
   ```

   ```php
   //	子类控制器继承父类控制器
   namespace admin\controller;
   use \Core\Controller;

   calss IndexController extends Controller{
       //	业务方法
       public function index(){
           //	调用父类的公共方法
           $this->success();
       }
   }
   ```

5. 同样的, 模型是针对一张表一个模型, 而每个模型都需要利用DAO来实现数据库的底层操作, 以二次封装的PDO为例, 所有的模型都需要在构造方法中实现PDO的实例化, 而且还有会很多公共的功能, 如查询全部, 通过ID进行查询等常用的方法, 此时也可以将模型的公共部分抽离出来, 形成父类, 而其他模型类只要继承该类即可

   ```php
   //	父类公共模型
   namespace core;
   class Model{
       //	实现DAO的初始化: 通常使用构造方法, 因为所有模型子类继承该类都会先调用构造方法
       public function __construct(){
           //	实现DAO类的初始化, 完成数据库初四花操作: 通常是用对象保存到的DAO对象
           $this->dao = new DAO();	//	初始化操作
       }
       
       //	获取所有数据
       public function getAll(){
           $sql = "select * from {$this->table}";	//	子类模型中有受保护的属性$table, 父类也可以调用(最终狮子类调用该方法)
           //	执行完成, 返回结果集可
           return $rows;
       }
   }
   ```

   ```php
   //	子类模型继承父类
   namespace admin\model;
   use \Core\Model;

   class UserModel extends Model{
   	//	表名属性
       protected $table = "user";
       //	调用父类方法实现数据查询
   }
   //	当前类没有自己的构造法方法, 意味着实例化UserModel时会调用继承父类Model类的构造法方法, 从而实现DAO的实例化, 也就是说实例化的UserModel对象, 可以直接调用父类的 getAll 方法来实现数据库操作
   ```

> **总结**

1. MVC思想的指导思路
   - 区分业务: 确定是公共的还是单独创建的控制器
   - 区分数据: 确定是属于控制器还是应该创建模型
2. MVC思想中, 会存在很多重复的内容, 此时就需要我们进行抽象化
   - 公共控制代码: 父类控制器
   - 公共模型代码: 父类模型



> **思考: ** 按照MVC思想设计的项目, 所有的请求都是请求C控制器, 此时用户浏览发来的请求就不会请求其他任何PHP文件了是这样的么?
>
> **引入: ** 因为MVC思想规定, 所有的请求都是用控制器来处理, 因此用户的任何请求, 都会是由控制来进行处理的. 而其他的文件, 如模型和试图文件, 也就是同控制器来直接或间接调用的, 我们把这种设计思路称之为 `单一入口`, 但是其实本质是进入控制器之前, 还有好多初始化的操作需要实现, 因此我们在 MVC实现的基础上, 规定其他文件的访问方式, 也就是 `单一项目入口`

### 项目单一入口

> **定义: ** 单一入口, 是指一类业务会统一请求一个对应的控制, 所有的请求都是由控制器来处理; 项目单一入口是指: 所有请求都只请求一个入口文件, 其它所有代码的调用执行, 都是由该入口文件来管理.

1. 项目单一入口是指在基于MVC设计情况下, 在进入MVC之前, 由一个统一的入口文件来进行管理, 所有用户(浏览器) 请求都只允许访问入口文件

   ```sequence
   浏览器->服务器: 发起请求
   服务器->入口文件\n index.php:统一由入口文件处理\n通是index.php
   入口文件\n index.php-->控制器: 入口文件开始\n分发控制器
   控制器-->模型:调用
   note right of 模型:完成数据库操作
   模型-->控制器:返回数据
   控制器-->视图:加载
   note right of 视图:完成数据渲染
   视图-->控制器:返回渲染数据
   控制器-->入口文件\n index.php:返回MVC处理结果
   入口文件\n index.php->服务器:PHP处理结果交给服务器
   服务器->浏览器:服务器返回执行结果
   note left of 浏览器: 浏览器完成解析
   ```

2. 在真实项目单一入口汇总, 入口文件通常会很简单, 为了入口的可操作性, 会将不同的内容分散到不同的文件件中, 一个简单的项目单一入口文件, 也会将入口文件中的初始化部分, 分离到另一个文件中(初始化类)

   - 入口文件 index.php 加载初始化类, 激活初始化类
   - 初始化类: 实现各初始化 (路径常量, 系统设置, 配置文件加载, 路由功能, 自动加载, 控制器分发)

> **总结**

1. 单一入口是基于MVC思想的直观实现, 用户请求的就是根据业务不同请求不同控制器
2. 项目单一入口是指用户所有的请求都是请求一个PHP入口文件, 其他的事情都是PHP内部处理
3. 项目单一入口能够很好的保护系统内部文件结构安全
4. 项目单一入口会增加前期开发难度, 但是在后期就会轻松 (基础部只需要开发一次)



---

## Smarty模板技术

> 思考: 为了代码能够更好地维护, 我们会将PHP 代码尽量从HTML中分离出来, 但是不可避免的还是要在HTML中写入很多数据, 这个时候依然需要用到很多PHP标签之类, 有没有更好的方式呢?
>
> **引入: ** PHP理论上要把数据通过HTML进行渲染, 所以无论如何都会是出现嵌套的, 但是我们可以有更好的方式, 让PHP标签不出现在HTML中, 从而HTML代码看上去更加简洁, 这个技术就是 `模板技术`. 目标技术有很多, 但是技术比较早, 也比较全面的是 Smarty目标技术(ThinkPHP3框架以后自带模板引擎).

### 模板技术原理

> **定义: **模板技术, 即利用特定的占位符放到文档中的某一部分, 然后利用相应的方式找到对应的占位符, 并将数据实现占位符替换 

1. 原来要在HTML中显示数据的方式: 在PHP文件中准备好数据, 然后在HTML中写一个echo指令, 利用PHP文件包含HTML文件即可

   ```php
   //	PHP文件, 获取数据, 探后加载HTML文档
   $var = 'hello world';

   //	包含HTML文件
   include_once 'hello.php';
   ```

2. 以上方式会HTML中嵌入很多PHP标签, 从而影响稳文档的整体性,此时, 我们可以换一种思路在HTML中要显示的数据使用一个类似HTML的标记,而非PHP输出语句

   ```html
   <!--hello.html-->
   <html>
       <body>{$hello}</body>
   </html>
   ```

   在PHP中也不再进行文件的加载, 而是读取的方式

   ```php
   $hello = 'hello world';
   //	读取文件
   $str = file_get_contents('hello.html');
   ```

   如果此时输出 $str, 那么得到的就是hello.html直接访问的结果. 如果想要在 {$hello} 处显示相应的数据, 那么就需要进行占位符替换

   ```php
   $hello = 'hello world';
   //	读取文件
   $str = file_get_contents('hello.html');
   //	对$str中的{hello} 进行替换, 替换成$hello中的数据
   $str = str_replace('{$hello}',$hello,$str);
   //	输出替换后的结果
   echo $str;
   ```

   ![53992328887](.\php\1539923288875.png)

   以上就是一种直接替换成品的模板技术原理, 但是实际上模板技术是要为项目服务的, 以上方式虽然能解决问题, 但是太过简单. 如果是一个数组的传入就不合适了, 所以真正的模板技术算法是比较复杂的, 而且考虑到项目的效率, 通常模板技术会经历以下几层方式

   1. 编译: 对原始的PHP文件提供内容, 和html提供的模板进行编译, 编译的结果就是形成一个可执行的PHP编译文件


   ```html
   <!--原模板文件-->
   <html>
       <body>{$hello}</body>
   </html>
   ```

   ```html
   <!--编译后的文件-->
   <html>
       <body><?php echo $hello;?></body>
   </html>
   ```

   2. 执行: 编译后的文件就已经可以直接被PHP引擎解释执行了

   ```php
   $hello = 'hello world';
   //	包含文件
   include '模板技术编译后的php
   ```

> **总结**

1. 模板技术原理的本质就是在HTML中设置相对简介的标签, 然后利用PHP实现内容的替换(这个过程由程序实现,开发人员不需要管理, 只需要在需要显示数据的位置使用特定的标签即可)
2. 模板技术是需要考虑项目实现和效率的, 所以通常会产生中间产物(编译文件) 来提示效率(后期不用再进行编译)



### Smarty模板技术

> **思考: ** 模板技术能够让开发人员专注后台数据提供, 而前端人员也不用因为PHP代码的各种存在而显得代码很混乱, 但是如果自己实现的化, 应该要提供很多代码逻辑.
>
> **引入: ** 小型项目其实不用模板引擎也可以, 毕竟任何的内容引入都会产生额外的开销(运行层). 而如果大型项目的话, 肯定是需要用到模板技术进行管理的, 一般情况下我们不需要开发模板引擎, 可以用市场上现有的成熟的模板引擎. 比如 Smarty

#### Smarty模板引擎介绍

> **定义: **Smarty是一个使PHP写出来的模板引擎, 是目前业界最著名的PHP模板引擎之一. 它提供了逻辑与外在内容的分离, 简单讲, 目的就是要使用php程序员同美工分离, 使用的程序员改变程序逻辑内容不会影响到美工的页面设计, 美工重新修改页面不会影响到程序的程序逻辑, 这在多人合作的项目中显得尤为重要

[下载地址](https://github.com/smarty-php/smarty/releases/tag/v3.1.33)

1. Smarty是一款专门用于php与HTML分离的模板技术, 通常不会独立工作, 而是在PHP项目需要使用的时候引入使用
2. 使用Smarty的优缺点

- 优点: 
  - 效率高, 这是Smarty模板引擎特有的, 可以让我们的网站访问效率提升
  - 编译型, Smarty并非简单的替换, 而是对目标先进行编译, 从而达到效率高(二次访问不再编译)
  - 缓存, Smarty可以直接缓存, 在编译的基础上生成访问效率更高的静态页
  - 插件, 允许开发人员自定义插件
  - 灵活, 内置函数可以方便开发人员更高的效率实现数据显示
- 缺点: 
  - 数据实时效率低, 如果访问数据是实时的, 那么Smarty会降低访问效率
  - 不适合小项目, 会让项目开发难度增加. 丧失PHP敏捷开发的特点

>  **总结**

1. Smarty是一款致力于解决PHP和HTML分离的模板引擎
2. Smarty能够很好的提升项目的访问效率, 但是也会增加开发成本, 不适合小项目和数据实时性要求较高的项目



#### Smarty的简单使用

> **定义: ** Smarty实用, 就是将Smarty加入到项目中(libs文件), 并且引入到项目中实现目标的替换功能

1. Smarty作为一款插件, 可以直接放到项目的根目录, 也可以根据项目需求, 放到相应的插件目录(Vendor). 当前作为学习, 我们可以直接将Smarty放到网站根目录: 从官网下载, 然后解压后文件中的libs文件夹放到网站根目录, 为了方便管理改名为smarty文件夹

   ![53992684566](.\php\1539926845669.png)

2. Smarty被引入到项目后, 我们要做的就是去包含Smarty.calss.php文件, 然后进行实例化

   ```php
   <?php 
   //  加载smarty类
   include '../smarty/Smarty.class.php';
   //  实例化
   $s = new Smarty();
   ```

3. 使用Smarty::assign('模板中变量名','具体数据')方法将要显示的数据传递给模板

   ```php
   //  提供数据
   $s->assign('hello','hello world');
   ```

4. 使用Smarty::display('模板文件')方法将要显示的模板加载显示: 默认加载路径是网站根目录或者根目录下的templates文件夹

   ```php
   //  显示模板数据
   $s->display('template.html');
   ```

   ![53992739928](.\php\1539927399283.png)

> **总结**

1. Smarty可以直接从官网获取版本, 版本使用参照对应PHP版本

2. Smarty虽然强大, 但是使用步骤非常简单

   - 引入 Smarty.class.php文件
   - 实例化Smarty对象
   - 利用smarty::assign()方法分配要给模板显示的数据
   - 利用smarty::display()方法加载模板文件
   - 在模板中利用smarty标记来占位数据(注意名字与assign方法分配的名字要一致)

   ​

> **引入: ** 上述只是Smarty的入门, 告知我们Smarty使用非常简单, 而在实际开发中, 我们可以根据项目的需求来 **定制** Smarty

#### Smarty配置

> **定义: ** Smarty配置, 即根据项目具体需求, 来选择smarty应该如何工作

1. Smarty提供的配置很多, 可以通过其Smarty对象的属性来设置

   - `$smarty->debugging = false;` 				是否开启debug调试, 默认关闭
   - `$smarty->template_dir = "templates/";`       模板目录
   - `$smarty->compile_dir = "templates_c/";`     编译目录(smarty自动创建)
   - `$smarty->config_dir = "configs/";`               配置项目目录
   - `$smarty->caching = false; `                              是否开启缓存
   - `$smarty->cache_dir = "cache/";`                     缓存目录(开启缓存后自动创建)
   - `$smarty->cache_lifetime = 3600;`                   缓存生命周期, 单位 s
   - `$smarty->left_delimiter = "{";`                     左定界符
   - `$smarty->right_delimiter = "}";`                   右定界符

2. 最简单的使用只需要配置一下对应的 template_dir 属性即可

   ```php
   //  实例化
   $s = new Smarty();
   //  模板配置
   $s->template_dir = 'templates/';

   //	注意: 如果指定的目录不存在, 那么系统会自动去根目录下寻找
   ```

3. 如果需要开启缓存, 那么需要配置三项内容

   ```php
   $smarty->caching = true;
   $smarty->cache_dir = 'cache/';
   $smarty->cache_lifetime = 24*60*60;
   ```

4. 如果考虑到 `{}` 作为模板分隔符会于js冲突的话, 可以修改

   ```php
   $smarty->left_delimiter = "<{";
   $smarty->right_delimiter = "}>";
   ```

演示文件

![53992935146](.\php\1539929351465.png)

> **总结**

1. Smarty配置提供了很多控制方式, 我们可以根据自己的需求来设定控制
2. 通常使用Smarty时, 需要设置的就是模板路径template_dir和可能冲突的分隔符left/right_delimiter
3. 在项目开发阶段, 一般不开启缓存模式; 如果生产环境数据的变更不频繁, 可以考虑开启



### Smarty详解

> **思考: ** Smarty中如果涉及到数组该如何解析, 是不是所有的变量, 包括系统的预定义变量都需要进行 assign然后才能解析
>
> **引入: ** Smarty针对模板中的解析变量, 做了自己的解析原则, 默认的处理方式的确是行不通的, 需要参照 Smarty制定的变量规则

#### 模板变量

> **定义: ** 模板变量, 即在模板中被分配的变量, 以及如何使用Smarty规则在模板中解析变量

1. 在Smarty模板中, 我们将模板变量分为三类

   1. PHP分配变量, 即利用assign方法分配的变量
   2. smarty保留变量, 包括超全局预定义变量和smarty的内置变量
   3. 自定义变量, yoghurt在模板中去定义变量

2. PHP分配变量, 理论上PHP可以分配任意数据类型给模板进行解析, 通常数据也就三种

   1. 标量数据: 直接使用标记输出的数据
   2. 数组数据: 在smarty模板中可以使用 `下标` 或者通过`.下标` 来实现 
   3. 对象数据: 在smarty模板中也是通过对象访问符来实现访问

   ```php
   //	php给目标分配数据
   //  提供标量数据
   $s->assign('hello','hello world');
   //  提供数组数据
   $s->assign('arr',array('懵宝','小白'));
   class Persion{
       public $name = '懵宝';
       public $age = 19;
   }
   //  提供对象数据
   $s->assign('obj',new Persion);
   ```

   ```html
   <!--	template.html 访问数据 -->
   <body>
       <h2>
           {* 普通分配标量 *}
           {$hello}
       </h2>
       <br>
       {* 分配数组 *}
       {$arr[0]} --- {$arr.1}
       <br>
       {* 分配对象 *}
       {$obj->name} --- {$obj->age}
   </body>
   ```

   ![53993100065](.\php\1539931000651.png)

3. Smarty保留变量: 是Smarty考虑到用户会需要经常使用的系统变量, 或者内部变量, 这类变量通常以$smarty开始, 然后是各类关键字, 多次访问

   - GET数据: `{$smarty.get.名字}`
   - POST数据: `{$smarty.post.名字}`
   - session数据: `{$smarty.session.名字}`
   - cookie数据: `{$smarty.cookie.名字}`
   - REQUEST数据: `{$smarty.request.名字}`
   - server数据: `{$smarty.server.大写名字}`
   - 时间戳: `{$smarty.now}`
   - 模板路径: `{$smarty.current_dir}`
   - 模板名字: `{$smarty.template}`
   - 配置文件: `{$smarty.config.配置名}`

   ![53993202893](.\php\1539932028938.png)

4. 自定义变量: Smarty为了在模板中可以灵活的对数据进行处理, 允许设置变量 `{assign var='变量名' value='变量'}`

   ![53993233636](.\php\1539932336363.png)

5. 配置文件: 在Smarty中, 提供了一种独立为Samrty提供个性化服务的配置文件. 既然是模板技术, 配置内容自然是为了改变模板效果

   配置文件格式: smarty的配置文件与php的配置文件不一样, 通常可以直接使用 txt格式文件. 文件配置项的格式是 `名字=值`, 可以配置多个, #好代表注释, [局部]代表局部访问

   ```php
   #   注释: 默认的, 所有的配置项都是全局的: config.txt
   bodyBgColor = #00FF00

   #   局部配置
   [customer]
   pageTitle= '配置文件'
   ```

   记载配置文件: 当前配置文件配置好之后, 在模板中需要事先加载配置文件才能使用, 使用 {config_load file='配置文件路径' [section='局部区间']} 


   ```html
   {config_load file='../config.php'}
   <body>
       <h2>
           {* 普通分配标量 *}
           {$hello}
       </h2>
   </body>
   ```

   使用配置文件: 当前配置文件加载后, smarty通过标签内部使用一堆 # 号来区分是配置文件, 或者使用保留变量 `{$smarty.config.配置项文件名字}` 访问

   ````php
   <!-- 全局配置访问 -->
   {config_load file='../config.php' section='customer'}
   <body bgcolor="{#bodyBgColor#}">
       <!-- 局部配置文件访问 -->
   	{#pageTitle#}
       <h2>
           {* 普通分配标量 *}
           {$hello}
       </h2>
   </body>
   ````

   ![53993451403](.\php\1539934514032.png)

> **总结**

1. Smarty提供了多种在模板中显示数据方式

- PHP分配变量, 在PHP中通过assign方法分配的变量, 在模板中直接使用
- 内置变量, Smarty将各类系统超全局变量的内部实现, 通过 `$smarty.超全局变量名[小写].数组下标` 访问
- 自定义变量, 在模板中可以通过 `{assign var ='变量名' value = '值'}` 设定变量, 并进行访问
- Smarty 允许对模板进行配置, 可以通过smarty配置文件, `{config_load file='文件路径'}` 的形式将配置文件引入到模板中, 然后使用配置标签 `{#配置项#}` 或者保留变量 `{$smarty.config.配置项}` 来进行访问



> **引入: ** 数据动态化的显示是PHP作为动态网站开发语言的最典型特征, 为了保证PHP的数据能够在HTML中尽可能方便的侠士, Smarty 提供了一套内置函数用来实现数据的复杂化处理

#### 内置函数

> **定义: ** Smarty内置函数, 是Smarty针对分支, 循环等数据处理语句封装的一套便于在模板中显示和操作数据的语法格式

1. 分支处理: Smarty中提供了一套if分支用于简单逻辑判定, 语法为 `{if}{elesif}{else}{/if}`

   ```html
   {if isset($smarty.get.username)}
   <h2>当前登录用户是:{$smarty.get.username}</h2>
   {else}
   <h2>没有登录</h2>
   {/if}
   ```

2. 循环分支: ph最核心的一点就是数据批量输出, 在Smarty中提供了很多中遍历输出数组数据的方式

   - foreach: 遍历所有类型数组, 主要用户PHP分配的数据的输出显示`{foreach}{/foreach}`

   ```html
   <ul>
       {foreach $arr as $item}
       <li>{$item}</li>
       {/foreach}
   </ul>
   ```

   foreach还允许使用一种特定方式来处理foreach遍历的数组不存在的情况, 使用 `foreachelse`

   ```php
   <ul>
       {foreach $arr as $item}
       <li>{$item}</li>
       {foreachelse}
   	<li>没有数据 o(╥﹏╥)o</li>
       {/foreach}
   </ul>
   ```

   - section: 遍历索引数组, 通常更多用于没有分配数据的循环

   ```html
   <html>
       <body>
           {section name=任意名字 loop=传递数组|指定循环次数 [step=步长] [max=最大循环次数]}
           	{$传递数组[section名字].遍历的元素下标}
           {/section}
           
           {assign var = 'arr' value = array(1,2,3,4,5,520)}
           {section name='id' loop=$arr max=6}
           {$arr[id]}
           {/section}
       </body>
   </html>
   ```

   ![53993828130](.\php\1539938281303.png)

   示例: 

   ![53993740925](.\php\1539937409257.png)

3. 文件包含: PHP实际开发中, 为了维护的方便, 会将模板或者其他文件拆分成多个, 此时就需要用到文件的包含来使得最终模板完整. `{include file='模板文件'}`, 将另外一个模板文件包含近来 (通常是一部分)

   ```html
   <!-- 菜单部分html -->
   <div>
       <ul><li></li></ul>
   </div>
   ```

   ```html
   <html>
       <body>
       	<!--其他部分-->
           <div>
           	<!--包含菜单部分-->
               {include file ='list.html'}
           </div>
       </body>
   </html>
   ```

4. 前端语法保护: Smarty用到的标签很有可能与css样式和js冲突, 此时Smarty会错误地认为是JS或css是Smarty语法, 而尝试解析, 这个时候就会报错, 因此Smarty提供了一种语法保护方式, 将有可能冲突的包含起来, 从而smarty不去解析:  `{literal}{/literal}`

   ```html
   {literal}
   <script>
       function show(){
           alert('hello world')
       }
   </script>
   {/literal}
   ```

> **总结: **

1. Smarty内置函数是指在模板中可以直接使用标签代替的形式去达到对应效果
2. Smarty内置函数有很多,常用的如下:
   1. 分支处理: `{if}{elseif}{else}{/if}`
   2. 循环处理: `{foreach from=数据源 item=值遍量}{/foreach}`
   3. 循环处理: `section name=名字 loop=数据源/循环次数}{/section}`
   4. 文件包含: `{include file=路径}`
   5. 语法保护: `{literal}{/literal}`
3. Smarty内置函数循环处理有很多属性, 可以方便我们在进行表格处理, 数据统计时作为数据支持

#### 外部函数使用

> 定义: 所谓外部函数使用, 是指Smarty没有内置相应的函数, 或者用户在PHP中自定义了一些函数, 此时需要在模板中使用到.

1. 系统函数的使用: 在模板中如果想要使用PHP系统函数, 因为smarty的加工处理, 所以需要对函数使用一个相应的边界符 `{}` 来包裹

   ```html
   <html>
       <body>
           字符串abcdefg一共有 {strlen('abcdefg')} 个字节
       </body>
   </html>
   ```

2. 自定义函数使用: 用户自定义函数使用, 与系统函数一样(函数的定义在php文件中)

   ```php
   <html>
       <body>
   		{show()}
       </body>
   </html>
   ```

>  **总结**: Smarty中允许在模板中使用相应的系统函数和用户自定义函数, 使用对应的smarty边界符标记好即可.

#### 常用格式化模板

- 时间格式化 `{$article.addate |date_format:'%Y-%m-%d %H:%M:%S'}`
- 字符串截取 `{$article.content |truncate:'500':''}`





## **面向对象的开发流程**

- 面向过程是**以过程为中心**的编程思想; 面向对象是**以事物为中心**的编程思想.
- 面向过程着重于**做什么**? 面向对象着重于**谁来做**?
- 面向对象适合大项目, 适合**多人合作**开发.
- 面向对象的执行效率, 比面向过程慢. 解决方案: **缓存, 静态化**.
- 一个项目由多个**功能模块**构成: 用户模块 产品模块 新闻模块 友情链接模块等
- **每个功能模块, 对应一个对象**. 例如用户对象 产品对象 新闻对象 新闻对象 友情链接对象等
- 项目还可能有**工具类**: 数据库类 分页类 验证码类 缓存类 图像处理类等
- **所有的类都能产生 N 个对象, 所有的对象都需要归属于某个类.**

举例: 

![53905216929](.\php\\1539052169296.png)

**单例模式(三私一公)**

- 单例模式: 一个类只能创建一个对象, 不管用什么办法, 都无法创建第二个对象. 节省内存

  ![53905296993](.\php\\1539053091546.png)

- 数据操作类的基本代码

  ```php
  <?php 

  //定义最终的单例的数据库工具类
  final class Db{
      //  私有的静态 的保存对象的属性
      private static $obj = NULL;

      //  私有的数据库配置信息
      private $db_host;
      private $db_user;
      private $db_pass;
      private $db_name;
      private $charset;
      private $con;

      //  私有的构造函数: 阻止类外new对象
      private function __construct($config){
          $this->db_host = $config['db_host'];
          $this->db_user = $config['db_user'];
          $this->db_pass = $config['db_pass'];
          $this->db_name = $config['db_name'];
          $this->charset = $config['charset'];
          //  初始化数据库连接
          $this->connectDb();
          $this->selectDb();
          $this->setCharset();
      }

      //  私有的数据库连接方法
      private function connectDb(){
          $this->con = mysqli_connect($this->db_host,$this->db_user,$this->db_pass);
          if(!$this->con){
              die("PHP连接MySQL服务器失败!");
          }
      }

      //  私有的选择数据库方法
      private function selectDb(){
          if(!mysqli_select_db($this->con,$this->db_name)){
              die("选择数据库{$this->db_name}失败!");
          }
      }

      //  私有的设置字符集方法
      private function setCharset(){
          $this->exec("set names {$this->charset}");
      }

      //  公共的执行sql语句的方法(除却select语句), 并返回布尔值
      public function exec($sql){
          //  将SQL语句-> 小写
          $sql = strtolower($sql);
          //  判断不是select语句
          if(substr($sql,0,6)=='select'){
              die("该方法不能执行select语句!");
          }
          return mysqli_query($this->con,$sql);
      }

      //  私有的执行sql语句的方法(只用于select语句), 返回结果是数据查询结果集
      private function query($sql){
          //  将SQL语句-> 小写
          $sql = strtolower($sql);
          //  判断不是select语句
          if(substr($sql,0,6)!='select'){
              die("该方法不能执行非select语句!");
          }
          return mysqli_query($this->con,$sql);
      }

      /**
       *  数据查询的两种情况, 获取单条记录/获取多条记录
       */
       
      //  公共的获取select语句结果的方法, 返回一条数据
      public function readOne($sql,$type=3){
          $result = $this->query($sql);
          $types = array(
              1 => MYSQLI_NUM,
              2 => MYSQLI_BOTH,
              3 => MYSQLI_ASSOC,
          );
          return mysqli_fetch_array($result,$types[$type]);
      }
      //  公共的获取select语句结果的方法, 返回全部数据
      public function readAll($sql,$type=3){
          $result = $this->query($sql);
          $types = array(
              1 => MYSQLI_NUM,
              2 => MYSQLI_BOTH,
              3 => MYSQLI_ASSOC,
          );
          $arrs = array();
          while ($row=mysqli_fetch_array($result,$types[$type])) {
              $arrs[] = $row;
          }
          return $arrs;
      }
      //  公有的获取记录条数的方法
      public function rowCount($sql){
          //  执行SQL, 并返回结果集
          $result = $this->query($sql);
          //  返回记录数
          return mysqli_num_rows($result);
      }

      //  私有的克隆函数: 阻止类外clone对象
      private function __clone(){}
      //  公共的静态的创建对象方法
      public static function createInstance($config){
          if(!self::$obj instanceof self){
              //  如果对象不存在, 则创建它
              self::$obj = new self($config);
          }
          //  如果对象存在, 直接返回
          return self::$obj;
      }
  }

  ```

- **类的自动加载**

  ```PHP
    <?php 

    //  类的自动加载
    spl_autoload_register(function($className){
        //  构建类文件的真实路径
        $filename = "./libs/$className.class.php";
        //  如果类文件存在, 包含
        if(file_exists($filename)) require_once($filename);
    });
    $arr = array(
        'db_host' => 'localhost',
        'db_user' => 'root',
        'db_pass' => 'woaiwo',
        'db_name' => 'my_studyphp',
        'charset' => 'utf8'
    );
    //  创建数据库类的对象
    $db = Db::createInstance($arr);
    // var_dump($db);
  ```

- 显示学生列表

  ![53922753604](.\php\\1539227536042.png)

  ![53922755379](.\php\\1539227577918.png)

- 删除学生

  ![53922749511](.\php\\1539228244454.png)

  ![53922818420](.\php\\1539228184209.png)

- 添加一条记录

  ![53922934628](.\php\\1539229346281.png)

  ![53923049147](.\php\\1539230491478.png)

- 分页类

  ```php
  <?php
  /**
   *  分页类
   */
  final class Pager{
      //  私有的变量
      private $page;  //  当前页
      private $pages; //  总页数

      //  构造函数
      public function __construct($page,$pages){
          $this->page = $page;
          $this->pages = $pages;
      }

      //  公共的分页方法
      public function fenye()
      {
          //  计算循环的开始页和结束页
          $start = $this->page-5;
          $end = $this->page+4;
          //  分页按钮的生成逻辑
          if($this->page<6){
              $start = 1;
              $end = $end-$this->page+6;
          }
          if($end>$this->pages){
              $start = $this->pages-10+1;
              $end = $this->pages;
          }
          if($this->pages<=10){
              $start = 1;
              $end = $this->pages;
          }
          //  循环显示分页
          for($i=$start;$i<=$end;$i++){
              //  如果是当前页, 不加连接, 高亮
              if($i == $this->page){
                  echo "<a href='javascript:;' style='dispaly:inline-block;color:#fff;background:pink;padding:2px 5px'>$i</a href='javascript:;'>";
              }else{
                  echo "<a href='?page=$i' style='dispaly:inline-block;color:#333;padding:2px 5px;'>$i</a>";
              }
          }
      }
  }

  ```

  ![53923362893](.\php\\1539233628934.png)

  ![53923358458](.\php\\1539233584585.png)

  ![53923679955](.\php\\1539236799556.png)




## 巩固学习

### 变量作用域

根据变量作用的范围. 可分为

- 全局变量: 可以在当前脚本中任何地方(函数外部)使用的变量称全局变量
- 局部变量: 只能在对应定义的函数内部使用的变量称为局部变量
- 在PHP中还有一种类型的变量: 超**全局**变量
- **局部变量在函数运行结束后被删除, 全局变量在页面没关闭后删除.**
- 注意: PHP变量作用域与JS变量作用域不一样. JS的全局变量可以直接在函数内部使用; 而PHP的全局变量不能直接在函数内部使用. 换句话说: **在PHP中, 全局变量不能在函数内部使用, 而局部变量也不能在函数外部使用. 作用域不重叠, 互相不能

**变量作用域解决方案**

1. **使用global 关键字**

   - global 关键字允许从脚本的任何位置访问函数内部定义的变量, 以及从函数内部访问函数外部的变量. 在声明变量时, 必须要在变量齐纳加上 global 关键字.
   - global 只能在函数中使用才有效(函数外部本身就是全局作用域, 使用global声明变量没有意义)
   - 不能在用 global 什么变量的同时, 给变量赋值
   - global 的作用是 **引用传地址** 的作用, 只能算是一个局部的全局变量
   - 如果**在函数中销毁/修改局部的全局变量, 则不会影响到函数外部的同名全局变量**

   ![53896419580](.\php\\1538964195801.png)

   ![53896470264](.\php\\1538964702640.png)


2. **使用 $GLOBALS 超全局数组变量访问**

   - 引用全局作用域中可用的全部变量
   - 一个包含了全部变量的全局组合数组, 全局变量的变量名局势数组的键
   - 出现过的全局变量, 就可以通过$GLOBALS这个数组取得
   - PHP 声明周期中, 定义在函数外部的所谓全局变量, 函数内部是不能直接获得的. 在函数内部如果想访问函数外的全局变量, 可以使用 $GLOBALS 进行访问
   - $GLOBALS 数组包括: 全局变量  \$_GET  \$_POST  \$_FILES  \$_COOKIE
   - **如果在函数内部unset某一个全局变量, 则函数外部也不存在了**

   ![53896531287](.\php\\1538965312879.png)

3. **变量引用传递(&)**

   - 引用传递: 又称 "传地址", 就是将一个变量的地址拷贝一份给另一个变量, 但是两个变量其实指代的是 "保存着数据的相同地址", 改变其中一个变量的值, 另一个变量的值也会跟着变化.
   - 在 php 中, 对象和资源类型默认是使用的引用传值.
   - 实际上, 还可以明确让标量类型使用引用传值, 只需要在引用的变量前加 & 符号即可实现引用传地址. 引用传递, 是一个值多个名的情况.

   ![53896569378](.\php\\1538965693787.png)

   ![53896693010](.\php\\1538966930105.png)

   ![53896741705](.\php\\1538967417052.png)

### 类型约束

1. 类型约束简介

   - Java 属于强类型语言, 变量在程序运行中, 类型不可以改变.
   - PHP 和 JS 属于弱类型语言, 变量再程序运行过重, 类型是可以改变的.
   - PHP 5.3 之后才有了类型约束. **PHP的类型约束, 主要指方法参数/函数参数**, 其它地方还不行
   - PHP的类型约束有三种: 数组约束, 对象约束, 接口约束

2. 举例说明

   ![53925409189](.\php\\1539254091890.png)

### 序列化

1. **什么是序列化**

   - 变量的序列化: 将变量转化成可存储或传输的字符串的过程, **会保留变量的类型和结构**.
   - 变量反序列化: 将序列化的字符串, 再还原成原始变量.
   - **除了资源变量外, 其它变量都可以序列化** 

2. **serialize()**

   - 描述: 产生一个可存储的值的表示

   - 演示: 

     ![53925887383](.\php\\1539258873839.png)

3. **unserialize()**

   - 描述: 从一存储的表示中创建 PHP 的值

   - 演示

     ​

     ![53925932064](.\php\\1539259320648.png)

4. **对象序列化**

   - **对象的序列化过程, 与其他变量数据一样**

   - 当序列化对象时, PHP 将试图在序列化动作之前调用该对象的成员函数 **\__sleep()**. 这样就**允许对象在被序列化之前做任何清除操作**

   - **\__sleep() 魔术方法功能: 可以用于清理对象, 并返回一个包含对象中所有应被序列化的变量名称的数组**

   - **对象序列化的内容只能包含成员属性, 不能包含常量, 静态属性, 成员方法, 静态方法.**

     ```php
     <?php 
     final class Db{
         private $db_host;
         private $db_user;
         private $db_pass;
         public function __construct($config){
             $this->db_host = $config['db_host'];
             $this->db_user = $config['db_user'];
             $this->db_pass = $config['db_pass']; 
             $this->connectDb();
         }
         //  连接MYSQL 服务器
         private function connectDb(){
             if(!mysqli_connect($this->db_host,$this->db_user,$this->db_pass)) die("PHP连接MySQL服务器失败!");
         }
         //  在对象序列化qian,自动调用的方法
         public function __sleep(){
             //  返回需要序列的对象属性, 不需要的可以不写
             return array("db_host", "db_user");
         }
     }

     $arr = array(
         'db_host'=>"localhost",
         'db_user'=>"root",
         'db_pass'=>"woaiwo"
     );

     $db = new Db($arr);
     // var_dump($db);
     //  对象序列化
     $str = serialize($db);
     // echo $str;
     //  将序列号数据保存到记事本
     file_put_contents('2.txt',$str);
     ```

     ![53926052726](.\php\\1539260527267.png)

     ![53926067495](.\php\\1539260674957.png)

5. **对象反序列化**

   - 对象反序列化的过程, 与其它变量数据一样

   - 若反序列化变量是一个对象, **在成功地重新构造对象之后, php 会自定调用 __wakeup() 魔术方法**

   - unserialize() 会检查是否存在一个 __wakeup()

     ![53926262956](.\php\\1539262629566.png)