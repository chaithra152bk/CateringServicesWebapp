import { call, put, take, delay, race, select } from "redux-saga/effects";
import * as sessionStorage from "../utils/sessionStorage";
import * as Api from "../services/api/loginFormApi";
import * as userApi from "../services/api/userApi";
import Immutable from "immutable";
import { apiCall } from './requestSaga';
import constant from "../shared/constant";
import * as rootActions from "../actions/root-actions";
import * as loginApi from "../services/api/loginFormApi";
import Notification from '../components/common/notification/Notification';
import * as translation from "../actions/action-translation";
import * as moment from "../utils/helper/moment";


const toast = new Notification();

//DEFINE ACTIONS
const LOGIN_REQUEST = "session/LOGIN_REQUEST";
const LOGIN_REQUEST_SUCCESS = "session/LOGIN_REQUEST_SUCCESS";
// const LOGIN_REQUEST_ERROR = "session/LOGIN_REQUEST_ERROR";
const SET_USERACCOUNT_REQUEST_SUCCESS = "session/SET_USERACCOUNT_REQUEST_SUCCESS";

const SET_LINKEDIN_DATA = "session/SET_LINKEDIN_DATA";
// const LINKEDIN_SET_DATA_REQUEST_ERROR = "session/LLINKEDIN_SET_DATA_REQUEST_ERROR";
// const LINKEDIN_SET_DATA_REQUEST_SUCCESS = "session/LINKEDIN_SET_DATA_REQUEST_SUCCESS";

const LOGOUT_REQUEST = "session/LOGOUT_REQUEST";
const LOGOUT_REQUEST_SUCCESS = "session/LOGOUT_REQUEST_SUCCESS";
// const LOGOUT_REQUEST_ERROR = "session/LOGOUT_REQUEST_ERROR";

//DEFINE ACTION CREATERS
export function setUserAccount(response) {
  return {
    type: SET_USERACCOUNT_REQUEST_SUCCESS,
    response: response
  };
}

export function login(email, password, history, redirectUrl, getResponse) {
  return {
    type: LOGIN_REQUEST,
    email: email,
    password: password,
    history: history,
    redirectUrl: redirectUrl,
    getResponse: getResponse
  };
}

// export function setError(error) {
//   return {
//     type: LOGIN_REQUEST_ERROR,
//     error: error
//   };
// }

export function setLoginSuccess() {
  return {
    type: LOGIN_REQUEST_SUCCESS
    // response: response
  };
}

export function logout(history) {
  return {
    type: LOGOUT_REQUEST,
    history: history
  };
}

export function setLogoutSuccess() {
  return {
    type: LOGOUT_REQUEST_SUCCESS
  };
}

export function passLinkedinData(data, history, message) {
  return {
    type: SET_LINKEDIN_DATA,
    data: data,
    history: history,
    message: message
  }
}

// export function passLinkedinDataResponseSuccess(response) {
//   return {
//     type: LINKEDIN_SET_DATA_REQUEST_SUCCESS,
//     resonse: response
//   }
// }

// export function passLinkedinDataResponseError() {
//   return {
//     type: LINKEDIN_SET_DATA_REQUEST_ERROR,
//   }
// }

//DEFINE INITIAL STATE
const initialState = {
  session: Immutable.Map({
    // loginFormError: {},
    // authToken: '',
    LoggedUser: [{ userName: 'chaithra.bk@desuvit.com', password: 'admin123', token: 'ahahahahahhaa458277aajyvxgsgsrsrv' }],
    isLoggedIn: false,
    userData: {},
    linkedinDataPassError: false
  })
};


export const getSignupUserData = (state) => state.session
//DEFINE REDUCER
export function sessionReducer(state = initialState.session, action) {
  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
      return state.withMutations(state => state
        // .set('data', action.response)
        .set('isLoggedIn', true)
      );

    // case LOGIN_REQUEST_ERROR:
    //   return state.withMutations(state => state
    //     .set('isLoggedIn', false)
    //     .set('loginError', action.error));

    case LOGOUT_REQUEST_SUCCESS:
      {
        sessionStorage.clear();
        return state.withMutations(state => state
          .set('isLoggedIn', false)
        );
      }
    // case LOGOUT_REQUEST_ERROR:
    //   {
    //     return state.withMutations(state => state
    //       .set('isLoggedIn', false)
    //       .set('loginError', action.err));
    //   }

    case SET_USERACCOUNT_REQUEST_SUCCESS:
      return state.withMutations(state => state.set('userData', action.response));
    // case LINKEDIN_SET_DATA_REQUEST_SUCCESS:
    //   return state.withMutations(state => state.set('linkedinDataPassError', false));
    // case LINKEDIN_SET_DATA_REQUEST_ERROR:
    //   return state.withMutations(state => state.set('linkedinDataPassError', true));
    default:
      return state;
  }

}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

//DEFINE SAGA
export function* loginFlow() {
  // if (sessionStorage.getAuthToken()) {
  //   const userData = yield apiCall(userApi.getUserAccount, 'noProgress');

  //   yield put(translation.switchLanguage(userData.preferredLanguage))
  //   moment.changeMomentLocale(userData.preferredLanguage);
  //   yield put(setUserAccount(userData))
  // }

  const check = true;
  while (check) {
    const { email, password, history, redirectUrl, getResponse } = yield take(LOGIN_REQUEST);
    
    let signupResponse = yield select(getSignupUserData);
    let signupSuccessResponse = signupResponse.get('LoggedUser');
    console.log("signupSuccessResponse", signupSuccessResponse)
    const token = signupSuccessResponse.filter((x) => x.userName == email && signupSuccessResponse.filter((x) => x.password == password))
    console.log("token", token)

    if (token) {
      sessionStorage.setUserData('userData', 'ahahahahahhaa458277aajyvxgsgsrsrv');

      history.push('/veg')
      yield put(setLoginSuccess());
    }


    // if (token != undefined) {
    //   sessionStorage.setAuthToken(JSON.stringify(token));
    //   const parsedAccessToken = parseJwt(token.auth_token);
    //   const role = parsedAccessToken[constant.FETCH_ROLE]
    //   const userData = yield apiCall(userApi.getUserAccount);
    //   yield put(setUserAccount(userData))
    //   yield put(translation.switchLanguage(userData.preferredLanguage))
    //   moment.changeMomentLocale(userData.preferredLanguage);
    //   getResponse && (role == constant.CANDIDATE_ROLE && getResponse(constant.success))
    //   yield put(setLoginSuccess());


    // }
  }
}

export function* logoutFlow() {
  const check = true;
  while (check) {
    const { history } = yield take(LOGOUT_REQUEST);
    yield put(setLogoutSuccess());
    if (initialState.session && !initialState.session.get("isLoggedIn")) {
      history.push(constant.HOME_PAGE)
    }
  }
}

export function* linkedInLoginFlow() {
  const check = true;
  while (check) {
    const { data, history, message } = yield take(SET_LINKEDIN_DATA);
    const tokenData = yield apiCall(Api.linkedinDataPass, data);

    if (tokenData != undefined) {
      //yield put(passLinkedinDataResponseSuccess());


      sessionStorage.setAuthToken(JSON.stringify(tokenData));
      const parsedAccessToken = parseJwt(tokenData.auth_token);
      const role = parsedAccessToken[constant.FETCH_ROLE]
      const userData = yield apiCall(userApi.getUserAccount);
      yield put(setUserAccount(userData))
      yield put(translation.switchLanguage(userData.preferredLanguage))
      moment.changeMomentLocale(userData.preferredLanguage);
      yield put(setLoginSuccess());
      if (role == constant.CANDIDATE_ROLE) {
        history.push(constant.CANDIDATE_PROFILE_EDIT_SCREEN)
      }
      else if (role == constant.RECRUITER_ROLE) {
        history.push(constant.RECRUITER_DASHBOARD)
      }
    }
    else {
      toast.show(message, constant.error);
      history.push(constant.LOGIN_SCREEN);
    }
  }
}

