define(['jquery', 'server/asideItem1Server', 'asideItem1/add'], function ($, asideItem1Server, add) {

  return function () {

    //  构建表格内容
    var mainStr = asideItem1Server.getListData().map(item => `<tr>
      <td>${item.name}</td>
      <td>${item.age}</td>
      <td>${item.gender}</td>
      <td><button>编辑</button></td>
    </tr>`).join("")

    //  渲染出一个列表页面
    var str = `
      <div>
        <span>操作:</span>
        <button class="add">添加</button>
        <button>删除</button>

        <table border="1">
          <thead>
            <tr>
              <th>姓名</th>
              <th>年龄</th>
              <th>性别</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${mainStr}
          </tbody>
        </table>
      </div>
    `

    var $item1 = $(str)
    $item1.on('click', '.add', function () {
      add()
    })


    $('.main .content').html($item1)

  }
})