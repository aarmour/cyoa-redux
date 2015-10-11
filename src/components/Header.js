import React from 'react';
import { Link } from 'react-router';

export default function Header(props) {
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
