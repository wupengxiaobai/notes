define([], function () {
  /* var router = new VueRouter({
    routes: [{
        path: '/user',
        component: User
      },
      {
        path: '/home',
        component: Home
      },
    ]
  }) */

  function Route(options) {
    this.routes = options.routes
    this.init()
  }

  Route.prototype = {
    constructor: Route,
    init() {
      //  1. 监听录音变化
      var _this = this
      window.addEventListener('hashchange', function () {
        //  1.1 获取最新 hash值
        var hash = location.hash.substring(1)
        //  1.2 将hash跟本地保存的路由中的path进行匹配, 匹配到指定路由, 就执行指定模块的代码
        var route = _this.routes.find(item => item.path === hash)

        if (route) { //  找到了, 调用模块
          route.component()
        } else {
          //  找不到, route为kon
          console.log('未找到指定路由')
        }
      })
    },
    //  根据path跳转指定hash
    push({
      path
    }) {
      //  跳转到指定路由
      // console.log(path)
      var route = this.routes.find(item => item.path === path)
      
      route.component()
    }
  }

  return Route
})