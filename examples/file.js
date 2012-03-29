#!/usr/bin/env node

var dlog = require('../index');

var Format = dlog.Format,
    FileHandler = dlog.FileHandler,
    ConsoleHandler = dlog.ConsoleHandler,
    ExceptionReporter = dlog.ExceptionReporter;

var formatter = Format.compile('[:date] [:name] [:level] :message');
var logger = dlog.getLogger();

logger.addHandler(new FileHandler(formatter, 'test.log'));

logger.shout('shout');
logger.severe('severe');
logger.warning('warning');
logger.info('info');
logger.config('config');
logger.fine('fine');
logger.finer('finer');
logger.finest('finest');

