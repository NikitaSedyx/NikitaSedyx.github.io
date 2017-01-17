'use strict';

const mongoose = require('../services/dbService');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    body: String,
    author: {
      email: String,
      _id: String
    },
    cratedAt: Date,
    updatedAt: Date
});

ArticleSchema.pre('save', function(next) {
  if (this.isNew) {
    this.cratedAt = new Date();
  }
  this.updatedAt = new Date();
  next();
});

ArticleSchema.pre('update', function() {
  this.update({}, {$set: {updatedAt: new Date()}});
});

module.exports = mongoose.model('Article', ArticleSchema);
