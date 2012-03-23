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
function MemoryReporter(logger, interval) {
    this.logger = logger;

    this.intervalID = -1;
    this.intervalDelay = interval || 15000;
}

MemoryReporter.prototype.isReporting = function() {
    return this.intervalID != -1;
};

MemoryReporter.prototype.startReporting = function() {
    if (!this.isReporting()) {
        var takeSnapshot = this.takeSnapshot.bind(this);
        this.intervalID = setInterval(takeSnapshot, this.intervalDelay);
    }
};

MemoryReporter.prototype.stopReporting = function() {
    clearInterval(this.intervalID);
    this.intervalID = -1;
};

MemoryReporter.prototype.takeSnapshot = function(ex) {
    var memory = process.memoryUsage();
    var message = this.makeMessage(memory);
    this.logger.log(Level.INFO, message);
};

MemoryReporter.prototype.makeMessage = function(memory) {
    return [
        'rss:' + memory.rss,
        'heapTotal:' + memory.heapTotal,
        'heapUsed:' + memory.heapUsed
    ].join(' ');
};

module.exports = MemoryReporter;
