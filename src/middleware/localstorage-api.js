import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys, decamelizeKeys } from 'humps';
import get from 'lodash.get';
import set from 'lodash.set';
import merge from 'lodash.merge';

function uniqueId() {
  const id = Number.parseInt(localStorage.getItem('current_id') || 1);

  localStorage.setItem('current_id', id + 1);

  return id;
}

function endpointToPath(endpoint) {
  return endpoint.replace('/', '.');
}

function callApi(endpoint, method = 'GET', schema, entity) {
  let data = JSON.parse(localStorage.getItem('entities') || '{}');

  if (method === 'POST' || method === 'PUT') {
    let path = endpointToPath(endpoint);
    const id = (method === 'POST' ? uniqueId() : entity.id);
    entity = Object.assign({}, entity, { id: id });
    const decamelizedEntity = Object.assign({}, decamelizeKeys(entity));

    if (method === 'PUT') {
      // Remove the id from the path
      path = path.split('.').slice(0, -1).join('.');
    }

    data = merge({}, data, set({}, path, { [id]: decamelizedEntity }));
    localStorage.setItem('entities', JSON.stringify(data));

    return Object.assign({}, normalize(entity, schema));
  } else {
    let entities = get(data, endpointToPath(endpoint));

    if (!entities) return null;

    const endpointParts = endpoint.split('/');
    const isArray = !Number.isInteger(Number.parseInt(endpointParts[endpointParts.length - 1]));

    if (isArray) {
      entities = Object.keys(entities).map(k => Object.assign({}, entities[k], { id: k }));
    }

    const camelizedEntities = camelizeKeys(entities);

    return Object.assign({}, normalize(camelizedEntities, schema));
  }
}

const storySchema = new Schema('story', {
  idAttribute: 'id'
});

// Schemas for API responses.
export const Schemas = {
  STORY: storySchema,
  STORY_ARRAY: arrayOf(storySchema)
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// Redux middleware that interprets actions with CALL_API info specified.
// Stores and fetches data in/from local storage, using the API
// endpoint as the key.
export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { method, schema, types, entity } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  const response = callApi(endpoint, method, schema, entity);
  next(actionWith({
    response,
    type: successType
  }));
}
