import React from 'react';
import SinglePatienItem from './singlePatientitem.js';
import {getPatients, deletePatient} from '../../../utilities/dataOps.js';
import ExpandedPatientData from './expandedPatient.js'
import "../../../stylesheets/patients/patientDisplay.css";

class AllPatients extends React.Component {
    state = {
        currentPage: 1,
        errorMessage: "",
        showError: false,
        usersList: [],
        moreData: false,
        showLoader: false,
        expandPatient: false,
        patientData: {}

    }
    componentDidMount() {
        this.getPatientsData();
    }

    getPatientsData = () => {
        this.setState({
            showLoader: true
        }, () => {
            getPatients({
                page: this.state.currentPage,
                authToken: sessionStorage.getItem("authToken")
            }).then((res) => {
                if (res.success && res.usersList && res.usersList.length > 0) {
                    this.setState({
                        showError: false,
                        usersList: res.usersList,
                        moreData: res.moreData || false.page,
                        showLoader: false
                    })
                } else {
                    this.setState({
                        showError: true,
                        errorMessage: "You have no patients data in this account.",
                        showLoader: false
                    })
                }
            }).catch((err) => {
                this.setState({
                    showLoader: false,
                    showError: true,
                    errorMessage: "Unable to get patients data. Please try again!"
                })
            })
        })
    }

    nextPage = () => {
        this.setState({
            currentPage: this.state.currentPage + 1
        }, () => {
            this.getPatientsData();
        })
    }

    prevPage = () => {
        this.setState({
            currentPage: this.state.currentPage - 1
        }, () => {
            this.getPatientsData();
        })
    }

    expandSinglePatient = (data) => {
        this.setState({
            expandPatient: true,
            patientData: data
        })
    }

    closeExpandedPatient = () => {
        this.setState({
            expandPatient: false,
            patientData:{}
        })
    }

    deletePatient = (patientId) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            this.setState({
                showLoader:true 
            }, () => {
                deletePatient(patientId, sessionStorage.getItem("authToken")).then((res) => {
                    this.setState({
                        expandPatient: false,
                        patientData:{},
                        showLoader: false
                    }, () => {
                        alert("Patient deleted successfully");
                        this.getPatientsData();
                    })
                }).catch((err) => {
                    this.setState({
                        showLoader: false
                    }, (() => {
                        alert("Couldn't delete patient, please try again later!");
                    }))
                })
            })
        }
    }

    render() {
        let usersListProcessed = this.state.usersList.map((data, index) => {
            return <SinglePatienItem expandSinglePatient={this.expandSinglePatient} data={data} key={"SinglepatientItem_" + index} />
        })
        return (
            <div className="p-3">
                <h2 className="mb-4">Patient Records</h2>
                {
                    this.state.showLoader &&
                    <div className="loader-container d-flex align-items-center justify-content-center">
                        <div className="loader mr-3">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                }
                {/* <input type="text" disabled={this.state.showError || this.state.usersList.length < 1} placeholder="Serach by Patient Name" className="p-2 w-25 mb-4"/> */}
                {
                    !this.state.expandPatient ?
                        this.state.showError ?
                            <p className="text-center">
                                {this.state.errorMessage}
                            </p>
                        :
                        this.state.usersList.length < 1 ?
                            <p className="text-center">
                                You have no patients data in this account.
                            </p>
                        :
                        <>
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {usersListProcessed}
                            <div className="mt-5 d-flex align-items-center w-100 justify-content-center">
                                <button className="mr-2 p-2 nav-btn" onClick={this.prevPage} disabled={this.state.currentPage < 2}>Prev</button>
                                <button className="ml-2 p-2 nav-btn" onClick={() => this.nextPage()} disabled={!this.state.moreData}>Next</button>
                            </div>
                        </div>                       
                        </>
                    :
                    <ExpandedPatientData data={this.state.patientData} closeExpandedPatient={this.closeExpandedPatient} deletePatient={this.deletePatient}/>
                }
            </div>
        )
    }
}

export default AllPatients;