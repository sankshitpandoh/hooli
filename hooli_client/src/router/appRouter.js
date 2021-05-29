import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Store from '../store/store.js';
import {Provider} from 'react-redux';
import logInDisplay from '../components/logIn/logInDisplay.js';
import dashboard from '../components/home/dashboard/dashboard.js';
import settings from '../components/home/dashboard/settings.js';
import allPatients from '../components/home/patientsDiplay/patientsDisplay.js';
import newPatient from '../components/home/addPatients/newPatient.js';

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
                                <Redirect to="/home/dashboard" />
                            }
                        </Route>
                        <Route path = "/home/dashboard" component = {dashboard} exact/>
                        <Route path = "/home/settings" component = {settings} />
                        <Route path = "/home/allPatients" component = {allPatients} />
                        <Route path = "/home/addPatient" component = {newPatient} />
                        {/* <Route path = "*" component = {PageNotFound} /> */}
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default appRouter;