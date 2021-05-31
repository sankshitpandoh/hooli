import React from "react";
import AllPatients from '../patientsDiplay/patientsDisplay.js';
import NewPatient from '../addPatients/newPatient.js';
import Settings from './settings.js';
import MainDashboard from './mainDashboard'

const pageMapping = ["dashboard",  "patientsDisplay","addPatient",  "settings"];
class DisplayContainer extends React.Component {

    getComponent = () => {
        let urlPath = this.props.data.location.pathname;
        urlPath = urlPath.split("/home/");
        console.log(urlPath[1])
        if (pageMapping.includes(urlPath[1])) {
            switch(urlPath[1]) {
                case "dashboard":
                    return <MainDashboard />
                case "patientsDisplay":
                    return <AllPatients />
                case "addPatient":
                    return <NewPatient />
                default:
                    return <Settings />
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