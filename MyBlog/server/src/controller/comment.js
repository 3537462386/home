const Comment_col = require('../model/comment')
const Post_col = require('../model/post')

// 获取所有
const getCommentByPost = async (ctx, next) => {
  let { _id } = ctx.request.body
  try {
    const result = await Comment_col.find({ postId:_id})
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

// 增加评论
const addComment = async (ctx, next) => {
  let account = ctx.request.body
  const addAccount = {
    name:account.name,
    postId: account.postId,
    content: account.content,
    email:account.email,
  }
  const result = await Comment_col.create(addAccount)
  const result2 = await Post_col.updateOne(
    { _id: account.postId },
    { $push: { comments: result.content } }
  )
  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: result2
  }
}



module.exports = {
  addComment,
  getCommentByPost
}