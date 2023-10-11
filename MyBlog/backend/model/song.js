const mongoose = require('mongoose')
// 专门做映射表
const Schema = mongoose.Schema;
const SongSchema = new mongoose.Schema({
    lrc:{ type: String, required: true },
    name:{ type: String, required: true },
    url:{ type: String, required: true }
}, {
    collection: 'song',
    versionKey: false
})

module.exports = mongoose.model('song', SongSchema)
