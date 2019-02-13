(function () {
  var hk = {
    init: function () {
      this.initEvent()
    },
    initEvent: function () {
      this.submitForm()
      this.uploadAvatar()
    },
    //  上传头像
    uploadAvatar: function () {
      var file = $("#avatar")[0];
      file.onchange = function () {
        var formData = new FormData();
        formData.append('file', file.files[0]);
        var src = file.files[0].name,
          formart = src.split(".")[1];
        if (formart == "jpg" || formart == "png") {
          $.ajax({
            url: 'http://localhost:3000/upload/avatar',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
              //上传成功之后，返回对象data                 
              if (data.errCode == 0) {
                var src = data.data.imgLink
                $('.avatar').attr('src', 'http://localhost:3000/' + src)
                $('input[name=avatar]').val(src)
              } else {
                alert('上传失败')
              }
            }
          })
        }
      };
    },
    //  表单提交
    submitForm() {
      $('.saveForm').on('click', function () {
        //  获取数据
        var username = $('input[name=username]').val()
        var description = $('input[name=description]').val()
        var avatar = $('input[name=avatar]').val()

        $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/saveData',
          dataType: 'json',
          data: {
            username,
            description,
            avatar
          },
          success(res) {
            if (res.errCode === 0) {
              console.log('提交数据成功')
              setTimeout(() => {
                $('#exampleModal').modal('hide')
              }, 500)
            }
          }
        })
      })
    }

  }
  return hk.init()
})()