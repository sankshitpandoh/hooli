import SingleMenutItem from './singleMenuItem.js'

const menuItems= [
    {
        icon: 'fa fa-clipboard',
        placeholder: 'Dashboard',
        path: "/home/dashboard"
    },
    {
        icon: 'fa fa-users',
        placeholder: 'All Patients',
        path: "/home/patientsDisplay"
    },
    {
        icon: 'fa fa-user',
        placeholder: 'Add Patient',
        path: "/home/addPatient"
    }
]

function MenuContainer (props) {
    const listItems = menuItems.map((data, index) => {
        return <SingleMenutItem handlePathChange={props.handlePathChange} data={data} key={index + "_menuItem"} activeData={props.currentPage !== 3 ? props.currentPage === index ? true : false : false }/>
    })
    return (
        <div style={{height: "95vh", backgroundColor: "#D2F898"}}>
            {listItems}
        </div>
    )
}

export default MenuContainer