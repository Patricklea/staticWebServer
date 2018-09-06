#!/usr/bin/env node
const yargs = require('yargs');
const Server = require('./app');

const argv = yargs
    .usage('anydoor [options]')
    .option('p', {
        alias: 'port',
        describe: '端口号',
        defult: 8888
    })
    .option('h', {
        alias: 'hostname',
        describe: 'host',
        defult: '127.0.0.1'
    })
    .option('d', {
        alias: 'root',
        describe: 'root path',
        defult: process.cwd()
    })
    .version()
    .alias('v', 'versionn')
    .help()
    .argv;


const server = new Server(argv);
server.start();