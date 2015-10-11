import React, { PropTypes } from 'react';
import MarkdownIt from 'markdown-it';

const markdownRenderer = new MarkdownIt();

export default function MarkdownPreview(props) {
  const markdown = props.markdown;
  const preview = markdownRenderer.render(markdown);

  return (
    <div dangerouslySetInnerHTML={{__html: preview}} />
  );
}

MarkdownPreview.propTypes = {
  markdown: PropTypes.string.isRequired
};
