function SubItem(props) {
    return (
        <p>
            <strong> {props.values.keyName}: </strong>
            {props.data[props.values.keyValue]}
        </p>
    )
}

export default SubItem;