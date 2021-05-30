import React from 'react';
import SinglePatienItem from './singlePatientitem.js';
import {getPatients} from '../../../utilities/dataOps.js';

class AllPatients extends React.Component {
    state = {
        currentPage: 1,
        errorMessage: "",
        showError: false,
        usersList: [],
        moreData: false,

    }
    componentDidMount() {
        this.getPatientsData();
    }

    getPatientsData = () => {
        getPatients({
            page: this.state.currentPage,
            authToken: sessionStorage.getItem("authToken")
        }).then((res) => {
            if (res.success && res.usersList && res.usersList.length > 0) {
                this.setState({
                    showError: false,
                    usersList: res.usersList,
                    moreData: res.moreData || false
                })
            } else {
                this.setState({
                    showError: true,
                    errorMessage: "You have no patients data in this account."
                })
            }
        }).catch((err) => {
            this.setState({
                showError: true,
                errorMessage: "Unable to get patients data. Please try again!"
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

    render() {
        let usersListProcessed = this.state.usersList.map((data, index) => {
            return <SinglePatienItem data={data} key={"SinglepatientItem_" + index} />
        })
        return (
            <div className="p-3">
                <h2 className="mb-4">Patient Records</h2>
                {/* <input type="text" disabled={this.state.showError || this.state.usersList.length < 1} placeholder="Serach by Patient Name" className="p-2 w-25 mb-4"/> */}
                {
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
                        <div className="d-flex flex-wrap">
                            {usersListProcessed}
                            <div className="d-flex align-items-center w-100 justify-content-center">
                                <button onClick={this.prevPage} disabled={this.state.currentPage < 2}>Prev</button>
                                <button onClick={() => this.nextPage()} disabled={!this.state.moreData}>Next</button>
                            </div>
                        </div>                       
                        </>
                }
            </div>
        )
    }
}

export default AllPatients;