const http = require('http');
const path = require('path');
const chalk = require('chalk');
const conf = require('./config/defaultConf');
const route = require('./helper/route');
const openUrl = require('./helper/openUrl')

class Server {
	constructor (config) {
		// 用户命令行中输入的confi与项目原本的conf合并
		this.conf = Object.assign({}, conf, config);
	}

	start () {
		const server = http.createServer((req, res) => {
			// 拼接请求的文件所在的服务器的目录
			const filePath = path.join(this.conf.root, req.url);
			route(req, res, filePath, this.conf);
		})

		server.listen(this.conf.port, this.conf.host, () => {
			const addr = `http://${this.conf.host}:${this.conf.port}`;
            console.info(`Server started at ${chalk.bgCyan(addr)}`)
            openUrl(addr);
		})
	}
}

module.exports = Server;