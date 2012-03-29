/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    utils = require('util');

var testCase = require('nodeunit').testCase,
    assert = require('nodeunit').assert,
    sinon = require('sinon');

var Container = require('../lib/container'),
    Logger = require('../lib/logger');

exports["Container"] = testCase({
    setUp: function(callback) {
        this.container = new Container();

        this.logger0 = this.container.getLogger();
        this.logger1 = new Logger('a');
        this.logger2 = new Logger('a.b');
        this.logger3 = new Logger('a.b.c');

        this.mock1 = sinon.mock(this.logger1);
        this.mock2 = sinon.mock(this.logger2);
        this.mock3 = sinon.mock(this.logger3);

        callback();
    },

    "container should re-emit errors on the root logger": function(test) {
        test.expect(1);
        var expectedError = new Error();

        this.container.on('error', function(err) {
            test.equal(err, expectedError);
            test.done();
        });

        this.logger0.emit('error', expectedError);
    },

    "getLogger should create the logger hierarchy as needed": function(test) {
        this.container.Logger = sinon.stub();
        this.container.Logger.withArgs('a').returns(this.logger1);
        this.container.Logger.withArgs('a.b').returns(this.logger2);
        this.container.Logger.withArgs('a.b.c').returns(this.logger3);
        this.container.Logger.throws(new Error("Unexpected call to Logger."));

        this.mock1.expects('setParent').once().withArgs(this.logger0);
        this.mock2.expects('setParent').once().withArgs(this.logger1);
        this.mock3.expects('setParent').once().withArgs(this.logger2);

        var logger = this.container.getLogger('a.b.c');

        this.mock1.verify();
        this.mock2.verify();
        this.mock3.verify();
        test.done();
    },

    "reopenAllHandlers should call reopenHandlers on every logger": function(test) {
        this.container.loggers['a'] = this.logger1;
        this.container.loggers['a.b'] = this.logger2;
        this.container.loggers['a.b.c'] = this.logger3;

        this.mock1.expects('reopenHandlers').once();
        this.mock2.expects('reopenHandlers').once();
        this.mock3.expects('reopenHandlers').once();

        this.container.reopenAllHandlers();

        this.mock1.verify();
        this.mock2.verify();
        this.mock3.verify();
        test.done();
    },

    "flush should call flush on all loggers": function(test) {
        this.container.loggers['a'] = this.logger1;
        this.container.loggers['a.b'] = this.logger2;
        this.container.loggers['a.b.c'] = this.logger3;

        this.mock1.expects('flush').once();
        this.mock2.expects('flush').once();
        this.mock3.expects('flush').once();

        this.container.flush(-1);

        this.mock1.verify();
        this.mock2.verify();
        this.mock3.verify();
        test.done();
    },

    "flush should wait for all logger": function(test) {
        var logger0 = new events.EventEmitter();
        logger0.flush = function() {};
        var logger1 = new events.EventEmitter();
        logger1.flush = function() {};
        var logger2 = new events.EventEmitter();
        logger2.flush = function() {};
        var logger3 = new events.EventEmitter();
        logger3.flush = function() {};

        this.container.loggers[''] = logger0;
        this.container.loggers['a'] = logger1;
        this.container.loggers['a.b'] = logger2;
        this.container.loggers['a.b.c'] = logger3;

        var hasFlushed = false;

        this.container.on('flushed', function() {
            hasFlushed = true;
        });

        this.container.flush(-1);

        logger0.emit('flushed');
        test.ok(!hasFlushed);

        logger1.emit('flushed');
        test.ok(!hasFlushed);

        logger2.emit('flushed');
        test.ok(!hasFlushed);

        logger3.emit('flushed');
        test.ok(hasFlushed);

        test.done();
    }
});
