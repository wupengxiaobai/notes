layui.use(['element', 'layer'], function () {
  var element = layui.element;
  //  layui 集成了 jquery
  var $ = layui.$
  //  引入layui模块---layer
  var layer = layui.layer


  var $username = $(".layui-show input[name=username]")
  var $password = $(".layui-show input[name=password]")
  var $password2 = $(".layui-show input[name=confirmPass]")


  //  用户名验证
  // $username.on('blur', function () {
  //   if ($(this).val().length && $(this).val().length < 6) {
  //     layer.msg('用户名长度不能小于6位!')
  //   }
  // })

  //  密码验证
  // $password.on('blur', function () {
  //   if ($(this).val().length && $(this).val().length < 6) {
  //     layer.msg('密码长度不能小于6位!')
  //   }
  // })


  //  再次输入密码
  $password2.on('blur', function () {
    var passVal = $password.val()
    if ($(this).val() !== passVal) {
      layer.msg('输入两次密码不一致', {
        icon: 5
      });
      $(this).val('')
    }
  })

  $('button[class=layui-btn]').on('submit', function (ev) {
    console.log(111)
    var passVal = $password.val()
    if ($(this).val() !== passVal) {
      layer.msg('输入两次密码不一致', {
        icon: 5
      });
      $(this).val('')
      ev.stopPropagation();
    }
  })
});