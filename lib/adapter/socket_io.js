/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 *
 * https://github.com/LearnBoost/Socket.IO/blob/master/lib/logger.js
 */

var Level = require('../level');

function SocketIOAdapter(logger) {
    this.logger = logger;
}

SocketIOAdapter.prototype.error = function (message) {
    this.logger.log(Level.ERROR, message);
};

SocketIOAdapter.prototype.warn = function (message) {
    this.logger.log(Level.WARNING, message);
};

SocketIOAdapter.prototype.info = function (message) {
    this.logger.log(Level.INFO, message);
};

SocketIOAdapter.prototype.debug = function (message) {
    this.logger.log(Level.DEBUG, message);
};

module.exports = SocketIOAdapter;

