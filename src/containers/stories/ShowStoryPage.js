import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadStory } from '../../actions';

class ShowStoryPage extends Component {

  componentDidMount() {
    this.props.loadStory(this.props.params.storyId);
  }

  render() {
    const { title, description } = this.props.story;

    return (
      <div>
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

  if (typeof story === 'undefined') return state;

  return {
    story: story[ownProps.params.storyId]
  };
}

export default connect(
  mapStateToProps,
  { loadStory }
)(ShowStoryPage);
