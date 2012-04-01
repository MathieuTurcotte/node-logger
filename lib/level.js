/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

Level = function(name, value) {
    this.name = name;
    this.value = value;
};

Level.prototype.isAboveOrEqual = function(other) {
    return this.value >= other.value;
};

Level.prototype.toString = function() {
    return this.name;
};

Level.OFF = new Level('OFF', Infinity);
Level.FATAL = new Level('FATAL', 1400);
Level.ERROR = new Level('ERROR', 1300);
Level.SEVERE = new Level('SEVERE', 1200);
Level.WARNING = new Level('WARNING', 1000);
Level.NOTICE = new Level('NOTICE', 900);
Level.INFO = new Level('INFO', 800);
Level.CONFIG = new Level('CONFIG', 700);
Level.DEBUG = new Level('DEBUG', 600);
Level.ALL = new Level('ALL', 0);

module.exports = Level;
