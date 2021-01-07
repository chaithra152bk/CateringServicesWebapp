import config from '../config';
import fetchJson from './utils/fetchJson';


export const fetchJobDetails = (id) => {
    return fetchJson(
        `${config.apiBaseUrl}/jobs/${id}`
    );
};

export const applyJob = (data) => {
    const fd = new FormData();
    if(data.file)
        fd.append('formFile', data.file, data.file.name);
   
    fd.append('description', data.description)
    fd.append('jobIds', data.jobIds)

    return fetchJson(`${config.apiBaseUrl}/candidate/jobs/apply`, {
        method: 'POST',
        body: fd
    }, 'imageUpload');
};

export const shareJob = (data) => {
    return fetchJson(`${config.apiBaseUrl}/jobs/share`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
};