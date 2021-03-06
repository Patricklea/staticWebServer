**.gitignore规则**
1. 匹配模式前加"/"代表项目根目录
2. 匹配模式后加"/"代表是一个目录，针对文件和目录会有重名的情况
3. 匹配模式前加"!"代表取反，不忽略。针对被忽略某个目录，而不想忽略其内的某个文件或目录
4. "*"代表任意字符。例如*.html、/foo/*等
5. "?"表示一个字符。
6. "**"代表多及目录/任意级目录。例如node_module/**/index.js

**console的多种用法**

**ESlint的文档及在vue中的应用**


**pre-commit**
这个依赖包可以在执行`git commit`之前运行指定命令，例如在pacakage.json中配置好后，可以在commit之前运行eslint的修复与检查，如果没有符合规范则不能提交代码:
```javascript
//package.json
{
    "scripts": {
        "lint": "eslint .",
        "fix": "eslint --fix ."
    },
    "pre-commit":[
        "fix",
        "lint"
    ]
}
```

但有的文件并不用符合eslint的代码规范，就可以在`.eslintignore`中将其忽略掉，不执行eslint的检查。

**项目中使用eslint流程**
1. 全局安装eslint：`npm i eslint --save-dev`
2. 配置eslint规则，支持多种方式，推荐采用`.eslintrc.js`格式的配置文件，也可以通过`eslint --init`来初始化生成一个配置文件。
3. 在配置文件中进行个性化配置
4. 配置好之后，通过`eslint <filename>`来对指定文件执行检查，`eslint --fix <filename>`可以根据配置文件自动修复部分报错。
5. 也可以在`package.json`文件中配置`scripts`字段来执行检查命令，例如：`npm run lint`执行`eslint .`检查所有文件。
6. 如果代码不符合规范则不让提交，可以通过`pre-commit`来做限制。

**supervisor模块**
可自动重启node的http服务
1. 全局安装`npm i supervisor -g`
2. 使用`supervisor`命令代替`node`命令启动项目入口文件

**process.cwd()**
返回执行node启动命令时所在的路径,也就是`node <filename>`执行时的路径。

**fs.stat()的用法**

**fs.readdir()的用法**

**process.pwd()与__dirname的区别**

**path.join()的用法**
**path.basename()的用法**
**path.ralative()的用法**

**通过path模块获取文件拓展名**

**range范围请求**
http的范围请求可通过`curl http://127.0.0.1:8888/note.md -i -r 0-1000`来测试。
其中`-i`展示请求头，`-r 0-1000`表示范围请求及范围。

**命令行中的可执行脚本**
1. 新建test.js文件：
    ```
    #!/usr/bin/env node
    console.log('hello world');    
    ```
其中`#!/usr/bin/env node`是Unix和Linux脚本文件的第一行，目的就是指出，你想要你的这个文件中的代码用什么可执行程序去运行它，也就是指定解释器。
2. 修改test.js的权限，否则会提示找不到这个commond
   ```
   chmod 755 test.js
   ```
3. 现在，就可以在命令行中执行test.js了,在命令行中输入命令：
    ```
    ./test.js
    ```
参考： 
[Node.js 命令行程序开发教程-阮一峰](http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)
[基于node构建命令行工具](http://www.skylerzhang.com/node/2015/01/08/commandline/)

