/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var sinon = require('sinon');

var Level = require('../lib/level'),
    Logger = require('../lib/logger'),
    Record = require('../lib/record'),
    Handler = require('../lib/handler/handler');

function publishedRecord(handler) {
    return handler.publish.getCall(0).args[0];
};

var LOGGER_NAME = 'foo.bar.biz',
    DATE_NOW = 1234567;

exports["Logger"] = {
    setUp: function(callback) {
        this.clock = sinon.useFakeTimers(DATE_NOW);
        this.handler = sinon.stub(new Handler());
        this.logger = new Logger(LOGGER_NAME);
        this.logger.addHandler(this.handler);
        callback();
    },

    tearDown: function(callback) {
        this.clock.restore();
        callback();
    },

    "fatal method should log at Level.FATAL": function(test) {
        this.logger.fatal('message');

        var record = publishedRecord(this.handler);
        test.deepEqual(record.level, Level.FATAL);
        test.done();
    },

    "error method should log at Level.ERROR": function(test) {
        this.logger.error('message');

        var record = publishedRecord(this.handler);
        test.deepEqual(record.level, Level.ERROR);
        test.done();
    },

    "severe method should log at Level.SEVERE": function(test) {
        this.logger.severe('message');

        var record = publishedRecord(this.handler);
        test.deepEqual(record.level, Level.SEVERE);
        test.done();
    },

    "warning method should log at Level.WARNING": function(test) {
        this.logger.warning('message');

        var record = publishedRecord(this.handler);
        test.deepEqual(record.level, Level.WARNING);
        test.done();
    },

    "notice method should log at Level.NOTICE": function(test) {
        this.logger.notice('message');

        var record = publishedRecord(this.handler);
        test.deepEqual(record.level, Level.NOTICE);
        test.done();
    },

    "info method should log at Level.INFO": function(test) {
        this.logger.info('message');

        var record = publishedRecord(this.handler);
        test.deepEqual(record.level, Level.INFO);
        test.done();
    },

    "config method should log at Level.CONFIG": function(test) {
        this.logger.config('message');

        var record = publishedRecord(this.handler);
        test.deepEqual(record.level, Level.CONFIG);
        test.done();
    },

    "debug method should log at Level.DEBUG": function(test) {
        this.logger.debug('message');

        var record = publishedRecord(this.handler);
        test.deepEqual(record.level, Level.DEBUG);
        test.done();
    },

    "fatal method should log a formatted message": function(test) {
        this.logger.fatal('message %d %s', 1, 'abc');

        var record = publishedRecord(this.handler);
        test.equals(record.message, 'message 1 abc');
        test.done();
    },

    "error method should log a formatted message": function(test) {
        this.logger.error('message %d %s', 1, 'abc');

        var record = publishedRecord(this.handler);
        test.equals(record.message, 'message 1 abc');
        test.done();
    },

    "severe method should log a formatted message": function(test) {
        this.logger.severe('message %d %s', 1, 'abc');

        var record = publishedRecord(this.handler);
        test.equals(record.message, 'message 1 abc');
        test.done();
    },

    "warning method should log a formatted message": function(test) {
        this.logger.warning('message %d %s', 1, 'abc');

        var record = publishedRecord(this.handler);
        test.equals(record.message, 'message 1 abc');
        test.done();
    },

    "notice method should log a formatted message": function(test) {
        this.logger.notice('message %d %s', 1, 'abc');

        var record = publishedRecord(this.handler);
        test.equals(record.message, 'message 1 abc');
        test.done();
    },

    "info method should log a formatted message": function(test) {
        this.logger.info('message %d %s', 1, 'abc');

        var record = publishedRecord(this.handler);
        test.equals(record.message, 'message 1 abc');
        test.done();
    },

    "config method should log a formatted message": function(test) {
        this.logger.config('message %d %s', 1, 'abc');

        var record = publishedRecord(this.handler);
        test.equals(record.message, 'message 1 abc');
        test.done();
    },

    "debug method should log a formatted message": function(test) {
        this.logger.debug('message %d %s', 1, 'abc');

        var record = publishedRecord(this.handler);
        test.equals(record.message, 'message 1 abc');
        test.done();
    },

    "logged records should contain the logger name": function(test) {
        this.logger.log(Level.INFO, 'message');

        var record = publishedRecord(this.handler);
        test.equals(record.loggerName, LOGGER_NAME);
        test.done();
    },

    "logged records should contain the current time": function(test) {
        this.logger.log(Level.INFO, 'message');

        var record = publishedRecord(this.handler);
        test.equals(record.time, DATE_NOW);
        test.done();
    }
};
