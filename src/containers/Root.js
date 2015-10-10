import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import App from './App';

// Pages
import ListStoriesPage from './stories/ListStoriesPage';
import ShowStoryPage from './stories/ShowStoryPage';
import EditStoryPage from './stories/EditStoryPage';
import EditScenarioPage from './stories/EditScenarioPage';

const history = createBrowserHistory();
const store = configureStore();

export default class Root extends Component {

  render() {
    return (
      <Provider store={store}>
        {() =>
          <Router history={history}>
            <Route path="/" component={App}>
              <Route path="stories"
                     component={ListStoriesPage} />
              <Route path="stories/new"
                     component={EditStoryPage} />
              <Route path="stories/:storyId"
                     component={ShowStoryPage} />
              <Route path="stories/:storyId/edit"
                     component={EditStoryPage} />
              <Route path="scenarios/:scenarioId/edit"
                     component={EditScenarioPage} />
            </Route>
          </Router>
        }
      </Provider>
    );
  }

}
