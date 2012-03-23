#!/usr/bin/env node

var logger = require('../index');

var Format = logger.Format,
    ConsoleHandler = logger.ConsoleHandler,
    ExceptionReporter = logger.ExceptionReporter;

var formatter = Format.compile('[:date] [:name] [:level] :stack');
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
