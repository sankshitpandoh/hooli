import axios from "axios";
import {end_points} from '../config/endPoints';

export const logIn = (data) => {
    return function(dispatch) {
        try {
            let url = data.superLogin ? end_points.superLogin : end_points.login;
            axios.post(url, {
                username: data.username,
                password: data.password
            }).then((res) => {
                if (res && res.status === 200 && res.data.token) {
                    sessionStorage.setItem("authToken", res.data.token);
                    dispatch({
                        type: "LOG_IN",
                        payload: {
                            userLoggedIn: true, 
                            accessToken: res.data.token, 
                            showError: false,
                            userData: res.data.userData
                        }
                    })
                } else {
                    dispatch({
                        type: "LOG_IN",
                        payload: { 
                            userLoggedIn: false, 
                            accessToken: null,
                            userData: {}, 
                            showError: true, 
                            errorMessage: "Couldn't log you in, please try again." 
                        }
                    })
                }
            }).catch((err) => {
                console.log("Error in login::::", err);
                dispatch({
                    type: "LOG_IN",
                    payload: {
                        userLoggedIn: false, 
                        accessToken: null,
                        showError: true,
                        userData: {}, 
                        errorMessage: "Invalid Username or Password!"
                    }
                })
            })
        } catch (err) {
            dispatch({
                type: "LOG_IN",
                payload: {
                    showError: true,
                    errorMessage: "Couldn't log you in, please try again." 
                }
            })
        }
    }

}

export const hideError = () => {
    return {
        type: "HIDE_ERROR"
    }
}

export const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export const getPatients = (data) => {
    return {
        type: "GET_PATIENTS",
    }
}

export const openPatient = (data) => {
    return {
        type: "EXPAND_PATIENT",
        payload: data
    }
}

export const closePatient = (data) => {
    return {
        type: "CLOSE_PATIENT"
    }
}