#!/usr/bin/env node

var dlog = require('../index');

var Format = dlog.Format,
    ConsoleHandler = dlog.ConsoleHandler,
    ConnectAdapter = dlog.ConnectAdapter;

var formatter = Format.compile(':date :message');
var handler = new ConsoleHandler(formatter);
var logger = dlog.getLogger();
logger.addHandler(handler);

var adapter = new ConnectAdapter(logger);

var express = require('express');
var app = express.createServer();

app.configure(function() {
    app.use(adapter.middleware());      // Inject the adapter.
    app.use(express.methodOverride());
    app.use(express.bodyParser());
});

app.get('/', function(req, res){
    res.send('hello world');
});

app.listen(3001);
