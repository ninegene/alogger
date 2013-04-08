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
var log = require('./alogger').logger("MyLoggerName");

log.debug('log to %s level - %d', 'debug', 4, {debugLevel: 4}, "is logging out put to stdout");
log.info('log to %s level - %d', 'info', 3, {infoLevel: 3}, "is logging out put to stdout");
log.warn('log to %s level - %d', 'warn', 2, {warnLevel: 2}, "is logging out put to stderr");
log.error('log to %s level - %d', 'error', 1 {errorLevel: 1}, "is logging out put to stderr");
```

### Setting the log level

``` js
require('./alogger').setLogLevel("debug");
log.debug('logging details message for MyLoggerName');
```

You can also set the log level by setting the envirnoment vairable "LOG_LEVEL=debug"

See `alogger.js` for more information.

### License (MIT)

Copyright (c) 2013 Aung L Oo <aungloo@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.