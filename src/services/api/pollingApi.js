import config from '../config';
import fetchJson from './utils/fetchJson';

export function pollingCheck(data) {
    return fetchJson(`${config.apiBaseUrl}/auth/login-with-code`, {
        method: 'POST',
        body: JSON.stringify(data) 
    });
}