/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 *
 * http://www.senchalabs.org/connect/logger.html
 */

var tokens = {};

function defineToken(name, fn) {
    tokens[name] = fn;
};

defineToken('url', function(req) {
    return req.originalUrl;
});

defineToken('method', function(req) {
    return req.method;
});

defineToken('response-time', function(req) {
    return new Date - req._startTime;
});

defineToken('date', function() {
    return new Date().toUTCString();
});

defineToken('status', function(req, res) {
    return res.statusCode;
});

defineToken('referrer', function(req) {
    return req.headers['referer'] || req.headers['referrer'];
});

defineToken('remote-addr', function(req) {
    return req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress));
});

defineToken('http-version', function(req) {
    return req.httpVersionMajor + '.' + req.httpVersionMinor;
});

defineToken('user-agent', function(req) {
    return req.headers['user-agent'];
});

defineToken('req', function(req, res, field) {
    return req.headers[field.toLowerCase()];
});

defineToken('res', function(req, res, field) {
    return (res._headers || {})[field.toLowerCase()];
});

module.exports.compile = function(fmt) {
    fmt = fmt.replace(/"/g, '\\"');
    // Tokens start with a ":" and continue with alphanumeric charatcters and
    // hyphens. A token may be followed by an argument between brackets. For
    // example, :res[Content-Length].
    var js = '  return "' + fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function(_, name, arg) {
        return '"\n    + (tokens["' + name + '"](req, res, "' + arg + '") || "-") + "';
    }) + '";'
    return new Function('tokens, req, res', js).bind(global, tokens);
};

