const Post_col = require('../model/post')


// 获取所有
const getAll  = async (ctx, next) => {
  try {
    const result = await Post_col.find()
    if (result) {
      ctx.body = {
        code: 1,  
        msg: '查询成功',
        data: result
      }
    }else{
      ctx.body = {
        code: -1,  
        msg: '查询失败',
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

// 得到某一篇
const getOne  = async (ctx, next) => {
  let { _id } = ctx.request.body
  try {
    const result = await Post_col.findOne({_id:_id})
    if (result) {
      ctx.body = {
        code: 1,  
        msg: '查询成功',
        data: result
      }
    }else{
      ctx.body = {
        code: -1,  
        msg: '查询失败',
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

const addPost = async (ctx, next) => {
  let account = ctx.request.body
  let addAccount = {
    title: account.title,
    content: account.content,
    sketch: account.sketch,
    imgs: account.imgs
  }
  try {
    const result = await Post_col.create(addAccount)
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

// 增加游览量

const addViews = async (ctx, next) => {
  let { _id } = ctx.request.body
  try {
    const result = await Post_col.findOneAndUpdate({ _id:_id}, { $inc: { views: 1 } }, { new: true })
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

// 点赞取消贴子
const likePost  = async (ctx, next) => {

  try {
    let {_id , isLiked } = ctx.request.body
    if( isLiked === 'unlike'){
      await Post_col.updateOne({ _id: _id }, { $inc: { likes: -1 }})
    }else{
      await Post_col.updateOne({ _id: _id }, { $inc: { likes: 1 }})
    }
    console.error(ctx.request.body);
  } catch (err) {
    console.error(err);
  }
}



module.exports = {
  getAll,
  addPost,
  getOne,
  addViews,
  likePost
}