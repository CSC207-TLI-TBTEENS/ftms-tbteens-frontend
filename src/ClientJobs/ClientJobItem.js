import React from 'react';
import './clientJobDetails.css';


const ClientJobItem = ({id, jobTitle ,siteLocation, jobDescription}) => (
    <tr>
        <td>{jobTitle}</td>
        <td>{siteLocation}</td>
        <td>{jobDescription}</td>
        <td>
            <button type="button" className="btn btn-table mr-1" data-toggle="modal" data-target="#viewEmployees">
                View Employees
            </button>
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
                    <div className="modal-body table-responsive table-shadow mb-2">
                        <table className="table mb-0" id="table-job">
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
                        <button type="button" className="btn btn-submit mr-1" data-dismiss="modal">
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>}
    </tr>


)
export default ClientJobItem;
