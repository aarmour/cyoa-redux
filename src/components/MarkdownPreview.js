import React, { Component, PropTypes } from 'react';
import MarkdownIt from 'markdown-it';

let markdownRenderer = new MarkdownIt();

export default class MarkdownPreview extends Component {

  render() {
    const markdown = this.props.markdown;
    const preview = markdownRenderer.render(markdown);

    return (
      <div dangerouslySetInnerHTML={{__html: preview}} />
    );
  }

}

MarkdownPreview.propTypes = {
  markdown: PropTypes.string.isRequired
};
