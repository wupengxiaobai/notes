layui.use(['form', 'layedit', 'layer'], function () {
  var $ = layui.$;
  var layer = layui.layer; //  弹出层模块

  // var options = {}
  // layedit.set(options) // 全局配置edit

  var layedit = layui.layedit; //  富文本模板
  var index = layedit.build('content', { // 建立编辑器, options配置对象
    tool: [ //  工具栏定制
      'strong', //加粗
      'italic', //斜体
      'underline', //下划线
      'del', //删除线
      '|', //分割线
      'left', //左对齐
      'center', //居中对齐
      'right', //右对齐
      'link', //超链接
      'unlink', //清除链接
      'face', //表情
      'image', //插入图片
      'help' //帮助
    ],
    hideTool: '', //  隐藏默认的工具
    height: 200, //  初始高度
    uploadImage: { //  图片上传接口: uploadImage: {url: '/upload/', type: 'post'}
      url: '/uploads/article',
      type: 'post'
    },
  });
  // layedit.getText(index) //  获取edit纯文本内容
  // layedit.sync(index)  //  同步内容到 textarea
  // layedit.getSelection(index)  获取编辑器选中的文本内容

  $('.submit-btn').on('click', function () {
    var content = layedit.getContent(index) //  获取编辑器的内容
    var tips = $('select[name=tips]').val()
    var title = $('input[name=title]').val()
    var formData = {
      title,
      tips,
      content
    }

    $.ajax({
      type: 'POST',
      url: '/article/add',
      data: formData,
      dataType: 'json',
      success(res) {
        if (res.code === 0) { //  成功
          layer.open({
            title: '成功提示',
            content: res.msg,
            end() {
              location.href = '/index'
            }
          });

        } else {
          layer.open({
            title: '温馨提示',
            content: res.msg
          });
        }
      },
      error(err) {
        layer.open({
          title: '温馨提示',
          content: '未知错误! (请求失败)'
        });
      }
    })

  });
});