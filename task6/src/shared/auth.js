'use strict';

import http from './http';

let instance = null;

class Auth {
  constructor() {
    if (!instance) {
      instance = this;
      instance.isLogged = false;
    }
    return instance;
  }

  session() {
    return http.get('http://localhost:3000/api/session')
      .then((res) => {
        this.isLogged = true;
        this.username = res.email;
        return res;
      })
      .catch(() => false);
  }

  login(username, password) {
    let data = {username, password};
    return http.post('http://localhost:3000/api/login', data)
      .then((res) => {
        this.isLogged = true;
        this.username = res.email;
        return res;
      })
  }

  signup(user) {
    return http.post('http://localhost:3000/api/signup', user);
  }

  logout() {
    return http.get('http://localhost:3000/api/signout')
      .then(() => this.isLogged = false);
  }

  isNotAuthenticated(nextState, replace) {
    if (instance.isLogged) {
      replace('/');
    }
  }

  isAuthenticated(nextState, replace) {
    if (!instance.isLogged) {
      replace('/login');
    }
  }
}

export default new Auth();
