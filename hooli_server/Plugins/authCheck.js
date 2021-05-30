const mongoose = require('mongoose');

const authCheck = (prop) => {
    return new Promise( async (resolve, reject) => {
        if (prop && prop.accessToken) {
            let validUser = await mongoose.connection.db.collection("loginData").find({
                authToken: prop.accessToken
            }).toArray();
            if (validUser && validUser.length > 0) {
                resolve({
                    valid: true
                })
            } else {
                resolve({
                    valid: false
                })
            }
        } else {
            reject({
                valid: false,
                message: "No token passed"
            })
        }
    })
}

module.exports = {
    authCheck
}