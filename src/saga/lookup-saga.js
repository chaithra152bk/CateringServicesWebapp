import Immutable from "immutable";
import { put, select, take } from "redux-saga/effects";
import constant from "../shared/constant";
import Notification from '../components/common/notification/Notification';
import * as Api from "../services/api/lookupApi";
import { apiCall } from './requestSaga';
import * as helper from '../utils/helper/helper';
const toast = new Notification()

//DEFINE ACTIONS
const GET_LOCATION_REQUEST = "lookup/GET_LOCATION_REQUEST";
const SET_LOCATION_REQUEST_SUCCESS = "lookup/SET_LOCATION_REQUEST_SUCCESS";

const GET_INDUSTRY_WITH_CATEGORY_REQUEST = "lookup/GET_INDUSTRY_WITH_CATEGORY_REQUEST";
const SET_INDUSTRY_WITH_CATEGORY_REQUEST_SUCCESS = "lookup/SET_INDUSTRY_WITH_CATEGORY_REQUEST_SUCCESS";

const GET_SKILLS_REQUEST = "lookup/GET_SKILLS_REQUEST";
const SET_SKILLS_REQUEST_SUCCESS = "lookup/SET_SKILLS_REQUEST_SUCCESS";

const GET_STATE_WITH_LOCATION_REQUEST = "lookup/GET_STATE_WITH_LOCATION_REQUEST";
const SET_STATE_WITH_LOCATION_REQUEST_SUCCESS = "lookup/SET_STATE_WITH_LOCATION_REQUEST_SUCCESS";

const GET_REASON_FOR_DELETE_REQUEST = "account/GET_REASON_FOR_DELETE_REQUEST";
const SET_REASON_FOR_DELETE_SUCCESS = "account/SET_REASON_FOR_DELETE_SUCCESS";

const SET_LIST_EMPTY = "lookup/SET_LIST_EMPTY";


//DEFINE ACTION CREATERS
export function getLocationRequest(text, searchAllCountries) {
    return {
        type: GET_LOCATION_REQUEST,
        text: text,
        searchAllCountries: searchAllCountries
    }
}

function setLocationSuccess(response) {
    return {
        type: SET_LOCATION_REQUEST_SUCCESS,
        response: response
    }
}

export function getIndustryWithCategoryRequest() {
    return {
        type: GET_INDUSTRY_WITH_CATEGORY_REQUEST
    }
}

function setIndustryWithCategorySuccess(response) {
    return {
        type: SET_INDUSTRY_WITH_CATEGORY_REQUEST_SUCCESS,
        response: response
    }
}

export function getSkillsRequest(text) {
    return {
        type: GET_SKILLS_REQUEST,
        text: text
    }
}

function setSkillsSuccess(response) {
    return {
        type: SET_SKILLS_REQUEST_SUCCESS,
        response: response
    }
}

export function getStateWithLocationRequest(countryId) {
    return {
        type: GET_STATE_WITH_LOCATION_REQUEST,
        countryId: countryId
    }
}

function setStateWithLocationSuccess(response) {
    return {
        type: SET_STATE_WITH_LOCATION_REQUEST_SUCCESS,
        response: response
    }
}

export function getReasonForDeleteRequest() {
    return {
        type: GET_REASON_FOR_DELETE_REQUEST
    }
}

function setReasonForDeleteSuccess(response) {
    return {
        type: SET_REASON_FOR_DELETE_SUCCESS,
        response: response
    }
}

export function setListEmpty(name) {
    return {
        type: SET_LIST_EMPTY,
        name: name
    }
}


//DEFINE INITIAL STATE
const initialState = {
    lookupData: Immutable.Map({
        locationList: [],
        industryCategoriesList: [],
        skillList: [],
        statesWithLocationList: [],
        reasonList: []
    })
};

//DEFINE REDUCER
export function lookupReducer(state = initialState.lookupData, action) {
    switch (action.type) {
        case SET_LOCATION_REQUEST_SUCCESS:
            return state.withMutations(state => state.set('locationList', action.response));
        case SET_INDUSTRY_WITH_CATEGORY_REQUEST_SUCCESS:
            return state.withMutations(state => state.set('industryCategoriesList', action.response));
        case SET_SKILLS_REQUEST_SUCCESS:
            return state.withMutations(state => state.set('skillList', action.response));
        case SET_STATE_WITH_LOCATION_REQUEST_SUCCESS:
            return state.withMutations(state => state.set('statesWithLocationList', action.response));
        case SET_REASON_FOR_DELETE_SUCCESS:
                return state.withMutations(state => state.set('reasonList', action.response));
        case SET_LIST_EMPTY:
            return state.withMutations(state => state.set(action.name, []))
        default:
            return state;
    }
}

// export const getCandidateCertificationsData = (state) => state.candidateCertifications


export function* getLocationLookupFlow() {
    const check = true;
    while (check) {
        const { text, searchAllCountries } = yield take(GET_LOCATION_REQUEST);
        const response = yield apiCall(Api.fetchLocation, { locationText: text, searchAllCountries: searchAllCountries });
        if (response && response != 'OK') {
            yield put(setLocationSuccess(response))
        }
    }
}

export function* getIndustryWithCategoryLookupFlow() {
    const check = true;
    while (check) {
        yield take(GET_INDUSTRY_WITH_CATEGORY_REQUEST);
        const response = yield apiCall(Api.fetchIndustryWithCategory);
        if (response && response != 'OK') {
            yield put(setIndustryWithCategorySuccess(response))
        }
    }
}

export function* getSkillsLookupFlow() {
    const check = true;
    while (check) {
        const { text } = yield take(GET_SKILLS_REQUEST);
        const response = yield apiCall(Api.fetchSkills, { skillText: text });
        if (response && response != 'OK') {
            yield put(setSkillsSuccess(response))
        }
    }
}

export function* getStateWithLocationLookupFlow() {
    const check = true;
    while (check) {
        const { countryId } = yield take(GET_STATE_WITH_LOCATION_REQUEST);
        const response = yield apiCall(Api.fetchStateWithLocation, countryId);
        if (response && response != 'OK') {
            yield put(setStateWithLocationSuccess(response))
        }
    }
}

