import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as apiCalls from './api.js';

export class TimesheetItem extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
        <tr>
            <td>{this.props.employee.firstname + " " + this.props.employee.lastname}</td>
            <td>
                <button type="button" className="btn primary success">
                    Details
                </button>
            </td>
            <td>
                <button type="button" className="btn primary success">
                    Approve
                </button>
                <button type="button" className="btn primary success">
                    Reject
                </button>
                <button type="button" className="btn primary success">
                    Approve
                </button>
            </td>

            <div className="modal fade" id="timesheetDetails" tabindex="-1" role="dialog" aria-labelledby="timesheetDetails" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 class="modal-title">Details</h5>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h6>Tasks</h6>
                            <p className="detail">Some Tasks Go HERE</p>
                            <h6>Duration</h6>
                            <p className="detail">Some Possible Duration</p>
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
        );
    }

}

export default TimesheetItem;