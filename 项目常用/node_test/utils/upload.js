const multer = require('koa-multer')
const {
  join
} = require('path')

const storage = multer.diskStorage({
  //  存储位置
  destination(req, file, cb) {
    cb(null, join(__dirname, '../uploads/avatar'))
  },
  //  文件名
  filename(req, file, cb) {
    let ext = file.originalname.substr(file.originalname.indexOf('.'))
    cb(null, `${Date.now()}_avatar${ext}`)
  }
})

module.exports = multer({
  storage
})