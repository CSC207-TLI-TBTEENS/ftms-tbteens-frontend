import React from 'react';
import { Link } from 'react-router-dom';

const TimesheetItem = ({id, jobTitle, company, description, siteName}) => (
    <tr>
        <td>{jobTitle}</td>
        <td>{company}</td>
        <td>
            <center>
                <button type="button" className="btn btn-second mr-1" data-toggle="modal" data-target="#jobDetails">
                    Timesheet Details
                </button>
                <Link to={"/timesheets/" + id + "/edit"}/>
            </center>
         </td>

         <div className="modal fade" id="jobDetails" tabindex="-1" role="dialog" aria-labelledby="jobDetails" aria-hidden="true">
             <div className="modal-dialog" role="document">
                 <div className="modal-content">
                     <div className="modal-header">
                         <h5 class="modal-title">{jobTitle} Details</h5>

                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                         </button>
                     </div>
                     <div className="modal-body">
                        <h6>Client Company</h6>
                        <p className="detail">{company}</p>
                        <h6>Description</h6>
                        <p className="detail">{description}</p>
                        <h6>Location</h6>
                        <p className="detail">{siteName}</p>
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-submit mr-1" data-dismiss="modal">
                            Back
                        </button>
                        <Link className="nav-link" to={"/timesheets/" + id + "/edit"}>
                            <button type="button" className="btn btn-main ml-1">
                                Edit Timesheet
                            </button>
                        </Link>
                     </div>
                 </div>
             </div>
         </div>
    </tr>


)

export default TimesheetItem;