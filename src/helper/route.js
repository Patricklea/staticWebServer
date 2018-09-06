const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const HandleBars = require('handlebars');
const conf = require('../config/defaultConf');
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache');

const tplPath = path.join(__dirname,'../template/dir.tpl');
const source = fs.readFileSync(tplPath);
/**
 * fs读取出的文件类型是Buffer，所以要用toString()转换为buffer
 */
const template = HandleBars.compile(source.toString());

/**
 * 用promisify改造之后，一定要放到一个 async 方法内执行；
 * 改造后的方法前面一定要用 await 接收，否则只会拿到一个Promise对象；
 */
module.exports = async function (req, res, filePath) {
	try {
		const stats = await stat(filePath);
		if (stats.isFile()) {
			const contentType = mime(filePath);
			res.setHeader('Content-Type', `${contentType};charset=utf-8`);
			if(isFresh(stats, req, res)){
				res.statusCode = 304;
				res.end();
				return;
			}

			let rs;
			const {code,start,end} = range(stats.size, req, res);
            
			if (code == 200) {
				res.statusCode = 200;
				rs = fs.createReadStream(filePath);
			} else {
				res.statusCode = 206;//代表返回部分数据
				rs = fs.createReadStream(filePath,{start, end})
			}
			// 匹配指定类型的文件进行压缩
			if (filePath.match(conf.compress)){
				rs = compress(rs,req,res)
			}
			rs.pipe(res);

		} else if (stats.isDirectory()) {
			const files = await readdir(filePath);
			res.statusCode = 200;
			res.setHeader('Content-Type', `text/html;charset=utf-8`);
			// 注意这对路径的处理
			const dir = path.relative(conf.root, filePath);
			const data = {
				title: path.basename(filePath),
				dir: dir ? `/${dir}` : '',
				files: files.map(file => {
					return {
						file,
						icon: mime(file)
					}
				}),
			}
			res.end(template(data)); 
		}        
	} catch (ex) {
		console.error(`ex:`,ex);
		res.statusCode = 404;
		res.setHeader('Content-Type', `text/plain; charset=utf-8`);
		res.end(`${filePath} is not a directory or file.`);
	}
}

