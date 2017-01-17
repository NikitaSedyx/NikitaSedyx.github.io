'use strict';

const mongooseConf = require('../config/dbConf');
const bluebird = require('bluebird');

let instance = require('mongoose');
instance.connect(
  `mongodb://${mongooseConf.username}:${mongooseConf.password}@${mongooseConf.uri}:${mongooseConf.port}/${mongooseConf.dbName}`,
  {
    promiseLibrary: bluebird
  }
);

class MongoConnection {
  constructor() {
    return instance;
  }
}

module.exports = new MongoConnection();
