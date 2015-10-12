import merge from 'lodash.merge';
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

// Updates an entity cache in response to any action with response.entities.
function entities(state = {}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

const rootReducer = combineReducers({
  entities,
  router: routerStateReducer
});

export default rootReducer;
