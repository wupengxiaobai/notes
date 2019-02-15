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
        pagination: true, //是否分页

        /*  开启服务端分页
          服务端给我返回的数据必须是如此格式 {rows:[{},{}], total:12 }
          客户端bootstrap-table 根据总记录数可以计算出来多少页
        */
        sidePagination: "server", //  服务端渲染
        pageSize: 5, //  默认显示条数
        showColumns: true, //  内容页下拉框
        rowStyle: function (row, index) {
          row.avatar = `<img src='${_this.host+ (row.avatar).match(/avatar\/\d+\_avatar\.[a-z]{3}/)[0]}' height='50'/>`;
          row.operation = `<button class="btn btn-xs btn-success" data-id=${row.id}>编辑</button>  <button class="btn btn-xs btn-danger delete-btn" data-id=${row.id}>删除</button>`
          return row
        },
        //  数据加载完成触发, 此时可以触发删除或者编辑等操作
        onLoadSuccess() {
          $('#table').on('click', '.delete-btn', function () {
            var id = $(this).data('id');
            $.ajax({
              url: _this.host + 'deleteData',
              data: {
                id
              },
              success(res) {
                console.log(res)
              }
            })
          })
        },
        //  传递给后端的参数
        queryParams: function (params) {
          console.log(params)
          
          params.pageSize = params.limit
          params.page = params.offset / params.pageSize + 1
          params.search = params.search
          //  return 值就是传递给后台的数据
          return params;
        },
        pageList: [5, 10, 20, 30, 'All'], //  组别
        showToggle: false,
        striped: true, //  隔行变色
        showRefresh: true, //  刷新
        columns: [{
            checkbox: true //  复选框
          }, {
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
    },
    //  重置table
    refreshTable() {

    }

  }
  return hk.init()
})()