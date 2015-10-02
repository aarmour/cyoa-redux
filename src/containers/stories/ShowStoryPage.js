import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loadStory } from '../../actions';

class ShowStoryPage extends Component {

  componentDidMount() {
    this.props.loadStory(this.props.params.storyId);
  }

  render() {
    const { id, title, description } = this.props.story;
    const editPath = `/stories/${id}/edit`;

    return (
      <div>
        <Link to={editPath}>Edit</Link>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }

}

ShowStoryPage.propTypes = {
  story: PropTypes.object.isRequired,
  loadStory: PropTypes.func.isRequired
};

ShowStoryPage.defaultProps = {
  story: {}
};

function mapStateToProps(state, ownProps) {
  const {
    entities: { story }
  } = state;

  if (typeof story === 'undefined') return {};

  const currentStory = story[ownProps.params.storyId];

  if (typeof currentStory === 'undefined') return {};

  return {
    story: currentStory
  };
}

export default connect(
  mapStateToProps,
  { loadStory }
)(ShowStoryPage);
