/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var util = require('util');

var Logger = require('./logger');

/*
 * Root logger.
 */
function Container(name) {
    Logger.call(this, name || 'default');

    this.loggers = {};
    this.loggers[''] = this;

    // Silence error by default.
    this.on('error', function() {});
}
util.inherits(Container, Logger);

// Used in unit tests.
Container.prototype.Logger = Logger;

Container.prototype.getLogger = function(name) {
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

module.exports = Container;
