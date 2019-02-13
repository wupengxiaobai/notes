layui.use(['element', 'layer'], function () {
  var $ = layui.$
  var layer = layui.layer; //  弹出层模块

  var publisherId = JSON.parse($('input[type=hidden]').attr('data-cookie')).uid;
  var articleId = JSON.parse($('input[type=hidden]').attr('data-articleId'));
  $('.comment-commit').on('click', function () {
    var textareaValue = $('.textarea-content').val();
    $.ajax({
      type: 'POST',
      url: "/comment/add",
      data: {
        publisherId,
        articleId,
        textareaValue
      },
      success: function (res) {
        console.log(res)
        if (res.code == 0) {
          layer.open({
            title: '成功提示',
            content: res.msg,
            end() {
              history.go(0)
            }
          })
        }else{
          layer.open({
            title: '温馨提示',
            content: res.msg
          })
        }
      },
      error: function (err) {
        layer.open({
          title: '温馨提示',
          content:'未知错误, 请稍后重试!'
        })
      }
    })
  })
});