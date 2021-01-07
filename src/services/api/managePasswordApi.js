import config from '../config';
import fetchJson from './utils/fetchJson';

export function forgotPassword(email) {
    const data = {email:email};
    return fetchJson(`${config.apiBaseUrl}/auth/password/forgot`, {
        method: 'POST',
        body: JSON.stringify(data)
    }, '');
}

export function forgotPasswordReset(data) {
    return fetchJson(`${config.apiBaseUrl}/auth/password/reset`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export function forgotPasswordVerify(value) {
    const data = { id: value.id, token: value.token };
    return fetchJson(`${config.apiBaseUrl}/auth/password/verify-token`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export function changePassword(data) {
    return fetchJson(`${config.apiBaseUrl}/password/change-password`, {
        method: 'POST',
        body: JSON.stringify(data)
    }, '');
}

