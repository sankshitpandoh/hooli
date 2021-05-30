import React from 'react';
import FileUploader from './fileUploader.js'

class NewPatient extends React.Component {
    render() {
        return (
            <div className="d-flex flex-column py-3">
                <h3 className="mb-5">Add new patients using bulk upload:</h3>
                <div>
                    <FileUploader />
                </div>
            </div>
        )
    }
}

export default NewPatient;