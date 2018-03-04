import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import thunk from "redux-thunk";
import webStore from './reducers';
import { createLogger } from 'redux-logger'
const logger = createLogger({
});

let store = createStore(webStore, applyMiddleware(thunk,logger));

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));