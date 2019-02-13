const Koa = require('koa')
const static = require('koa-static')
const views = require('koa-views')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const session = require('koa-session')
const router = require('./routes/router')
const join = new require('path').join
const cors = require('koa-cors')

const app = new Koa

app.keys = ["wupeng is a handsome man!"]
//  session 配置的对象
const CONFIG = {
  key: 'Sid',
  maxAge: 24 * 60 * 60 * 1000, //  过期时间
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true, // 是否刷新过期时间(从最后一个操作开始计时)  
  renew: false
}


app.use(cors()) //  允许跨域
app.use(logger()) //  注册日志模块
app.use(session(CONFIG, app)) // 注册session
app.use(koaBody()) //  配置解析post数据
app.use(static(join(__dirname, 'public'))) //  配置静态资源目录
app.use(static(join(__dirname, 'uploads'))) //  配置静态资源目录
app.use(views(join(__dirname, 'views'), { //  配置模板
  extension: "pug"
}))
app.use(router.routes()).use(router.allowedMethods()) //  注册路由信息
app.listen(3000, () => {
  console.log('项目启动成功, running in 3000')
})



{ //  创建管理员用户
  //  查找数据库, 不存在 -> 创建管理员用户. 存在 -> 控制台输出
  const connect = require('./models/dbconnect')
  const cncryption = require('./utils/encryption')
  let name = 'admin'
  let pass = cncryption('admin666')
  connect.query(`select * from users where username = '${name}' limit 1`, (error, results) => {
    if (error) return console.log('查找管理员失败')
    if (!results.length) {
      connect.query(`insert into users values(null, '${name}', '${pass}', 0, 0)`, (error, results) => {
        if (error) return console.log('创建失败:', error)
        return console.log('创建成功:', results[0])
      })
    } else {
      console.log(`管理员用户 -> ${name}, 密码 -> ${pass}`)
    }
  })
}