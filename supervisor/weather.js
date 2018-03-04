const axios = require("axios");
//const apiUrl  = 'http://api.wunderground.com/api/ff63d30e71bd4628/conditions/q/'; @TODO need to change it to live

//const apiUrl  = 'http://localhost:3004/current_observation';

//const countryName = 'India';
//const cityName = 'Delhi';
import logger from './logger';

//const url = `${apiUrl}/${countryName}/${cityName}`;

const url  = 'http://localhost:3004/current_observation';


export async function getWeatherDetails() {
 return await axios
    .get(url)
      .then(response => {
        /*
        if(response.current_observation) {
          let obsrv = response.current_observation;
          let responseObj =  {
            station_id: obsrv.station_id,
            observation_epoch: obsrv.observation_epoch,
            weather: obsrv.weather,
            temp_f: obsrv.temp_f,
            temp_c: obsrv.temp_c,
            pressure_in: obsrv.pressure_in
          }
        }
        return responseObj
        */
       //console.log(response.data, 'data');
       return response.data
      })
    .catch(error => {
      logger.error(error);
      return false;
  });
}

export async function getAllCitiesWeather(urls) {
  let promises = [];

  for (let i = 0; i < urls.length; i++) {
      //promises.push(axios.get(urls[i])); //@TODO change to actual one
      promises.push(axios.get(url));
  }
  let resp = {}

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





