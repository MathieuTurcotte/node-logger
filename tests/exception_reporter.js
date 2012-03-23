/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    utils = require('util');

var testCase = require('nodeunit').testCase,
    assert = require('nodeunit').assert,
    sinon = require('sinon');

var ExceptionReporter = require('../lib/reporter/exception'),
    Logger = require('../lib/logger');

exports["ExceptionReporter"] = testCase({
    setUp: function(callback) {
        this.logger = new Logger();
        this.loggerMock = sinon.mock(this.logger);

        this.reporter = new ExceptionReporter(this.logger);
        this.reporter.handleExceptions();

        callback();
    },

    tearDown: function(callback) {
        this.reporter.unhandleExceptions();

        callback();
    },

    "uncaughtException should be logged": function(test) {
        this.loggerMock.expects('log').once();

        process.emit('uncaughtException', new Error('boum'));

        this.loggerMock.verify();
        test.done();
    },

    "log record should contain the uncaught exception": function(test) {
        var expectation = this.loggerMock.expects('log').once();

        var exception = new Error('boum!');
        process.emit('uncaughtException', exception);

        var level = expectation.getCall(0).args[0];
        var message = expectation.getCall(0).args[1];
        var loggedException = expectation.getCall(0).args[2];

        test.equal(message, exception.message);
        test.equal(level, this.reporter.level);
        test.equal(loggedException, exception);
        test.done();
    }
});
