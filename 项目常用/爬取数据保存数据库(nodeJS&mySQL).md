# nodeJS 爬取网络资源并保存数据

目录结构

```
|-db
	|-dbconnect.js 数据库连接模块
|-server
	|-crawler	# 爬取数据模块目录文件
    	|-theatersCrawler.js
    |-qiniu 	# 七牛模块目录文件
    	|-index.js
    	|-upload.js
    |-index.js  # 运行文件
```

## 使用 *puppeteer* 制作一个简单的数据爬取

1. 安装 `npm i -D puppeteer`

2. 基本方法步骤
   1. 打开浏览器(**puppeteer.launch({})**)
   2. 创建页面标签(**browser.newPage()**)
   3. 跳转指定网页(**page.goto(url, {})**)
   4. 等待网页加载完成(**page.evaluate(cb)**) 开始爬取数据
   5. 关闭浏览器(**browser.close()**)

## 提前准备

### 数据库连接模块

```js
/*
* db/dbconnect.js 数据库连接模块
***/

const mysql = require('mysql')

//	创建连接
const connection = mysql.createConnection({
    host: '数据库地址', //	数据库地址
    user: '连接用户', //	连接用户
    password: '连接密码', //	连接密码
    database: '数据库名' //	数据库名
});
//	连接数据库 	 	  打开冰箱
connection.connect()

module.exports = connection

//	关闭数据库  		 关闭冰箱
// connection.end();
```

### **上传资源到七牛[参考官方](https://developer.qiniu.com/kodo/sdk/1289/nodejs)**

```js
/*
* server/qiniu/upload.js 上传资源到七牛的模块
**/
// 七牛 nodeJS sdk
const qiniu = require('qiniu')

var accessKey = 'accessKey';	//	七牛个人密匙ak
var secretKey = 'secretKey';	//	七牛个人密匙sk
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//  定义配置对象
var config = new qiniu.conf.Config();
//  定义区域 z0 华东;
config.zone = qiniu.zone.Zone_z0;
var bucketManager = new qiniu.rs.BucketManager(mac, config)

//  上传资源到七牛
/**
 * url 源地址
 * filename 保存文件名称
 */

module.exports = (url, filename) => {
    //bucket 存储空间名称
    var resUrl = url;
    var bucket = "wx2333";
    var key = filename;

    return new Promise((resolve, reject) => {
        bucketManager.fetch(resUrl, bucket, key, function (err, respBody, respInfo) {
            if (err) {
                console.log(err);
                reject('上传资源到七牛出了问题', err)
            } else {
                if (respInfo.statusCode == 200) {
                    console.log('文件上传成功')
                    resolve();
                }
            }
        });
    })
}


```

## 爬取 *douban* 热门电影资源

```js
/*
*	server/crawler/theatersCrawler.js
**/

//	安装并引入 puppeteer 模块
const puppeteer = require('puppeteer');
//	设置操作页面的路径
const url = 'https://movie.douban.com/cinema/nowplaying/wenzhou/';
function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000)
  })
}

module.exports = async () => {
  //  1. 打开浏览器
  const browser = await puppeteer.launch({
    // args: [''],
    handless: true //  以无头浏览器的形式打开浏览器, 默认true. 没界面, 在后台运行
  });

  //  2. 创建页面标签
  const page = await browser.newPage();

  //  3. 跳转指定网页
  await page.goto(url, {
    waitUntil: 'networkidle2' //  等待网络空闲时, 再跳转加载页面
  });

  //  4. 等待网页加载完成, 开始爬取数据 这里我们调用延时器, 延迟2秒钟再开始爬数据
  await timeout()

  let result = await page.evaluate(() => {
    //  对加载好的页面进行dom操作
    var resArr = []

    //  获取热门电影部分数据
    var $list = $('#nowplaying>.mod-bd>.lists>.list-item');

    for (var i = 0, len = $list.length; i < len; i++) {
      let liDom = $list[i];
      let title = $(liDom).data('title'); // 标题
      let rating = $(liDom).data('score'); // 评分
      let runtime = $(liDom).data('duration'); //  片长
      let region = $(liDom).data('region'); //  国家
      let directors = $(liDom).data('director'); //  导演
      let casts = $(liDom).data('actors'); //  主演
      let href = $(liDom).find('.poster>a').attr('href') //  详情地址
      let image = $(liDom).find('.poster>a>img').attr('src') //  海报图

      resArr.push({
        title,
        rating,
        runtime,
        region,
        directors,
        casts,
        href,
        image
      })
    }

    //  将爬取的数据返回出去
    return resArr;
  })

  //  处理获得电影类型
  for (let i = 0; i < result.length; i++) {
    let item = result[i];
    let itemUrl = item.href;

    await page.goto(itemUrl, {
      waitUntil: 'networkidle2' //  等待网络空闲时, 再跳转加载页面
    });

    let dItem = await page.evaluate(() => {
      let genre = []; //  类型
      $('[property="v:genre"]').each((i, v) => {
        genre.push($(v).html())
      })
      let summary = $('[property="v:summary"]').html().replace(/(\s+)|(\<[\S\s]+\>)/g, ''); //  简介
      return {
        genre,
        summary
      }
    })
    //  给当前对象添加类型和简介属性
    delete item.href
    item.genre = dItem.genre
    item.summary = dItem.summary
  }

  //  返回数据(未知原因, 在公司电脑上我把这条放到了关闭浏览器之后也可以拿取数据, 在家里只能放在关闭浏览器之前了, 意味着不执行关闭浏览器操作)
  return result;

  //  5.关闭浏览器
  await browser.close();

}
```

## 保存数据到数据库

```js
/*
* server/index.js 运行文件
**/

//	连接数据库
const connect = require('../db/dbconnect')
//  热门电影数据模块
let moviesRM = require('./crawler/theatersCrawler'); 
//	上传资源到七牛方法
let uploadTQN = require('./qiniu/index');


//  拿取电影预告片相关数据 ------------------------------- 
(async () => {
  //  第一步: 获取爬取数据
  const movies = await moviesRM();
  // console.log('爬取豆瓣电影预告片相关数据: ', movies)

  //  第二步, 遍历爬取的数据 --> 保存数据到库
  let tableName = 'theaterscrawler'; //  * 确定要保存数据到数据表的表名称*****************
    
  movies.forEach(async item => {
    var str = '';
    for (const key in item) {
      if (/(doubanId)/.test(key)) { //  判断甄别int的处理
        str += `${key}=${item[key]},`;
      } else {
        str += `${key}='${item[key]}',`;
      }
    }
    str = str.substring(0, str.length - 1);
    await connect.query(`insert into ${tableName} set ${str}`, (error, results) => {
      if (error) return console.log('保存数据失败了  T_T ', error);
      console.log('保存图片成功')
    })
  })

  //  第三步: 上传图片到七牛 **************
  await uploadTQN('image', 'postKey', tableName) //  上传热门电影图片资源
})();
```

## 上传资源到七牛

```js
/*
* server/qiniu/index.js 上传数据到七牛/修改数据
***/

//  将数据库中的图片上传到七牛云服务器中的模块
const nanid = require('nanoid') //  生成唯一key依赖, 生成唯一资源名称
const connect = require('../../db/dbconnect')
const uploadToQiNiu = require('./upload') //  调用七牛sdk, 上传资源到七牛

/**
 * key 需要上传资源的字段名称, 这里没有使用到
 * keyType 区分需要上资源的类型
 * tabName 数据保存表名称
 */
module.exports = async (key, keyType, tabName) => {

    // ------------------------- 上传素材到七牛 -----------------------------
    //1. 获取数据库需要上传资源链接(指定key值为null时)
    //2. 上传资源到七牛中
    //3. 重新保存key值到数据库中, 下次不再保存有值的数据

    let movies = await new Promise((resolve, reject) => {
        connect.query(`select * from ${tabName} where ${keyType} is null or ${keyType} = ''`, (error, resultes) => {
            if (error) return reject(error)
            return resolve(resultes)
        })
    })

    // console.log('检测到需要上传到七牛的数据如下: ------------', movies)

    for (var i = 0, len = movies.length; i < len; i++) {
        let item = movies[i];
        let id = item.id;

        //  初始化变动参数
        let url;
        let extName; //  源文件后缀

        //  根据情况更新
        if (keyType === 'postKey') {
            url = item.image
        } else if (keyType === 'coverKey') {
            url = item.cover_img
        } else if (keyType === 'videoKey') {
            url = item.link
        }
        extName = url.substring(url.lastIndexOf('.'))

        //  保存七牛文件名称
        let filename = `${nanid(10)}${extName}`;
        //  上传文件到七牛*****
        await uploadToQiNiu(url, filename)

        //  保存上传资源key值, 即文件名到我们的数据库
        let res = await new Promise((resolve, reject) => {
            connect.query(`update ${tabName} set ${keyType} = '${filename}' where id = ${id}`, (error, resultes) => {
                if (error) return reject(error)
                return resolve(resultes)
            })
        })

        console.log(res)
    }
}
```

