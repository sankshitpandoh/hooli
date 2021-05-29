import * as actionHandlers from '../actions/actions.js';

const getInitState = () => {
	return {
		userLoggedIn: false,
        userData: {},
        accessToken: null,
		allPatients : [],
		currentPatient : null,
		expandPatient: false,
        isSuperUser: false,
        showError: false,
        errorMessage: "Something went wrong!"
	}
}


const MainReducer = (state = getInitState(), action) => {
	const actionHandlers = {
		['LOG_IN']() {
			let newState = state;
            let data = action.payload;
            console.log(data)
            if (data.accessToken && data.userData && !data.showError) {
                return Object.assign({}, newState, {
                    showError: false,
                    userData: data.userData,
                    userLoggedIn: true, 
                    accessToken: data.accessToken, 
                })
            } else {
                return Object.assign({}, newState, {
                    userLoggedIn: false, 
                    accessToken: null,
                    showError: true,
                    userData: {},
                    errorMessage: data.errorMessage ? data.errorMessage : "Something went wrong, please try again." 
                })
            }
		},
		['LOG_OUT']() {
			let newState = state;
			return Object.assign({}, newState, { userLoggedIn: false , accessToken: null});
		},
        ['HIDE_ERROR']() {
			let newState = state;
			return Object.assign({}, newState, { showError: false});
		},
        ['GET_PATIENTS']() {
			let newState = state;
			return Object.assign({}, newState, { userLoggedIn: false , accessToken: null});
		},
		['EXPAND_PATIENT']() {
			let newState = state;
			let patientData = action.payload;
			return Object.assign({}, newState, { expandPatient: true, currentPatient: patientData });
		},
		['CLOSE_PATIENT'](){
			let newState = state;
			return Object.assign({}, newState, {expandPatient: false, currentPatient: null});
		}
	}
	if(action.type in actionHandlers) {
		return actionHandlers[action.type]();
	}

	return state;
}

export default MainReducer;   