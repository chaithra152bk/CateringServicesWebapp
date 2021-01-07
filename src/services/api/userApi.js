import config from '../config';
import fetchJson from './utils/fetchJson';

export const getUserAccount = () => {
    return fetchJson(
        `${config.apiBaseUrl}/account/me`
    )
};

export const fetchCandiateGeneralInformation = () => {
    return fetchJson(
        `${config.apiBaseUrl}/candidate/details`
    );
};

export const saveCandiateGeneralInformation = (data) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/details`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const fetchNationalityList = (data) => {
    const nationalityText = data && data.nationalityText
    return fetchJson(
        `${config.apiBaseUrl}/lookup/nationality?searchText=${nationalityText}`
    );
};

export const fetchIndustryList = () => {
    return fetchJson(
        `${config.apiBaseUrl}/lookup/industry`
    );
};


// export const fetchCandiateProfileImageUrl = (id) => {
//     return fetchJson(
//         `${config.apiBaseUrl}/candidate/details/profilepicture/${id}`
//     );
// };

export const saveCandiateSummary = (data) => {
    const updateData = { summaryText: data.summary }
    return fetchJson(`${config.apiBaseUrl}/candidate/details/summary`, {
        method: 'PUT',
        body: JSON.stringify(updateData)
    });
}

export const saveCandiateProfilePicture = (data) => {

    const fd = new FormData();
    fd.append('formFile', data, data.name);
    return fetchJson(`${config.apiBaseUrl}/candidate/details/profilepicture`, {
        method: 'PUT',
        body: fd
    }, 'imageUpload');

}

export const deleteCandiateProfilePicture = () => {
    return fetchJson(`${config.apiBaseUrl}/candidate/details/profilepicture`, {
        method: 'DELETE'
    });
}
//Recruiter API"S

export const saveRecruiterGeneralInformation = (data) => {
    return fetchJson(`${config.apiBaseUrl}/recruiter/details`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export const fetchRecruiterGeneralInformation = () => {
    return fetchJson(
        `${config.apiBaseUrl}/recruiter/details`
    );
};

export const saveRecruiterSummary = (data) => {
    const updateData = { summaryText: data.summary }
    return fetchJson(`${config.apiBaseUrl}/recruiter/details/summary`, {
        method: 'PUT',
        body: JSON.stringify(updateData)
    });
}

export const saveRecruiterProfilePicture = (data) => {
    const fd = new FormData();
    fd.append('formFile', data, data.name);
    return fetchJson(`${config.apiBaseUrl}/recruiter/details/profilepicture`, {
        method: 'PUT',
        body: fd
    }, 'imageUpload');

}

export const deleteRecruiterProfilePicture = () => {
    return fetchJson(`${config.apiBaseUrl}/recruiter/details/profilepicture`, {
        method: 'DELETE'
    });
}

