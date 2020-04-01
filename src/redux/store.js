import Config from '@config/config';
import { createStore, applyMiddleware, compose } from 'redux';

/* middlewares */
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import dayjs from 'dayjs';
import request from './middlewares/request/request';

import rootReducer from './reducers';

const middlewares = [thunk, request];

if (!Config.isProd) {
    middlewares.push(logger);
}

const middleware = applyMiddleware(...middlewares);

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, reduxDevTools(middleware));

window.getState = store.getState;
window.dispatch = store.dispatch;

export default store;
