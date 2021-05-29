import '../../../stylesheets/dashboard/singleMenuItem.css';

function SingleMenutItem (props) {
    console.log(props)
    return (
        <div className="d-flex align-items-center justify-content-between p-2 list-item">
            <i className={props.data.icon}/>
            <span className="mr-3">{props.data.placeholder}</span>
        </div>
    )
}

export default SingleMenutItem