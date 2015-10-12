import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from '../middleware/localstorage-api';
import redirectMiddleware from '../middleware/redirect';
import createHistory from 'history/lib/createBrowserHistory';
import { reduxReactRouter } from 'redux-router';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = compose(
      applyMiddleware(
        thunkMiddleware,
        apiMiddleware,
        redirectMiddleware
      ),
      reduxReactRouter({ createHistory })
  )(createStore)(rootReducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
