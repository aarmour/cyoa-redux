import React, { Component, PropTypes } from 'react';
import MarkdownEditor from 'react-md-editor';
import MarkdownPreview from './MarkdownPreview';
import uniqueId from 'lodash.uniqueid';

export default class ScenarioEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { markdown: props.initialContent, showPreview: true };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleShowPreviewChange = this.handleShowPreviewChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleEditorChange(newMarkdown) {
    this.setState({ markdown: newMarkdown });
  }

  handleShowPreviewChange(e) {
    this.setState({ showPreview: e.target.checked });
  }

  handleSave() {
    const { onSave } = this.props;

    if (typeof onSave === 'function') {
      onSave(this.props.markdown);
    }
  }

  render() {
    const { markdown, showPreview } = this.state;
    const showPreviewChkId = uniqueId();

    let preview;

    if (this.state.showPreview) {
      preview = (
        <MarkdownPreview markdown={markdown} />
      );
    }

    return (
      <div>
        <input type="text" placeholder="Title" />
        <input type="checkbox" id={showPreviewChkId}
          checked={showPreview}
          onChange={this.handleShowPreviewChange} />
        <label htmlFor={showPreviewChkId}>Preview</label>
        <MarkdownEditor
          value={markdown}
          onChange={this.handleEditorChange}
        />
        {preview}
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }

}

ScenarioEditor.propTypes = {
  initialContent: PropTypes.string,
  onSave: PropTypes.func
};

ScenarioEditor.defaultProps = {
  initialContent: ''
};
