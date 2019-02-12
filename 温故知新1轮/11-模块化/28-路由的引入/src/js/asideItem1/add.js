define(['jquery', 'server/asideItem1Server', 'require', 'asideItem1/index'], function ($, asideItem1Server, require) {
  return function () {

    var addStr = `
      <form>
        <label>姓名: <input name="name"/></label>
        <label>年龄: <input name="age"/></label>
        <label>性别: <input name="gender"/></label>
        <button type="submit">提交</button>
      </form>
    `
    // console.log(asideItem1Server)

    $add = $(addStr)
    $add.on('submit', function (e) {
      //  阻止表单默认提交
      e.preventDefault()

      var name = $('input[name=name]').val()
      var age = $('input[name=age]').val()
      var gender = $('input[name=gender]').val()


      //  添加内容
      asideItem1Server.add({
        name,
        age,
        gender
      })

      //  回到第一板块页面: 循环依赖*****问题
      //  ----> 1. 引入 require 和 目标依赖模块
      //  ----> 2. 执行require('目标依赖模块')()
      require('asideItem1/index')()
      /* router.push({
        path: '/asideItem1'
      }) */
    })

    $('.main .content').html($add)


  }
})