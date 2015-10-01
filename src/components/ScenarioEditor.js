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
  }

  handleEditorChange(newMarkdown) {
    this.setState({ markdown: newMarkdown });
  }

  handleShowPreviewChange(e) {
    this.setState({ showPreview: e.target.checked });
  }

  render() {
    const { markdown, showPreview } = this.state;
    const showPreviewChkId = uniqueId();
    const handleEditorChange = this.handleEditorChange;
    const handleShowPreviewChange = this.handleShowPreviewChange;

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
          onChange={handleShowPreviewChange} />
        <label htmlFor={showPreviewChkId}>Show preview</label>
        <MarkdownEditor value={markdown} onChange={handleEditorChange} />
        {preview}
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
