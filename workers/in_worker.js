import logger from './logger';
import Promise from 'bluebird';
import {getSqlConnection, querySql} from './db';

import {readQueue} from './subscriber'

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
  await readQueue('IN', saveWeather)
} 


if(require.main === module) {
  main().then((result) => {
    console.log('worker result');
  })
}


