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
    "isAboveOrEqual should perform à <= comparison between level's value": function(test) {
        var level0 = new Level('level0', 0),
            level1 = new Level('level1', 10),
            level2 = new Level('level2', 10),
            level3 = new Level('level3', 20);

        // Levels with same value.
        test.equal(level0.isAboveOrEqual(level0), true);
        test.equal(level1.isAboveOrEqual(level2), true);
        test.equal(level2.isAboveOrEqual(level1), true);

        // Level with smaller value.
        test.equal(level1.isAboveOrEqual(level0), true);

        // Level with smaller value.
        test.equal(level2.isAboveOrEqual(level3), false);

        test.done();
    }
});
