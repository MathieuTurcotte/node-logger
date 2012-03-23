/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
];

function getDateStamp(record) {
    var date = new Date(record.time);
    return [
        date.getDate(),
        months[date.getMonth()],
        date.getFullYear(),
        getTimeStamp(date)
    ].join(' ');
};

function getTimeStamp(date) {
    return [
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds())
    ].join(':');
};

function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
};

var tokens = {};

function defineToken(name, fn) {
    tokens[name] = fn;
};

defineToken('date', function(record, arg) {
    return getDateStamp(record);
});

defineToken('name', function(record, arg) {
    return record.loggerName;
});

defineToken('level', function(record, arg) {
    return record.level.toString();
});

defineToken('message', function(record, arg) {
    return record.message;
});

defineToken('stack', function(record, arg) {
    return record.exception && record.exception.stack;
});

module.exports.compile = function(fmt) {
    fmt = fmt.replace(/"/g, '\\"');
    // Tokens start with a ":" and continue with alphanumeric charatcters and
    // hyphens. A token may be followed by an argument between brackets. For
    // example, :res[Content-Length].
    var js = '  return "' + fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function(_, name, arg) {
        return '"\n    + (tokens["' + name + '"](record, "' + arg + '") || "-") + "';
    }) + '";'
    return new Function('tokens, record', js).bind(global, tokens);
};

