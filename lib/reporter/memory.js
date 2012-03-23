/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    util = require('util');

var Level = require('../level');

/*
 * Logs memory usage at a specific interval.
 */
function MemoryReporter(logger, options) {
    this.intervalID = -1;
    this.logger = logger;
    this.level = options.level || Level.INFO;
    this.snapshotDelay = options.snapshotDelay || 15000;
}

MemoryReporter.prototype.isReporting = function() {
    return this.intervalID != -1;
};

MemoryReporter.prototype.startReporting = function() {
    if (!this.isReporting()) {
        var takeSnapshot = this.takeSnapshot.bind(this);
        this.intervalID = setInterval(takeSnapshot, this.snapshotDelay);
        process.nextTick(takeSnapshot);
    }
};

MemoryReporter.prototype.stopReporting = function() {
    this.clearInterval(this.intervalID);
    this.intervalID = -1;
};

MemoryReporter.prototype.takeSnapshot = function(ex) {
    var memory = process.memoryUsage();
    var message = this.makeMessage(memory);
    this.logger.log(this.level, message);
};

MemoryReporter.prototype.makeMessage = function(memory) {
    return [
        'rss:' + memory.rss,
        'heapTotal:' + memory.heapTotal,
        'heapUsed:' + memory.heapUsed
    ].join(' ');
};

module.exports = MemoryReporter;
