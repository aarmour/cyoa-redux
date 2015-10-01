import React, { Component } from 'react';
import MarkdownEditor from 'react-md-editor';
import MarkdownPreview from './MarkdownPreview';
import uniqueId from 'lodash.uniqueid';

export default class ScenarioEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { markdown: '', showPreview: true };
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
    const markdown = this.state.markdown;
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
          checked={this.state.showPreview}
          onChange={this.handleShowPreviewChange} />
        <label htmlFor={showPreviewChkId}>Show preview</label>
        <MarkdownEditor value={this.state.markdown} onChange={this.handleEditorChange} />
        {preview}
      </div>
    );
  }

}
