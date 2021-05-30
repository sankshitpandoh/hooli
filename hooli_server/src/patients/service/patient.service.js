'use strict';
const mongoose = require('mongoose');
let db = require('../../../middleware/db.middleware');
const getHashedPassword = require('../../../Plugins/utilities').getHashedPassword;
const getToken = require('../../../Plugins/utilities').token;
const authCheck = require('../../../Plugins/authCheck').authCheck;

async function uploadBulk(ctx) {
    if (ctx && ctx.request && ctx.request.body) {
        if (!ctx.request.header || !ctx.request.header.authorization ) {
            ctx.response.status = 401;
            ctx.response.body = {
                message: "UnAuthorized"
            };
        } else {
            let tokenValid = await authCheck({accessToken: ctx.request.header.authorization});
            if (tokenValid && tokenValid.valid) {
                if (!ctx.request.body.data || ctx.request.body.data.length < 1) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        message: "Data to upload cannot be empty"
                    };
                } else {
                    try {
                        let uniqueUsers = [];
                        for (let i = 0; i < ctx.request.body.data.length; i++) {
                            if (!uniqueUsers.includes(ctx.request.body.data[i]["First Name"].trim() + " " + ctx.request.body.data[i]["Last Name"].trim() + " " + ctx.request.body.data[i]["Age"].trim())) {
                                uniqueUsers.push(ctx.request.body.data[i]["First Name"].trim() + " " + ctx.request.body.data[i]["Last Name"].trim() + " " + ctx.request.body.data[i]["Age"].trim())
                            }
                        }
                        let dataToPush = [];
                        uniqueUsers.forEach((data, index) => {
                            let name = data.split(" ");
                            let userObj = {};
                            console.log(name)
                            userObj.firstName = name[0];
                            userObj.lastName = name[1];
                            userObj.age = name[2];
                            let activityObj = ctx.request.body.data.filter((usrData, idx) => {
                                if (usrData && usrData["First Name"] == userObj.firstName && usrData["Last Name"] == userObj.lastName && usrData["Age"] == userObj.age) {
                                    return{};
                                }
                            }).map((usrData) => {
                                return {
                                    date: usrData["Date"],
                                    hospital: usrData["Hospital"],
                                    admitted: usrData["Admitted"] ? true : false,
                                    visit: usrData["Visit"] ? true : false,
                                    reason: usrData["Reason"],
                                    paymentMode: usrData["Payment Mode"],
                                    amountPaid: usrData["Amount Paid"],
                                }
                            });
                            userObj.activity = activityObj;
                            dataToPush.push(userObj);
                        })
                        console.log("dataToPush ")
                        await mongoose.connection.db.collection("patientsData").insertMany(
                            dataToPush,
                        )
                        ctx.response.status = 200;
                        ctx.response.body = {
                            message: "Success"
                        };

                    } catch (err) {
                        console.log("Something went wrong in updating patients data", err);
                        ctx.response.status = 500;
                        ctx.response.body = {
                            message: "Internal Server Error"
                        };
                    }
                }
            } else {
                ctx.response.status = 401;
                ctx.response.body = {
                    message: "UnAuthorized"
                };
            }
        } 
    } else {
        ctx.response.status = 400;
        ctx.response.body = {
            message: "Malformed Request"
        };
    }
}


async function singleUpload(ctx) {
    //TO DO:::
    // HANDLE SINGLE UPLOAD
}

module.exports = {
    uploadBulk,
    singleUpload,
}