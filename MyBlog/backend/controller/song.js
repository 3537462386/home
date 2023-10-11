const Song_col = require('../model/song')

// 得到某一篇
const getSong  = async (ctx, next) => {
    let { name } = ctx.request.body
    try {
      const result = await Song_col.find()
      if (result) {
        ctx.body = {
          code: 1,  
          msg: '查询成功',
          data: result
        }
      }else{
        ctx.body = {
          code: -1,  
          msg: '没有数据',
          data: result
        }
      }
    } catch (err) {
      ctx.body = {
        code: -1,  
        msg: '查询失败',
        data: err
      }
    }
}

// 增加 

const addSong = async (ctx, next) => {
    let account = ctx.request.body
    let addAccount = {
      name: account.name,
      lrc: account.lrc,
      url: account.url
    }
    try {
      const result = await Song_col.create(addAccount)
      if (result) {
        ctx.body = {
          code: 1,  
          msg: '成功',
          data: result
        }
      }else{
        ctx.body = {
          code: -1,  
          msg: '失败',
          data: result
        }
      }
    }catch (err) {
      ctx.body = {
        code: -1,  
        msg: '查询失败',
        data: err
      }
    }
  }
  
module.exports = {
    getSong,
    addSong
  }