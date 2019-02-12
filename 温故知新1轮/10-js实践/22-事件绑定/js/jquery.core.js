(function (window) {

  function jQuery(selector) {
    return new jQuery.fn.init(selector)
  }

  jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init: function (selector) {
      if (jQuery.type(selector) === "string") {
        //  如果是jQuery选择器
        var elements = document.querySelectorAll(selector)
        elements.forEach((item, index) => {
          this[index] = item
        })
        this.length = elements.length

      } else if (selector.nodeType) {
        //  如果是dom元素 --转换为--> jQuery元素
        this[0] = selector
        this['length'] = 1

      }
    }
  }

  jQuery.fn.init.prototype = jQuery.fn

  jQuery.fn.extend = jQuery.extend = function (...args) {
    //  初始化接收数据对象和提供数据对象
    let target, sources = []

    if (args.length === 1) { //  参数个数为1
      target = this
      sources.push(args[0])

    } else { //  参数个数为多个
      target = args[0]
      sources.push(...args).splice(0, 1)

    }

    //  完成拷贝逻辑: 
    sources.forEach(item => {
      //  获取对象中每个属性遍历拷贝给target
      Object.keys(item).forEach(key => {
        target[key] = item[key]
      })
    })

    return target
  }

  window.$ = window.jQuery = jQuery
})(window)