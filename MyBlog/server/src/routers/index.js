const router = require('koa-router')();

const post_controller=require('../controller/post')

router.post('/getAll', post_controller.getAll)
router.post('/getOne', post_controller.getOne)
router.post('/addPost', post_controller.addPost)
module.exports = router
