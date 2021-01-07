import config from '../config';
import fetchJson from './utils/fetchJson';

export const saveCandiateCountry = (data) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/country`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const fetchCandiateCountry = () => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/country`
    );
};

