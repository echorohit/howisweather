import { combineReducers } from 'redux';
import configuration from './configuration';
import  weather  from './weather';

const webStore = combineReducers({configuration: configuration, weather: weather});

export default webStore;