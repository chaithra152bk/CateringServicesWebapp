import config from '../config';
import fetchJson from './utils/fetchJson';

export const fetchCandidateCertifications = () => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/certification`
    );
};

export const saveCandidateCertifications= (data) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/certification`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export const editCandidateCertifications= (data, id) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/certification/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const deleteCandidateCertifications = (id) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/certification/${id}`, {
        method: 'DELETE'
    });
}


