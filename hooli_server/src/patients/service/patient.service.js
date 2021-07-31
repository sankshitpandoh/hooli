'use strict';
const mongoose = require('mongoose');
let db = require('../../../middleware/db.middleware');
const getHashedPassword = require('../../../Plugins/utilities').getHashedPassword;
const getToken = require('../../../Plugins/utilities').token;
const authCheck = require('../../../Plugins/authCheck').authCheck;
const {
    ObjectID
} = require('mongodb');
var crypto = require('crypto');

var algorithm = "aes-192-cbc"; 
var key = crypto.scryptSync(process.env.DEC_KEY, 'salt', 24);;
const iv = Buffer.alloc(16); // generate different ciphertext everytime

function getEncKey (value) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    return cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
}

function getDecKey (value) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    return decipher.update(value, 'hex', 'utf8') + decipher.final('utf8')
}

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
                            if (!uniqueUsers.includes(ctx.request.body.data[i]["First Name"].trim() + " " + ctx.request.body.data[i]["Last Name"].trim() + " " + ctx.request.body.data[i]["Age"].trim() + " " + ctx.request.body.data[i]["Address"].trim())) {
                                uniqueUsers.push(ctx.request.body.data[i]["First Name"].trim() + " " + ctx.request.body.data[i]["Last Name"].trim() + " " + ctx.request.body.data[i]["Age"].trim() + " " + ctx.request.body.data[i]["Address"].trim())
                            }
                        }
                        let dataToPush = [];
                        uniqueUsers.forEach((data, index) => {
                            let name = data.split(" ");
                            let userObj = {};
                            console.log(name)
                            userObj.firstName = getEncKey(name[0]); 
                            userObj.lastName = getEncKey(name[1]);
                            userObj.age = name[2];
                            userObj.address = name[3];
                            let activityObj = ctx.request.body.data.filter((usrData, idx) => {
                                if (usrData && getEncKey(usrData["First Name"]) == userObj.firstName && getEncKey(usrData["Last Name"]) == userObj.lastName && usrData["Age"] == userObj.age) {
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
                            console.log(activityObj)
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


async function getPatients(ctx) {
    if (ctx && ctx.request && ctx.request.body) {
        if (!ctx.request.header || !ctx.request.header.authorization ) {
            ctx.response.status = 401;
            ctx.response.body = {
                message: "UnAuthorized"
            };
        } else {
            let tokenValid = await authCheck({accessToken: ctx.request.header.authorization});
            if (tokenValid && tokenValid.valid) {
                if (!ctx.request.body.page) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        message: "Data to upload cannot be empty"
                    };
                } else {
                    try {
                        //Sending only 6 entries in response else front end UI will break
                        let patientsData = await mongoose.connection.db.collection("patientsData").find(
                            {},
                            { skip: (ctx.request.body.page - 1) * 6, limit: 6 }
                        ).toArray();
                        patientsData.forEach((res, index) => {
                            patientsData[index].firstName = patientsData[index].firstName; 
                            patientsData[index].lastName = patientsData[index].lastName
                        })
                        let totalCount = await mongoose.connection.db.collection("patientsData").countDocuments();
                        let moreData = false;
                        if ((totalCount - (((ctx.request.body.page - 1) * 6) + patientsData.length)) > 0) {
                            moreData = true;
                        }
                        ctx.response.status = 200;
                        ctx.response.body = {
                            usersList: patientsData,
                            moreData: moreData
                        }
                    } catch (err) {
                        console.log("Something went wrong in getting patients data", err);
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

async function deletePatient (ctx) {
    if (ctx && ctx.request && ctx.request.body) {
        if (!ctx.request.header || !ctx.request.header.authorization ) {
            ctx.response.status = 401;
            ctx.response.body = {
                message: "UnAuthorized"
            };
        } else {
            let tokenValid = await authCheck({accessToken: ctx.request.header.authorization});
            if (tokenValid && tokenValid.valid) {
                if (!ctx.request.body.patientId) {
                    ctx.response.status = 400;
                    ctx.response.body = {
                        message: "Data to upload cannot be empty"
                    };
                } else {
                    try {
                        await mongoose.connection.db.collection("patientsData").deleteOne({
                            "_id": ObjectID(ctx.request.body.patientId)
                        })
                        ctx.response.status = 200;
                        ctx.response.body = {
                            staus: "success",
                        }
                    } catch (err) {
                        console.log("Something went wrong in deleting patient", err);
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


async function getChartData(ctx) {
    if (ctx && ctx.request) {
        if (!ctx.request.header || !ctx.request.header.authorization ) {
            ctx.response.status = 401;
            ctx.response.body = {
                message: "UnAuthorized"
            };
        } else {
            let tokenValid = await authCheck({accessToken: ctx.request.header.authorization});
            if (tokenValid && tokenValid.valid) {
                try {
                    let usersData = await mongoose.connection.db.collection("patientsData").find({}).toArray();
                    let ageData = [];
                    let ageCount = {};
                    let totalMoney= 0;
                    let paymentMode = {
                        Cash: 0,
                        Card: 0
                    }
                    let dateData = [];
                    let dateCount = {};
                    usersData.forEach((data) => {
                        if (!ageData.includes(data.age)) {
                            ageData.push(data.age);
                            ageCount[data.age] = 1;
                        } else {
                            ageCount[data.age] = ageCount[data.age] + 1 
                        }
                        data.activity.forEach((res) => {
                            if(res.amountPaid) {
                                totalMoney += parseInt(res.amountPaid)
                            }
                            if (res.paymentMode) {
                                paymentMode[res.paymentMode] = paymentMode[res.paymentMode] + 1 
                            }
                            if (!dateData.includes(res.date)) {
                                dateData.push(res.date);
                                dateCount[res.date] = 1;
                            } else {
                                dateCount[res.date] = dateCount[res.date] + 1 
                            }
                        })
                    })
                    ageData = [];
                    for (let keys in ageCount) {
                        ageData.push([keys.toString() , ageCount[keys]])
                    }
                    let modeOfPayment = [];
                    for (let i in paymentMode) {
                        modeOfPayment.push([i.toString() , paymentMode[i]]);
                    }
                    let patientsDayData = [];
                    for (let j in dateCount) {
                        patientsDayData.push([j.toString() , dateCount[j]])
                    }
                    ctx.response.status = 200;
                    ctx.response.body = {
                        staus: "success",
                        ageData: ageData,
                        totalMoney: totalMoney,
                        modeOfPayment: modeOfPayment,
                        totalUsers: usersData.length,
                        patientsDayData: patientsDayData
                    }
                } catch (err) {
                    console.log("Something went wrong in deleting patient", err);
                    ctx.response.status = 500;
                    ctx.response.body = {
                        message: "Internal Server Error"
                    };
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
    getPatients,
    deletePatient,
    getChartData
}