import { call, put, take, fork, select, delay, cancel } from "redux-saga/effects";
import * as SignupApi from "../services/api/signupApi";
import * as rootActions from "../actions/root-actions";
import * as messageActions from '../actions/message-actions';
import * as sessionStorage from "../utils/sessionStorage";
import { apiCall } from './requestSaga';
import * as sessionSaga from './session-saga'
import Immutable from "immutable";
import * as loginApi from "../services/api/loginFormApi";
import constant from "../shared/constant";

/* ACTION DEFINE     */

const SIGNUP_REQUEST = "application/SIGNUP_REQUEST";
const SIGNUP_REQUEST_ERROR = "application/SIGNUP_REQUEST_ERROR";
const SIGNUP_REQUEST_SUCCESS = "application/SIGNUP_REQUEST_SUCCESS";

const SIGNUP_CONFIRMATION_VERIFY = "application/SIGNUP_CONFIRMATION_VERIFY";
const SIGNUP_CONFIRMATION_REQUEST_SUCCESS = "SIGNUP_CONFIRMATION_REQUEST_SUCCESS";
// //const SIGNUP_CONFIRMATION_REQUEST_SUCCESS = "application/SIGNUP_CONFIRMATION_REQUEST_SUCCESS";
// const SIGNUP_CONFIRMATION_REQUEST_ERROR = "application/SIGNUP_CONFIRMATION_REQUEST_ERROR";
// const RESEND_SIGNUP_CONFIRMATION_REQUEST = "application/RESEND_SIGNUP_CONFIRMATION_REQUEST";
// const RESEND_SIGNUP_CONFIRMATION_SUCCESS = "application/RESEND_SIGNUP_CONFIRMATION_SUCCESS";
const SIGNUP_REQUEST_EMPTY = "application/SIGNUP_REQUEST_EMPTY";

// const STOP_POLLING = 'STOP_POLLING';


export function signup(data, history) {
  return {
    type: SIGNUP_REQUEST,
    data: data,
    history: history
  };
}


function setSignupSuccess(data) {
  return {
    type: SIGNUP_REQUEST_SUCCESS,
    data: data
  };
}

// function stopPolling() {
//   return {
//     type: STOP_POLLING
//   };
// }

export function signupRequestEmpty() {
  return {
    type: SIGNUP_REQUEST_EMPTY
  };
}

export function signupConfirmationVerify(id, token, history) {
  return {
    type: SIGNUP_CONFIRMATION_VERIFY,
    id: id,
    token: token,
    history: history
  };
}

export function signupConfirmationVerifySuccess(id, token) {
  return {
    type: SIGNUP_CONFIRMATION_REQUEST_SUCCESS,
    id: id,
    token: token,
  };
}

//DEFINE INITIAL STATE

const initialState = {
  signupForm: Immutable.Map({
    data: null,
    isSignupSuccess: false,
    signupVerifySuccess: {},
    id: '',
    token: ''
  })
};

// DEFINE REDUCER

export function signupFormReducer(state = initialState.signupForm, action) {
  switch (action.type) {
    case SIGNUP_REQUEST_ERROR:
      return state.withMutations(state => state.set('error', action.error));
    case SIGNUP_REQUEST_SUCCESS:
      return state.withMutations(state => state.set('data', action.data)
        .set('isSignupSuccess', true));
    case SIGNUP_REQUEST_EMPTY:
      return state.withMutations(state => state.set('data', null)
        .set('isSignupSuccess', false));
    case SIGNUP_CONFIRMATION_REQUEST_SUCCESS:
      return state.withMutations(state => state.set('id', action.id).set('token', action.token));
    default:
      return state;

  }
}

function* getSignupForm(data, history) {
  try {
    const signupSuccessData = yield apiCall(SignupApi.signup, data);
    if (signupSuccessData) {
      yield put(setSignupSuccess(signupSuccessData));
      history.push(constant.SIGNUP_SUCCESS)
    }
  }
  catch (error) {
    if (error.status == 401)
      yield put(loginListActons.logout());
    else
      yield put(messageActions.showMessage(error.message, 'error'));
  }
}


export function* signupFormFlow() {
  const check = true;
  while (check) {
    const { data, history } = yield take(SIGNUP_REQUEST);
    yield put(rootActions.controlProgress(true));
    yield call(getSignupForm, data, history);
    yield put(rootActions.controlProgress(false));
  }
}

//Instead of using the API call from request saga, used this becuase, we need to discard the 401 during pooling
// function* pollingApiCall(fn, ...rest) {
//   try {
//       const response = yield call(fn, ...rest);

//       if (response.payload != undefined)
//           return response.payload;
//       else
//           return response;

//   } catch (error) {
//       //No need to handle the error here
//   }
// }

// function parseJwt(token) {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   return JSON.parse(window.atob(base64));
// }

export const getSignupResponse = (state) => state.signupForm

// function* pollData() {
//   while (true) {
//     try 
//     {
//       let signupResponse = yield select(getSignupResponse);
//       let signupSuccessResponse = signupResponse.get('data');

//       if (signupSuccessResponse) {
//         const response = yield pollingApiCall(SignupApi.pollingCheck, signupSuccessResponse);
//         if (response) {
//           yield put(signupRequestEmpty());

//           sessionStorage.setAuthToken(JSON.stringify(response));
//           const parsedAccessToken = parseJwt(response.access_token);
//           yield put(sessionSaga.setLoginSuccess(parsedAccessToken));

//           //Get the user data and get the family member list also.     
//           // const userData = yield apiCall(loginApi.getUserAccount);
//           // yield put(sessionSaga.setUserAccount(userData))

//           yield put(stopPolling());
//         }
//       }
//       yield delay(10000);
//     } catch (err) {

//     }
//   }
// }


function* signupConfirmationVerifyToken(id, token, history) {
  try {
    const response = yield call(SignupApi.signupConfirmation, id, token);
    yield put(signupConfirmationVerifySuccess(response));
    history.push(constant.SIGNUP_CONFIRMATION_SUCCESS_SCREEN)
    return response;
  }
  catch (error) {
    // if (error.status == 400) {
    // history.push(constant.PASSWORD_RESET_FAILURE_SCREEN)
    // }

  }
}

export function* signupConfirmVerifyFlow() {
  let check = true;
  while (check) {
    const { id, token, history } = yield take(SIGNUP_CONFIRMATION_VERIFY);
    yield put(rootActions.controlProgress(true));
    yield call(signupConfirmationVerifyToken, id, token, history);
    yield put(rootActions.controlProgress(false));
  }
}