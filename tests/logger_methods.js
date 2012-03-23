/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    util = require('util');

var testCase = require('nodeunit').testCase,
    assert = require('nodeunit').assert,
    sinon = require('sinon');

var Level = require('../lib/level'),
    Logger = require('../lib/logger'),
    Record = require('../lib/record'),
    Handler = require('../lib/handler/handler');

assert.hasAttributes = function(obj, attributes, message) {
    for (var name in attributes) {
        if (obj[name] != attributes[name]) {
            assert.fail(obj[name], attributes[name], message, '==');
        }
    }
};

function publishedRecord(handler) {
    return handler.publish.getCall(0).args[0];
};

exports["Logger"] = testCase({
    setUp: function(callback) {
        this.exception = new Error('error message');
        this.handler = sinon.stub(new Handler());
        this.logger = new Logger('foo.bar.biz');
        this.logger.addHandler(this.handler);
        callback();
    },

    "shout method should log at Level.SHOUT": function(test) {
        this.logger.shout('message', this.exception);

        test.hasAttributes(publishedRecord(this.handler), {
            level: Level.SHOUT,
            message: 'message',
            loggerName: 'foo.bar.biz',
            exception: this.exception
        });
        test.done();
    },

    "severe method should log at Level.SEVERE": function(test) {
        this.logger.severe('message', this.exception);

        test.hasAttributes(publishedRecord(this.handler), {
            level: Level.SEVERE,
            message: 'message',
            loggerName: 'foo.bar.biz',
            exception: this.exception
        });
        test.done();
    },

    "warning method should log at Level.WARNING": function(test) {
        this.logger.warning('message', this.exception);

        test.hasAttributes(publishedRecord(this.handler), {
            level: Level.WARNING,
            message: 'message',
            loggerName: 'foo.bar.biz',
            exception: this.exception
        });
        test.done();
    },

    "info method should log at Level.INFO": function(test) {
        this.logger.info('message', this.exception);

        test.hasAttributes(publishedRecord(this.handler), {
            level: Level.INFO,
            message: 'message',
            loggerName: 'foo.bar.biz',
            exception: this.exception
        });
        test.done();
    },

    "config method should log at Level.CONFIG": function(test) {
        this.logger.config('message', this.exception);

        test.hasAttributes(publishedRecord(this.handler), {
            level: Level.CONFIG,
            message: 'message',
            loggerName: 'foo.bar.biz',
            exception: this.exception
        });
        test.done();
    },

    "fine method should log at Level.FINE": function(test) {
        this.logger.fine('message', this.exception);

        test.hasAttributes(publishedRecord(this.handler), {
            level: Level.FINE,
            message: 'message',
            loggerName: 'foo.bar.biz',
            exception: this.exception
        });
        test.done();
    },

    "finer method should log at Level.FINER": function(test) {
        this.logger.finer('message', this.exception);

        test.hasAttributes(publishedRecord(this.handler), {
            level: Level.FINER,
            message: 'message',
            loggerName: 'foo.bar.biz',
            exception: this.exception
        });
        test.done();
    },

    "finest method should log at Level.FINEST": function(test) {
        this.logger.finest('message', this.exception);

        test.hasAttributes(publishedRecord(this.handler), {
            level: Level.FINEST,
            message: 'message',
            loggerName: 'foo.bar.biz',
            exception: this.exception
        });
        test.done();
    }
});
