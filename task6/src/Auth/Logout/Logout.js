'use strict';

import React from 'react';
import {browserHistory} from 'react-router';

import auth from '../../shared/auth';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  logout() {
    auth.logout()
      .then(() => browserHistory.push('/'))
  }

  render() {
    return (
      <a className='logout' onClick={this.logout}>Logout</a>
    )
  }
}

export default Logout;
