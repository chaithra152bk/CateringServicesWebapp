import config from '../config';
import fetchJson from './utils/fetchJson';

export const fetchRecruiterJobList = () => {
    return fetchJson(
        `${config.apiBaseUrl}/recruiter/jobs`
    );
};