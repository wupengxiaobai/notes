  require.config({
    baseUrl: './js/',
    paths: { //  配置模块目录, 谨记在这里不能添加js后缀
      jquery: 'lib/jquery-3.1.1',
      server: '../server' //  配置server目录
    }
  })

  require(['jquery', 'router'], function ($, router) {

    $('.aside-list').on('click', '.aside-item', function () {
      //  默认设置
      $(this).addClass('active').siblings().removeClass('active') //  aside样式的修改

      //  根据模块不一, 执行按需执行相应的模块代码
      if ($(this).hasClass('aside-item1')) { //  aside-item1模块
        router.push({
          path: '/asideItem1'
        })
      } else if ($(this).hasClass('aside-item2')) { // aside-item2模块


      } else if ($(this).hasClass('aside-item3')) { //  aside-item3模块

      }
    })

    $('.aside-list .aside-item:eq(0)').trigger('click')
  })


  /* 
    + 通过路由将各个功能从 url 上就可以分辨出来了
      - /user/list
      - /user/3
      - /user/edit/3
  
    + 路由可以进行前进, 后退等盗汗操作

    前端路由的实现方式
    + 1. 监听window对象的hashchange事件
      - hash值 通过该loaction.hash 获取 以 # 开头
      - 也可以通过 location.hash来设置 hash值, 也应该以 # 开头

    + 2. history 对象: popState/pushState 

  */