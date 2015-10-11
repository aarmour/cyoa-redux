import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadStory, saveStory } from '../../actions';
import StoryEditor from '../../components/StoryEditor';

class StoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.handleStartEditingStory = this.handleStartEditingStory.bind(this);
    this.handleFinishEditingStory = this.handleFinishEditingStory.bind(this);
    this.handleSaveStory = this.handleSaveStory.bind(this);
  }

  componentDidMount() {
    const { params, loadStory } = this.props;

    if (params.storyId) {
      this.props.loadStory(params.storyId);
    }
  }

  handleStartEditingStory(focusElementRefName) {
    this.setState({ editing: true }, () => {
      if (focusElementRefName) {
        const focusElementRef = this.refs.storyEditor.refs[focusElementRefName];

        if (focusElementRef) {
          focusElementRef.focus();
        }
      }
    });
  }

  handleFinishEditingStory() {
    this.setState({ editing: false });
  }

  handleSaveStory(story) {
    this.props.saveStory(Object.assign({}, this.props.story, story));
  }

  renderViewStory() {
    const { title, description } = this.props.story;

    return (
      <div>
        <h3 onClick={this.handleStartEditingStory.bind(this, 'title')}>{title}</h3>
        <p onClick={this.handleStartEditingStory.bind(this, 'description')}>{description}</p>
      </div>
    );
  }

  renderEditStory() {
    const { title, description } = this.props.story;

    return (
      <StoryEditor
        ref="storyEditor"
        autoSave={true}
        initialTitle={title}
        initialDescription={description}
        onSave={this.handleSaveStory}
        onBlur={this.handleFinishEditingStory} />
    );
  }

  render() {
    const { story, route } = this.props;

    if (!story.id && route.path !== 'stories/new') {
      return <div>Loading...</div>
    }

    return this.state.editing ? this.renderEditStory() : this.renderViewStory();
  }

}

StoryPage.propTypes = {
  story: PropTypes.object,
  loadStory: PropTypes.func.isRequired,
  saveStory: PropTypes.func.isRequired
};

StoryPage.defaultProps = {
  story: {}
};

// StoryPage.contextTypes = {
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
)(StoryPage);
