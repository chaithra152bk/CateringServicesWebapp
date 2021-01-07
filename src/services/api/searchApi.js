import config from '../config';
import fetchJson from './utils/fetchJson';

export const searchJob = (queryString) => {
    return fetchJson(
        `${config.apiBaseUrl}/jobs/search${queryString}`
    );
};

export const searchCandidate = (queryString) => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/search${queryString}`
    );
}

export const searchRecruiterCandidate = (queryString) => {
    return fetchJson(
        `${config.apiBaseUrl}/recruiter/candidate/search${queryString}`
    );
}