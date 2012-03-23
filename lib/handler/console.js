/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    util = require('util');

var Handler = require('./handler');

function Console(formatter) {
    Handler.call(this);

    this.formatter = formatter;
}
util.inherits(Console, Handler);

Console.prototype.publish = function(record) {
    util.puts(this.formatter(record));
    this.emit('logged');
};

module.exports = Console;