import React, { Component, PropTypes } from 'react';
import FormGroup from './forms/FormGroup';

export default class StoryEditor extends Component {

  render() {
    return (
      <div>
        <form>
          <FormGroup label="Title" formControl="text" />
        </form>
      </div>
    );
  }

}
