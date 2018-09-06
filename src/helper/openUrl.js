const { exec } = require('child_process');

module.exports = url => {
    // 不同系统执行命令不一样
    switch (process.platform) {
        case 'darwin':
            exec(`open ${url}`)
            break;
        case 'win32':
            exec(`start ${url}`)
            break;
    }
}