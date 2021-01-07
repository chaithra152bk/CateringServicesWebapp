import config from '../config';
import fetchJson from './utils/fetchJson';

export const fetchjobAppliedList = () => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/jobs`
    );
};