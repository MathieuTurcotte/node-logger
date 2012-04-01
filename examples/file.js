#!/usr/bin/env node

var dlog = require('../index');

var Format = dlog.Format,
    FileHandler = dlog.FileHandler,
    ConsoleHandler = dlog.ConsoleHandler,
    ExceptionReporter = dlog.ExceptionReporter;

var formatter = Format.compile('[:date] [:name] [:level] :message');
var logger = dlog.getLogger();

logger.addHandler(new FileHandler(formatter, 'test.log'));

logger.fatal('fatal');
logger.error('error');
logger.severe('severe');
logger.warning('warning');
logger.notice('notice');
logger.info('info');
logger.config('config');
logger.debug('debug');

