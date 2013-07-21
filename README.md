# alogger

A simple console logger.

## Installation

```bash
$ npm install alogger
```


## Usage
There are 5 log levels ("none", "error", "warn", "info", "debug"). By default it is set to "info" level so "debug" log statements will not get logged.

### Creating a logger object

``` js
var log = require('./alogger').logger("testlogger");

log.debug('log to %s level - %d', 'debug', 4, "is logging output to stdout');
log.info('log to %s level - %d', 'info', 3, 'is logging output to stdout');
log.warn('log to %s level - %d', 'warn', 2, 'is logging output to stderr');
log.error('log to %s level - %d', 'error', 1, 'is logging output to stderr');
```

### Setting the log level

``` js
log.level('off');
log.info('You will not see this');
log.level('debug');
log.info('You will see all logs from this logger');
```

See `test.js` and `alogger.js` for more information.
