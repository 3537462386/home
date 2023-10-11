// 配置文件
module.exports = {
	// koa运行的端口
	port:3000,
	// db: 'mongodb://127.0.0.1:27017/Blog',
	//   mongodb://blog:lw20020710@124.71.113.71:27017/blog?authSource=blog
	db: 'mongodb://127.0.0.1:27017/Blog',
	// 加密的次数
	saltTimes: 10
}
