import { CALL_API, Schemas } from '../middleware/localstorage-api';

export const STORIES_REQUEST = 'STORIES_REQUEST';
export const STORIES_SUCCESS = 'STORIES_SUCCESS';
export const STORIES_FAILURE = 'STORIES_FAILURE';

function fetchStories() {
  return {
    [CALL_API]: {
      types: [STORIES_REQUEST, STORIES_SUCCESS, STORIES_FAILURE],
      endpoint: 'stories',
      schema: Schemas.STORY_ARRAY
    }
  };
}

export function loadStories() {
  return (dispatch, getState) => {
    return dispatch(fetchStories());
  };
}

export const STORY_REQUEST = 'STORY_REQUEST';
export const STORY_SUCCESS = 'STORY_SUCCESS';
export const STORY_FAILURE = 'STORY_FAILURE';

function fetchStory(id) {
  return {
    [CALL_API]: {
      types: [STORY_REQUEST, STORY_SUCCESS, STORY_FAILURE],
      endpoint: `stories/${id}`,
      schema: Schemas.STORY
    }
  };
}

export function loadStory(id) {
  return (dispatch, getState) => {
    return dispatch(fetchStory(id));
  }
}

export const STORY_CREATE = 'STORY_CREATE';

function createStory(story) {
  return {
    [CALL_API]: {
      types: [STORY_CREATE, STORY_SUCCESS, STORY_FAILURE],
      endpoint: 'stories',
      method: 'POST',
      schema: Schemas.STORY,
      entity: story
    }
  }
}

export const STORY_UPDATE = 'STORY_UPDATE';

function updateStory(story) {
  return {
    [CALL_API]: {
      types: [STORY_UPDATE, STORY_SUCCESS, STORY_FAILURE],
      endpoint: `stories/${story.id}`,
      method: 'PUT',
      schema: Schemas.STORY,
      entity: story
    }
  };
}

export function saveStory(story) {
  return (dispatch, getState) => {
    if (story.id) {
      return dispatch(updateStory(story));
    } else {
      return dispatch(createStory(story));
    }
  };
}
