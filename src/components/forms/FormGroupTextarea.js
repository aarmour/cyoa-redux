import React, { Component, PropTypes } from 'react';
import uniqueId from 'lodash.uniqueid';

export default class FormGroupTextarea extends Component {

  render() {
    const id = uniqueId();
    const label = this.props.label;

    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <textarea id={id} {...this.props}></textarea>
      </div>
    );
  }

}

FormGroupTextarea.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func
};
