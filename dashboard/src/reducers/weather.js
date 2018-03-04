import { RECV_DATA } from '../actions/ActionTypes';

import { combineReducers } from 'redux';

const defaultState = {
  loaded: false,
  data: {}
}

export default function weather(state = defaultState, action){
  switch(action.type){
    case 'WEATHER'+RECV_DATA:
      return Object.assign({}, state, {loaded: true, data: action.data.data});
    default:
      return state;
  }
}