import * as ActionTypes from '../actions';
import merge from 'lodash.merge';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities.
function entities(state = {}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

const rootReducer = combineReducers({
  entities
});

export default rootReducer;
