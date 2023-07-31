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

// 增加 

const addPost = async (ctx, next) => {
  let account = ctx.request.body
  console.log(account)
  let addAccount = {
    title: account.title,
    content: account.content,
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


// // 点赞取消贴子
// const likePost  = async (ctx, next) => {
//   let account = ctx.request.body

//   try {
//     const isLiked = await User_col.exists({ _id: account.userId, likes: account.postId })
//     if(isLiked){
//       await Post_col.updateOne({ _id: account.postId }, { $inc: { likes: -1 }})
//       await User_col.updateOne({ _id: account.userId }, { $pull: { likes: account.postId }})
//     }else{
//       await Post_col.updateOne({ _id: account.postId }, { $inc: { likes: 1 }})
//       await User_col.updateOne({ _id: account.userId }, { $push: { likes: account.postId }})
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }



module.exports = {
  getAll,
  addPost
  // likePost
}