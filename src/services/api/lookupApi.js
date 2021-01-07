import config from '../config';
import fetchJson from './utils/fetchJson';
import constant from '../../shared/constant';

export const fetchLocation = (data) => {
    const locationText = data && data.locationText

    if (data && data.searchAllCountries)
        return fetchJson(
            `${config.apiBaseUrl}/lookup/location?searchText=${locationText}`
        );

    return fetchJson(
        `${config.apiBaseUrl}/lookup/location?searchText=${locationText}&countryId=${constant.NORWAY_COUNTRY_CODE}`
    );
};

export const fetchIndustryWithCategory = () => {
    return fetchJson(
        `${config.apiBaseUrl}/lookup/industrywithcategories`
    );
};

export const fetchSkills = (data) => {
    const skillText = data && data.skillText
    return fetchJson(
        `${config.apiBaseUrl}/lookup/skills?searchText=${skillText}`
    );
};

export const fetchStateWithLocation = (countryId) => {
    return fetchJson(
        `${config.apiBaseUrl}/lookup/country/${countryId}/states`
    );
}

