import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadStory, saveStory } from '../../actions';
import StoryEditor from '../../components/StoryEditor';

class EditStoryPage extends Component {

  constructor(props) {
    super(props);
    this.handleSaveStory = this.handleSaveStory.bind(this);
  }

  componentDidMount() {
    const { params, loadStory } = this.props;

    if (params.storyId) {
      this.props.loadStory(params.storyId);
    }
  }

  handleSaveStory(story) {
    this.props.saveStory(Object.assign({}, this.props.story, story));
  }

  render() {
    const { story, route } = this.props;

    if (!story.id && route.path !== 'stories/new') {
      return <div>Loading...</div>
    }

    return (
      <div>
        <StoryEditor autoSave={route.path !== 'stories/new'}
          initialTitle={story.title}
          initialDescription={story.description}
          onSave={this.handleSaveStory} />
      </div>
    );
  }

}

EditStoryPage.propTypes = {
  story: PropTypes.object,
  saveStory: PropTypes.func.isRequired
};

EditStoryPage.defaultProps = {
  story: {}
};

// EditStoryPage.contextTypes = {
//   router: PropTypes.func.isRequired
// };

function mapStateToProps(state, ownProps) {
  const {
    entities: { stories }
  } = state;

  if (typeof stories === 'undefined') return {};

  const currentStory = stories[ownProps.params.storyId];

  if (typeof currentStory === 'undefined') return {};

  return {
    story: currentStory
  };
}

export default connect(
  mapStateToProps,
  { loadStory, saveStory }
)(EditStoryPage);
