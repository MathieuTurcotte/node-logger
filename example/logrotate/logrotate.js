#!/usr/bin/env node

var logger = require('../../index'),
    fs = require('fs');

var Format = logger.Format,
    FileHandler = logger.FileHandler,
    ExceptionReporter = logger.ExceptionReporter;

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

var format = Format.compile('[:date] [:name] [:level] :message');
logger.addHandler(new FileHandler(format, 'test.log'));

setInterval(function() {
    logger.info('Logging!');
}, 1000);

