'use strict';
var mongoose = require('mongoose');

var loginData = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    authToken: {
        type: String
    }
});


module.exports = mongoose.model("loginData", loginData); 