var Level = require('./lib/level'),
    Format = require('./lib/format'),
    Logger = require('./lib/logger'),
    Record = require('./lib/record'),
    Container = require('./lib/container');

var FileHandler = require('./lib/handler/file'),
    ConsoleHandler = require('./lib/handler/console');

var MemoryReporter = require('./lib/reporter/memory'),
    ExceptionReporter = require('./lib/reporter/exception');

var ConnectFormat = require('./lib/adapter/format'),
    ConnectAdapter = require('./lib/adapter/connect');

var container = module.exports = new Container('default');

process.on("SIGHUP", function() {
    container.reopenAllHandlers();
});

module.exports.Level = Level;
module.exports.Format = Format;
module.exports.Logger = Logger;
module.exports.Record = Record;
module.exports.Container = Container;

module.exports.FileHandler = FileHandler;
module.exports.ConsoleHandler = ConsoleHandler;

module.exports.MemoryReporter = MemoryReporter;
module.exports.ExceptionReporter = ExceptionReporter;

module.exports.ConnectFormat = ConnectFormat;
module.exports.ConnectAdapter = ConnectAdapter;
