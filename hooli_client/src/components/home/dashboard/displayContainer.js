import React from "react";
import AllPatients from '../patientsDiplay/patientsDisplay.js';
import NewPatient from '../addPatients/newPatient.js';
import Settings from './settings.js';

const pageMapping = ["dashboard",  "patientsDisplay","addPatient",  "settings"];
class DisplayContainer extends React.Component {

    getComponent = () => {
        let urlPath = this.props.data.location.pathname;
        urlPath = urlPath.split("/home/");
        if (pageMapping.includes(urlPath[1])) {
            switch(urlPath[1]) {
                case "settings":
                    return <Settings />
                case "patientsDsiplay":
                    return <AllPatients />
                case "addPatient":
                    return <NewPatient />
                default:
                    return <h1>Dashboard</h1>
            }
        } else {
            this.props.data.history.push("/notFound")
        }
    } 
    render() {
        return (
            <>
                {this.getComponent()}
            </>
        )
    }
}

export default DisplayContainer;