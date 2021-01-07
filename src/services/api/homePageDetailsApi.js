import config from '../config';
import fetchJson from './utils/fetchJson';
import constant from '../../shared/constant';

export const fetchRandomCandidateDetails = () => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/random/${constant.DEFAULT_NO_OF_RANDOM_CANDIDATES}`
    );
};

export const fetchResentjobList = () => {
    return fetchJson(
        `${config.apiBaseUrl}/jobs/recent/` + constant.RECENT_JOB_TO_SHOW
    );
};