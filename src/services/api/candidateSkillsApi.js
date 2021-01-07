import config from '../config';
import fetchJson from './utils/fetchJson';

export const saveCandiateSkills = (data) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/skill`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const fetchCandiateSkills = () => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/skill`
    );
};

export const fetchLookupSkills = (data) => {
    const skillText = data&&data.skillText
    return fetchJson(
        `${config.apiBaseUrl}/lookup/skills?searchText=${skillText}`
    );
};