/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    util = require('util');

var Record = require('./record'),
    Level = require('./level');

function Logger(name) {
    events.EventEmitter.call(this);

    this.name = name;
    this.parent = null;
    this.children = {};
    this.handlers = [];
    this.level = Level.ALL;
}
util.inherits(Logger, events.EventEmitter);

Logger.prototype.shout = function(message, exception) {
    this.log(Level.SHOUT, message, exception);
};

Logger.prototype.severe = function(message, exception) {
    this.log(Level.SEVERE, message, exception);
};

Logger.prototype.warning = function(message, exception) {
    this.log(Level.WARNING, message, exception);
};

Logger.prototype.info = function(message, exception) {
    this.log(Level.INFO, message, exception);
};

Logger.prototype.config = function(message, exception) {
    this.log(Level.CONFIG, message, exception);
};

Logger.prototype.fine = function(message, exception) {
    this.log(Level.FINE, message, exception);
};

Logger.prototype.finer = function(message, exception) {
    this.log(Level.FINER, message, exception);
};

Logger.prototype.finest = function(message, exception) {
    this.log(Level.FINEST, message, exception);
};

Logger.prototype.log = function(level, message, exception) {
    this.logRecord(new Record(level, message, exception, this.name));
};

Logger.prototype.logRecord = function(record) {
    var logger = this;
    while (logger && logger.isLoggable(record)) {
        logger.publish(record);
        logger = logger.parent;
    }
};

Logger.prototype.publish = function(record) {
    this.handlers.forEach(function(handler) {
        handler.publish(record);
    });
};

Logger.prototype.isLoggable = function(record) {
    return record.hasLevelAbove(this.level);
};

Logger.prototype.setLevel = function(level) {
    this.level = level;
};

Logger.prototype.setParent = function(parent) {
    this.parent = parent;
};

Logger.prototype.addChild = function(name, logger) {
    this.children[name] = logger;
};

Logger.prototype.addHandler = function(handler) {
    this.handlers.push(handler);
    handler.on('error', this.onHandlerError.bind(this));
};

Logger.prototype.reopenHandlers = function() {
    this.handlers.forEach(function(handler) {
        handler.reopen();
    });
};

Logger.prototype.onHandlerError = function(err) {
    var logger = this;
    while (logger.parent) {
        logger = logger.parent;
    }
    logger.emit('error', err);  // Emit the error on the root logger.
};

module.exports = Logger;
