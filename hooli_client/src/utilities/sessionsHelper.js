import axios from "axios";
import {end_points} from '../config/endPoints';

export const verifySession = (prop) => {
    return new Promise ((resolve, reject) => {
        if (prop && prop.accessToken) {
            axios.post(end_points.verifySession, {
                accessToken: prop.accessToken
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
