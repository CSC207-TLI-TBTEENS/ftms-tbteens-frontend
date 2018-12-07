import React from 'react';
import { Link } from 'react-router-dom';

const TimesheetItem = ({id, job}) => (
    <tr>
        <td>{job.jobTitle}</td>
        <td>{job.company.name}</td>
        <td>
            <center>
                <button type="button" className="btn btn-second mr-1" data-toggle="modal" data-target="#jobDetails">
                    Timesheet Details
                </button>
                <Link to={"/timesheets/" + id + "/edit"}>
                    <button type="button" className="btn btn-main ml-1">
                        Edit Timesheet
                    </button>
                </Link>
            </center>
        </td>

         <div className="modal fade" id="jobDetails" tabindex="-1" role="dialog" aria-labelledby="jobDetails" aria-hidden="true">
             <div className="modal-dialog" role="document">
                 <div className="modal-content">
                     <div className="modal-header">
                         <h5 class="modal-title">{job.jobTitle} Details</h5>

                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                         </button>
                     </div>
                     <div className="modal-body">
                        <h6>Client Company</h6>
                        <p className="detail">{job.company.name}</p>
                        <h6>Description</h6>
                        <p className="detail">{job.description}</p>
                        <h6>Location</h6>
                        <p className="detail">{job.siteName}</p>
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-submit mr-1" data-dismiss="modal">
                            Back
                        </button>
                     </div>
                 </div>
             </div>
         </div>
    </tr>


)

export default TimesheetItem;