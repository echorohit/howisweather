import logger from './logger';
import Promise from 'bluebird';
import {getSqlConnection, querySql} from './db';

import {readQueue} from './subscriber'


function retrieveWeather(token) {
  //var userQuery = "select id, email from users where token = ?";
  var userQuery = "select * from weather";
  
  //return querySql(userQuery, [token])
  return querySql(userQuery, [token])
     .then(function(rows){
        if (rows.length == 0) {
          return Promise.reject("did not find rows");
        }
        var user = rows[0];
        return user;
     });
}

// retrieveWeather().then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log(err);
// });


readQueue('IN')


