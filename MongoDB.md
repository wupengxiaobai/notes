# MongoDB

##　简介

**非关系型数据库(No SQL)**

- MongoDB是为了快速开发互联网Web应用而设计的数据库系统
- MongoDB的设计目标是极简, 灵活, 作为 Web 应用栈的一部分
- MongoDB的数据模型是面向文档的, 所谓文档就是一种类似于 JSON 的结构, 简单理解 MongoDB 这个数据库中存的是各种各样的 JSON. (BSON)

**三个概念**

**数据库(database)**

​	数据库是一个仓库, 在仓库中可以存放集合

**集合(collection)**

​	集合类似于数组, 在集合中可以存放文档

**文档(document)**

​	文档数据中的最小单位, 我们存储和操作的内容都是文档

![1543404454490](.\MongoDB\1543404454490.png)

## 开始

**下载/安装**

[下载地址](https://www.mongodb.org/dl/win32) MongoDB 的版本偶数版本为稳定版, 奇数版本为开发版.

**环境变量配置**

命令行运行 mongod 检测 mongod 是否安装成功

![1543402094892](.\MongoDB\1543402094892.png)

**启动MongoDB**

1. **在c盘创建一个文件 data/db**

2. **cmd命令执行**

   - 打开一个窗口, 输入 **mongod** 启动 mongodb 服务器

   - 再打开一个窗口, 输入 **mongo** 启动客户端, 出现 > 表示mongodb启动成功

**如何指定端口和数据路径?**

第一次的时候cmd窗口输入 **mongod --dbpath 路径 --port 端口号** 后续都是 **mongod**

![1543403062761](.\MongoDB\1543403062761.png)

注意: 启动 mongodb 窗口不能被管理

### 基本操作

**基本指令**

show dbs / show databases 

​	显示当前所有数据库

use 数据库名 

​	进入到指定的数据库中

db 

​	db表示当前所处的数据库

​	db.drop() 删除数据库

show collections

​	显示数据库中所有的集合

​	db.collection.drop() 删除集合

**数据库的 crud 操作**

- 向数据库中插入文档

  **db.<collection>.insert({文档})** 向集合中插入一个文档

  例子: 向 test 数据库的 stus 集合中插入一个新的学生对象

  {name: '孙悟空', age: 518, gender: '男'}

  db.stus.insert({name: '孙悟空', age: 518, gender: '男'})

  插入多条数据

  ```mongodb
  db.stus.insert([
  	{name:'沙和尚', age: 15, gender: "男"},
  	{name:'白龙马', age: 13, gender:'男'},
  	{name:"白骨精", age: 12, gender: "女"}
  ])
  
  ```

  .insertOne() 插入一个文档 

  .insertMany() 插入多个文档 

- 查询文档

  **db.<collection>.find(查询条件)** 无条件表示查询当前集合中的所有文档

  ![1543405807438](.\MongoDB\1543405807438.png)

  **find({}) 可以接收一个对象作为条件参数**

  .find({'属性1': '值1', '属性2': '值2'}) 查询指定条件的文档, 返回一个数组

  .findOne() 查询集合中符合条件的第一个文档, 返回一个对象

  .find({}).count() 统计符合条件的文档数量 length() 也可

  **.find({}, {字段: 1, 字段: 0})** 第二个参数对象来设置查询的结果的投影 1表示显示, 0表示隐藏

- 修改文档

  **db.<collection>.update(查询条件, 修改操作, 修改配置)**

  update() 默认情况会使用新对象来替换旧对象, 默认只修改一个

  如果需要修改指定的属性, 而不是替换使用 "修改操作符($set)" 来完成修改

  ```mongodb
  db.stus.update(    
  	{"name":'孙悟空'},    
  	{$set:{'age':18,'name': "悟空"}}
  );
  ```

  .updateMany() 修改多个匹配项

  .updateOne() 也默认修改单个匹配项

  ```mongodb
  db.stus.update(    
  	query,    
  	update,
  	{	//	update 第三个参数是配置项对象
          multi: true //	表示是否修改多个
  	}
  );
  ```

  .replaceOne() 替换一个文档

- 删除文档

  **db.<collection>.remove({匹配条件})**

  ```
  db.stus.remove({"name":"白骨精"})
  ```

  删除符合条件的所有文档(默认删除多个)

  ```mongodb
  db.stus.remove({"gender":"男"}, true)
  ```

  如果说第二个参数传递一个 true 则表示删除一个.

  .deleteOne()	删除一个

  .deleteMany() 删除多个

  注意: 如果参数是一个空对象, 则会删除集合中的所有文档

### 基本操作熟悉

1. 进入 my_test数据库

   ```
   use my_test
   ```

2. 向数据库的 user 集合中插入一个文档

   ```
   db.users.insert({username: 'xxxx'})
   ```

3. 查询 user 集合中的文档

   ```
   db.users.find({})
   ```

4. 统计数据库 user 集合中的文档数量

   ```mongodb
   db.users.find({}).count()
   ```

5. 查询数据库 user 集合中 username 为 xx 的文档

   ```
   db.users.find({username: 'xxx'})
   ```

6. 向数据库 user 集合中的 username 为 xx 的文档中添加一个 address 属性,指定值为 xxx

   ```
   db.users.update({username: 'xxx'}, {$set{ address: 'xxx'}})
   ```

7. 使用 {username: 'xxx'} 替换 username 为 xxxx 的文档

   ```
   db.users.replaceOne({username: 'xxx'},{username:'xxxx'})
   ```

8. 删除 username 为 xxx 的文档的 address 属性

   ```
   db.users.update({username: 'xxx'}, {$unset:{address:1}})
   ```

9. 向 username 为 xxx 的文档中, 添加一个 hobby: {cities: ['beijing', 'shanghai', 'shenzhen'], movies: ['sanguo', 'hero']} **(内嵌文档)**

   ```
   db.users.update({username:'xxx'}, {$set{hobby:{cities:['beijing','shanghai','shenzhen'], movies:['sanguo','hero']}}})
   ```

10. 给 username 为 xxx 的文档, 添加一个 hobby: {movies: ['xiyouji', 'xijuzhiwang']}

  ```
  db.users.update({username: 'xxx'}, {$set{movies: ['xiyouji', 'xijuzhiwang']}})
  ```

11. 查询喜欢电影 hero 的文档(内嵌文档查询)

    ```
    db.users.find({'hobby.movies':'hero'})
    ```

    **mongodb 支持直接通过内嵌文档的属性进行查询, 如果要查询内嵌文档, 则可以通过 . 的形式来匹配**

    **如果要通过内嵌文档对文档进行查询,.则此时属性名必须使用引号 "hobby.movies"**

12. 向 username 为 xxx 中 添加一个新的爱好电影 **(数组操作符 $push)**

    ```
    db.users.update({username: 'xxx'}, {$push:{"hobby.movies": 'dayuhaitang'}})	//	不考虑元素重复
    db.users.update({username: 'xxx'}, {$addToSet:{"hobby.movies": 'dayuhaitang'}}) //	考虑元素重复
    ```

13. 删除喜欢 xxx 的用户

    ```
    db.users.remove({'hobby.cites': 'xxx'})
    ```

14. 删除 user 集合

    ```
    db.users.drop()	//	删除集合
    db.users.remove({})	//	清空集合
    ```

15. 向 numbers 中插入 20000 条数据

    ```js
    for(var i=1,len=20000;i<=len;i++){
        db.numbers.insert({num:i})
    }
    //	效率过慢, 我们这么来
    var arr = [];
    for(var i=1; i<= 20000; i++){
        arr.push({num: i})
    }
    db.numbers.insert(arr);
    ```

16. 查询 numbers 中 num 为 500 的文档

    ```
    db.numbers.find({num: 500})
    ```

17. 查询 numbers 中 num 大于 5000 的文档

    ```
    db.numbers.find({num: {$gt:500}})
    ```

    **$gte 大于等于, \$lte 小于等于**

18. 查询 numbers 中 num 小于 30 的文档

    ```
    db.numbers.find({num: {$lT:30}})
    ```

19. 查询 numbers 中 num 大于 40 小于 50 的文档

    ```
    db.numbers.find({num: {$gt:40,$lt:50}})
    ```

20. 查询numbers 中 num 大于 19996 的文档

    ```
    db.numbers.find({num: {$gt:19996}})
    ```

21. 查看 numbers 中的 前10条 数据

    ```
    db.numbers.find({}).limit(10)
    ```

    **skip(num) 跳过指定条数	limit(num)每页显示条数**  顺序不影响查询结果

22. 查看 numbers 中的 第11条 到 第20条 数据

    ```
    db.numbers.find({}).skip(10).limit(10)
    ```

23. 查看 numbers 中的 第20条 到 第30条 数据

    ```
    db.numbers.find({}).skip(20).limt(10)
    ```

24. 将 dept 和 emp 结合导入到数据库中

25. 查询工资小于 2000 的员工

    ```
    db.emp.find({sal: {$lt:2000}})
    ```

26. 查询工资在 1000-2000之间的员工

    ```
    db.emp.find({sal: {$gt:1000, $lt:2000}})
    ```

27. 查询工资小于 1000 或 大于 2500 的员工

    ```
    db.emp.find({$or: [{sal: {$lt: 1000}}, {sal: {$gt: 2000}}]})
    ```

28. 查询财务部的所有员工 

    ```
    var deptnum = db.dept.findOne({dname: "财务部"})['deptno']
    db.emp.find({deptno: deptnum})
    ```

29. 查询销售部的所有员工

    ```
    var deptnum = db.dept.findOne({dname: "销售部"})['deptno']
    db.emp.find({depno: deptnum})
    ```

30. 查询所有 mgr 为 7698 的所有员工

    ```
    db.emp.find({mgr: 7698})
    ```

31. 为所有薪资低于 1000 的员工增加工资 400 元 **$inc 自增, 相当于 += **

    ```
    db.emp.updateMany({sal: {$lte: 1000}}, {$inc: {sal: 400})
    ```

### 文档之间关系

**一对一(one to one)**

- 夫妻关系(一个丈夫 对应 一个妻子)

 - 在 mongodb 中, 我们可以**通过内嵌文档的形式体现**出 一对一

   ```
   db.wifeAndHusband.insert([{
       name: 黄蓉,
       husband: {
           name: '郭靖'
       }
   }])
   ```

**一对多(one to many) / 多对一**

- 父母 和 孩子 / 用户 和 订单 / 文章 和 评论

- 我们也可以**通过内嵌文档的形式体现**出 一对多

- 我们还可以**通过两个集合来共同体现**一对多的关系

  ```js
  db.order.insert({
      list: ['桃子', '西瓜', '香蕉'],
      user_id: ObjectId("孙悟空的id")
  })
  
  # 通过 order集合中 文档的user_id值 和 users集合中 文档的_id值进行比较取值
  db.order.find({user_id: _id})
  ```

**多对多(many to many)**

- 分类 和 商品 / 老师 和 学生

- 我们可以通过内嵌文档方式体现多对多

  ```
  db.teachers.insert([
      {name: "洪七公"},
      {name: "黄药师"},
      {name: "龟仙人"}
  ])
  
  db.stus.insert([
      {
      	name: "郭靖",
      	tech_ids: [
              ObjectId("5bff66b8a8050c5f49f0aae3"),
              ObjectId("5bff66b8a8050c5f49f0aae5"),
              ObjectId("5bff66b8a8050c5f49f0aae4")
      	]
      },
      {
      	name: "孙悟空",
      	tech_ids: [
              ObjectId("5bff66b8a8050c5f49f0aae3"),
              ObjectId("5bff66b8a8050c5f49f0aae5")
      	]
      }
  ])
  ```

- 我们**通过三个集合来共同体现**多对多的关系 

**.sort() 用来指定文档的排序规则, 需要传递一个对象来指定排序规则 1 表示升序, -1表示降序**

```
db.emp.find({}).sort({sal:1, empno:-1})
```

.limit() .skip() .sort() 任意顺序调用皆可.



## Mongoose

### 引入

**Mongoose 就是一个让我们通过 Node 来操作 MongoDB 的模块**

Mongoose 是一个对象文档模型(ODM), 它对 Node 元素的 MongoDB 进行了进一步的优化封装, 并提供了更多功能.

**使用 mongoose 的好处**

1. 可以对文档创建一个模式结构(**Schema**)

2. 可以对模型中的对象/文档进行验证
3. 数据可以通过类型装换为对象模型
4. 可以使用中间件来应用业务逻辑挂钩
5. 比 Node 元素的 MongoDB驱动更容易

**mongoose中为我们提供了几个新的对象**

- Schema(模式对象)

  Schema 对象定义约束了数据库中的文档的结构.

- Model

  Model 对象作为集合中的所有文档的表示, 相当于 MongoDB数据库中的结合 collection.

- Document

  Document 表示集合中的具体文档, 相当于结合中的一个具体的文档. 简单地说就是 Model 查询的结果都是 Document

### 开始

[mongoose文档](https://mongoosejs.com/docs/guide.html)

- mongoose 的基本使用流程
  + 下载 npm i mongoose --save

  + 项目中引入 mongoose

  + 连接 mongoose 数据库
    + mongoose.connect('mongodb://数据的ip地址:端口号/数据库名',{ useNewUrlParser: true })
    + 如果端口号是 (27017) 则可以省略不写

  + 监听 MongoDB 数据库的连接状态
    + 在 mongoose 对象中, 有一个属性叫做 connection, 该对象表示的就是数据库连接, 通过监听该对象状态可以+ 监听数据库的链接和断开
      + 数据库连接成功的事件:
        mongoose.connection.once('open', function(){})
      + 数据库断开的事件:
        mongoose.connection.once('close', function(){})

  + 断开数据库连接(一般不需要调用)
    + MongoDB 数据库, 一般情况下, 只需要连接一次, 连接一次以后, 除非项目停止服务器关闭, 否则连接一般不会断开 
      mongoose.disconnect() 

```js
//	引入
const mongoose = require("mongoose")
//	连接
mongoose.connect("mongodb://127.0.0.1/mongoose_test", {
    useNewUrlParser: true
})
//  监听
mongoose.connection.once('open', function () {
    console.log('数据库连接成功')
})
//  将 mongoose.Schema 赋值给一个变量
var Schema = mongoose.Schema;
//  创建 Schema(模式)对象, 限制数据类型
var stuSchema = new Schema({
    name: String,
    age: Number,
    gender: {
        type: String, //  类型是string
        default: 'female' //  默认值是女
    },
    address: String
});
//  通过 Schema 来创建 Model
//  Model 代表的是数据库中的集合(collection), 只有通过 Model 才能操作数据
//  modelName 就是我们要映射的集合名, 注意如果是单数,则自动转为复数结尾如下会转为 students 集合
var StuModel = mongoose.model('student', stuSchema);
//	之后我们是通过模型对象 Model 执行数据(文档)操作
StuModel.find({},function(err, doc){
    if (!err) console.log(doc)
})
```

### 数据的基本操作

#### Model 的方法

- 有了 Model, 我们就可以对数据库进行增删改查的操作

  添加相关

  - 新增数据

    **Model.create(doc(s)[,callback])**

    参数说明: 

    - doc(s)用来创建一个文档对象, 也可以是一个文档对象的数组
    - callback 表示完成操作的回调函数

  查询相关
  	-  查询所有文档, 总会返回一个数组
  	**Model.find(conditions\[,projection]\[,options][,callback])**

    - 根据 id 查询文档, 返回一个文档对象
        **Model.findById()**

    - 查询符合条件的第一个文档

        **Model.findOne()**

        参数说明: 

        - conditions 查询条件
        - projection 投影(指定查询字段)
        - options 查询限制 (skip, limit)
        - callback  回到函数, 查询结构会通过回调函数返回, **回调函数必须传**, 如果不传, 压根不会查询

    - 统计符合条件文档数量

      **Model.count(conditions[,callback])** 

  修改相关

  - Model.update(coditions, doc\[,options][,callback])
  - Model.updateOne(coditions, doc\[,options][,callback])
  - Model.updateMany(coditions, doc\[,options][,callback])
  - Model.replaceOne(coditions, doc\[,options][,callback])
    参数说明: 
    - coditions 查询条件
    - doc 修改后的对象
    - options 配置参数
    - callback 回调函数

  删除相关:

  - Model.remove(conditions[,callback]) 已经废弃
  - Model.deleteOne()
  - Model.deleteMany()

**示例**

```js
//	向数据库插入文档	Model.create(doc[, callback])
StuModel.create([{
    name: '爱不爱大白兔',
    age: 19,
    address: '欲穷千里目'
}, {
    name: '爱上胡萝卜',
    age: 19,
    address: '更上一层楼'
}], function (err) {
    if (!err) {
        console.log('插入文档成功...')
    }
})


//  查询文档
StuModel.find({	//  查询条件
    gender: 'female'
}, {	//  投影, 需要获取的字段
    name: 1,
    _id: 0
}, {	//  查询限制, skip limit  
    limit: 2
}, function (err, doc) {
    if (!err) {	//  通过 find 查询的结果对象,就是 Document
        console.log(doc);
    }
})


//  修改文档
StuModel.updateOne({
    name: '小白兔'
}, {
    $set: {
        age: 20
    }
}, function (err, doc) {
    if (!err) {
        console.log(doc);
    }
})


//	删除文档
StuModel.deleteOne({
    name: '爱上胡萝卜'
}, function (err) {
    if (!err) {
        console.log('删除成功')
    }
})
```

#### Document 的方法

- equals(doc) 比较文档是否是同一个
- id 获取文档 _id 值
- get(path[, type]) 获取文档中的指定属性值 `doc.字段名` 更加迅速
- set(path, value[, type]) 设置文档指定属性值 `doc.字段名=字段值`  需要调用 save() 保存数据

- update(update[, options]\[,callback]) 修改

- **save([callback]) 保存**
- remove([callback]) 删除

- toJSON() 转换为一个JSON对象
- **toObject() 将 Document 对象转换为普通的 js 对象, 注意所有的 Document 对象的方法和属性就都不可以使用了(可用作隐私处理)**

### mongoose 模块化

1. **使用 node 独立一个出一个模块用做数据库连接, 最后通过require加载即可**

```js
/* connectionMongodb
  定义一个模块, 用来连接 Mongodb 数据  
*/
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/mongoose_test", {
  useNewUrlParser: true
})
mongoose.connection.once('open', function () {
  console.log('数据库连接成功..')
})
```

2. 定义一个独立的创建 xxSchema 模块

```js
//	
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//  创建 xxSchema
var stuSchema = new Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: 'female'
  },
  address: String
})

//  创建模型, 以便执行下步curd方法
var StuModel = mongoose.model('student', stuSchema);

//  导出 xxModel 对象
module.exports = StuModel;
```

3. 外部引入并操作数据

```js
/*
	外部使用则直接导入模块, 进行操作即可
*/
require('./connectionMongodb');
var student = require('./student');
//  执行model操作
student.find({}, function (err, docs) {
  if (!err) {
    console.log(docs);
  }
})
```

![20181130002246](.\mongodb\20181130002246.png)