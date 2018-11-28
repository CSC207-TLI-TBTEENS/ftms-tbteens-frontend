import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

const JobItem = ({jobId, jobName, clientName, jobDescription, jobLocation}) => (
    <tr>
        <td>{jobName}</td>
        <td>{clientName}</td>
        <td>
            <center>
                <button type="button" className="btn btn-second mr-1" data-toggle="modal" data-target="#jobDetails">
                    Job Details
                </button>
                <Link to={"/timesheets/edit"}>
                    <button type="button" className="btn btn-main ml-1" >
                        Edit Timesheet
                    </button>
                </Link>
            </center>
         </td>

         <div className="modal fade" id="jobDetails" tabindex="-1" role="dialog" aria-labelledby="jobDetails" aria-hidden="true">
             <div className="modal-dialog" role="document">
                 <div className="modal-content">
                     <div className="modal-header">
                         <h5 class="modal-title">{jobName} Details</h5>

                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                         </button>
                     </div>
                     <div className="modal-body">
                        <h6>Client Company</h6>
                        <p className="detail">{clientName}</p>
                        <h6>Description</h6>
                        <p className="detail">{jobDescription}</p>
                        <h6>Location</h6>
                        <p className="detail">{jobLocation}</p>
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-second mr-1" data-dismiss="modal">
                            Back
                        </button>
                        <Link className="nav-link" to={"/timesheets/edit"}>
                            <button type="button" className="btn btn-main ml-1" data-toggle="modal" data-target="#jobDetails">
                                Edit Timesheet
                            </button>
                        </Link>
                     </div>
                 </div>
             </div>
         </div>
    </tr>


)

export default JobItem;