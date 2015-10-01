import React, { Component, PropTypes } from 'react';

export default class Scenarios extends Component {
  render() {
    return (
      <ul>
        {this.props.scenarios.map((scenario, i) =>
          <li key={i}>{scenario.title}</li>
        )}
      </ul>
    );
  }
}

Scenarios.propTypes = {
  scenarios: PropTypes.array.isRequired
};
