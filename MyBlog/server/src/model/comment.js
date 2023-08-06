const mongoose = require('mongoose')
// 专门做映射表
const Schema = mongoose.Schema;
const CommentSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
    content: { type: String, required: true },
    email:{ type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    collection: 'comment',
    versionKey: false
})

module.exports = mongoose.model('comment', CommentSchema)
