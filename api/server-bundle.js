'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Promise = _interopDefault(require('bluebird'));

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

const express = require('express');
let  app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",  "*");
  res.header("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let port = process.env.PORT || 3500;

let router = express.Router();  



 
function retrieveConfiguration(reqParam) {
  var userQuery = "select * from configurations";
  return querySql(userQuery)
     .then(function(rows){
        if (rows.length == 0) {
          return Promise.reject("did not find rows");
        }
        var countries = rows;
        return countries;
     });
}


function insertConfiguration(reqParam) {
  //var userQuery = "select id, email from users where token = ?";
  let fields = {country: reqParam.country, polling_frequency: req.polling_frequency}; //replace with data
  var insertQuery = "INSERT INTO  configurations SET ?";

  return querySql(insertQuery, [fields])
     .then(function(rows){
        console.log(rows);
        var countries = rows;
        return countries;
     });
}

function updateConfiguration(reqParam) {
  var insertQuery = "UPDATE  configurations SET polling_frequency = ? WHERE country = ?";
  return querySql(insertQuery, [reqParam.polling_frequency, reqParam.country])
     .then(function(rows){
        var countries = rows;
        return countries;
     });
}

function retrieveWeather(reqParam) {
  //let country =  reqParam.country || 'INDIA'; //@TODO change it 
  let country = 'INDIA';
  let query = "select * from weather where country = ?";
  return querySql(query, [country])
     .then((rows) => {
        console.log(rows);
        if (rows.length == 0) {
          return Promise.reject("did not find rows");
        }
        return rows;
     });
}

router.get('/', function(req, res) {
  res.json({ message: 'React dashboard api' });   
});


router.get('/configuration', function(req, res) {
  retrieveConfiguration().then((data) => {
    res.json({
      success: true,
      data: data,
      message: 'Configuration fetched successfully'
    });
  }).error((err) =>{
    res.json({
      success: false,
      message: 'Error',
    });
  });
});

router.post('/configuration/add', function(req, res) {
  insertConfiguration(req.body).then((data) =>{
    res.json({
      success: true,
      data: data,
      message: 'Configuration added successfully'
    });
  }).error((err) => {
    res.json({
      success: false,
      data: data,
      message: 'Something went wrong'
    });
  });
});

router.post('/configuration/update', function(req, res) {
  updateConfiguration(req.body).then((data) =>{
    res.json({
      success: true,
      data: data,
      message: 'Configuration updated successfully'
    });
  }).error((err) => {
    res.json({
      success: false,
      data: data,
      message: 'Something went wrong'
    });
  });   
});

router.get('/weather', function(req, res) {
  retrieveWeather(req.body).then((data) =>{
    res.json({
      success: true,
      data: data,
      message: 'Weather information fetched successfully'
    });
  }).error((err) => {
    res.json({
      success: false,
      message: 'Something went wrong'
    });
  });  
});


app.use('/api', router);

app.listen(port);
console.log('Api server is running at ' + port);
