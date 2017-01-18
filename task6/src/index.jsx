import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router';
import App from './App';
import Login from './Auth/Login';
import Signup from './Auth/Signup/';
import Articles from './Articles';
import './index.css';

import auth from './shared/auth';

auth.session()
  .then(() => {
    ReactDOM.render((
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={Login} onEnter={auth.isNotAuthenticated} />
          <Route path="signup" component={Signup} onEnter={auth.isNotAuthenticated} />
          <Route path="articles" component={Articles} onEnter={auth.isAuthenticated} />
        </Route>
      </Router>
      ), document.getElementById('root')
    );
  });
