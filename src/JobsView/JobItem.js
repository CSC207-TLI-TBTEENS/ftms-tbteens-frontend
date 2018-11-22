import React from 'react';


//Toggle for Job Detail View Enabled
const JobItem = ({description, siteName, job, getEmployees}) => (
        <tr data-toggle="modal" data-target={"#Job" +job.id}>
                <td>{description}</td>
                <td>{siteName}</td>
                <div class="modal fade" id={"Job" + job.id} tabIndex="-1" role="dialog" aria-labelledby="viewJobDetails" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="viewJobDetails">{description}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="table-responsive">
                                    <table className="table" id="table-job-all">
                                        <thead>
                                            <tr className="table-head">
                                                <th scope="col" >Employees</th>
                                                <th scope="col" >Tasks</th>
                                                <th scope="col" >Timesheets</th>
                                                <th scope="col" >Review Status</th>
                                            </tr>
                                        </thead>
                                        <tbody id= "data">
                                        {/* {getEmployees(job).map(emp => (
                                            <tr>
                                            <td>{emp.name}</td>
                                            <td>{emp.name}</td>
                                            <td>None</td>
                                            <td>Not Reviewed</td>
                                        </tr>
                                        )
                                        ) */}
                                            <tr>
                                                <td>Chris</td>
                                                <td>Fix DA2 unit</td>
                                                <td>None</td>
                                                <td>Not Reviewed</td>
                                            </tr>
                                            <tr>
                                                <td>Chris</td>
                                                <td>Fix DA2 unit</td>
                                                <td>None</td>
                                                <td>Not Reviewed</td>
                                            </tr>
                                        </tbody>
                                        
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
        </tr>
            

    
)
export default JobItem;