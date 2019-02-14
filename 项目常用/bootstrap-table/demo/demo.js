(function () {
  var hk = {
    host: 'http://localhost:3000/',
    init() {
      this.initEvent()
      // this.getData()
      this.initTable()
    },
    initEvent() {
      this.submitForm()
      this.uploadAvatar()
    },
    //  上传头像
    uploadAvatar() {
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
    },
    //  获取数据
    getData(params = {
      page: 1,
      pageSize: 5
    }) {
      var _this = this
      $.ajax({
        url: _this.host + 'getData',
        data: params,
        dataType: 'json',
        success(res) {
          if (res.errCode === 0) {
            formatData = res.data
            //  处理数据, 初始化 bootstrap-table 数据
            _this.initTable(formatData)
          }
        }
      })
    },
    //  初始化table
    initTable() {
      var _this = this;
      $("#table").bootstrapTable({
        url: _this.host + 'getData',
        striped: true, //  隔行变色
        /*  开启服务端分页
          服务端给我返回的数据必须是如此格式 {rows:[{},{}], total:12 }
          客户端bootstrap-table 根据总记录数可以计算出来多少页
        */
        //  传递给后端的参数
        queryParams: function () {
          var temp = {
            page: 1,
            pageSize: 5,
          };
          return temp;
        },
        pageList: [10, 25, 50, 100],
        pagination: true, //是否分页 
        sidePagination: "server",
        showRefresh: true,
        columns: [{
            field: "id",
            title: 'ID'
          },
          {
            field: 'username',
            title: '用户名'
          }, {
            field: 'description',
            title: '描述'
          },
          {
            field: 'avatar',
            title: '头像'
          }, {
            field: 'operation',
            title: '操作'
          }
        ]
      })
    }

  }
  return hk.init()
})()