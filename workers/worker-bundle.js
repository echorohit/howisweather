'use strict';

require('bluebird');

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

const config = {
  'mysql' : {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'howisweather'
  }
};

const MYSQL = require('mysql');
const Promise$1 = require('bluebird');

Promise$1.promisifyAll(MYSQL);
Promise$1.promisifyAll(require("mysql/lib/Connection").prototype);
Promise$1.promisifyAll(require("mysql/lib/Pool").prototype);

var pool = MYSQL.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});

var open = require('amqplib').connect('amqp://localhost');

/* Consumer
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(ok) {
    return ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  });
}).catch(console.warn);
*/

function readQueue(queue) {
  var q = queue || 'tasks';

  var open = require('amqplib').connect('amqp://localhost');
    // Consumer
  open.then(function(conn) {
    return conn.createChannel();
  }).then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {
      return ch.consume(q, function(msg) {
        if (msg !== null) {
          console.log(msg.content.toString());
          ch.ack(msg);
        }
      });
    });
  }).catch(console.warn);
}

// retrieveWeather().then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log(err);
// });


readQueue('IN');
