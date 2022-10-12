import React, { useState } from 'react'
import dateFormat, { masks } from "dateformat";
import './Audit.css'
const AuditTable = ({ users }) => {
    const [format, setFormat] = useState('dd/mmm/yyyy h:MM TT')
    const [searchField, setSearchField] = useState('')
    const dateFormats = [
        {
            id: "dd/mmm/yyyy h:MM TT",
            label: "dd/mmm/yyyy 12 Hr"
        },
        {
            id: "dd/mmm/yyyy H:MM",
            label: "dd/mmm/yyyy 24 Hr"
        }
    ]
    const handleChange = (e) => {
        setFormat(e.target.value)
    }
    const handleSearch = (e) => {
        setSearchField(e.target.value)
        var table, tr, td, i, txtValue;
        let filter = e.target.value.toUpperCase();
        table = document.getElementById("userTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {

                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    return (
        <div>
            <div className='filterBar'>
            <input className='searchBar' type="text" id="myInput" value={searchField} onChange={(e) => handleSearch(e)} placeholder="Search for names.." title="Type in a name"></input>
            <select className="dropdown" onChange={(e) => handleChange(e)}>
                {dateFormats.map((date) => {
                    return <option value={date.id}>{date.label}</option>
                })}

            </select>
            </div>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <table id="userTable" className="userTable">
                    <tr >
                        <th onClick={() => handleHeaderClick('firstName')}>First Name</th>
                        <th >Last Name</th>
                        <th >Username</th>
                        <th >ID</th>
                        <th >Role</th>
                        <th >Created on</th>
                    </tr>
                    {users.items.map((user) => {
                        return <tr>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.id}</td>
                            <td>{user.role}</td>
                            <td>{dateFormat(user.createdDate, format)}</td>
                        </tr>
                    })}
                </table>}
        </div>
    )
}

export default AuditTable