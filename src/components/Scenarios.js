import React, { PropTypes } from 'react';

export default function Scenarios(props) {
  return (
    <ul>
      {props.scenarios.map((scenario, i) =>
        <li key={i}>{scenario.title}</li>
      )}
    </ul>
  );
}

Scenarios.propTypes = {
  scenarios: PropTypes.array.isRequired
};
