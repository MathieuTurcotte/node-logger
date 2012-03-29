#!/usr/bin/env node

var dlog = require('../../index'),
    fs = require('fs');

var Format = dlog.Format,
    FileHandler = dlog.FileHandler,
    ExceptionReporter = dlog.ExceptionReporter;

fs.writeFileSync('loop.pid', process.pid);

process.on('exit', function() {
    fs.unlinkSync('loop.pid');
});

process.on('SIGHUP', function() {
    console.log('Got sighup!');
});

process.on('SIGINT', function() {
    console.log('Bye bye!');
    process.exit(0);
});

var logger = dlog.getLogger();
var format = Format.compile('[:date] [:name] [:level] :message');
logger.addHandler(new FileHandler(format, 'test.log'));

setInterval(function() {
    logger.info('Logging!');
}, 1000);

