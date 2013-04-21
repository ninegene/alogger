var util = require('util');

const LevelsString = ['off', 'error', 'warn', 'info', 'debug'];
const Levels = {
    OFF: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4
};

var loggers = {};
var levels = {};

function logger(logName) {
    logName = logName || '';
    
    if (!loggers[logName]) {
        levels[logName] = Levels.INFO; // default level
        loggers[logName] = {
            info: info(logName),
            warn: warn(logName),
            error: error(logName),
            debug: debug(logName),
            str: str,
            level: function (level) {
                if (typeof level == 'undefined') {
                    return LevelsString[levels[logName]];
                }
                levels[logName] = translateLogLevel(level);
            }
        };
    }

    return loggers[logName];
}

function isString(obj) {
    return Object.prototype.toString.apply(obj) === '[object String]';
}

function translateLogLevel(level) {
    level = isString(level) ? level.toLowerCase() : level;
    var logLevel;    
    switch (level) {
        case 0:
        case '0':
        case "none":
        case "off":
            logLevel = Levels.OFF;
            break;
        case 1:
        case '1':
        case "error":
            logLevel = Levels.ERROR;
            break;
        case 2:
        case '2':
        case "warn":
            logLevel = Levels.WARN;
            break;
        case 3:
        case '3':
        case "info":
            logLevel = Levels.INFO;
            break;
        case 4:
        case '4':
        case "debug":
        case "all":
            logLevel = Levels.DEBUG;
            break;
        default:
            logLevel = Levels.INFO;
    }
    return logLevel;
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
    objs.push(logLevel + (logName ? ' ' + logName + ':' : ''));
    objs.push(util.format.apply(this, args));
    objs.push('| ' + diff + '\n');
    return objs.join(' ');
}

function str(obj) {
    return typeof obj === 'string' ? obj : util.inspect(obj);
}

function info(name) {
    return function info() {
        if (levels[name] >= Levels.INFO) {
            process.stdout.write(fmt(name, '[i]', arguments));
        }
    };
}

function debug(name) {
    return function debug() {
        if (levels[name] >= Levels.DEBUG) {
            process.stdout.write(fmt(name, '[d]', arguments));
        }
    };
}

function warn(name) {
    return function warn() {
        if (levels[name] >= Levels.WARN) {
            process.stderr.write(fmt(name, '[w]', arguments));
        }
    };
}

function error(name) {
    return function error() {
        if (levels[name] >= Levels.ERROR) {
            process.stderr.write(fmt(name, '[e]', arguments));
        }
    };
}

exports.logger = logger;
exports.loggers = function() { 
    const c = loggers;  
    return c;
};
