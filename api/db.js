const MYSQL = require('mysql');
const Promise = require('bluebird');
import config from './config';

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

export function getSqlConnection() {
  return pool.getConnectionAsync().disposer(function (connection) {
      console.log("Releasing connection back to pool")
      connection.release();
  });
}

export function querySql (query, params) {
  return Promise.using(getSqlConnection(), function (connection) {
      console.log("Got connection from pool");
      if (typeof params !== 'undefined'){
          return connection.queryAsync(query, params);
      } else {
          return connection.queryAsync(query);
      }
  });
};
