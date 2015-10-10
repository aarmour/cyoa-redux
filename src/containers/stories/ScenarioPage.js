import React, { Component } from 'react';
import ScenarioEditor from '../../components/ScenarioEditor';

export default class EditScenarioPage extends Component {

  constructor(props) {
    super(props);
    this.state = { addingChildScenario: false };
    this.handleSaveScenario = this.handleSaveScenario.bind(this);
    this.handleAddChildScenario = this.handleAddChildScenario.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.addingChildScenario) {
      React.findDOMNode(this.refs.childScenarioInput).focus();
    }
  }

  handleSaveScenario(scenario) {
    this.setState({ addingChildScenario: false });
  }

  handleAddChildScenario() {
    this.setState({ addingChildScenario: true });
  }

  renderEditChildScenario() {
    if (!this.state.addingChildScenario) {
      return <button onClick={this.handleAddChildScenario}>Add scenario</button>
    } else {
      return <input type="text" onBlur={this.handleSaveScenario} ref="childScenarioInput"></input>
    }
  }

  render() {
    return (
      <div>
        <ScenarioEditor />
        {this.renderEditChildScenario()}
      </div>
    );
  }

}
