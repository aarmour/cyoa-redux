import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import App from './App';

// Pages
import ListStoriesPage from './stories/ListStoriesPage';
import StoryPage from './stories/StoryPage';
import ScenarioPage from './stories/ScenarioPage';

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
                     component={StoryPage} />
              <Route path="stories/:storyId"
                     component={StoryPage} />
              <Route path="scenarios/:scenarioId"
                     component={ScenarioPage} />
            </Route>
          </Router>
        }
      </Provider>
    );
  }

}
