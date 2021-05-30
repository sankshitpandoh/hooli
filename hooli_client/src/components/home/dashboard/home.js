import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import {logIn, hideError } from '../../../actions/actions.js';
import {verifySession} from '../../../utilities/sessionsHelper.js';
import MainHeader from './header.js';
import MenuContainer from './menuContainer.js'
import DisplayContainer from './displayContainer.js';

const pageMapping = ["dashboard",  "patientsDisplay","addPatient", "settings"];


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
class Home extends React.Component {
    state = {
        currentPage: 0,
        showMenu: true
    }

    updateCurrentpage = (x) => {
        this.setState({
            currentPage: x
        })
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
        } else if (sessionStorage.getItem("authToken")) {
            verifySession(sessionStorage.getItem("authToken")).then((res) => {
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

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            let urlPath = this.props.location.pathname;
            urlPath = urlPath.split("/home/");
            this.updateCurrentpage(pageMapping.indexOf(urlPath[1]));
        }
    }

    handlePathChange = (x) => {
        this.props.history.push(x);
    }


    render() {
        if (this.props.location && this.props.location.pathname === "/home/") {
            this.props.history.push("/home/dashboard")
        }
        return (
            <>
                <MainHeader handlePathChange={this.handlePathChange} toggleMenu={this.toggleMenu} openComp={this.openComp} />
                <div className="d-flex">
                    <div className="col-2 p-0" style={ !this.state.showMenu ? {width: '0px', maxWidth: '0px', overflow: 'hidden', transition: '0.25s ease-in-out'} : {transition: '0.25s ease-in-out'}}>
                        <MenuContainer currentPage={this.state.currentPage} handlePathChange={this.handlePathChange}/>
                    </div>
                    <div className="col-10">
                        <Switch>
                            <Route path={`/home/:innerMenu`} >
                                <DisplayContainer currentPage={this.state.currentPage} data={this.props} /> 
                            </Route>
                        </Switch>
                    </div>
                </div>
            </>
        )
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Home);
