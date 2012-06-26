/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

function Record(level, message, loggerName) {
    this.level = level;
    this.message = message;
    this.time = Date.now();
    this.loggerName = loggerName;
}

Record.prototype.isLoggable = function(level) {
    return this.level.isAboveOrEqual(level);
};

module.exports = Record;
