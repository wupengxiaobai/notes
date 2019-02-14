const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'woaiwo',
  database: 'temp' //	数据库名
})

connection.connect((err) => {
  if (err) {
    console.error('数据库连接失败: ' + err.stack);
    return;
  }
  console.log('数据库 temp 连接成功!');
});

module.exports = connection


//  关闭
// connection.end();