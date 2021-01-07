import { call, put, take, select } from "redux-saga/effects";
import {history} from "../utils/helper/history";
import * as rootActions from "../actions/root-actions";
import * as sessionActions from "./session-saga";
import * as notificationSaga from './notification-saga';
import Notification from '../components/common/notification/Notification';
import constant from "../shared/constant";
const toast = new Notification()

const SESSION_EXPIRED = "session/SESSION_EXPIRED";
const RESOURCE_FORBIDDEN = "session/RESOURCE_FORBIDDEN";
const RESOURCE_UNAUTHORIZED = "session/RESOURCE_UNAUTHORIZED";
const API_ERROR = "session/API_ERROR";

//DEFINE ACTION CREATERS
function sessionExpired() {
    return {
        type: SESSION_EXPIRED
    };
}

function resourceForbidden() {
    return {
        type: RESOURCE_FORBIDDEN
    };
}


function resourceUnauthorized() {
    return {
        type: RESOURCE_UNAUTHORIZED
    };
}

function apiError(error) {
    return {
        type: RESOURCE_UNAUTHORIZED,
        payload: error
    };
}

export function* apiCall(fn, ...rest) {
    let checkWhichApiObject = { ...rest };
    let checkWhichApi = Object.keys(checkWhichApiObject).length > 0 ? checkWhichApiObject[0] : {};

    if (checkWhichApi)
        if (checkWhichApi.nationalityText == undefined && checkWhichApi.skillText == undefined
            && checkWhichApi.languageText == undefined && checkWhichApi.industryText == undefined
            && checkWhichApi.locationText == undefined && checkWhichApi.countryText == undefined && checkWhichApi != 'noProgress')
            yield put(rootActions.controlProgress(true));

    try {
        const response = yield call(fn, ...rest);
        //In some cases API doesn't return any response when it's a success
        if (response == null)
            return "OK"

        return response;
    } catch (error) {
        const message = error.message.errors ? error.message.errors[0].message || '' : error.message.Message
        if (error.status == 400) {
            if(!checkWhichApi.redirectUrlIfError)
            {
            toast.show(message, constant.error);
            }
            else{
            checkWhichApi.redirectUrlIfError && checkWhichApi.history.push(checkWhichApi.redirectUrlIfError);
        }
    }

        else if (error.status === 401) {
            yield put(sessionActions.logout(history))
            return error;
        }
        else if (error.status == 500) {
            toast.show(message, constant.error);
        }
        else if (error.status == 403) {
            toast.show(message, constant.error);
        }
        else if (error.status == 419) {
            toast.show(message, constant.error);
        }
        else if (message != '') {
            toast.show(message, constant.error);
        }

        return undefined;
    } finally {
        yield put(rootActions.controlProgress(false));
    }
}
