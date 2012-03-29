/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var fs = require('fs'),
    path = require('path'),
    util = require('util');

var Handler = require('./handler');

function File(formatter, filename) {
    Handler.call(this);

    this.formatter = formatter;

    this.filename = filename || 'log.txt';
    this.basename = path.basename(this.filename);
    this.dirname = path.dirname(this.filename);
    this.options = { flags: 'a' };

    this.stream = null;
    this.error = false;
    this.drained = true;

    this.handlers = {
        error: this.onError.bind(this),
        drain: this.onDrain.bind(this)
    };
}
util.inherits(File, Handler);

File.prototype.publish = function(record) {
    if (this.error) {
        return;
    } else {
        this.open();
        this.write(record);
    }
};

File.prototype.write = function(record) {
    var output = this.formatter(record);
    this.stream.write(output + '\n');
    this.drained = false;
};

File.prototype.open = function() {
    if (this.stream == null) {
        var _path = path.join(this.dirname, this.basename);
        this.stream = fs.createWriteStream(_path, this.options);
        this.stream.on('error', this.handlers.error);
        this.stream.on('drain', this.handlers.drain);
        this.drained = true;
        this.error = false;
    }
};

File.prototype.close = function() {
    if (this.stream) {
        this.stream.end();
        this.stream.destroySoon();
        this.stream = null;
    }
};

File.prototype.reopen = function() {
    this.close();
    this.open();
};

File.prototype.flush = function() {
    if (this.drained) {
        var self = this;
        process.nextTick(function() {
            self.emit('flushed')
        });
    }
};

File.prototype.onDrain = function(err) {
    this.drained = true;
    this.emit('flushed');
};

File.prototype.onError = function(err) {
    this.error = true;
    this.emit('error', err);
};

module.exports = File;
