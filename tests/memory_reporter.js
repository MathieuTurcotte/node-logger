/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    utils = require('util');

var testCase = require('nodeunit').testCase,
    assert = require('nodeunit').assert,
    sinon = require('sinon');

var MemoryReporter = require('../lib/reporter/memory'),
    Logger = require('../lib/logger');

var INTERVAL_DURATION = 100;

exports["MemoryReporter"] = testCase({
    setUp: function(callback) {
        this.clock = sinon.useFakeTimers();

        this.logger = new Logger();
        this.loggerMock = sinon.mock(this.logger);

        this.reporter = new MemoryReporter(this.logger, INTERVAL_DURATION);
        this.reporter.startReporting();

        callback();
    },

    tearDown: function(callback) {
        this.reporter.stopReporting();
        this.clock.restore();
        callback();
    },

    "isReporting should return true when reporting is active": function(test) {
        test.ok(this.reporter.isReporting());
        test.done();
    },

    "isReporting should return false when reporting is stopped": function(test) {
        this.reporter.stopReporting();
        test.equal(this.reporter.isReporting(), false);
        test.done();
    },

    "no snapshot should be taken before the interval's end": function(test) {
        var expectation = this.loggerMock.expects('log').never();

        this.clock.tick(INTERVAL_DURATION - 1);

        expectation.verify();
        test.done();
    },

    "one snapshot should be taken when the interval ends": function(test) {
        var expectation = this.loggerMock.expects('log').once();

        this.clock.tick(INTERVAL_DURATION);

        expectation.verify();
        test.done();
    },

    "one snapshot by interval should be taken": function(test) {
        var expectation = this.loggerMock.expects('log').thrice();

        this.clock.tick(INTERVAL_DURATION * 3);

        expectation.verify();
        test.done();
    }
});
