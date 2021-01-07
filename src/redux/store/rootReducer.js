import { combineReducers } from 'redux';
import * as actions from "../../actions/action-types";
import * as sessionSaga from "../../saga/session-saga";
import translationReducer from "../reducers/translationReducer";
import messageReducer from '../reducers/messageReducer';

import progressReducer from "../reducers/rootReducer";



import * as sessionStorage from "../../utils/sessionStorage";


const combinedReducers = {
    root: progressReducer,

    session: sessionSaga.sessionReducer,
    translation: translationReducer,
    message: messageReducer,
};

const reducers = combineReducers(combinedReducers);

const rootReducer = (state, action) => {
    if (action.type === actions.LOGOUT_REQUEST_SUCCESS) {
        sessionStorage.clear()
        state = undefined;
    }
    return reducers(state, action);
};

export default rootReducer;