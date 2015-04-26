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

function createLogger(logName, opts) {
  logName = logName || '';
  opts = typeof opts != 'object' ? {} : opts;
  opts.infoLevelName = typeof opts.infoLevelName == 'undefined' ? '[i]' : opts.infoLevelName;
  opts.debugLevelName = typeof opts.debugLevelName == 'undefined' ? '[d]' : opts.debugLevelName;
  opts.warnLevelName = typeof opts.warnLevelName == 'undefined' ? '[w]' : opts.warnLevelName;
  opts.errorLevelName = typeof opts.errorLevelName == 'undefined' ? '[e]' : opts.errorLevelName;
  opts.dateFormat = typeof opts.dateFormat == 'undefined' ? '%Y-%m-%d %H:%M:%S' : opts.dateFormat;
  opts.timeDiff = !!opts.timeDiff;

  if (!loggers[logName]) {
    levels[logName] = Levels.INFO; // default level
    loggers[logName] = {
      info: info(logName, opts),
      warn: warn(logName, opts),
      error: error(logName, opts),
      debug: debug(logName, opts),
      setLevel: function (level) {
        levels[logName] = translateLogLevel(level);
      },
      getLevel: function () {
        return LevelsString[levels[logName]];
      }
    };
  }

  return loggers[logName];
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

// write to stdout

function info(name, opts) {
  return function info() {
    if (levels[name] >= Levels.INFO) {
      opts.levelName = opts.infoLevelName;
      process.stdout.write(fmt(name, opts, arguments));
    }
  };
}

function debug(name, opts) {
  return function debug() {
    if (levels[name] >= Levels.DEBUG) {
      opts.levelName = opts.debugLevelName;
      process.stdout.write(fmt(name, opts, arguments));
    }
  };
}

// write to stderr

function warn(name, opts) {
  return function warn() {
    if (levels[name] >= Levels.WARN) {
      opts.levelName = opts.warnLevelName;
      process.stderr.write(fmt(name, opts, arguments));
    }
  };
}

function error(name, opts) {
  return function error() {
    if (levels[name] >= Levels.ERROR) {
      opts.levelName = opts.errorLevelName;
      process.stderr.write(fmt(name, opts, arguments));
    }
  };
}

var prevDates = {};
var SEC = 1000;
var MIN = 60 * 1000;
var HOUR = 60 * MIN;

function fmt(logName, opts, args) {
  var date = new Date();

  var objs = [];
  if (opts.dateFormat) {
    objs.push(fmtDate(date, opts.dateFormat) + ' ');
  }
  if (logName) {
    objs.push(logName + ' ');
  }
  if (opts.levelName) {
    objs.push(opts.levelName + ' ');
  }
  objs.push(util.format.apply(this, args));
  if (opts.timeDiff) {
    objs.push(' | ' + diffTime(logName, date));
  }
  objs.push('\n');
  return objs.join('');
}

function diffTime(logName, date) {
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
    diff = ms + ' ms';
  }
  return diff;
}

//function str(obj) {
//  return typeof obj === 'string' ? obj : util.inspect(obj);
//}

function fmtDate(date, format) {
  date = typeof date == 'undefined' ? new Date() : date;
  format = typeof format == 'undefined' ? '%Y-%m-%d %H:%M:%S %Z' : format;

  return format.replace(/%[YmdHMSZ]/g, function (v) {
    if (v == '%Y') return date.getFullYear();
    if (v == '%m') return appendZeroIfNecessary(date.getMonth());
    if (v == '%d') return appendZeroIfNecessary(date.getDate());
    if (v == '%H') return appendZeroIfNecessary(date.getHours());
    if (v == '%M') return appendZeroIfNecessary(date.getMinutes());
    if (v == '%S') return appendZeroIfNecessary(date.getSeconds());
    if (v == '%Z') return fmtTimezoneOffset(date.getTimezoneOffset());
    return v;
  })
}

function fmtTimezoneOffset(offset) {
  return (offset < 0 ? '+' : '-')
    + appendZeroIfNecessary(parseInt(Math.abs(offset / 60), 10))
    + ':'
    + appendZeroIfNecessary(Math.abs(offset % 60))
}

function appendZeroIfNecessary(s) {
  return ('0' + s).substr(-2);
}

function isString(obj) {
  return Object.prototype.toString.apply(obj) === '[object String]';
}

exports.createLogger = createLogger;
