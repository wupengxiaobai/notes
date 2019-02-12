//  使用Node 非常轻松地构建一个 web 服务器
//  在Node 中专门提供了一个核心模块: http
//  http 这个模块职责就帮我们创建编写服务器

// 1.加载 http 核心模块
const http = require('http');

const server = http.createServer();
const resData = {
  name: 'xiaobai',
  age: 18,
  gender: '男',
  likeGirlType: '感性'
}
server.on('request', function (request, response) {

  if (request.method == 'GET') {

  } else if (request.method == 'POST') {

  }
  console.log(request.method)
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader('Content-Type', 'text/plane;charset=utf-8')
  // response.setHeader
  response.end(JSON.stringify(resData));
})

// 4.绑定端口号启动服务器(监听)
server.listen(3000, function () {
  console.log('服务器启动成功了,可以通过 http://localhost:3000 进行访问');
});