#!/usr/bin/env node

var dlog = require('../index');

var Format = dlog.Format,
    ConsoleHandler = dlog.ConsoleHandler;

var format = Format.compile('[:date] [:name] [:level] :message');
var handler = new ConsoleHandler(format);
var logger = dlog.getLogger();
logger.addHandler(handler);

logger.fatal('fatal');
logger.error('error');
logger.severe('severe');
logger.warning('warning');
logger.notice('notice');
logger.info('info');
logger.config('config');
logger.debug('debug');

