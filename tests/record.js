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
    Record = require('../lib/record');

var NOW = 123456;

exports["Record"] = testCase({
    setUp: function(callback) {
        this.clock = sinon.useFakeTimers(NOW);
        callback();
    },

    tearDown: function(callback) {
        this.clock.restore();
        callback();
    },

    "record should store their creation time": function(test) {
        var record = new Record();
        test.equal(record.time, NOW);
        test.done();
    },

    "isLoggable should check if record level isAboveOrEqual threshold": function(test) {
        var level = new Level('INFO', 800);
        var mock = sinon.mock(level)
                        .expects('isAboveOrEqual')
                        .withArgs(Level.WARNING)
                        .returns(true).once();

        var record = new Record(level);
        record.isLoggable(Level.WARNING);

        mock.verify();
        test.done();
    },

    "isLoggable should return the isAboveOrEqual result": function(test) {
        var stub = sinon.stub(Level.INFO, 'isAboveOrEqual')
                        .withArgs(Level.WARNING)
                        .returns(true);

        var record = new Record(Level.INFO);
        var isLoggable = record.isLoggable(Level.WARNING);

        test.ok(isLoggable);
        test.done();
    }
});
