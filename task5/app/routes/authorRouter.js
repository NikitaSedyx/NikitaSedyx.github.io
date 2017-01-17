'use strict';

const restify = require('express-restify-mongoose');
const Author = require('../models/author');

let conf = require('../config/restifyConf');
conf.private = ['password'];

module.exports = (router) => {
  return restify.serve(router, Author, conf);
}
