#!/usr/bin/env node

var dlog = require('../index');

var Format = dlog.Format,
    ConsoleHandler = dlog.ConsoleHandler,
    ExceptionReporter = dlog.ExceptionReporter;

var formatter = Format.compile('[:date] [:name] [:level] :stack');
var logger = dlog.getLogger();
logger.addHandler(new ConsoleHandler(formatter));

var reporter = new ExceptionReporter(logger);
reporter.handleExceptions();

function willThrow(number) {
    return function() {
        throw new Error('Boum ' + number + '!');
    }
};

for (var i = 0; i < 10; i++) {
    process.nextTick(willThrow(i));
}
