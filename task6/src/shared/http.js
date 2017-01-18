'use strict';

class http {
  static send(url, params = {}, options = {}) {
    url = new URL(url);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    options.credentials = 'include';
    let req = fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res.json();
      })
    return req;
  }

  static post(url, data, params = {}, options = {}) {
    options.method = 'POST';
    if (!options.headers) {
      options.headers = {};
    }
    options.headers['Content-type'] = 'application/json; charset=UTF-8';
    options.body = JSON.stringify(data);
    return http.send(url, params, options);
  }

  static get(url, params = {}, options = {}) {
    return http.send(url, params, options);
  }
}

export default http;
