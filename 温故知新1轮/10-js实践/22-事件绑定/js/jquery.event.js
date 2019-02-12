(function () {
  //  保存曾经保存过的所有事件处理函数
  let events = [
    //  { ele: div1, type: 'click', callback:function(){} }
    //  { ele: div1, type: 'mousedown', callback:function(){} }
  ];

  jQuery.fn.extend({

    //  事件绑定: $('div').on('click',function(){})
    on(type, callback) {
      //  给jQuery对象中的每一个DOM元素绑定事件
      this.each(function (index, element) {

        element.addEventListener(type, callback)
        events.push({
          ele: element,
          type,
          callback
        })
      })

      return this
    },
    //  事件解绑: $('div').off('click')
    off(type) {

      this.each(function (index, element) {

        //  需要得到之前绑定事件的回调函数地址
        //  解决方案: 必须在当初绑定事件的时候, 将事件回调函数内存地址保存
        // element.removeEventListener(type, func???)

        //  找到该函数曾经绑定过的type类型的事件
        let evts = events.filter((evtObj) => {
          return (evtObj.ele === element && evtObj.type === type)
        })

        // console.log(evts)

        evts.forEach(evt => {
          element.removeEventListener(type, evt.callback)
          
        })
      })

      return this
    }
  })

})()