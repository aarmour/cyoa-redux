import React, { Component } from 'react';
import Editor from 'react-md-editor';
import MarkdownIt from 'markdown-it';
import uniqueId from 'lodash.uniqueid';

let markdown = new MarkdownIt();

export default class ScenarioEditor extends Component {

  constructor(props) {
    super(props);
    this.state = { code: '', showPreview: true };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleShowPreviewChange = this.handleShowPreviewChange.bind(this);
  }

  handleEditorChange(newCode) {
    this.setState({ code: newCode });
  }

  handleShowPreviewChange(e) {
    this.setState({ showPreview: e.target.checked });
  }

  render() {
    let showPreviewChkId = uniqueId();
    let preview;

    if (this.state.showPreview) {
      let html = markdown.render(this.state.code);

      preview = (
        <div dangerouslySetInnerHTML={{__html: html}} />
      );
    }

    return (
      <div>
        <input type="text" placeholder="Title" />
        <input type="checkbox" id={showPreviewChkId} checked={this.state.showPreview} onChange={this.handleShowPreviewChange} />
        <label htmlFor={showPreviewChkId}>Show preview</label>
        <Editor value={this.state.code} onChange={this.handleEditorChange} />
        {preview}
      </div>
    );
  }

}
