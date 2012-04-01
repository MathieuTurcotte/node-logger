/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    utils = require('util');

var testCase = require('nodeunit').testCase,
    assert = require('nodeunit').assert,
    sinon = require('sinon');

var SocketIOAdapter = require('../lib/adapter/socket_io'),
    Logger = require('../lib/logger');

var LEVELS = {
    error: Level.ERROR,
    warn: Level.WARNING,
    info: Level.INFO,
    debug: Level.DEBUG
};

var MESSAGES = {
    error: 'error',
    warn: 'warn',
    info: 'info',
    debug: 'debug'
};

function doTest(test, adapter, expectation, name) {
    adapter[name](MESSAGES[name]);
    var level = expectation.getCall(0).args[0];
    var message = expectation.getCall(0).args[1];
    test.equal(message, MESSAGES[name]);
    test.equal(level, LEVELS[name]);
    test.ok(message);
    test.ok(level);
    test.done();
}

exports["SocketIOAdapter"] = testCase({
    setUp: function(callback) {
        this.logger = new Logger();
        this.loggerMock = sinon.mock(this.logger);
        this.expectation = this.loggerMock.expects('log').once();

        this.adapter = new SocketIOAdapter(this.logger);

        callback();
    },

    "Adapter.error should log at Level.ERROR": function(test) {
        doTest(test, this.adapter, this.expectation, 'error');
    },

    "Adapter.warn should log at Level.WARNING": function(test) {
        doTest(test, this.adapter, this.expectation, 'warn');
    },

    "Adapter.info should log at Level.INFO": function(test) {
        doTest(test, this.adapter, this.expectation, 'info');
    },

    "Adapter.debug should log at Level.DEBUG": function(test) {
        doTest(test, this.adapter, this.expectation, 'debug');
    },
});
