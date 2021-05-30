import axios from "axios";
import {end_points} from '../config/endPoints';

const verifySession = (prop) => {
    return new Promise ((resolve, reject) => {
        if (prop) {
            axios.post(end_points.verifySession, {
                accessToken: prop
            }).then((res) => {
                if (res.status === 200 && res.data.sessionLive) {
                    resolve({
                        sessionLive: true
                    })
                } else {
                    reject({
                        sessionLive: false
                    })
                }
            }).catch((err) => {
                console.log("Some error in verifying session", err);
                reject({
                    sessionLive: false
                })
            })
        } else {
            reject({
                sessionLive: false 
            })
        }
    })
}
export {
    verifySession
}
