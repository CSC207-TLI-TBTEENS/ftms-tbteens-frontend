import React from 'react';

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

const CompanyItem = ({id, logo, name, email, number, viewHandler, deletionHandler, curr}) => (
    <tr>
        <td>{logo}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>
        <div style={groupStyle} class="btn-group" role="group" aria-label="deletion-edit">
            <button onClick={deletionHandler.bind(curr, id, name)}
                    style={deleteStyle} type="button" class="btn btn-primary">
                    <i className="el-icon-delete"></i>
            </button> 
            <button  
                    style={editStyle} onClick={viewHandler.bind(this, name, logo, email, number)} 
                    type="button" class="btn btn-primary" 
                    data-toggle="modal" data-target={"#company" + id}>
                    <i className="el-icon-edit"></i>
            </button>
        </div>
        </td>
    </tr>
)
export default CompanyItem;