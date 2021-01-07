import config from '../config';
import fetchJson from './utils/fetchJson';

export const sendMail = (data) => {
    return fetchJson(`${config.apiBaseUrl}/sendmail`, {
        method: 'POST',
        body: JSON.stringify(data) 
    });
};