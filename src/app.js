const http = require('http');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const conf = require('./config/defaultConf');

const server = http.createServer((req,res) => {
    // 拼接请求的文件所在的服务器的目录
    const filePath = path.join(conf.root,req.url);
    /**
     * fs.stat用于检查指定路径的文件状态
     * 第一个参数是路径，第二个是回调
     * 回调的第二个参数status是一个fs.Stats对象
     */
    fs.stat(filePath,(err,stats) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`${filePath} is not a directory or file.`);
            return;
        }

        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filePath).pipe(res);

        } else if (stats.isDirectory()) {
            fs.readdir(filePath,(err,files) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(files.join('---'));
            })
        }
    })

})

server.listen(conf.port,conf.host,()=>{
	const addr = `http://${conf.host}:${conf.port}`;
	console.info(`Server started at ${chalk.bgCyan(addr)}`)
})