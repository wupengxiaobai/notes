define([], function () {

  var AsideItem1DataList = [{
    name: '小白',
    age: 19,
    gender: '男'
  }, {
    name: '小白菜',
    age: 18,
    gender: '女'
  }]

  return {
    getListData() {
      return AsideItem1DataList;
    },
    add(data) {
      AsideItem1DataList.push(data)
    },
    update() {},
    delete() {}
  }
})