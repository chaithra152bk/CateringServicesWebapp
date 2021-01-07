import config from '../config';
import fetchJson from './utils/fetchJson';

export const saveCandiateLanguage = (data) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/languages`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export const editCandidateLanguage = (data, id) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/languages/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const fetchCandiateLanguage = () => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/languages`
    );
};

export const fetchProficiency = () => {
    return fetchJson(
        `${config.apiBaseUrl}/lookup/proficiency`
    );
};

export const deleteCandiateLanguage = (id) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/languages/${id}`, {
        method: 'DELETE'
    
    });
}