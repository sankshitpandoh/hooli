'use strict';
const mongoose = require('mongoose');
const getHashedPassword = require('../../../Plugins/utilities').getHashedPassword;
const getToken = require('../../../Plugins/utilities').token;

async function userLogin(ctx) {
    if (ctx && ctx.request && ctx.request.body) {
        if (!ctx.request.body.username) {
            ctx.response.status = 400;
            ctx.response.body = {
                message: "Username cannot be empty"
            };
        } else if (!ctx.request.body.password) {
            ctx.response.status = 400;
            ctx.response.body = {
                message: "Password cannot be empty"
            };
        } else {
            try {
                // getHashedPassword(ctx.request.body.password).then( async (res) => {
                //     let allowToProceed = await mongoose.connection.db.collection("users").find({
                //         username: ctx.request.body.username,
                //         password: res.hashedString
                //     }).toArray();
                //     if (allowToProceed && allowToProceed.length > 0) {
                //         let authToken = getToken(64);
                //         // TO DO::::
                //         // ::::::
                //         // store auth token in db for verfy sesisons
                //         ctx.response.status = 200;
                //         ctx.response.body = {
                //             message: "Success",
                //             token: authToken
                //         };
                //     } else {
                //         ctx.response.status = 401;
                //         ctx.response.body = {
                //             message: "Invalid Username or Password"
                //         };
                //     }
                // }).catch((err) => {
                //     console.log("Something went wrong in hashing the password", err);
                //     ctx.response.status = 500;
                //     ctx.response.body = {
                //         message: "Internal Server Error"
                //     };
                // })
                ctx.response.status = 200;
                        ctx.response.body = {
                            message: "Success",
                            token: "authToken",
                            userData: {
                                name: "dummy name"
                            }
                        };
            } catch (err) {
                console.log("Something went wrong in user Login", err);
                ctx.response.status = 500;
                ctx.response.body = {
                    message: "Internal Server Error"
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


async function superLogin(ctx) {
    // TO DO:::
    // Super user role handling to be added
    console.log("Super login function")
}

module.exports = {
    userLogin,
    superLogin
}