import * as actions from '../../actions/action-types';
import Immutable from "immutable";

const initialState = {
message: Immutable.Map({
    messageType: '',
    messageProps: {},
    apiResponse: {}
  })
};

export default function messageReducer(state = initialState.message, action = []) {
    switch (action.type) {
        case actions.SHOW_MESSAGE:
            return state.withMutations(state => state
                .set('messageType', action.messageType)
                .set('messageProps', action.messageProps)
                .set('apiResponse', action.apiResponse)
            );
        case actions.HIDE_MESSAGE:
            return state.withMutations(state => state
                .set('messageType', '')
                .set('messageProps', {})
                .set('apiResponse', {}) 
            );
        default:
            return state;
    }

}
