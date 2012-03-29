/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    ewait = require('ewait'),
    util = require('util');

var Logger = require('./logger');

/*
 * Root logger.
 */
function Container() {
    events.EventEmitter.call(this);

    this.loggers = {};

    // Create the root logger.
    this.loggers[''] = new this.Logger('default');
    this.loggers[''].on('error', this.handleError.bind(this));
}
util.inherits(Container, events.EventEmitter);

// Used in unit tests.
Container.prototype.Logger = Logger;

Container.prototype.getLogger = function(name) {
    var name = name || '';
    var logger = this.loggers[name];
    return logger || this.createLogger(name);
};

Container.prototype.createLogger = function(name) {
    var lastDotIndex = name.lastIndexOf('.');
    var parentName = name.substr(0, lastDotIndex);
    var childName = name.substr(lastDotIndex + 1);

    var child = new this.Logger(name);
    var parent = this.getLogger(parentName);

    parent.addChild(childName, child);
    child.setParent(parent);

    this.loggers[name] = child;
    return child;
};

Container.prototype.reopenAllHandlers = function() {
    for (var name in this.loggers) {
        this.loggers[name].reopenHandlers();
    }
};

Container.prototype.flush = function(timeout) {
    var loggers = [];
    for (var name in this.loggers) {
        loggers.push(this.loggers[name]);
    }

    var all = new ewait.WaitForAll({
        timeout: timeout || 5000,
        event: 'flushed'
    });
    all.add(loggers);
    all.once('done', this.handleFlushDone.bind(this));
    all.once('timeout', this.handleFlushTimeout.bind(this));
    all.wait();

    loggers.forEach(function(logger) {
        logger.flush();
    });
};

Container.prototype.handleFlushDone = function() {
    this.emit('flushed');
};

Container.prototype.handleFlushTimeout = function() {
    this.emit('timeout');
};

Container.prototype.handleError = function(err) {
    this.emit('error', err);
};

module.exports = Container;
