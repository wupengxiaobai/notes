const express = require('express')
const app = express()
const path = require('path')


//  处理图片上传部署
const multer = require('multer')
//设置文件上传路径和文件命名
let tupianName = ''
//  配置上传文件相关(保存目录文件, 重命名)
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //文件上传成功后会放入public下的upload文件夹
        cb(null, path.join(__dirname, '/upload'))
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.substr(file.originalname.indexOf('.'))
        tupianName = new Date().getTime() + ext
        //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime()利用时间来区分
        cb(null, tupianName)
    }
})
var upload = multer({
    storage: storage
})


//  接收post请求的图片上传
app.post('/upload', upload.single('file'), (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    var url = path.join('/upload/' + tupianName)    //__dirname, 
    //将其发回客户端
    res.send({
        code: '200',
        msg: 'wupeng is a handsome man!',
        url: url
    })
})



app.listen(9000, function () {
    console.log('running in 9000...')
})