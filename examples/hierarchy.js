#!/usr/bin/env node

var util = require('util'),
    dlog = require('../index');

var Level = dlog.Level,
    Format = dlog.Format,
    FileHandler = dlog.ConsoleHandler,
    ConsoleHandler = dlog.ConsoleHandler,
    ExceptionReporter = dlog.ExceptionReporter;

var formatter = Format.compile('[:date] [:name] [:level] :message');
var handler = new ConsoleHandler(formatter);

var root = dlog.getLogger();
root.addHandler(handler);

var child1 = dlog.getLogger('duplika.core.Player');
var child2 = dlog.getLogger('duplika.core.Game');
child2.setLevel(Level.WARNING);

child1.shout('shout');
child1.severe('severe');
child1.warning('warning');
child1.info('info');
child1.config('config');
child1.fine('fine');
child1.finer('finer');
child1.finest('finest');

child2.shout('shout');
child2.severe('severe');
child2.warning('warning');
child2.info('info');
child2.config('config');
child2.fine('fine');
child2.finer('finer');
child2.finest('finest');

