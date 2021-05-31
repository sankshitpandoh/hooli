function SinglePatientActivity (props) {
    return (
        <tr class="result-single-entry">
            <td>{props.data.date}</td>
            <td>{props.data.hospital}</td>
            <td>{props.data.reason}</td>
            <td>{props.data.visit ? "Yes" : "No"}</td>
            <td>{props.data.admitted ? "Yes" : "No"}</td>
            <td>{props.data.paymentMode}</td>
            <td>{props.data.amountPaid}</td>
        </tr>
    )
}

export default SinglePatientActivity