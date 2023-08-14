const router = require('koa-router')();

const post_controller=require('../controller/post')
const comment_controller=require('../controller/comment')

router.post('/api/post/getAll', post_controller.getAll)
router.post('/api/post/getOne', post_controller.getOne)
router.post('/api/post/addPost', post_controller.addPost)
router.post('/api/post/addViews', post_controller.addViews)
router.post('/api/post/likePost', post_controller.likePost)

router.post('/api/comment/addComment', comment_controller.addComment)
router.post('/api/comment/getCommentByPost', comment_controller.getCommentByPost)

module.exports = router
