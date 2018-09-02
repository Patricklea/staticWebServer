const http = require('http');
const path = require('path');
const chalk = require('chalk');
const conf = require('./config/defaultConf');

const server = http.createServer((req,res) => {


	res.statusCode = 200;
	res.setHeader('Content-Type','text/html');
	res.write('<html>');
	res.write('<body>');
	res.write('Hello Htttttp');
	res.write('</body>');
	res.write('</html>');
	res.end();
})

server.listen(conf.port,conf.host,()=>{
	const addr = `http://${conf.host}:${conf.port}`;
	console.info(`Server started at ${chalk.bgCyan(addr)}`)
})