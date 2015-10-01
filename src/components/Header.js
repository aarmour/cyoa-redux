import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {

  render() {
    return (
      <header>
        <section>
          <nav>
            <ul>
              <li><Link to="/stories">My stories</Link></li>
              <li><Link to="/stories/new">Create a new story</Link></li>
            </ul>
          </nav>
        </section>
      </header>
    );
  }

}
