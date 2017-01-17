'use strict';

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

const Author = require('../models/author.js');

module.exports = (passport) => {
  passport.use('login', new LocalStrategy({
      passReqToCallback: true
    },
    function(req, username, password, done) {
      Author.findOne({ 'username' :  username }, 
        (err, user) => {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false);
          }

          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
          }

          return done(null, user);
        }
      );
  }));
};
