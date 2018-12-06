import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Approval from './Approval';


export class TimesheetItem extends Component {
    constructor(props) {
        super(props);

    }


    render(){

        let employeeName = this.props.employee.firstname + " " + this.props.employee.lastname;
        //Calls Approval React Child
        return(
        <tr>
            <td>{employeeName}</td>
            <td>
                    <button type="button" className="btn primary success" data-toggle="modal" data-target={"#Employee"+ this.props.employee.id}>
                        Review
                    </button>
            </td>

            <div class="modal fade" id={"Employee" + this.props.employee.id} tabindex="-1" role="dialog" aria-labelledby="#viewReview" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="viewReview">{employeeName}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <Approval
                                    employeeName= {employeeName}
                                    jobTitle={this.props.job.jobTitle}
                                    timesheetID={this.props.id}
                                    addAlert={this.props.addAlert}
                                    alerts={this.props.alerts}
                                    removeAlert={this.props.removeAlert}
                                />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
            </div>
        </tr>

        );
    }

}

export default TimesheetItem;