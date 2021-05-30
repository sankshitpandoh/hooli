import React from 'react';
import {connect} from 'react-redux';
import {logIn, hideError } from '../../actions/actions.js';
import '../../stylesheets/login/logInDisplay.css'

const MapStateToProps = (state) => {
    return {    
        userLoggedIn: state.MainReducer.userLoggedIn,
        showError: state.MainReducer.showError,
        errorMessage: state.MainReducer.errorMessage
    };
};

const MapDispatchToProps = (dispatch) => {
    return {
        logIn: (payload) => dispatch(logIn(payload)),
        hideError: () => dispatch(hideError())
    };
};



class logInDisplay extends React.Component {
    state = {
        username: "",
        password: "",
        superLogin: false,
        logInError: false,
        logInErrorMessage: ""
    }

    componentDidMount () {
        if (this.props.isSuperLogin) {
            this.setState({
                superLogin: true
            })
        }
    }

    componentDidUpdate (prevProps) {
        if ((this.props.showError !== prevProps.showError) && this.props.showError) {
            setTimeout(() => {
                this.props.hideError();
            }, 2000)
        }
        if ((this.props.userLoggedIn !== prevProps.userLoggedIn) && this.props.userLoggedIn) {
            this.props.history.push("/home");
        }
    }

    handleUserName = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.state.username.trim() !== "" ?
            this.state.password.trim() !== "" ?
             (() => {
                this.props.logIn({username: this.state.username, password: this.state.password});
             })()
             :
             this.setState({
                 logInError: true,
                 password: "",
                 logInErrorMessage: "Password field cannot be empty"
             }, () => {
                setTimeout( () => {
                    this.setState({
                        logInError: false,
                        logInErrorMessage: ""
                    })
                }, 2000)
            })
             :
             this.setState({
                logInError: true,
                username: "",
                logInErrorMessage: "Username field cannot be empty"
            }, () => {
                setTimeout( () => {
                    this.setState({
                        logInError: false,
                        logInErrorMessage: ""
                    })
                }, 3000)
            })
    }

    render() {
        return (
            <div className="log-in d-flex align-items-center">
                <div className="col-8 p-0">
                    <div className="login-art-container"></div>
                </div>

                <div className="col-4 p-0">
                    <div className="log-in-container d-flex flex-column justify-content-center w-100 my-0 mx-auto p-5">
                        {(this.state.logInError || this.props.showError) &&
                            <div className="log-in-error d-flex p-1 justify-content-center">
                                {this.props.showError ? this.props.errorMessage : this.state.logInErrorMessage}
                            </div>
                        }

                        <form className="d-flex flex-column align-items-center w-100 mx-auto" onSubmit={this.handleSubmit}>
                            <h2 className="mr-auto mb-3"> Log In to Hooli</h2>

                            <span className="d-flex flex-column w-100 mb-4">
                                Username:
                                <input className="py-1 pl-0 pr-1" type="text" placeholder="User Name here" value={this.state.username} onChange={this.handleUserName} />
                            </span>

                            <span className="d-flex flex-column w-100 mb-4">
                                Password:
                                <input className="py-1 pl-0 pr-1" type="password" placeholder="Password here" value={this.state.password} onChange={this.handlePassword} />
                            </span>

                            <input className="mr-auto mb-4 w-50 px-2 py-2 submit-button" type="submit" value="Log In" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(logInDisplay);