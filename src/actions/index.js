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
    const stories = getState().stories;

    if (typeof stories !== 'undefined') return null;

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
    const story = getState().currentStory;

    if (story && story.id === id) return null;

    return dispatch(fetchStory(id));
  }
}
