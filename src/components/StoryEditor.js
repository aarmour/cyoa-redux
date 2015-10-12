import React, { Component, PropTypes } from 'react';

export default class StoryEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { title: props.initialTitle, description: props.initialDescription };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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

  handleBlur() {
    if (!this.props.onBlur) return;

    // Allow blur event to be processed and activeElement updated
    setTimeout(() => {
      for (let ref in this.refs) {
        if (this.refs[ref] === document.activeElement) return;
      }

      this.props.onBlur();
    }, 0);
  }

  renderSaveButton() {
    if (!this.props.autoSave) {
      return <input type="submit" value="Save" />
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          ref="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleDataChange.bind(this, 'title')}
          onBlur={this.handleBlur}
        />
        <textarea
          ref="description"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleDataChange.bind(this, 'description')}
          onBlur={this.handleBlur}
        />
        {this.renderSaveButton()}
      </form>
    );
  }

}

StoryEditor.propTypes = {
  initialTitle: PropTypes.string,
  initialDescription: PropTypes.string,
  autoSave: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onBlur: PropTypes.func
};

StoryEditor.defaultProps = {
  initialTitle: '',
  initialDescription: '',
  autoSave: true
};
