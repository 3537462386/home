const router = require('koa-router')();

const post_controller=require('../controller/post')
const comment_controller=require('../controller/comment')
const song_controller=require('../controller/song')

router.post('/api/post/getAll', post_controller.getAll)
router.post('/api/post/getOne', post_controller.getOne)
router.post('/api/post/addPost', post_controller.addPost)
router.post('/api/post/addViews', post_controller.addViews)
router.post('/api/post/likePost', post_controller.likePost)

router.post('/api/comment/addComment', comment_controller.addComment)
router.post('/api/comment/getCommentByPost', comment_controller.getCommentByPost)

router.post('/api/song/addSong', song_controller.addSong)
router.post('/api/song/getSong', song_controller.getSong)

module.exports = router
