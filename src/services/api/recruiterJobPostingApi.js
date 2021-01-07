import config from '../config';
import fetchJson from './utils/fetchJson';

export const fetchRecruiterJob = (data) => {
    return fetchJson(`${config.apiBaseUrl}/recruiter/jobs/${data.id}`);
}

export const saveRecruiterJob = (data) => {
    return fetchJson(`${config.apiBaseUrl}/recruiter/jobs`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export const updateRecruiterJob = (data, id) => {
    return fetchJson(`${config.apiBaseUrl}/recruiter/jobs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
};


export const recruiterJobStatus = (id, status) => {
    return fetchJson(
        `${config.apiBaseUrl}/recruiter/jobs/${id}/${status}`, {
            method: 'PUT'
        }
    );
};

