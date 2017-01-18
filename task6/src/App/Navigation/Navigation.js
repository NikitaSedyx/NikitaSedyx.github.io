'use strict';

import React from 'react';
import {Link} from 'react-router';

import Logout from '../../Auth/Logout';

import auth from '../../shared/auth';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let links;
    if (auth.isLogged) {
      links = (
        <ul>
          <li><Link to='/articles'>Artiles</Link></li>
          <li><Logout></Logout></li>
        </ul>
      );
    } else {
      links = (
        <ul>
          <li><Link to={'/login'}>Login</Link></li>
          <li><Link to={'/signup'}>Signup</Link></li>
        </ul>
      );
    };
    return (
      <nav>
        {links}
      </nav>
    );
  }
}

export default Navigation;
