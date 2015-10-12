import React, { Component } from 'react';
import { ReduxRouter } from 'redux-router';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import App from './App';

// Pages
import ListStoriesPage from './stories/ListStoriesPage';
import NewStoryPage from './stories/NewStoryPage';
import StoryPage from './stories/StoryPage';
import ScenarioPage from './stories/ScenarioPage';

const store = configureStore();

export default class Root extends Component {

  render() {
    return (
      <Provider store={store}>
        <ReduxRouter>
          <Route path="/" component={App}>
            <Route path="stories"
                   component={ListStoriesPage} />
            <Route path="stories/new"
                   component={NewStoryPage} />
            <Route path="stories/:storyId"
                   component={StoryPage} />
            <Route path="scenarios/:scenarioId"
                   component={ScenarioPage} />
          </Route>
        </ReduxRouter>
      </Provider>
    );
  }

}
