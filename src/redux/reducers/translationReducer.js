import * as actions from "../../actions/action-types";
import Immutable from "immutable";
import constant from '../../shared/constant';

const initialState = {
translation: Immutable.Map({
    language: constant.ENGLISH_LANGUAGE_CODE
  })
};

export default function rootReducer(state = initialState.translation, action) {
    switch (action.type) {
        case actions.CHANGE_LANGUAGE:
            return state.set('language', action.language);
        default:
            return state;
    }
}