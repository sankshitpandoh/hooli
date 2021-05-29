import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Store from '../store/store.js';
import {Provider} from 'react-redux';
import logInDisplay from '../components/logIn/logInDisplay.js';
import dashboard from '../components/home/dashboard/dashboard.js';
class appRouter extends React.Component {
    render() {
        return (
            <Provider store = {Store}>
                <BrowserRouter>
                    <Switch>
                        <Route path = "/" exact>
                            {
                                // Add conditional routing in accordance with accessToken
                                <Redirect to="/login" />
                            }
                        </Route>
                        <Route path = "/login" component = {logInDisplay} />
                        <Route path = "/super" component = {logInDisplay} />
                        <Route path = "/home" exact>
                            {
                                <Redirect to="/home/dashboard" component = {dashboard} exact />
                            }
                        </Route>
                        <Route path = "/home/dashboard" component = {dashboard} exact/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default appRouter;