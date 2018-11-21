import React from 'react';
import { Icon } from 'element-react';

const editStyle = {
    backgroundColor: "rgb(160, 218, 113)",
    border: "none",
    display: "inline-block",
}

const deleteStyle = {
    backgroundColor: "red",
    border: "none",
    display: "inline-block",
}

const groupStyle = {
    float: "right"
}

const EmployeeItem = ({id, firstname, lastname, email, number, viewHandler, deletionHandler, curr}) => (
    <tr>
        <td>{firstname}</td>
        <td>{lastname}</td>
        <td>{email}
        </td>
        <td>
        <div style={groupStyle} class="btn-group" role="group" aria-label="deletion-edit">
            <button onClick={deletionHandler.bind(curr, id, firstname, lastname)}
                    style={deleteStyle} type="button" class="btn btn-primary">
                    <i className="el-icon-delete"></i>
            </button> 
            <button onClick={viewHandler.bind(this, firstname, lastname, email, number)} 
                    style={editStyle} type="button" class="btn btn-primary" 
                    data-toggle="modal" data-target={"#employee" + id}>
                    <i className="el-icon-edit"></i>
            </button>
        </div>
        </td>
    </tr>
)
export default EmployeeItem;