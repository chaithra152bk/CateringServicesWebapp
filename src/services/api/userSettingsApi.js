import config from '../config';
import fetchJson from './utils/fetchJson';

export const saveUserSettings = (data) => {
    return fetchJson(`${config.apiBaseUrl}/settings/preferred-language/`+ data, {
        method: 'PUT'
    });
};