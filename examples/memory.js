#!/usr/bin/env node

var logger = require('../index');

var Format = logger.Format,
    ConsoleHandler = logger.ConsoleHandler,
    MemoryReporter = logger.MemoryReporter;

var SNAPSHOT_INTERVAL = 1 * 1000;

var formatter = Format.compile('[:date] [:name] [:level] :message');
logger.addHandler(new ConsoleHandler(formatter));

var reporter = new MemoryReporter(logger, SNAPSHOT_INTERVAL);
reporter.startReporting();

