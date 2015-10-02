import React, { Component, PropTypes } from 'react';
import FormGroupInput from './forms/FormGroupInput';
import FormGroupTextarea from './forms/FormGroupTextarea';

export default class StoryEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { title: props.initialTitle, description: props.initialDescription };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave(this.state);
  }

  handleDataChange(prop, e) {
    this.setState({ [prop]: e.target.value }, () => {
      if (this.props.autoSave) {
        this.props.onSave(this.state);
      }
    });
  }

  renderSaveButton() {
    if (!this.props.autoSave) {
      return <input type="submit" value="Save" />
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroupInput label="Title"
            value={this.state.title}
            onChange={this.handleDataChange.bind(this, 'title')} />
          <FormGroupTextarea label="Description"
            value={this.state.description}
            onChange={this.handleDataChange.bind(this, 'description')} />
          {this.renderSaveButton()}
        </form>
      </div>
    );
  }

}

StoryEditor.propTypes = {
  initialTitle: PropTypes.string,
  initialDescription: PropTypes.string,
  autoSave: PropTypes.bool,
  onSave: PropTypes.func.isRequired
};

StoryEditor.defaultProps = {
  initialTitle: '',
  initialDescription: '',
  autoSave: true
};
