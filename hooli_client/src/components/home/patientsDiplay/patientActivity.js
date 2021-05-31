import SinglePatientActivity from './singlePatientActivity.js'

function PatientActivity (props) {
    let items = props.data.activity.map((data, index) => {
        return <SinglePatientActivity data={data} key={Date.now() + "_" + index} />
    })
    console.log(items)
    return (
        <table className="table">
            <thead className="mb-3">
                <tr class="row_data">
                    <th>Date</th>
                    <th>Hospital</th>
                    <th>Reason</th>
                    <th>Visit</th>
                    <th>Admitted</th>
                    <th>Amount Paid</th>
                    <th>Payment Mode</th>
                </tr>
            </thead>
            <tbody id="table-content">
                {
                    props.data.activity.length < 1 ?
                    <tr class="result-single-entry">
                        <th colspan="12" className="text-center">No Activity Available</th>
                    </tr>
                    :
                    <>
                        {items}
                    </>
                }
            </tbody>
        </table>
    )
}

export default PatientActivity