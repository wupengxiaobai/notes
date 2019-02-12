require.config({
  // baseUrl: '/js',  模块访问路径基础目录
  paths: {
    //  配置模块快捷访问路径, 谨记在这里不能添加js后缀
    product: './product',
    user: './user',
    jquery: './util/jquery-3.1.1'
  }
})


require(['product', 'user', 'jquery'], function (product, user) {

  //  按需执行模块代码
  document.getElementById('product').onclick = function () {
    product.init()
  }

  document.getElementById('user').onclick = function () {
    user()
  }

  
  $('body').append('<div>jquery插入的div<div>')

  //  这里是首页其它js代码逻辑
  console.log('首页模块最后一行 console')
})