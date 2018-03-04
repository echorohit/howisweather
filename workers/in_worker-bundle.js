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
const Promise = require('bluebird');

Promise.promisifyAll(MYSQL);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

var pool = MYSQL.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});

function getSqlConnection() {
  return pool.getConnectionAsync().disposer(function (connection) {
      console.log("Releasing connection back to pool");
      connection.release();
  });
}

function querySql (query, params) {
  return Promise.using(getSqlConnection(), function (connection) {
      console.log("Got connection from pool");
      if (typeof params !== 'undefined'){
          return connection.queryAsync(query, params);
      } else {
          return connection.queryAsync(query);
      }
  });
}

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

async function readQueue(queue, saveCB) {
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
          saveCB(JSON.parse(msg.content.toString())).then((saveData) => {
            if(saveData) {
              ch.ack(msg);
            }
          });
        }
      });
    });
  }).catch(console.warn);
}

function saveWeather(data) {
  //var userQuery = "select id, email from users where token = ?";

  let insertQuery = `INSERT INTO weather  
                    (country, city, temp_c, temp_f, humidity) 
                    values('INDIA', '${data.display_location.city.toUpperCase()}', ${data.temp_c}, ${data.temp_f}, ${parseInt(data.relative_humidity)}) 
                    ON DUPLICATE KEY UPDATE 
                    temp_c=${data.temp_c},
                    temp_f=${data.temp_f},
                    humidity=${parseInt(data.relative_humidity)}
                    `;
  return querySql(insertQuery)
     .then(function(rows){
        return rows;
     });
}

async function main() {
  await readQueue('IN', saveWeather);
} 


if(require.main === module) {
  main().then((result) => {
    console.log('worker result');
  });
}
