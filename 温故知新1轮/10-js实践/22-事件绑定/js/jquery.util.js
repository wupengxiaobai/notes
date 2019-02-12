jQuery.extend({
  //  遍历数组和对象
  each(obj, cb) {
    if ((length in obj) && obj.length >= 0) {
      for (let i = 0; i < obj.length; i++) {
        cb.call(obj[i], i, obj[i])
      }

    } else {
      for (let i in obj) {
        cb.call(obj[i], i, obj[i])
      }

    }
  },
  // 判断类型
  type(data) {
    var type = Object.prototype.toString.call(data)
    return type.replace(/\[object\s|\]/g, "").toLowerCase()

  }
})


jQuery.fn.extend({
  each(cb) {
    jQuery.each(this, cb)

  }
})