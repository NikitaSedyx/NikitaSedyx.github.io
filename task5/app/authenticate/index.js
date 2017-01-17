'use strict';

const Author = require('../models/author.js');

module.exports = (passport) => {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    Author.findById(id, function(err, user) {
      done(err, user);
    });
  });

  require('./login')(passport);
  require('./signup')(passport);
};
