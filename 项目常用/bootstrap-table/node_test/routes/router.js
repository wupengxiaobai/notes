const Router = require('koa-router')
const router = new Router
const upload = require('../utils/upload')
const operationUpload = require('../controllers/operationUpload')
const test = require('../controllers/test')

// 上传头像
router.post('/upload/avatar', upload.single('file'), operationUpload.upLoadAvatar)

//  保存数据
router.post('/saveData', test.saveData)

//  获取数据
router.get('/getData', test.getData)

//  NotFound 等处理页面
router.get("*", async (ctx) => {
  ctx.body = {
    code: 404,
    msg: '您要找的 Page 在火星, 请买票再进行登仓操作 O(∩_∩)O~',
  }
})

module.exports = router