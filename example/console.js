#!/usr/bin/env node

var logger = require('../index');

var Format = logger.Format,
    ConsoleHandler = logger.ConsoleHandler;

var format = Format.compile('[:date] [:name] [:level] :message');
var handler = new ConsoleHandler(format);
logger.addHandler(handler);

logger.shout('shout');
logger.severe('severe');
logger.warning('warning');
logger.info('info');
logger.config('config');
logger.fine('fine');
logger.finer('finer');
logger.finest('finest');

