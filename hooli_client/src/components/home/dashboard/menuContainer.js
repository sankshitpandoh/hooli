import SingleMenutItem from './singleMenuItem.js'

const menuItems= [
    {
        icon: 'fa fa-clipboard',
        placeholder: 'Dashboard'
    },
    {
        icon: 'fa fa-users',
        placeholder: 'All Patients'
    },
    {
        icon: 'fa fa-user',
        placeholder: 'Add Patient'
    }
]

function MenuContainer () {
    const listItems = menuItems.map((data, index) => {
        return <SingleMenutItem data={data} key={index + "_menuItem"} />
    })
    return (
        <div style={{height: "95vh", backgroundColor: "#D2F898"}}>
            {listItems}
        </div>
    )
}

export default MenuContainer