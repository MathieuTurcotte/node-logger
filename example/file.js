#!/usr/bin/env node

var logger = require('../index');

var Format = logger.Format,
    FileHandler = logger.FileHandler,
    ConsoleHandler = logger.ConsoleHandler,
    ExceptionReporter = logger.ExceptionReporter;

var formatter = Format.compile('[:date] [:name] [:level] :message');
logger.addHandler(new FileHandler(formatter, 'test.log'));
logger.addHandler(new ConsoleHandler(formatter));

logger.shout('shout');
logger.severe('severe');
logger.warning('warning');
logger.info('info');
logger.config('config');
logger.fine('fine');
logger.finer('finer');
logger.finest('finest');

