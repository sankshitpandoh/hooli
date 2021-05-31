import randomAvataar from './avataarGen.js';
import SubItem from './subItem.js';
import PatientActivity from './patientActivity.js'
import '../../../stylesheets/patients/expandPatient.css';


const fieldsToDisplay = [
    {
        keyName: "First Name",
        keyValue: "firstName"
    },
    {
        keyName: "Last Name",
        keyValue: "lastName"
    },
    {
        keyName: "Age",
        keyValue: "age"
    },
    {
        keyName: "Address",
        keyValue: "address"
    } 
];

function ExpandedPatientData (props) {
    let items = fieldsToDisplay.map((data, idx) => {
        return <div className="w-100 my-4 py-2">
            <SubItem data={props.data} values={data} key={Date().now + "_" + idx} /> 
        </div> 
    })
    return <div className="d-flex align-items-center flex-wrap">
        <div className="col-3 justify-content-start">
            <figure className="d-flex align-items-center w-100">
               <img className="w-100" src={randomAvataar({name: props.data.firstName + " " + props.data.lastName})} alt="avatar" />
            </figure>
        </div>
        <div className="col-4">
            <div className="d-flex flex-column w-100 justify-content-center">
                <h4>Patient Details:</h4>
                {items}
            </div>
        </div>
        <div className="col-4">
            <div className="d-flex flex-column w-50 justify-content-end pat-btn-panel">
                <button onClick={() => {props.closeExpandedPatient()}} className="p-2 mb-5">Go Back</button>
                <button onClick={() => {props.deletePatient(props.data._id)}} className="p-2 mb-5">Delete Patient</button>
                <button disabled={true} className="p-2 mb-5">Edit Patient</button>
            </div>
        </div>
        <h4 className="mb-3 mt-4">Patient Activity:</h4>
        <div className="col-12 w-100 activity-container">
            <PatientActivity data={props.data} />
        </div>
    </div>
}

export default ExpandedPatientData