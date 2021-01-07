import config from '../config';
import fetchJson from './utils/fetchJson';

export const fetchCandidateFullDetails = (candidateId) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/details/full/${candidateId}`);
};