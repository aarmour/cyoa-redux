import React, { Component } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router';

export default class App extends Component {

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }

}
