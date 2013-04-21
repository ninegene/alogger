var log = require('./alogger').logger('testlogger');

log.info('Debug level is turn off by default', 'so you will not see next line');

log.debug('log to %s level - %d', 'debug', 4, 'is logging out put to stdout');
log.info('log to %s level - %d', 'info', 3, 'is logging out put to stdout');

log.warn('log to %s level - %d', 'warn', 2, 'is logging out put to stderr');
log.error('log to %s level - %d', 'error', 1, 'is logging out put to stderr');

log.info('before: current level is', log.level());
log.level('off');
log.info('You will not see this');
log.level('debug');
log.info('You will see all logs from this logger');
log.info('after: current level is', log.level());

log.debug('logging details message', {date: new Date()});

var alogger = require('./alogger');
var defaultLog = alogger.logger();
defaultLog.info('presave:', 'some message before saving\nlog:', log.str(log), '\nalogger:', alogger);

console.log(alogger.loggers());

var loggers = alogger.loggers();
for (logName in loggers) {
    var logger = loggers[logName];
    logName == 'test' ? logger.level('off') : logger.level('debug');
    console.info('logName:', logName, 'and level:', logger.level());
}