import config from '../config';
import fetchJson from './utils/fetchJson';

export const saveCandiateIndustry = (data) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/industry`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const fetchCandiateIndustry = () => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/industry`
    );
};

