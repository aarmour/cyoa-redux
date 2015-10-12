import { pushState } from 'redux-router';

//
export default store => next => action => {
  const redirect = action.redirect;

  if (typeof redirect === 'undefined') {
    return next(action);
  }

  let shouldRedirect = redirect.shouldRedirect;

  if (typeof shouldRedirect === 'function') {
    shouldRedirect = shouldRedirect(action);
  }

  if (!shouldRedirect) {
    return next(action);
  }

  let path = redirect.path;

  if (typeof path === 'function') {
    path = redirect.path(action);
  }

  return next(pushState(null, path));
}
