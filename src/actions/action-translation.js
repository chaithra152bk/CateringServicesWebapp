import * as actions from "../actions/action-types";

export function switchLanguage(language) {
    return {
        type: actions.CHANGE_LANGUAGE,
        language: language
    };
}