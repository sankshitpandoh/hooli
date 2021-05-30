'use strict';
const mongoose = require('mongoose');
const config = require('../config/mongo.config');
try {
    mongoose.connect(config.mongo.connString, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
    console.log('DB connected');
    }).catch((err) => {
    console.log('DB connection error', err)
    })
} catch (err) {
    console.log("Couldn't connect to mongo", err)
}

mongoose.Promise = global.Promise;

module.exports = {
    loginData: require('../src/login/model/login.model'),
};
