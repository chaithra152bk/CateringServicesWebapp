import * as actions from "../../actions/action-types";
import Immutable from "immutable";

//INITIAL STATE
const initialState = {
  root: Immutable.Map({
    progress: undefined
  })
};

export default function rootReducer(state = initialState.root, action={}) {
  switch (action.type) {
    case actions.PROGRESS:
      return state.set('progress', action.progress);
    default:
      return state
  }
}