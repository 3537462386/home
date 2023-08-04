const mongoose = require('mongoose')
// 专门做映射表
const Schema = mongoose.Schema;
// title: 标题
// content: 内容
// comments: 评论列表（由 Comment 对象组成的数组）
// likes: 点赞数
// createdAt: 创建时间
// views: 游览量
const PostSchema = new mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	sketch: { type: String, required: true },
	imgs: { type: String ,required: true  },
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
	likes: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now },
	views: { type: Number, default: 0}
}, {
	collection: 'post',
	versionKey: false
})

module.exports = mongoose.model('post', PostSchema)
