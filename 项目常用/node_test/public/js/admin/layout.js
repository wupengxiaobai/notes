layui.use('element', function () {
  var element = layui.element,
    $ = layui.$;

  //  左侧导航json数据
  var leftBarJson = [{
      name: 'welcome',
      href: '/admin/welcome',
    }, {
      name: '管理模块',
      href: 'javascript:;',
      children: [{
        name: '文章',
        href: '/admin/article'
      }, {
        name: '评论',
        href: '/admin/comment'
      }]
    },
    {
      name: '设置模块',
      href: 'javascript:;',
      isShow: true,
      children: [{
        name: '个人信息',
        href: '/admin/userSetting'
      }, {
        name: '账户设置',
        href: '/admin/accountSetting'
      }]
    },
    {
      name: '其它',
      href: '#'
    }
  ]
  
  //  左侧导航函数
  function renderLeftBar() {
    var leftBarUl = $('.leftBar');
    var elements = ''; //  li集合字符串
    leftBarJson.forEach(item => {
      var liEle = `<li class="layui-nav-item ${item.isShow ? 'layui-nav-itemed' : ''}">
                    <a class="${item.children?'':'site-demo-active'}"  data-name='${item.name}' data-id="${item.href}" data-href="${item.href}" href='javascript:;'>${item.name}</a>
                  `;
      if (item.children) {
        liEle += '<dl class="layui-nav-child">';
        item.children.forEach(item => {
          liEle += `
                  <dd>
                    <a class="site-demo-active" href="javascript:;" data-name='${item.name}' data-id="${item.href}" data-href="${item.href}">${item.name}</a>
                  </dd>`;
        })
      }
      liEle += '</dl></li>';
      elements += liEle;
    })
    leftBarUl.append(elements);
  }
  //  生成左侧导航
  renderLeftBar();


  //  初始化element模块
  element.init();


  //  leftBar事件相关
  var active = {
    tabAdd: function (url, id, name) {
      element.tabAdd('demo', {
        title: name,
        content: '<iframe class="mainIframe" data-frameid="' + id + '" frameborder="0" src="' + url + '" style="width:100%;"></iframe>',
        id: id
      })
      CustomRightClick(id); //给tab绑定右击事件
      FrameWH(); //  计算iframe 大小
    },
    tabChange: function (id) {
      //切换到指定Tab项
      element.tabChange('demo', id); //根据传入的id传入到指定的tab项
    },
    tabDelete: function (id) {
      element.tabDelete("demo", id); //删除
    },
    tabDeleteAll: function (ids) { //删除所有
      $.each(ids, function (i, item) {
        element.tabDelete("demo", item); //ids是一个数组，里面存放了多个id，调用tabDelete方法分别删除
      })
    }
  }

  //当点击有site-demo-active属性的标签时，即左侧菜单栏中内容 ，触发点击事件
  $('.site-demo-active').on('click', function () {
    var dataid = $(this);
    console.log(dataid[0].getAttribute("data-href"), dataid[0].getAttribute("data-name"))

    //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
    if ($(".layui-tab-title li[lay-id]").length <= 0) {
      //如果比零小，则直接打开新的tab项
      active.tabAdd(dataid[0].getAttribute("data-href"), dataid.attr("data-id"), dataid[0].getAttribute("data-name"));
    } else {
      //否则判断该tab项是否以及存在
      var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
      $.each($(".layui-tab-title li[lay-id]"), function () {
        //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
        if ($(this).attr("lay-id") == dataid.attr("data-id")) {
          isData = true;
        }
      })
      if (isData == false) {
        //标志为false 新增一个tab项
        active.tabAdd(dataid[0].getAttribute("data-href"), dataid.attr("data-id"), dataid[0].getAttribute("data-name"));
      }
    }
    //最后不管是否新增tab，最后都转到要打开的选项页面上
    active.tabChange(dataid.attr("data-id"));
  });

  function CustomRightClick(id) {
    //取消右键  rightmenu属性开始是隐藏的 ，当右击的时候显示，左击的时候隐藏
    $('.layui-tab-title li[class!=index]').on('contextmenu', function () {
      return false;
    })
    $('.layui-tab-title,.layui-tab-title li[class!=index]').click(function () {
      $('.rightmenu').hide();
    });
    //桌面点击右击 
    $('.layui-tab-title li[class!=index]').on('contextmenu', function (e) {
      // console.log('高度', $(this).height(), '左侧', $(this).offset())
      var popupmenu = $(".rightmenu");
      popupmenu.find("li").attr("data-id", id); //在右键菜单中的标签绑定id属性

      //判断右侧菜单的位置 
      // l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
      // t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
      l = $(this).offset().left - 200;
      t = $(this).offset().top - 60 + 40;
      popupmenu.css({
        left: l,
        top: t
      }).show(); //进行绝对定位
      //alert("右键菜单")
      return false;
    });
  }

  $(".rightmenu li").click(function () {
    //右键菜单中的选项被点击之后，判断type的类型，决定关闭所有还是关闭当前。
    if ($(this).attr("data-type") == "closethis") {
      //如果关闭当前，即根据显示右键菜单时所绑定的id，执行tabDelete
      active.tabDelete($(this).attr("data-id"))
    } else if ($(this).attr("data-type") == "closeall") {
      var tabtitle = $(".layui-tab-title li[class!=index]");
      var ids = new Array();
      $.each(tabtitle, function (i) {
        ids[i] = $(this).attr("lay-id");
      })
      //如果关闭所有 ，即将所有的lay-id放进数组，执行tabDeleteAll
      active.tabDeleteAll(ids);
    }

    $('.rightmenu').hide(); //最后再隐藏右键菜单
  })

  function FrameWH() {
    var h = $(window).height() - 41 - 10 - 60 - 10 - 44 - 10;
    $("iframe").css("height", h + "px");
  }

  $(window).resize(function () {
    FrameWH();
  })



});