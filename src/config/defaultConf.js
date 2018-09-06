module.exports = {
	// 执行项目启动时所在的路径
	root: process.cwd(),
	host: '127.0.0.1',
	port: 8888,
	compress: /\.(html|js|css|md)/,
	cache:{
		maxAge: 600,
		expires: true,
		cacheControl: true,
		lastModified: true,
		etag: true,
	}
}