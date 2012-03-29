/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var util = require('util'),
    events = require('events');

function Handler() {
    events.EventEmitter.call(this);
}
util.inherits(Handler, events.EventEmitter);

Handler.prototype.publish = function(record) {};

Handler.prototype.open = function() {};

Handler.prototype.reopen = function() {};

Handler.prototype.close = function() {};

Handler.prototype.flush = function() {};

module.exports = Handler;
