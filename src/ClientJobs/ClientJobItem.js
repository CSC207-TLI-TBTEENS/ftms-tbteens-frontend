import React from 'react';
import './clientJobDetails.css';

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

const ClientJobItem = ({id, deletionHandler, viewHandler, jobTitle ,siteLocation, jobDescription, curr}) => (
    <tr>
        <td>{jobTitle}</td>
        <td>{siteLocation}</td>
        <td>{jobDescription}</td>
        <td>
                <button type="button" className="btn btn-second mr-1" data-toggle="modal" data-target="#viewEmployees">
                    View Employees
                </button>
        </td>
        <td>
        <div style={groupStyle} class="btn-group" role="group" aria-label="deletion-edit">
            <button onClick={deletionHandler.bind(curr, id, siteLocation, jobDescription)}
                    style={deleteStyle} type="button" class="btn btn-primary">
                    <i className="el-icon-delete"></i>
            </button> 
            <button onClick={viewHandler.bind(this, siteLocation, jobDescription)} 
                    style={editStyle} type="button" class="btn btn-primary" 
                    data-toggle="modal" data-target={"#job" + id}>
                    <i className="el-icon-edit"></i>
            </button>
        </div>
        </td>
        {<div className="modal fade" id="viewEmployees" tabindex="-1" role="dialog" aria-labelledby="viewEmployees" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 class="modal-title">Employee Details</h5>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <table className="table" id="table-job">
                            <thead >
                            <tr className="table-head">
                                <th scope="col"> Employee Name</th>
                                <th scope="col"> ID </th>
                                <th scope="col"> Skill </th>
                            </tr>
                            </thead>
                            {/* {
                                employees.map(emp => {
                                    return (
                                        <tbody>
                                            <tr>
                                                <td scope="col"> {emp.name} </td>
                                                <td scope="col"> {emp.id} </td>
                                                <td scope="col"> {emp.skill} </td>
                                            </tr>

                                        </tbody>
                                    )
                            })
                            } */}
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-second mr-1" data-dismiss="modal">
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>}
    </tr>


)
export default ClientJobItem;
