(function () {

  var log = require('../alogger').createLogger();

  log.info('my logger name is empty string');

  // arguments are converted to string using util.format()
  // the following produces same output
  log.info('accepts multiple arguments');
  log.info('accepts', 'multiple', 'arguments');
  log.info('%s %s %s', 'accepts', 'multiple', 'arguments');

  // the following produces same output
  log.info('obj is {"id":123}');
  log.info('obj is', JSON.stringify({id: 123}));
  log.info('obj is %j', {id: 123});

  // the following produces same output
  log.info('number is 0.1');
  log.info('number is', Number(0.1));
  log.info('number is %d', 0.1);

}());

(function () {

  var log = require('../alogger').createLogger('module1', {
    dateFormat: '%H:%M:%S'
  });

  log.info('my logger name is module1 and my level is', log.getLevel());
  log.debug('my logger name is module1');
  log.warn('my logger name is module1');
  log.error('my logger name is module1');

}());

(function () {

  var log = require('../alogger').createLogger('module2', {
    infoLevelName: '',
    debugLevelName: '',
    warnLevelName: 'WARN',
    errorLevelName: 'ERROR'
  });

  log.setLevel('debug');

  log.info('my logger name is module2 and my level is %s', log.getLevel());
  log.debug('my logger name is module2');
  log.warn('my logger name is module2');
  log.error('my logger name is module2');

}());

(function () {

  var log = require('../alogger').createLogger('module3', {
    infoLevelName: '[info]',
    debugLevelName: '[debug]',
    warnLevelName: '[warn]',
    errorLevelName: '[error]',
    dateFormat: '%Y-%m-%d %H:%M:%S %Z',
    timeDiff: true
  });

  log.info('my logger name is module3 and my level is', log.getLevel());

  setTimeout(function () {
    log.info('wait 200 ms and log this');
  }, 200)

}());
