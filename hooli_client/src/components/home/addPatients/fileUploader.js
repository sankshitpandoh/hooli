import React from 'react';
import * as Papa from 'papaparse';
import {connect} from 'react-redux';
import {cleanUpdata , uploadPatients} from '../../../utilities/dataOps.js';
import '../../../stylesheets/patients/addPatient.css'

const supportedFormats = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv" ];

const MapStateToProps = (state) => {
    return {    
        accessToken: state.MainReducer.accessToken
    };
};

class FileUploader extends React.Component {

    state = {
        csvfile: undefined,
        showLoader: false,
        loaderMessage: "Processing and uploading your patient data",
        successMessage: "Data updated successfully",
        failureMessage: "Something went wrong in uploading your data. Please try again!",
        showSuccess: false,
        showFailure: false
    }

    handleChange = event => {
        if (event && event.target && event.target.files && event.target.files[0] && event.target.files[0].type && supportedFormats.includes(event.target.files[0].type)) {
            this.setState({
              csvfile: event.target.files[0],
              showLoader: true
            }, () => {
                this.importCSV();
            });
        } else {
            alert("Only files with type 'text/csv' are allowed!");
        }
      };
    
    importCSV = () => {
        const { csvfile } = this.state;
        Papa.parse(csvfile, {
          complete: this.checkData,
          header: true
        });
    };

    handleUpdateFailure = () => {
        this.setState({
            showLoader: false,
            showSuccess: false,
            showFailure: true,
        }, () => {
            setTimeout(() => {
                this.setState({
                    showFailure: false
                })
            }, 2000)
        })
    }
    
    checkData = (result) => {
        let data = result.data;
        cleanUpdata(data).then((res) => {
            if (res && res.cleanData) {
                console.log("RES", res.cleanData);
                if (res.cleanData.length !== data.length) {
                    this.setState({
                        loaderMessage: `${data.length - res.cleanData.length} rows are skipped because of missing field values...`
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                loaderMessage: "Processing and uploading your patient data"
                            })
                        }, 2000)
                    })
                }
                uploadPatients({
                    dataArray: res.cleanData,
                    authToken: sessionStorage.getItem("authToken") || "" 
                }).then((resp) => {
                    if (resp.success) {
                        // successfull 
                        this.setState({
                            showLoader: false,
                            showSuccess: true,
                            showFailure: false,
                            successMessage: `${res.cleanData.length} rows of data is successfully processed and updated.`
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    showSuccess: false
                                })
                            }, 2000)
                        })
                    } else {
                        
                    }
                }).catch((err) => {
                    console.log("ERROR:::", err);
                    this.handleUpdateFailure();
                })
            } else {
                console.log("Something went wrong in processing data");
                this.handleUpdateFailure();

            }
        }).catch((err) => {
            console.log("Something went wrong in processing data", err);
            this.handleUpdateFailure();
        })

    }

    render() {
        return (
            <div className="upload-container d-flex flex-column">
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
                        <p className="ml-4">{this.state.loaderMessage}</p>
                    </div>
                }
                <div className={`message-indicator p-2 d-flex align-items-center justify-content-center ${this.state.showFailure && 'failure'} ${this.state.showSuccess && 'success'}` }>
                    <p>{this.state.showFailure ? this.state.failureMessage : this.state.successMessage}</p>
                </div>
                <p className="mb-4">
                    <strong>Please note:</strong> &nbsp;
                    We are currently accepting only a single csv format. i.e text/csv.
                    More formats will be supported soon.
                </p>
                <div className="d-flex justify-content-center align-items-center upload-container-file">
                    <input
                        type="file"
                        name="fileUpload"
                        placeholder={null}
                        onChange={this.handleChange}
                    />
                </div>
            </div>            
        )
    }
}


export default connect(MapStateToProps)(FileUploader);
