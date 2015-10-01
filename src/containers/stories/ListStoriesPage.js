import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadStories } from '../../actions';

class ListStoriesPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadStories();
  }

  render() {
    const stories = this.props.stories;

    if (!Object.keys(stories).length) {
      return <h4>You have no stories yet. <Link to="/stories/new">Create a new story!</Link></h4>
    }

    return (
      <div>
        <ul>
          {Object.keys(stories).map(key => {
              const path = `/stories/${key}`;

              return (
                <li key={key}>
                  <Link to={path}>{stories[key].title}</Link>
                </li>
              );
          })}
        </ul>
      </div>
    );
  }

}

ListStoriesPage.propTypes = {
  stories: PropTypes.object.isRequired,
  loadStories: PropTypes.func.isRequired
};

ListStoriesPage.defaultProps = {
  stories: {}
};

function mapStateToProps(state) {
  const stories = state.entities.story;

  return {
    stories
  };
}

export default connect(
  mapStateToProps,
  { loadStories }
)(ListStoriesPage);
