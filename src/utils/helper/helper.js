import * as messageActions from '../../actions/message-actions';
import * as sessionStorage from '../../utils/sessionStorage';
import constant from "../../shared/constant";

export const toGenderString = (gender, t) => {
    switch (gender) {
        case constant.MALE:
            return t('common.male');
        case constant.FEMALE:
            return t('common.female');
        case constant.OTHER:
            return t('common.other');
        case constant.DO_NOT_WISHTO_SPECIFY:
            return t('common.donot_wish_to_specify');
        default:
            return ''
    }
}

export const confirmValidation = (message) => {
    let result = confirm(message);
    if (result) {
        return true
    }
    return false;
}

export const toAvailabilityString = (availability, t) => {
    switch (availability) {
        case constant.GENERAL_INTEREST:
            return t('candidate_profile.general_interest');
        case constant.ACTIVELY_SEARCHING:
            return t('candidate_profile.actively_searching');
        case constant.NOT_SEARCHING:
            return t('candidate_profile.not_searching');
        default:
            return ''
    }
}
export const toProfileVisibilityString = (profileVisibility, t) => {
    switch (profileVisibility) {
        case constant.ALL_USERS:
            return t('common.all_users');
        case constant.RECRUITERS_ONLY:
            return t('common.recruiters_only');
        case constant.INVISIBLE:
            return t('common.invisible');
        default:
            return t('common.all_users');
    }
}


export const toOuterLinkNewTab = (redirectLink) => {
    return window.open(`${redirectLink}`, '_blank');
};

export const toOuterLink = (redirectLink) => {
    const prefix = 'http://';
    if (redirectLink.substr(0, prefix.length) !== prefix) {
        redirectLink = prefix + redirectLink;
        window.location = redirectLink;
    }
};

export const isObjectEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

export const isAuthenticated = (session) => {
    return (session ? session.get("isLoggedIn") : false);
}

export const formatName = (data, t) => {
    const { firstName, lastName, gender, academicGrade } = data;
    const fullName = `${gender != undefined ? toGenderString(gender, t) : ''} ${academicGrade != undefined ? academicGrade : ''} ${firstName != undefined ? firstName : ''} ${lastName != undefined ? lastName : ''}`;
    return fullName;
}

export const toAddressString = (clinic, t) => {
    const { telephone1 } = clinic || '';
    const address = clinic ? clinic.address : '';
    let doctorAddress = address != undefined ? `${address.streetName} ${address.streetNumber} \n ${address.postalCode} ${address.city} ${address.district}` : '';
    doctorAddress = telephone1 ? `${doctorAddress} \n ${t('common.tel')}: ${telephone1}` : doctorAddress;
    return doctorAddress;
}

export const handleNotification = (message, dispatch, notifer, customMessage) => {
    const messageType = message.get('messageType');
    const apiResponse = message.get('apiResponse');
    const errors = apiResponse != null && apiResponse != undefined ? apiResponse.errors : [];
    const errorsLength = errors != undefined ? errors.length : 0;

    if (((customMessage != '' && customMessage != undefined)) && notifer != undefined && notifer && notifer != null && messageType != '' && messageType != undefined) {
        notifer.show(customMessage, messageType);
        dispatch(messageActions.hideMessage());
    }
    else if (notifer != undefined && notifer && notifer != null && apiResponse && apiResponse.Message != '' && apiResponse.Message != undefined && apiResponse != undefined) {
        notifer.show(apiResponse.Message, messageType);
        dispatch(messageActions.hideMessage());
    }

    for (let i = 0; i < errorsLength && notifer != undefined && notifer && notifer != null; i++) {
        notifer.show(errors[i].message, messageType);
    }
    if (errorsLength && errorsLength > 0)
        dispatch(messageActions.hideMessage());

    if (messageType == 'success')
        dispatch(messageActions.hideMessage());
};

export const compareObjects = (first, second) => {
    return JSON.stringify(first) === JSON.stringify(second);
}

export const isValidColorCode = (colorCode) => {
    let regExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    return regExp.test(colorCode);
}

export const generateLinkedUrl = (state) => {
    let url = `${constant.LINKEDIN_URL}?response_type=${constant.LINKEDIN_RESPONSE_TYPE}&client_id=${constant.LINKEDIN_KEY}&redirect_uri=${encodeURIComponent(constant.LINKEDIN_REDIRECT_URI)}&state=${state}&scope=${encodeURIComponent(constant.LINKEDIN_SCOPE)}`
    return url;
}

export const removeObjectFromArray = (ar, value) => {
    for (let i = 0; i < ar.length; i++) {
        if (ar[i].id == value) {
            ar.splice(i, 1);
        }
    }
    return ar;
}

export const removeDuplicateObjectFromAraay = (ar) => {
    let jsonObject = ar.map(JSON.stringify);
    let uniqueSet = new Set(jsonObject);
    return Array.from(uniqueSet).map(JSON.parse);
}

export const convertArrayStringToInt = (array) => {
    let updatedArray = [];
    array.map((value) => {
        if (Number.isInteger(parseInt(value)))
            updatedArray.push(parseInt(value));
    })
    return updatedArray;
}

export const changeKey = (data) => {
    return data.map((item) => {
        return {
            label: item.name,
            value: item.name,
            id: item.id
        }
    })
}

export const languageChangeKey = (data) => {
    return data.map((item) => {
        return {
            label: item.languageName,
            value: item.languageName,
            id: item.languageId
        }
    })
}

export const changeCountryKey = (data) => {
    return data.map((item) => {
        return {
            label: item.countryName,
            value: item.countryName,
            id: item.countryId
        }
    })
}

export const changeIndustryKey = (data) => {
    return data.map((item) => {
        return {
            label: item.industryName,
            value: item.industryName,
            id: item.industryId
        }
    })
}

export const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}
export const fetchRole = () => {
    const authData = JSON.parse(sessionStorage.getAuthToken());
    if (authData != undefined) {
        const data = parseJwt(authData.auth_token)
        return data[constant.FETCH_ROLE];
    }
}

export const  getExtension = (filename) => {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

export const isDocument = (filename) => {
    let ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'pdf':
        case 'doc':
        case 'docx':
        case 'jpeg':
            return true;
    }
    return false;
}

export const toDegreeString = (degree, t) => {
    switch (degree) {
        case constant.HIGHSCHOOL_LEVEL:
            return t('common.high_school');
        case constant.ASSOCIATE_LEVEL:
            return t('common.associate_level');
        case constant.BACHELOR_LEVEL:
            return t('common.bachelor_level');
        case constant.MASTERS_LEVEL:
            return t('common.master_level');
        case constant.PHD_ABOVE_LEVEL:
            return t('common.phd_above');
        default:
            return ''
    }
}
