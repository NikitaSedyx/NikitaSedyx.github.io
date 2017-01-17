'use strict';

const PORT = process.env.PORT || 3000;

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const passport = require('passport');
require('./app/authenticate')(passport);

const app = express();

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(session({
    resave: true,
    secret: 'verySecretKey',
    saveUninitialized: false
  }))
  .use(flash())
  .use(passport.initialize())
  .use(passport.session())

.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

let router = require('./app/routes')(passport)
app.use('/api', router);

app.listen(PORT);
