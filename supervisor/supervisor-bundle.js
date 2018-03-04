'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Promise = _interopDefault(require('bluebird'));
var schedule = _interopDefault(require('node-schedule'));

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

const axios = require("axios");

//const url = `${apiUrl}/${countryName}/${cityName}`;

const url  = 'http://localhost:3004/current_observation';

async function getAllCitiesWeather(urls) {
  let promises = [];

  for (let i = 0; i < urls.length; i++) {
      //promises.push(axios.get(urls[i])); //@TODO change to actual one
      promises.push(axios.get(url));
  }
  let resp = {};

  return axios.all(promises).then(axios.spread((...args) => {
      for (let i = 0; i < args.length; i++) {
          resp[args[i].data.display_location.country] = args[i].data;
      }
      return resp;
    })).then((resp) => {
      return resp
    })
}

//export default

function pushToQueue(queue, data) {
  var q = queue || 'task';
  var open = require('amqplib').connect('amqp://localhost');
  open.then(function(conn) {
    return conn.createChannel();
  }).then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {
      return ch.sendToQueue(q, new Buffer(JSON.stringify(data)));
    });
  }).catch(console.warn);
}

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

function getSqlConnection() {
  return pool.getConnectionAsync().disposer(function (connection) {
      console.log("Releasing connection back to pool");
      connection.release();
  });
}

function querySql (query, params) {
  return Promise$1.using(getSqlConnection(), function (connection) {
      console.log("Got connection from pool");
      if (typeof params !== 'undefined'){
          return connection.queryAsync(query, params);
      } else {
          return connection.queryAsync(query);
      }
  });
}

const baseURL = 'http://api.wunderground.com/api/ff63d30e71bd4628/conditions/q';

async function retrieveConfiguration() {
  var userQuery = "select * from configurations";
  return querySql(userQuery)
     .then(function(rows){
        if (rows.length == 0) {
          return Promise.reject("did not find rows");
        }
        return rows;
     });
}

async function getAllCities(country_code) {
  let cityQuery = "select city from country_city where country_code = ?"; 
  return querySql(cityQuery, [country_code])
     .then(function(rows){
        if (rows.length == 0) {
          return Promise.reject("did not find any country");
        }
        return rows;
     }).error((err) => {
        console.error(err);
     });
}

function getCronString(frequency) {
  let frq = frequency.toUpperCase().trim(); 
  switch(frq) {
    case 'HOURLY' :
      return '0/5 * * * * *';
      break;
    case 'DAILY' :
      return '* * 1 * *';
      break;
    default :
      return '* 59 * * *';
      break;   
  }
}

async function prepareAPIData() {
  let configData = await retrieveConfiguration();
  for(let i = 0; i < configData.length; i++) {
    let cities = await getAllCities(configData[i].country_code);
    let countryName = configData[i].country;
    let urls = [];
    if(cities.length) {
      urls = cities.map( (cityRow) => {
        return `${baseURL}/${countryName}/${cityRow.city}`;
      });
    }
    let cronString = getCronString(configData[i].polling_frequency);
    fireScheduler(cronString, countryName, urls);
  }
}

function fireScheduler(cronString, countryName, urls) {
  var j = schedule.scheduleJob(cronString, () => {
    console.log('The answer to life, the universe, and everything!');
    let res = getAllCitiesWeather(urls).then((response) => {
      console.log(response);
      for(const prop in response) {
        pushToQueue(prop, response[prop]);
      }
      //pushToQueue(countryName, res);
    });
  });
}


//var j = schedule.scheduleJob('*/10 * * * * *', function(){
  //console.log('The answer to life, the universe, and everything!');
//});


// async function insertConfiguration(data) {
//   //var userQuery = "select id, email from users where token = ?";
//   let fields = {country: 'CANADA', polling_duration: 'DAILY'} //replace with data
//   var insertQuery = "INSERT INTO  configurations SET ?";
  
//   //return querySql(userQuery, [token])
//   return querySql(insertQuery, [fields])
//      .then(function(rows){
//         console.log(rows);
//         var countries = rows;
//         return countries;
//      });
// }


// insertConfiguration().then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log(err);
// });



// Preserve 
async function main() {
  let res = await prepareAPIData();
  //console.log(res, 'res');
  //pushToQueue('test', res);
}

if(require.main === module) {
  main().then((result) => {
    console.log('main result');
  });
}
