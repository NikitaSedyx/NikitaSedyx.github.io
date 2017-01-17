'use strict';

const mongoose = require('../services/dbService');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    username: {
      type: String,
      required: true,
      min: [3, 'Username should >=3'],
      index: {
        unique: true
      }
    },
    password: {
      type: String,
      required: true,
      min: [6, 'Password should >=6'],
      validate: {
        validator: (v) => {
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]*$/.test(v);
        },
        message: 'Password is not strong.'
      }
    },
    email: {
      type: String,
      index: {
        unique: true
      }
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
});

AuthorSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
  next();
});

module.exports = mongoose.model('Author', AuthorSchema);
