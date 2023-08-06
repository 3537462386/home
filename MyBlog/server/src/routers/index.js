const router = require('koa-router')();

const post_controller=require('../controller/post')
const comment_controller=require('../controller/comment')

router.post('/getAll', post_controller.getAll)
router.post('/getOne', post_controller.getOne)
router.post('/addPost', post_controller.addPost)
router.post('/addViews', post_controller.addViews)
router.post('/likePost', post_controller.likePost)
router.post('/addComment', comment_controller.addComment)

module.exports = router
