define(['Route', 'asideItem1/index', 'asideItem1/add'], function (Route, asideItem1, asideItem1Add) {
  var router = new Route({
    routes: [{
      path: '/asideItem1',
      component: asideItem1
    }, {
      path: '/asideItem1/add',
      component: asideItem1Add
    }]
  })

  return router
})