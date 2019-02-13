//  首页js文件
layui.use(['element', 'laypage'], function () {
  var laypage = layui.laypage;
  var $ = layui.$

  //  总条数
  var totalNum = $('#laypage').attr('data-maxNum');
  var tips = $('#laypage').attr('data-tips');
  var page2 = $('#laypage').attr('data-page');

  //执行一个laypage实例
  laypage.render({
    elem: 'laypage', //  id不用加#
    count: totalNum, //数据总数，从服务端得到
    limit: 6,
    groups: 5, //  分页组显示
    curr: function () { //  当前选择page
      var page = page2;
      return page ? page : 1; // 返回当前页码值
    }(),
    jump: function (obj, first) { //  当page发送变化触发
      //  obj, 当前page对象
      // console.log(obj)
      //  首次不执行
      if (!first) {
        location.href = `/index?tips=${tips}&page=${obj.curr}&limit=${obj.limit}`;
      }
    }
  });
});