'use strict';
const mongoose = require('mongoose');
let db = require('../../../middleware/db.middleware');
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
                    let hashedString = await getHashedPassword(ctx.request.body.password);
                    let allowToProceed = await mongoose.connection.db.collection("loginData").find({
                        username: ctx.request.body.username,
                    }).toArray();
                    if (allowToProceed && allowToProceed.length > 0 && allowToProceed[0].password === hashedString.hashedString) {
                        let authToken = await getToken(64);
                        try {
                            await mongoose.connection.db.collection("loginData").updateOne(
                                {'username': allowToProceed[0].username}, 
                                {
                                    $set: {
                                        authToken: authToken
                                    }
                                }
                            ).then(() => {
                                console.log("here123", allowToProceed[0]);
                                    ctx.response.status = 200;
                                    ctx.response.body = {
                                        message: "Success",
                                        token: authToken,
                                        userData: allowToProceed[0]
                                    };  
                            }).catch((err) => {
                                console.log("Couldn't update auth token", err);
                                ctx.response.status = 500;
                                ctx.response.body = {
                                    message: "Internal Server Error"
                                };
                            })
                            
                        } catch (err) {
                            console.log("Couldn't update auth token");
                            ctx.response.status = 500;
                            ctx.response.body = {
                                message: "Internal Server Error"
                            };
                        }
                    } else {
                        ctx.response.status = 401;
                        ctx.response.body = {
                            message: "Invalid Username or Password"
                        };
                    }
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

async function verifySession(ctx) {
    if (ctx && ctx.request && ctx.request.body && ctx.request.body.accessToken) {
        console.log("Verify session")
        let validUser = await mongoose.connection.db.collection("loginData").find({
            authToken: ctx.request.body.accessToken
        }).toArray();
        console.log(validUser)
        if (validUser && validUser.length > 0) {
            ctx.response.status = 200;
            ctx.response.body = {
                sessionLive: true
            };
        } else {
            ctx.response.status = 401;
            ctx.response.body = {
                sessionLive: false
            };
        }
    } else {
        ctx.response.status = 400;
        ctx.response.body = {
            message: "Malformed Request",
            sessionLive: false
        };
    }
}

module.exports = {
    userLogin,
    superLogin,
    verifySession
}