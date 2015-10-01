import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';

function title(state = 'My Story', action) {
  switch (action.type) {
    case ActionTypes.UPDATE_TITLE:
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  title
});

export default rootReducer;
