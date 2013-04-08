var util = require('util');

var Levels = {
    DEBUG: 4,
    INFO: 3,
    WARN: 2,
    ERROR: 1,
    NONE: 0
};

var curLogLevel = Levels.INFO;

var cache = {};

function logger(logName) {
    cache[logName] = cache[logName] || {
        info: info(logName),
        warn: warn(logName),
        error: error(logName),
        debug: debug(logName),
        str: str
    };

    return cache[logName];
}

function isString(obj) {
    return Object.prototype.toString.apply(obj) === '[object String]';
}

function setLogLevel(level) {
    level = isString(level) ? level.toLowerCase() : level;

    switch (level) {
        case 0:
        case "none":
            curLogLevel = Levels.NONE;
            break;
        case 1:
        case "error":
            curLogLevel = Levels.ERROR;
            break;
        case 2:
        case "warn":
            curLogLevel = Levels.WARN;
            break;
        case 3:
        case "info":
            curLogLevel = Levels.INFO;
            break;
        case 4:
        case "debug":
        case "all":
            curLogLevel = Levels.DEBUG;
            break;
        default:
            curLogLevel = Levels.INFO;
    }
}

var prevDates = {};
var SEC = 1000;
var MIN = 60 * 1000;
var HOUR = 60 * MIN;

function fmt(logName, logLevel, args) {
    var date = new Date();
    var ms = date - (prevDates[logName] || date);
    prevDates[logName] = date;

    var diff; // time different between last log entry and current entry for 'logName'

    if (ms >= HOUR) {
        diff = (ms / HOUR).toFixed(1) + 'h';
    }
    else if (ms >= MIN) {
        diff = (ms / MIN).toFixed(1) + 'm';
    }
    else if (ms >= SEC) {
        diff = (ms / SEC | 0) + 's';
    }
    else {
        diff = ms + 'ms';
    }

    var objs = [];
    var ds = date.toString();
    objs.push(ds.substr(8,2) /*+ ds.substr(0,3) */+ ' ' + ds.substr(16,8));
//    objs.push(date.toLocaleTimeString());
    objs.push(logName + ' [' + logLevel + ']');
    objs.push(util.format.apply(this, args));
    objs.push('| ' + diff + '\n');
    return objs.join(' ');
}

function str(obj) {
    return typeof obj === 'string' ? obj : util.inspect(obj);
}

function info(name) {
    return function info() {
        if (curLogLevel >= Levels.INFO) {
            process.stdout.write(fmt(name, 'i', arguments));
        }
    };
}

function debug(name) {
    return function debug() {
        if (curLogLevel >= Levels.DEBUG) {
            process.stdout.write(fmt(name, 'd', arguments));
        }
    };
}

function warn(name) {
    return function warn() {
        if (curLogLevel >= Levels.WARN) {
            process.stderr.write(fmt(name, 'w', arguments));
        }
    };
}

function error(name) {
    return function error() {
        if (curLogLevel >= Levels.ERROR) {
            process.stderr.write(fmt(name, 'e', arguments));
        }
    };
}

setLogLevel(process.env.LOG_LEVEL);

exports.setLogLevel = setLogLevel;
exports.logger = logger;
