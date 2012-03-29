#!/usr/bin/env node

var dlog = require('../index');

var Format = dlog.Format,
    ConsoleHandler = dlog.ConsoleHandler;

var format = Format.compile('[:date] [:name] [:level] :message');
var handler = new ConsoleHandler(format);
var logger = dlog.getLogger();
logger.addHandler(handler);

logger.shout('shout');
logger.severe('severe');
logger.warning('warning');
logger.info('info');
logger.config('config');
logger.fine('fine');
logger.finer('finer');
logger.finest('finest');

