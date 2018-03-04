
import Promise from 'bluebird';
import schedule from 'node-schedule';
import logger from './logger';
import {getWeatherDetails, getAllCitiesWeather} from './weather';
import {pushToQueue} from './queue';
import {getSqlConnection, querySql} from './db';

const baseURL = 'http://api.wunderground.com/api/ff63d30e71bd4628/conditions/q'

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
      })
    }
    let cronString = getCronString(configData[i].polling_frequency)
    fireScheduler(cronString, countryName, urls)
  }
}

function fireScheduler(cronString, countryName, urls) {
  var j = schedule.scheduleJob(cronString, () => {
    console.log('The answer to life, the universe, and everything!');
    let res = getAllCitiesWeather(urls).then((response) => {
      console.log(response)
      for(const prop in response) {
        pushToQueue(prop, response[prop]);
      }
      //pushToQueue(countryName, res);
    })
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
  })
}










