import config from '../config';
import fetchJson from './utils/fetchJson';

export function signup(data) {
    return fetchJson(`${config.apiBaseUrl}/candidate/register`, {
        method: 'POST',
        body: JSON.stringify(data) 
    }, '');
}

export function signupConfirmation(id, token) {
    const data = {id: id, token: token};
    return fetchJson(`${config.apiBaseUrl}/auth/verify`, {
        method: 'POST',
        body: JSON.stringify(data) 
    });
}

export function pollingCheck(data) {
    return fetchJson(`${config.apiBaseUrl}/auth/login-with-code`, {
        method: 'POST',
        body: JSON.stringify(data) 
    });
}

//Recruiter Signup
export function recruiterSignup(data) {
    return fetchJson(`${config.apiBaseUrl}/recruiter/register`, {
        method: 'POST',
        body: JSON.stringify(data) 
    }, '');
}

export function recruiterSignupConfirmation(id, token) {
    const data = {id: id, token: token};
    return fetchJson(`${config.apiBaseUrl}/auth/verify`, {
        method: 'POST',
        body: JSON.stringify(data) 
    });
}


