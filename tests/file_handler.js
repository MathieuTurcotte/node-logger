/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    util = require('util'),
    path = require('path'),
    fs = require('fs');

var testCase = require('nodeunit').testCase,
    assert = require('nodeunit').assert,
    sinon = require('sinon');

var Record = require('../lib/record'),
    FileHandler = require('../lib/handler/file');

function rmdirSync(p) {
    try {
        var stat = fs.lstatSync(p);
    } catch (err) {
        if (err.code === "ENOENT") {
            return;
        } else {
            throw err;
        }
    }

    if (!stat.isDirectory()) {
        fs.unlinkSync(p);
    } else {
        fs.readdirSync(p).forEach(function (f) {
            rmdirSync(path.join(p, f))
        });

        fs.rmdirSync(p);
    }
}

var LOG_FOLDER = path.join(__dirname, 'log');

exports["FileHandler"] = testCase({
    setUp: function(callback) {
        rmdirSync(LOG_FOLDER);
        fs.mkdirSync(LOG_FOLDER);

        this.record1 = new Record(Level.INFO, 'message1', undefined, 'logger');
        this.record2 = new Record(Level.INFO, 'message2', undefined, 'logger');

        this.formatter = sinon.stub();
        this.formatter.withArgs(this.record1).returns(this.record1.message);
        this.formatter.withArgs(this.record2).returns(this.record2.message);

        this.handler = new FileHandler(this.formatter, path.join(LOG_FOLDER, 'test.log'));

        callback();
    },

    tearDown: function(callback) {
        rmdirSync(LOG_FOLDER);
        callback();
    },

    "log record should have been written to disk when flushed event is emitted": function(test) {
        test.expect(1);

        this.handler.on('flushed', function() {
            var content = fs.readFileSync(path.join(LOG_FOLDER, 'test.log'));
            test.equal(content, this.record1.message + '\n');
            test.done();
        }.bind(this));

        this.handler.publish(this.record1);
    },

    "calling reopen should reopen the file (logrotate use case)": function(test) {
        test.expect(2);

        this.handler.once('flushed', function() {
            this.handler.once('flushed', function() {
                var content1 = fs.readFileSync(path.join(LOG_FOLDER, 'test.log.1'));
                var content2 = fs.readFileSync(path.join(LOG_FOLDER, 'test.log'));
                test.equal(content1, this.record1.message + '\n');
                test.equal(content2, this.record2.message + '\n');
                test.done();
            }.bind(this));

            fs.renameSync(path.join(LOG_FOLDER, 'test.log'),
                          path.join(LOG_FOLDER, 'test.log.1'));

            this.handler.reopen();
            this.handler.publish(this.record2);
        }.bind(this));

        this.handler.publish(this.record1);
    },

    "the handler should emit an error if the file can't be opened/created": function(test) {
        test.expect(1);

        var handler = new FileHandler(this.formatter, path.join(__dirname, 'foo/test.log'));

        handler.on('error', function() {
            test.ok(true);
            test.done();
        });

        handler.open();
    },

    "explicitly calling flush should trigger a flushed event": function(test) {
        test.expect(1);

        this.handler.on('flushed', function() {
            test.ok(true);
            test.done();
        }.bind(this));

        this.handler.flush();
    }
});
