  require.config({
    baseUrl: './js/',
    paths: { //  配置模块目录, 谨记在这里不能添加js后缀
      jquery: 'lib/jquery-3.1.1',
      server: '../server'  //  配置server目录
    }
  })

  require(['jquery', 'asideItem1/index'], function ($, asideItem1) {

    //  aside 三个 item 的事件绑定, 我们选择节省性能的事件委托方式
    //  通过判断aside元素是否有指定类名(或data-id), 从而实现相应逻辑, 相对于判断[索引]|[内容]更加适应需求变更
    $('.aside-list').on('click', '.aside-item', function () {
      //  默认设置
      $(this).addClass('active').siblings().removeClass('active') //  aside样式的修改

      //  根据模块不一, 执行按需执行相应的模块代码
      if ($(this).hasClass('aside-item1')) { //  aside-item1模块
        asideItem1()

      } else if ($(this).hasClass('aside-item2')) { // aside-item2模块


      } else if ($(this).hasClass('aside-item3')) { //  aside-item3模块

      }
    })

    //  默认进入页面展示第一个菜单显示的内容(执行一次第一个item的点击事件)
    $('.aside-list .aside-item:eq(0)').trigger('click')
  })