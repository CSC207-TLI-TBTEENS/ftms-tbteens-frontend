import React from 'react';

const CompanyItem = ({id, logo, name, email, number, viewHandler, deletionHandler, curr}) => (
    <tr>
        <td>{logo}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>
        <div className="btn-group float-right" role="group" aria-label="deletion-edit">
            <button onClick={deletionHandler.bind(curr, id, name)}
                    type="button" className="btn delete-button">
                    <i className="el-icon-delete"></i>
            </button> 
            <button  
                    onClick={viewHandler.bind(this, name, logo, email, number)} 
                    type="button" className="btn edit-button" 
                    data-toggle="modal" data-target={"#company" + id}>
                    <i className="el-icon-edit"></i>
            </button>
        </div>
        </td>
    </tr>
)
export default CompanyItem;