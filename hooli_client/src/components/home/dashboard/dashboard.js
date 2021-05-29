import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import {logIn, hideError } from '../../../actions/actions.js';
import {verifySession} from '../../../utilities/sessionsHelper.js';
import MainHeader from './header.js';
import Settings from './settings.js';
import MenuContainer from './menuContainer.js'
import allPatients from '../patientsDiplay/patientsDisplay.js';
import newPatient from '../addPatients/newPatient.js';


const pageMapping = [
    {index: 0, page: "dashboard"}, {index: 1, page: "settings"}, {index: 2, page: "patientsDsiplay"}, {index: 3, page: "addPatient"}
]

const MapStateToProps = (state) => {
    return {    
        userLoggedIn: state.MainReducer.userLoggedIn,
        showError: state.MainReducer.showError,
        errorMessage: state.MainReducer.errorMessage,
        accessToken: state.MainReducer.accessToken
    };
};

const MapDispatchToProps = (dispatch) => {
    return {
        logIn: (payload) => dispatch(logIn(payload)),
        hideError: () => dispatch(hideError())
    };
};
class dashboard extends React.Component {
    state = {
        currentPage: 0,
        showMenu: true
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }
    openComp = (x) => {
        alert(x)
    }
    componentDidMount () {
        if (this.props.accessToken) {
            verifySession(this.props.accessToken).then((res) => {
                console.log(res)
                if (res && res.sessionLive) {
                    console.log("Session Verified");
                } else {
                    console.log("Session Verification failed");
                    this.props.history.push("/login");
                }
            }).catch((err) => {
                console.log("Session Verification failed", err);
                this.props.history.push("/login");
            })
        } else {
            console.log("Session Verification failed");
            this.props.history.push("/login");
        }
    }



    render() {
        return (
            <>
                <MainHeader toggleMenu={this.toggleMenu} openComp={this.openComp} />
                <div className="d-flex">
                    <div className="col-2 p-0" style={ !this.state.showMenu ? {width: '0px', maxWidth: '0px', overflow: 'hidden', transition: '0.25s ease-in-out'} : {transition: '0.25s ease-in-out'}}>
                        <MenuContainer />
                    </div>
                    <div className="col-10">
                        {
                            <Switch>
                                <Route path = "/home/dashboard/settings" component= {Settings} />
                                <Route path = "/home/dashboard/allPatients" component = {allPatients} />
                                <Route path = "/home/dashboard/addPatient" component = {newPatient} />
                            </Switch>

                        }
                    </div>
                </div>
            </>
        )
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(dashboard);
