import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadStory, saveStory } from '../../actions';
import StoryEditor from '../../components/StoryEditor';
import ScenarioEditor from '../../components/ScenarioEditor';

class StoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = { editingStoryDetails: false, editingScenario: false };
    this.handleStartEditingStoryDetails = this.handleStartEditingStoryDetails.bind(this);
    this.handleFinishEditingStoryDetails = this.handleFinishEditingStoryDetails.bind(this);
    this.handleStartEditingScenario = this.handleStartEditingScenario.bind(this);
    this.handleSaveStory = this.handleSaveStory.bind(this);
    this.handleSaveScenario = this.handleSaveScenario.bind(this);
  }

  componentDidMount() {
    const { params, loadStory } = this.props;

    if (params.storyId) {
      this.props.loadStory(params.storyId);
    }
  }

  handleStartEditingStoryDetails(focusElementRefName) {
    this.setState({ editingStoryDetails: true }, () => {
      if (focusElementRefName) {
        const focusElementRef = this.refs.storyEditor.refs[focusElementRefName];

        if (focusElementRef) {
          focusElementRef.focus();
        }
      }
    });
  }

  handleFinishEditingStoryDetails() {
    this.setState({ editingStoryDetails: false });
  }

  handleStartEditingScenario() {
    this.setState({ editingScenario: true });
  }

  handleSaveStory(story) {
    this.props.saveStory(Object.assign({}, this.props.story, story));
  }

  handleSaveScenario(scenario) {
    this.setState({ editingScenario: false });
  }

  renderStoryDetails() {
    const { title, description } = this.props.story;

    if (this.state.editingStoryDetails) {
      return (
        <StoryEditor
          ref="storyEditor"
          autoSave={true}
          initialTitle={title}
          initialDescription={description}
          onSave={this.handleSaveStory}
          onBlur={this.handleFinishEditingStoryDetails}
        />
      );
    } else {
      return (
        <div>
          <h3 onClick={this.handleStartEditingStoryDetails.bind(this, 'title')}>{title}</h3>
          <p onClick={this.handleStartEditingStoryDetails.bind(this, 'description')}>{description}</p>
        </div>
      );
    }
  }

  renderScenario() {
    if (this.state.editingScenario) {
      return (
        <div>
          <ScenarioEditor onSave={this.handleSaveScenario} />
        </div>
      );
    } else {
      return (
        <div>
          <p onClick={this.handleStartEditingScenario}>SCENARIO PLACEHOLDER</p>
        </div>
      );
    }
  }

  render() {
    const { story, route } = this.props;
    const { editingStoryDetails, editingScenario} = this.state;

    if (!story.id) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {this.renderStoryDetails()}
        {this.renderScenario()}
      </div>
    );
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
