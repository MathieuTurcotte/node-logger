/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 *
 * http://www.senchalabs.org/connect/logger.html
 */

var events = require('events'),
    util = require('util');

var Level = require('../level'),
    Format = require('./format');

function ConnectAdapter(logger, fmt) {
    this.logger = logger;
    this.formatter = Format.compile(fmt || [
        ':remote-addr - - ":method :url HTTP/:http-version"',
        ':status :res[content-length]',
        '":referrer" ":user-agent"'
    ].join(' '));
}

ConnectAdapter.prototype.middleware = function() {
    return this.middleware_.bind(this);
};

ConnectAdapter.prototype.middleware_ = function(req, res, next) {
    if (req._logging) {
        return next();
    } else {
        req._logging = true;
        req._startTime = new Date;
    }

    var end = res.end;
    res.end = function(chunk, encoding) {
        res.end = end;
        res.end(chunk, encoding);
        var line = this.formatter(req, res);
        this.logger.log(Level.INFO, line);
    }.bind(this);

    next();
};

module.exports = ConnectAdapter;

