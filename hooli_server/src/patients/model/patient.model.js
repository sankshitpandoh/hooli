'use strict';
var mongoose = require('mongoose');

var patientsData = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    activity: {
        type: Array
    }
});


module.exports = mongoose.model("patientsData", patientsData); 