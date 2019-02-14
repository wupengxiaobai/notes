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
    //  获取参数
    let {
      page,
      pageSize
    } = ctx.query

    //  开始位置
    let startIndex = (page - 1) * pageSize
    //  跳过多少条
    let endIndex = pageSize


    var getData = await new Promise((resolve, reject) => {
      connect.query(`select * from test1 limit ${startIndex},${endIndex}`, (error, results) => {
        if (error) return reject(error)
        return resolve(results)
      })
    }).then(res => {
      return res
    }).catch(err => {
      console.log('数据库操作失败-----', err)
      return ""
    })

    //  总记录数
    var total = await new Promise((resolve, reject) => {
      connect.query(`select count(1) as total from test1`, (error, results) => {
        if (error) return reject('--查询总记录失败--', error)
        return resolve(results)
      })
    }).then(res => {
      return res[0].total
    })

    /* 
      针对 bootstrap-table 如果展示分页数据, 我们必须返回的数据格式应该是如此
      {
        "rows":[具体记录],
        total:总记录数
      }
    */
    getData.forEach(item => {
      item.operation = `<button class="btn btn-xs btn-success" data-id=${item.id}>编辑</button>  <button class="btn btn-xs btn-danger" data-id=${item.id}>删除</button>`
    })
    
    console.log(getData)

    ctx.body = {
      "rows": getData,
      "total": total
    }
  }
};