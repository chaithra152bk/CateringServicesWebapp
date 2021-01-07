import config from '../config';
import fetchJson from './utils/fetchJson';

export function saveCandidateEdcucation(data) {
    return fetchJson(`${config.apiBaseUrl}/candidate/education`, {
        method: 'POST',
        body: JSON.stringify(data)
    }, '');
}

export function getCandidateEdcucation() {
    return fetchJson(`${config.apiBaseUrl}/candidate/education`
    );
}

export function candidateEdcucationEdit(data, id) {
    return fetchJson(`${config.apiBaseUrl}/candidate/education/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export function candidateEdcucationDelete(id) {
    return fetchJson(`${config.apiBaseUrl}/candidate/education/${id}`, {
        method: 'DELETE'
    });
}
