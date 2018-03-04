import { RECV_DATA } from '../actions/ActionTypes';

let defaultState = {
    loaded: false,
    data: []
}

//CONFIFGURTAION

export default function configuration(state = defaultState,action) {
  switch(action.type){
      case 'CONFIFGURTAION'+RECV_DATA:  
        return Object.assign({}, state, {loaded: true, data: action.data.data});
      default:
        return state;
  }
}