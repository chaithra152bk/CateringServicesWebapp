import * as sessionStorage from "../../../utils/sessionStorage";
import constant from '../../../shared/constant';
import * as configureStore from "../../../redux/store/configureStore.js";

const createFetchWithBearerToken = (accessToken, preferredLanguage) => (input, init) => {
  return fetch(input, {
    ...init,
    headers: {
      ...(init && init.headers ? init.headers : {}),
      Authorization: `Bearer ${accessToken}`,
      preferred_language: preferredLanguage == constant.NORWAY_LANGUAGE_CODE ? constant.API_NORWAY_LANGUAGE_CODE : constant.API_ENGLISH_LANGUAGE_CODE
    }
  });
};

const createFetchWithoutBearerToken = (preferredLanguage) => (input, init) => {
  return fetch(input, {
    ...init,
    headers: {
      ...(init && init.headers ? init.headers : {}),
      preferred_language: preferredLanguage == constant.NORWAY_LANGUAGE_CODE ? constant.API_NORWAY_LANGUAGE_CODE : constant.API_ENGLISH_LANGUAGE_CODE
    }
  });
};


const fetchWithBearerToken = (input, init) => {
  const token = JSON.parse(sessionStorage.getAuthToken());

  const accessToken = token != undefined ? token.auth_token : false;
  const preferredLanguage = token != undefined ? token.preferred_language : getLanguageCodeFromState();

  if (!accessToken) {
    return createFetchWithoutBearerToken(preferredLanguage)(input, init);
  }
  return createFetchWithBearerToken(accessToken, preferredLanguage)(input, init);
};

const getLanguageCodeFromState = () => {
  const stateFull = configureStore.store.getState();

  if (stateFull && stateFull.translation)
    return stateFull.translation.get('language');
  else
    return constant.NORWAY_LANGUAGE_CODE;
}

export default fetchWithBearerToken;
