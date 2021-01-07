import config from '../config';
import fetchJson from './utils/fetchJson';

export const fetchCandiateExperience = () => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/experience`
    );
};

export const saveCandidateExperience = (data) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/experience`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export const editCandidateExperience = (data, id) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/experience/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const fetchCandiateOpportunityType = () => {
    return fetchJson(
        `${config.apiBaseUrl}/lookup/opportunitytype`
    );
};

// export const fetchLocation = () => {
//     return fetchJson(
//         `${config.apiBaseUrl}/lookup/location`
//     );
// };

export const deleteCandiateExperience = (id) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/experience/${id}`, {
        method: 'DELETE'
    });
}