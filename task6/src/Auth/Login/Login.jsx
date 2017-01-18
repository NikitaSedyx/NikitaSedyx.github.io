'use strict';

import React from 'react';
import {browserHistory, Link} from 'react-router';

import auth from '../../shared/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let uObj = {};
    uObj[event.target.name] = event.target.value;
    this.setState(uObj);
  }

  handleSubmit(event) {
    event.preventDefault();
    auth.login(this.state.username, this.state.password)
      .then(() => browserHistory.push('/'))
      .catch(() => {
        this.setState({errorMsg: 'Username or Password are incorrect'});
      });
  }

  render() {
    return (
      <div>
        {this.state.errorMsg ? <p>{this.state.errorMsg}</p> : null}
        <form name="loginForm" className="loginForm" onSubmit={this.handleSubmit}>
          <div>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
          </div>
          <div>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Login;
