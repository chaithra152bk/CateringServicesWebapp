import config from "../config";
import fetchJson from './utils/fetchJson';
import axios from 'axios';
import * as sessionStorage from "../../utils/sessionStorage";

export function login(Email, Password) {
  const data = { email : Email, password : Password  };
return fetchJson(`${config.apiBaseUrl}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(data)
            }, '');
}

export function authorize(requestData) {
  return fetchJson(`${config.apiBaseUrl}/auth/refreshtoken`, {
                method: 'POST',
                body: JSON.stringify(requestData)
            }, '');
}

// export function getUserAccount(){
//   return fetchJson(config.apiBaseUrl + '/account/me')
// } 

export function linkedinDataPass(data) {
  let state = data.state;
  if(state == 'recruiter')
  {
    return fetchJson(`${config.apiBaseUrl}/recruiter/register/linkedin`, {
        method: 'POST',
        body: JSON.stringify(data)
    }, '');
  }
  else
  {
    return fetchJson(`${config.apiBaseUrl}/candidate/register/linkedin`, {
        method: 'POST',
        body: JSON.stringify(data)
  }, '');
  }
}