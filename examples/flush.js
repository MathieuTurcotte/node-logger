#!/usr/bin/env node

var dlog = require('../index');

var Format = dlog.Format,
    FileHandler = dlog.FileHandler,
    ConsoleHandler = dlog.ConsoleHandler,
    ExceptionReporter = dlog.ExceptionReporter;

var formatter = Format.compile('[:date] [:name] [:level] :message');

var loggerA = dlog.getLogger('a');
var loggerB = dlog.getLogger('b');
var loggerC = dlog.getLogger('c');

loggerA.addHandler(new FileHandler(formatter, 'flushA1.log'));
loggerA.addHandler(new FileHandler(formatter, 'flushA2.log'));

loggerB.addHandler(new FileHandler(formatter, 'flushB1.log'));
loggerB.addHandler(new FileHandler(formatter, 'flushB2.log'));

loggerC.addHandler(new FileHandler(formatter, 'flushC1.log'));
loggerC.addHandler(new FileHandler(formatter, 'flushC2.log'));

for (var i = 0; i < 10; i++) {
    loggerA.info('info ' + i);
    loggerB.info('info ' + i);
    loggerC.info('info ' + i);
}

dlog.flushAndExit(1000);

/*
 * Try this to see what happens when process.exit(0)
 * is called without giving enough time to flush all
 * handlers.
 *
 * process.nextTick(function() {
 *     process.exit(1);
 * });
 */

