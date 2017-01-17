'use strict';

const restify = require('express-restify-mongoose');
const Article = require('../models/article');

let conf = require('../config/restifyConf');
conf.preCreate = function(req, res, next) {
  req.body.author = {
    email: req.user.email,
    _id: req.user._id
  }
  next();
}

module.exports = (router) => {
  return restify.serve(router, Article, conf);
}
