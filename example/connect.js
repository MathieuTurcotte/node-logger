#!/usr/bin/env node

var logger = require('../index');

var Format = logger.Format,
    ConsoleHandler = logger.ConsoleHandler,
    ConnectAdapter = logger.ConnectAdapter;

var formatter = Format.compile(':date :message');
var handler = new ConsoleHandler(formatter);
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
