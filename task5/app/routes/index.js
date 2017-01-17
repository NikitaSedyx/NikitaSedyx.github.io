'use strict';

const router = require('express').Router();
const isAuthenticated = require('../services/authService.js').isAuthenticated;

module.exports = (passport) => {

  router.all(/^\/v1\/.*$/, isAuthenticated, function(req, res, next){
    next();
  })

  require('./authRouter')(router, passport);
  require('./authorRouter')(router);
  require('./articleRouter')(router);

  return router;
};
