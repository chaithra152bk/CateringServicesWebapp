import config from '../config';
import fetchJson from './utils/fetchJson';

export const addCandidateLocation = (data) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/location`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const fetchCandidateInterestedLocation = () => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/location`
    );
};

// export const fetchLookupLocations = () => {
//     return fetchJson(
//         `${config.apiBaseUrl}/lookup/location`
//     );
// };