'use strict';

const LocalStrategy = require('passport-local').Strategy;

const Author = require('../models/author.js');

module.exports = function (passport) {
  passport.use('signup', new LocalStrategy({
          passReqToCallback: true
      },
      function(req, username, password, done) {
          process.nextTick(function () {
              let email = req.param('email');
              Author.findOne({$or: [{'username': username} , {'email': email}]}, function (err, user) {
                  if (err) {
                      return done(err);
                  }

                  if (user) {
                      let message = `User with username '${username}' already exists`;
                      if (user.username != username) {
                        message = `User with email '${email}' already exists`;
                      }
                      return done(null, false, {message});
                  }

                  let newUser = new Author();
                  newUser.username = username;
                  newUser.password = password;
                  newUser.email = email;

                  newUser.save(function (err) {
                      if (err) {
                          throw err;
                      }
                      return done(null, true);
                  });
              });
          });
      })
  );
};
