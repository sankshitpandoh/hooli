import '../../../stylesheets/dashboard/singleMenuItem.css';
import { BrowserRouter, Redirect, Route, Switch,Link } from 'react-router-dom';


function SingleMenutItem (props) {
    return (
        <div 
            className="d-flex align-items-center justify-content-between p-2 list-item" 
            style={props.activeData ? {backgroundColor: "#FCFCFC", cursor: "unset"}: {}}
            onClick={() => {!props.activeData && props.handlePathChange(props.data.path)}}
        >
            <i className={props.data.icon}/>
            <span className="mr-3">{props.data.placeholder}</span>
        </div>
    )
}

export default SingleMenutItem