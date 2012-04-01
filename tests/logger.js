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

exports["Logger"] = testCase({
    setUp: function(callback) {
        // Some handlers. Shared between the single
        // logger and the logger hierarchy.
        this.handler0 = new Handler();
        this.handler1 = new Handler();
        this.handler2 = new Handler();

        this.handler0Mock = sinon.mock(this.handler0);
        this.handler1Mock = sinon.mock(this.handler1);
        this.handler2Mock = sinon.mock(this.handler2);

        // A logger with no parent/children.
        this.logger = new Logger('single');
        this.logger.addHandler(this.handler0);
        this.logger.addHandler(this.handler1);
        this.logger.addHandler(this.handler2);

        // A logger hierarchy.
        this.child0 = new Logger('root');
        this.child0.addHandler(this.handler0);
        this.child1 = new Logger('child 1');
        this.child1.setParent(this.child0);
        this.child1.addHandler(this.handler1);
        this.child2 = new Logger('child 2');
        this.child2.setParent(this.child1);
        this.child2.addHandler(this.handler2);

        callback();
    },

    "message should bubble up to the root logger": function(test) {
        this.handler0Mock.expects('publish').once();
        this.handler1Mock.expects('publish').once();
        this.handler2Mock.expects('publish').once();

        this.child2.log(Level.ERROR, 'message');

        this.handler0Mock.verify();
        this.handler1Mock.verify();
        this.handler2Mock.verify();
        test.done();
    },

    "bubbling should stop at the level of the first logger with higher log level": function(test) {
        this.handler0Mock.expects('publish').never();
        this.handler1Mock.expects('publish').never();
        this.handler2Mock.expects('publish').once();

        this.child1.setLevel(Level.WARNING);
        this.child2.log(Level.INFO, 'message');

        this.handler0Mock.verify();
        this.handler1Mock.verify();
        this.handler2Mock.verify();
        test.done();
    },

    "log record should be published on all handler": function(test) {
        this.handler0Mock.expects('publish').once();
        this.handler1Mock.expects('publish').once();
        this.handler2Mock.expects('publish').once();

        this.logger.log(Level.INFO, 'message');

        this.handler0Mock.verify();
        this.handler1Mock.verify();
        this.handler2Mock.verify();
        test.done();
    },

    "reopenHandlers should call reopen on all handlers": function(test) {
        this.handler0Mock.expects('reopen').once();
        this.handler1Mock.expects('reopen').once();
        this.handler2Mock.expects('reopen').once();

        this.logger.reopenHandlers();

        this.handler0Mock.verify();
        this.handler1Mock.verify();
        this.handler2Mock.verify();
        test.done();
    },

    "flush should call flush on all handlers": function(test) {
        this.handler0Mock.expects('flush').once();
        this.handler1Mock.expects('flush').once();
        this.handler2Mock.expects('flush').once();

        this.logger.flush();

        this.handler0Mock.verify();
        this.handler1Mock.verify();
        this.handler2Mock.verify();
        test.done();
    },

    "logger should listen for error events on handlers": function(test) {
        var handler = new Handler(),
            logger = new Logger('logger');

        var mock = sinon.mock(handler);
        mock.expects('on').withArgs('error');

        logger.addHandler(handler);

        mock.verify();
        test.done();
    },

    "errors should be emitted on the root logger": function(test) {
        var mock = sinon.mock(this.child0);
        mock.expects('emit').once().withArgs('error');

        var handler = new events.EventEmitter();
        this.child2.addHandler(handler);

        handler.emit('error');

        mock.verify();
        test.done();
    }
});
