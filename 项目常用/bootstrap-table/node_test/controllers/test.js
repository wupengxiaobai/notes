const connect = require('../models/dbconnect')
const sqlJson2Str = require('../utils/sqlJson2str')
module.exports = {
  //  保存数据
  saveData: async (ctx) => {
    //  获取POST数据,保存数据库
    let data = sqlJson2Str(ctx.request.body)

    var saveData = await new Promise((resolve, reject) => {
      connect.query(`insert into test1 set ${data}`, (error, results) => {
        if (error) return reject(error)
        return resolve(results)
      })
    }).then(res => {
      return {
        errCode: 0,
        msg: '保存数据成功'
      }
    }).catch(err => {
      console.log('数据库操作失败-----', err)
      return {
        errCode: 1,
        msg: '数据库操作失败'
      }
    })

    ctx.body = saveData;
  },
  //  获取数据
  getData: async (ctx) => {

  }
};