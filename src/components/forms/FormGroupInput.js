import React, { Component, PropTypes } from 'react';
import uniqueId from 'lodash.uniqueid';

const DEFAULT_TYPE = 'text';
const INPUT_TYPES = ['text', 'email', 'password'];

export default class FormGroupInput extends Component {

  render() {
    const id = uniqueId();
    const label = this.props.label;

    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...this.props} />
      </div>
    );
  }

}

FormGroupInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(INPUT_TYPES),
  onChange: PropTypes.func
};

FormGroupInput.defaultProps = {
  type: DEFAULT_TYPE
};
