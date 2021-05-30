import React from 'react';
import { BrowserRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import Store from '../store/store.js';
import {Provider} from 'react-redux';
import logInDisplay from '../components/logIn/logInDisplay.js';
import Home from '../components/home/dashboard/home.js';
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
                        <Route path = "/home/" component = {Home} />
                        <Route path = "*" component = {Home} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default appRouter;