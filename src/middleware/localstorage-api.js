import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys, decamelizeKeys } from 'humps';

function uniqueId() {
  const id = Number.parseInt(localStorage.getItem('current_id') || 1);

  localStorage.setItem('current_id', id + 1);

  return id;
}

function endpointToLocalStorageKey(endpoint) {
  return endpoint.replace('/', '_');
}

function callApi(endpoint, method = 'GET', schema, entity) {
  let key = endpointToLocalStorageKey(endpoint);

  if (method === 'POST' || method === 'PUT') {
    let data;

    if (method === 'POST') {
      const newId = uniqueId();

      key = `${key}_${newId}`;
      data = Object.assign({}, entity, { id: newId });
    } else {
      data = Object.assign({}, entity);
    }

    const decamelizedData = decamelizeKeys(data);

    localStorage.setItem(key, JSON.stringify(decamelizedData));

    return Object.assign({}, normalize(data, schema));
  } else {
    const item = localStorage.getItem(key);

    if (!item) return;

    const json = JSON.parse(item);
    const camelizedJson = camelizeKeys(json);

    return Object.assign({}, normalize(camelizedJson, schema));
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
