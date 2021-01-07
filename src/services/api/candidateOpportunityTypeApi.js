import config from '../config';
import fetchJson from './utils/fetchJson';


export const addCandidateInterestedOpportunity = (data) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/opportunity`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const fetchCandidateInterestedOpportunity = () => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/opportunity`
    );
};

export const fetchLookupOpportunityType = () => {
    return fetchJson(
        `${config.apiBaseUrl}/lookup/opportunitytype`
    );
};