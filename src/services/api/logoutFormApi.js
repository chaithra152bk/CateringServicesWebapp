import config from '../config';
import fetchJson from './utils/fetchJson';

export function fetchlogoutForm(data) {
    return fetchJson(`${config.apiBaseUrl}/users`, {
        method: 'POST',
        body: JSON.stringify(data) 
    });
}
