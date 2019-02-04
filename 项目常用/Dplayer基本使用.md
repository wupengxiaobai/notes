# Dplayer 基本使用

[gitHub地址](https://github.com/MoePlayer/DPlayer)

这里我们使用了 `bootstrap` 的 `module` 弹窗模块配合 `Dpalyer`  实现点击图片显示 `video` 于屏幕水平及垂直居中

**准备工作**

1. 前端准备工作: jQuery & bootstrap & Dplayer

```html
<link href="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dplayer/1.25.0/DPlayer.min.css">

<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/twitter-bootstrap/4.2.1/js/bootstrap.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dplayer/1.25.0/DPlayer.min.js"></script>
```

2. 后端准备工作

```js
//	1. 数据库连接模块
const mysql = require('mysql')
//	创建连接
const connection = mysql.createConnection({
    host: 'localhost', //	数据库地址
    user: '用户', //	连接用户
    password: '连接密码', //	连接密码
    database: '数据库名' //	数据库名
});
//	连接
connection.connect()
//	导出
module.exports = connection


//	2. sqlJson2str 方法 --> 针对数据库插入数据操作的 set (key=值,key2=值2,key3=值3,...值n)
sqlJson2str(obj) {
    var str = '';
    for (var key in obj) {
        str += `${key}='${obj[key]}',`;
    }
    return str.substring(0, str.length - 1);
}
```

**基本使用**

```html
<!--
	前端工作
-->

<!-- 触发video播放的元素 -->
<img data-video="<%= item.videoKey %>" data-cover="<%= item.coverKey %>" data-toggle="modal" data-target="#myModal" data-id="<%= item.doubanId %>" data-link="<%= httpLink %>" class="card-img-top" src="<%= item.image%>" alt="Card image cap">

<!-- 1. 创建一个承载video的元素 -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <!-- video容器 *********** -->
            <div id="dplayer"></div>
        </div>
    </div>
</div>

<!-- 2. 前端js -->
<script>
    let dp = null;
    let isPlay = false; //  是否播放状态
    let lastVideo = null;
    
    //  监听模态框关闭 --> 视频暂停播放
    $('#myModal').on('hidden.bs.modal', function (e) {
        dp.pause()
    })
    
    //	元素点击触发视频播放
    $('.card-img-top').on('click', function () {
        
        //  1. 显示模态框
        $('#myModal').modal('show')
        
        //  2. 拿到相关需求数据
        let doubanId = $(this).data('id');	//	视频id值
        let cover = $(this).data('cover'); 	//	cover图片路径
        let video = $(this).data('video'); 	//	视频路径
        let httpLink = $(this).data("link") + '/'; //  弹幕请求地址

        //  3. 判断如果处在非播放状态, 进行不同的处理
        if (!isPlay) {
            
            //	实例化 Dplayer
            dp = new DPlayer({
                container: document.getElementById('dplayer'),
                screenshot: true,
                video: {
                    url: 'http://pm6jl28w5.bkt.clouddn.com/' + video,	//	视频播放路径
                    pic: 'http://pm6jl28w5.bkt.clouddn.com/' + cover,	//	视频播放前焦点图路径
                    thumbnails: 'http://pm6jl28w5.bkt.clouddn.com/' + cover	
                },
                danmaku: {
                    id: doubanId, // 弹幕对应视频id
                    api: httpLink, //  弹幕请求地址
                    maximum: 3000,	//	最多请求弹幕条数
                }
            });
            isPlay = true;	//	改变视频状态为播放
        } else {	
            if (lastVideo === video) { //  如果播放项还是当前 video 继续播放
                dp.play()
            } else {
                dp.switchVideo({	//  如果播放项非当前video, 切换到其他项从头播放
                    url: 'http://pm6jl28w5.bkt.clouddn.com/' + video,
                    pic: 'http://pm6jl28w5.bkt.clouddn.com/' + cover,
                    thumbnails: 'http://pm6jl28w5.bkt.clouddn.com/' + cover
                }, {
                    id: doubanId,
                    api: httpLink,
                    maximum: 3000
                });
            }
        }
        //  同步值, 确定播放是否是当前
        lastVideo = video;
    })
</script>
```

```js
/*
	后台工作
*/

//  获取预告电影页面
router.get('/yugao', async (req, res) => {
    //  根据id查找数据, 渲染模板
    let movieData = await new Promise((resolve, reject) => {
        connect.query(`select * from theatersCrawler2`, (error, results) => {
            if (error) return reject(error)
            return resolve(results)
        })
    })
    await res.render('movies_yugao', {
        movieData,	//	电影数据
        httpLink: url	//	服务端请求地址
    })
});

//  预告电影获取弹幕
router.get('/v3', async (req, res) => {
    let { id } = req.query;	//	获取请求视频id
    let danmus = await new Promise(resolve => {
        connect.query(`select * from danmus where id = ${id}`, (error, results) => {
            if (error) return console.log('获取弹幕失败 --------', error)
            return resolve(results)
        })
    })
    /* 组成适合Dplayer模块的弹幕数组对象返回给前台
    	{code:0,data:[[],[]]}
  	*/
    let rtDanmus = [];
    danmus.forEach(item => {
        rtDanmus.push([
            item.time,
            item.type,
            item.color,
            item.author,
            item.text
        ])
    })
    res.send({
        code: 0,
        data: rtDanmus
    })
})

//  接收弹幕请求(流式数据)
router.post('/v3', async (req, res) => {
    let body = await new Promise(resolve => {
        //  {id: "demo", author: "DIYgod", time: 2.04101, text: "1112222", color: 6610199, type: 0}
        let str = '';
        req.on('data', (data) => {
            str += data.toString();
        }).on('end', () => {
            resolve(JSON.parse(str));
        })
    })
    //  保存数据到数据库
    let danmus = await new Promise(resolve => {
        connect.query(`insert into danmus set ${sqlJson2str(body,['id','time','type'])}`, (error, results) => {
            if (error) return console.log('保存弹幕数据出错!', error)
            return resolve(results)
        })
    })
})
```



