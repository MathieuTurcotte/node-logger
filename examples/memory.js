#!/usr/bin/env node

var dlog = require('../index');

var Format = dlog.Format,
    ConsoleHandler = dlog.ConsoleHandler,
    MemoryReporter = dlog.MemoryReporter;

var SNAPSHOT_INTERVAL = 1 * 1000;

var formatter = Format.compile('[:date] [:name] [:level] :message');
var logger = dlog.getLogger();
logger.addHandler(new ConsoleHandler(formatter));

var reporter = new MemoryReporter(logger, SNAPSHOT_INTERVAL);
reporter.startReporting();

