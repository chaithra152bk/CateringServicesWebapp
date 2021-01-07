import config from '../config';
import fetchJson from './utils/fetchJson';

export const candidateAndRecruiterProfileDelete = (reasonForDelete) => {
    return fetchJson(`${config.apiBaseUrl}/account/me`, {
        method: 'DELETE',
        body: JSON.stringify({reasonForDelete:reasonForDelete})
    });
}