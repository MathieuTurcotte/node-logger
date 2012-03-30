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
Level.SHOUT = new Level('SHOUT', 1200);
Level.SEVERE = new Level('SEVERE', 1000);
Level.WARNING = new Level('WARNING', 900);
Level.INFO = new Level('INFO', 800);
Level.CONFIG = new Level('CONFIG', 700);
Level.FINE = new Level('FINE', 500);
Level.FINER = new Level('FINER', 400);
Level.FINEST = new Level('FINEST', 300);
Level.ALL = new Level('ALL', 0);

module.exports = Level;
