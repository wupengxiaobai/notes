const Koa = require('koa')
const static = require('koa-static')
const koaBody = require('koa-body')
const router = require('./routes/router')
const join = new require('path').join
const cors = require('koa-cors');

const app = new Koa


app.use(cors()) //  允许跨域
app.use(koaBody()) //  配置解析post数据
app.use(static(join(__dirname, 'public'))) //  配置静态资源目录
app.use(static(join(__dirname, 'uploads'))) //  配置静态资源目录
app.use(router.routes()).use(router.allowedMethods()) //  注册路由信息
app.listen(3000, () => {
  console.log('项目启动成功, running in 3000')
})

