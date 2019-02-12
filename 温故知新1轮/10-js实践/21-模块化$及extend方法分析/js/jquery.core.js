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

  /* jQuery.fn.extend = jQuery.extend = function (...args) {
    let target, source = [...args]
    if (args.length === 1) {
      target = this
    } else {
      target = source[0]
      source.splice(0, 1)
    }
    Object.assign(target, ...source)
    return target
  } */

  //  $.extend
  //  1. 如果是一个参数, 就是将参数对象中的属性一次拷贝给 jQuery 
  //    $.extend({name:'acb',age:18})
  //    ---> $.name = abc
  //    ---> $.age = 18
  //  2. 如果有多个参数, 将第二个参数之后的所有参数中的属性依次遍历拷贝给第一个参数
  //    ---> var p = {}
  //    ---> $.extend(p, {a:10}, {b:12}, {c:13, d:520})
  //    ---> p = {a:10, b:12, c:13, d:520}

  //  $.fn.extend
  //  1. 如果有一个参数, 把参数对象中的属性一次拷贝给 $.fn
  //    $.fn.extend({ css: function(){}, on: function(){} })
  //    ---> $.fn.css = function(){}
  //    ---> $.fn.on = function() {}
  //  2. 如果有多个参数. 功能等价于 $.extend 的第二个功能
  //    ---> $.fn.extend(p, {a:10, b:20}, {c:520})
  //    ---> p { a:10, b:20, c:520 }


  //  共同点
  //  1. $.fn.extend 和 $.extend 多参数功能是完全一样的
  //  2. $.fn.extend 和 $.extend 一个参数的功能其实都是讲参数里的属性一次遍历给 this
  //  3. 两个功能最终的目的都是为了进行对象的拷贝
  //    ---> 共同点: 
  //          1.都是为了拷贝
  //          2.拷贝只要确定
  //              a.提供数据对象
  //              b.接收数据对象
  //                  第一个大功能提供数据对象: 第二个参数及其后面所有参数; 接收数据对象, 第一个参数
  //                  第二个大功能提供数据对象: 第一个参数; 接收数据对象: this 

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