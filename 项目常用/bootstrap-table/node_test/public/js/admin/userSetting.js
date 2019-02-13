layui.use('form', function () {
  var form = layui.form;
  var $ = layui.$;


  //  请求获取用户相关数据并且初始化各数据
  $.ajax({
    type: 'POST',
    url: '/user/getUserInfo',
    success: function (res) {
      console.log(res)
      $('.avatar img').attr('src', res.userInfo.avatar)
      $('input[name=signature]').val(res.userInfo.signature)
      $('input[name=truename]').val(res.userInfo.truename ? res.userInfo.truename : '')
      $('select[name=gender]').find('option').each((i, v) => {
        if ($(v).attr('value') === res.userInfo.gender) {
          $('.gender .layui-form-select input').val(res.userInfo.gender);
          return
        }
      })
      $('input[name=age]').val(res.age ? res.age : '')
      $('select[name=emotion]').find('option').each((i, v) => {
        if ($(v).attr('value') === res.userInfo.emotion) {
          $('.emotion .layui-form-select input').val(res.userInfo.emotion)
          return
        }
      })
      $('textarea[name=address]').val(res.userInfo.address)
    },
    error: function (err) {}
  })




  //  头像上传
  layui.use('upload', function () {
    var upload = layui.upload;
    //执行实例
    var uploadInst = upload.render({
      elem: '#avatar', //绑定元素
      url: '/upload/avatar', //上传接口
      // headers: , //  请求头
      accept: 'images',
      acceptMime: 'image/*',
      exts: 'jpg|png|gif|bmp|jpeg',
      size: 2000,
      done: function (res) {
        if (res.errCode === 0) {
          $('.avatar img').attr('src', res.avatarURL)
        }
      },
      error: function () {
        console.log('请求异常回调')
      }
    });
  });

});