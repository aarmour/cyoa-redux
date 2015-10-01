import React, { Component, PropTypes } from 'react';
import uniqueId from 'lodash.uniqueid';

export default class FormGroup extends Component {

  renderFormControl(id) {
    const { formControl, formControlOptions, onChange } = this.props;

    if (formControl === 'text') {
      return (
        <input type="text" id={id} />
      );
    }

    if (formControl === 'checkbox') {
      const checked = formControlOptions.checked;

      return (
        <input type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange} />
      );
    }
  }

  render() {
    const id = uniqueId();
    const label = this.props.label;

    return (
      <div>
        <label htmlFor={id}>{label}</label>
        {this.renderFormControl(id)}
      </div>
    );
  }

}

FormGroup.propTypes = {
  label: PropTypes.string,
  formControl: PropTypes.oneOf(['text', 'textarea', 'checkbox']),
  formControlOptions: PropTypes.shape({
    checked: PropTypes.bool
  }),
  onChange: PropTypes.func
};
