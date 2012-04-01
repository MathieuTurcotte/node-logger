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

    "fatal method should log at Level.FATAL": function(test) {
        this.logger.fatal('message', this.exception);

        test.hasAttributes(publishedRecord(this.handler), {
            level: Level.FATAL,
            message: 'message',
            loggerName: 'foo.bar.biz',
            exception: this.exception
        });
        test.done();
    },

    "error method should log at Level.ERROR": function(test) {
        this.logger.error('message', this.exception);

        test.hasAttributes(publishedRecord(this.handler), {
            level: Level.ERROR,
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

    "notice method should log at Level.NOTICE": function(test) {
        this.logger.notice('message', this.exception);

        test.hasAttributes(publishedRecord(this.handler), {
            level: Level.NOTICE,
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

    "debug method should log at Level.DEBUG": function(test) {
        this.logger.debug('message', this.exception);

        test.hasAttributes(publishedRecord(this.handler), {
            level: Level.DEBUG,
            message: 'message',
            loggerName: 'foo.bar.biz',
            exception: this.exception
        });
        test.done();
    }
});
