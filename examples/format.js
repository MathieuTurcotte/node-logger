#!/usr/bin/env node

var dlog = require('../index');

var Format = dlog.Format,
    ConsoleHandler = dlog.ConsoleHandler;

var format = Format.compile('[:date] [:name] [:level] :message');
var handler = new ConsoleHandler(format);
var logger = dlog.getLogger();
logger.addHandler(handler);

logger.info('[%s] Aborted with error code %d.', 'wkjh234fw', 23);

