import config from '../config';
import fetchJson from './utils/fetchJson';


export const addCandidateJobFunction = (data) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/jobfuncton`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const fetchCandidateJobFunction = () => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/jobfuncton`
    );
};

export const fetchLookupJobFunction = () => {
    return fetchJson(
        `${config.apiBaseUrl}/lookup/jobfunctions`
    );
};