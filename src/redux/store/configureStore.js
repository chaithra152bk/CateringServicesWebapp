import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./rootReducer";
import NodeUtils from "../../services/common/node-service";
import * as sessionSaga from "../../saga/session-saga";



let composeEnhancers = '';

if (NodeUtils.isDevelopment()) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
else {
  composeEnhancers = compose;
}

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (NodeUtils.isDevelopment()) {
  //middleware.push(createLogger());
}

const enhancers = [composeEnhancers(applyMiddleware(...middleware))];

export const store = createStore(rootReducer, {}, compose(...enhancers));

export const configureStore = () => {
  return {
    ...store,
    runSaga: [
    
    
      sagaMiddleware.run(sessionSaga.loginFlow),
      sagaMiddleware.run(sessionSaga.logoutFlow),
      sagaMiddleware.run(sessionSaga.linkedInLoginFlow),
      
    ]
  };
};


//export default configureStore;


