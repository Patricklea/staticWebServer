const http = require('http');
const path = require('path');
const chalk = require('chalk');
const conf = require('./config/defaultConf');
const route = require('./helper/route');

const server = http.createServer((req,res) => {
	// 拼接请求的文件所在的服务器的目录
	const filePath = path.join(conf.root,req.url);
	route(req, res, filePath);
})

server.listen(conf.port,conf.host,()=>{
	const addr = `http://${conf.host}:${conf.port}`;
	console.info(`Server started at ${chalk.bgCyan(addr)}`)
})