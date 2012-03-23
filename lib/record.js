/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

function Record(level, message, exception, loggerName) {
    this.level = level;
    this.message = message;
    this.time = Date.now();
    this.loggerName = loggerName;
    this.exception = exception;
};

Record.prototype.hasLevelAbove = function(level) {
    return this.level.isAbove(level);
};

module.exports = Record;
