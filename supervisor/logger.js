const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'supervisor',
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'error',
      path: '/var/tmp/supervisor-error.log'  // log ERROR and above to a file
    }
  ]
});

export default logger;