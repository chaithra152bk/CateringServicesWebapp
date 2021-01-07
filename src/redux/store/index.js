import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../modules';
import middleware from '../middleware';
import users from '../../data/userData';

const initialState = {users};

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
