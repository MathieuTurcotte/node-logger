/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 *
 * https://github.com/LearnBoost/Socket.IO/blob/master/lib/logger.js
 */

var Level = require('../level');

function SocketIOAdpater(logger) {
    this.logger = logger;
}

SocketIOAdpater.prototype.error = function (message) {
    this.logger.log(Level.SHOUT, message);
};

SocketIOAdpater.prototype.warn = function (message) {
    this.logger.log(Level.WARNING, message);
};

SocketIOAdpater.prototype.info = function (message) {
    this.logger.log(Level.INFO, message);
};

SocketIOAdpater.prototype.debug = function (message) {
    this.logger.log(Level.DEBUG, message);
};

module.exports = SocketIOAdpater;

