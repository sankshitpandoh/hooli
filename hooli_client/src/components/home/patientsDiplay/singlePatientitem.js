import SubItem from './subItem.js';
import randomAvataar from './avataarGen.js';
import '../../../stylesheets/patients/singlePatient.css';

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

function SinglePatienItem (props) {
    let items = fieldsToDisplay.map((data, idx) => {
        return <div className="w-100 ml-4 mb-2">
            <SubItem data={props.data} values={data} key={Date().now + "_" + idx} /> 
        </div> 
    })
    return (
        <div className="d-flex align-items-center single-pat-item m-4" onClick={() => props.expandSinglePatient(props.data)}>
            <div className="d-flex align-items-center w-100">
            <figure className="d-flex align-items-center">
               <img className="w-100" src={randomAvataar({name: props.data.firstName + " " + props.data.lastName})} alt="avatar" />
            </figure>
            <div className="d-flex flex-column w-25 justify-content-center">
                {items}
            </div>
            </div>
        </div>
    )
}

export default SinglePatienItem;