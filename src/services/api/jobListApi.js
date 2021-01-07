import config from '../config';
import fetchJson from './utils/fetchJson';

export const fetchjobList = () => {
    return fetchJson(
        //ToDo - Prasanna - change the API url
        `${config.apiBaseUrl}/jobs/recent/10`
    );
};