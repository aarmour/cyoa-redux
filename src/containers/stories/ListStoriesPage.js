import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ListStoriesPage extends Component {

  render() {
    const stories = this.props.stories;

    if (!stories.length) {
      return <h4>You have no stories yet. <Link to="/stories/new">Create a new story!</Link></h4>
    }

    return (
      <div>
        <ul>
        </ul>
      </div>
    );
  }

}

ListStoriesPage.propTypes = {
  stories: PropTypes.array,
  loadStories: PropTypes.func
};

ListStoriesPage.defaultProps = {
  stories: []
};
