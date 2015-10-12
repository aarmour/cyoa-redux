import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { saveStory } from '../../actions';
import StoryEditor from '../../components/StoryEditor';

class NewStoryPage extends Component {

  constructor(props) {
    super(props);
    this.handleSaveStory = this.handleSaveStory.bind(this);
  }

  handleSaveStory(story) {
    this.props.saveStory(Object.assign({}, this.props.story, story));
  }

  render() {
    return (
      <div>
        <StoryEditor
          autoSave={false}
          onSave={this.handleSaveStory}
        />
      </div>
    );
  }

}

NewStoryPage.propTypes = {
  story: PropTypes.object,
  saveStory: PropTypes.func.isRequired
};

NewStoryPage.defaultProps = {
  story: {}
};

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  { saveStory }
)(NewStoryPage);
