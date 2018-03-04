const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'workers',
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'error',
      path: '/var/tmp/workers-error.log'  // log ERROR and above to a file
    }
  ]
});


export default logger;