var crypto = require('crypto');

const getHashedPassword = (prop) => {
    return new Promise ((resolve, reject) => {
        try {
            let hashedString = crypto.createHash('md5').update(prop).digest('hex');
            resolve({
                hashedString : hashedString
            })                    
        } catch (err) {
            reject(err);
        }
    })
}

const rand = () => {
    return (
        Math.random(0).toString(36).substr(2)
    );
}
const token = (length) => {
    return (
        (rand()+rand()+rand()+rand()).substr(0,length)
    );
}

module.exports = {
    getHashedPassword,
    token
}