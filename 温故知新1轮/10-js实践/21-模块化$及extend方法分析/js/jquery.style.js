//  样式相关操作
jQuery.fn.extend({
  css(...args) {
    let arg1 = args[0],
      arg2 = args[1];

    if (args.length === 1) {
      if (jQuery.type(arg1) === 'string') {
        let objStyle = window.getComputedStyle(this[0], null)
        return objStyle[arg1]

      } else {
        let _this = this
        jQuery.each(arg1, (index, item) => {
          _this.css(index, item)
        })
        return this

      }
    } else {
      //  给选中的所有元素设置样式
      this.each(function (index, item) {
        this.style[arg1] = arg2
      })
      return this
    }

  },
  show() {
    this.css('display', 'block')
    return this

  },
  hide() {
    this.css('display', 'none')
    return this

  },
  toggle() {
    //  判断每一个元素, 如果隐藏则显示, 显示则隐藏
    this.each(function (index, item) {
      $this = jQuery(this)
      $this[$this.css('display') === 'none' ? 'show' : 'hide']()
    })
    return this

  }
})