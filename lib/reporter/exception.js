/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    util = require('util');

var Record = require('../record'),
    Level = require('../level');

/*
 * Logs uncaught exceptions.
 */
function ExceptionReporter(logger, level) {
    this.logger = logger;
    this.level = level || new Level('UNCAUGHT EXCEPTION', Infinity);
    this.exceptionHandler = this.onUncaughtException.bind(this);
}

ExceptionReporter.prototype.handleExceptions = function() {
    process.on('uncaughtException', this.exceptionHandler);
};

ExceptionReporter.prototype.unhandleExceptions = function() {
    process.removeListener('uncaughtException', this.exceptionHandler);
};

ExceptionReporter.prototype.onUncaughtException = function(ex) {
    this.logger.log(this.level, ex.message, ex);
};

module.exports = ExceptionReporter;
