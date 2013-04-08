var log = require('./alogger').logger("MyLoggerName");

log.info('Debug level is turn off by default', 'so you will not see next line');
log.debug('log to %s level - %d', 'debug', 4, {debugLevel: 4}, "is logging out put to stdout");
log.info('log to %s level - %d', 'info', 3, {infoLevel: 3}, "is logging out put to stdout");
log.warn('log to %s level - %d', 'warn', 2, {warnLevel: 2}, "is logging out put to stderr");
log.error('log to %s level - %d', 'error', 1, {errorLevel: 1}, "is logging out put to stderr");

require('./alogger').setLogLevel("debug");
log.debug('logging details message for MyLoggerName');
