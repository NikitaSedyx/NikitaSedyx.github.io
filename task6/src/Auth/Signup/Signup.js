'use strict';

import React from 'react';
import {browserHistory, Link} from 'react-router';

import auth from '../../shared/auth';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = {
      username: this.username.value,
      password: this.password.value,
      email: this.email.value
    }
    auth.signup(user)
      .then(() => browserHistory.push('/login'))
      .catch(() => {
        this.setState({errorMsg: 'Incorrect data'});
      });
  }

  render() {
    return (
      <div>
        {this.state.errorMsg ? <p>{this.state.errorMsg}</p> : null}
        <form name="signupForm" className="loginForm" onSubmit={this.handleSubmit}>
          <div>
            <input type="text" name="username" ref={(input) => this.username = input} />
          </div>
          <div>
            <input type="email" name="email" ref={(input) => this.email = input} />
          </div>
          <div>
            <input type="password" name="password" ref={(input) => this.password = input} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Signup;
