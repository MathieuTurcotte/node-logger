/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    utils = require('util');

var testCase = require('nodeunit').testCase,
    assert = require('nodeunit').assert,
    sinon = require('sinon');

var Level = require('../lib/level');

exports["Level"] = testCase({
    "levels with identical value should not eval above each other": function(test) {
        var level0 = new Level('level0', 10),
            level1 = new Level('level1', 10);

        test.ok(level0.isAbove(level1) == false);
        test.ok(level1.isAbove(level0) == false);
        test.done();
    },

    "level with smaller value should eval under level with greater value": function(test) {
        var small = new Level('small', 10),
            big = new Level('big', 20);

        test.ok(small.isAbove(big) == false);
        test.done();
    },

    "level with greater value should eval above level with smaller value": function(test) {
        var small = new Level('small', 10),
            big = new Level('big', 20);

        test.ok(big.isAbove(small));
        test.done();
    }
});
