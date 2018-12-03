import React from 'react';

const roles = (role) => {
    if (role === "ROLE_EMPLOYEE") {
        return "EMPLOYEE";
    } else {
        return "SUPERVISOR";
    }
}

const EmployeeItem = ({id, firstname, lastname, email, number, role, viewHandler, 
                    deletionHandler, curr}) => (
    <tr>
        <td>{firstname}</td>
        <td>{lastname}</td>
        <td>{email}</td>
        <td>{roles(role)}</td>
        <td>
        <div className="btn-group float-right" role="group" aria-label="deletion-edit">
            <button onClick={deletionHandler.bind(curr, id, firstname, lastname)}
                    type="button" className="btn delete-button">
                    <i className="el-icon-delete"></i>
            </button> 
            <button onClick={viewHandler.bind(this, firstname, lastname, email, number)} 
                    type="button" className="btn edit-button" 
                    data-toggle="modal" data-target={"#employee" + id}>
                    <i className="el-icon-edit"></i>
            </button>
        </div>
        </td>
    </tr>
)
export default EmployeeItem;