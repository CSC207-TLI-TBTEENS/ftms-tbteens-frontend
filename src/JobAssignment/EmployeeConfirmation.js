import React, { Component } from 'react';
import JobsList from './JobsList.js';
import EmployeesList from './EmployeesList.js';
import TaskConfirmation from './TaskConfirmation.js';
import Confirmation from './Confirmation.js';
import * as jobAPI from '../ClientJobs/api.js';
import * as employeeAPI from '../Employees/api.js';
import './JobAssignment.css';
import 'element-theme-default';
import JobAssignment from "./JobAssignment";

export class EmployeeConfirmation extends Component {

  state = {
    jobs: this.props.jobs,
    currentEmployee: this.props.currentEmployee
  };

  render() {
    return (
      <div class="card card-scroll">
        <div class="card-body">
          <h4 class="card-title">{this.state.currentEmployee.firstname + ' ' + this.state.currentEmployee.lastname}</h4>
          <h6 class="card-subtitle mb-2">Employee's Tasks Queue</h6>
          {
            this.state.jobs.map(job => {
              return (
                <div>
                  <p className="card-text closer-p">
                    <i className="el-icon-delete el-icon-left" data-toggle="modal"
                       data-target="#deleteJobCenterModal"></i>
                    {job}
                  </p>

                  <div class="modal fade" id="deleteJobCenterModal" tabindex="-1" role="dialog"
                       aria-labelledby="ModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">

                      <div class="modal-content modal-content-confirm">

                        <div class="modal-header modal-header-confirm">
                          <h4 class="modal-title" id="ModalCenterTitle">This will delete this job from this employee.
                            Continue?</h4>
                        </div>

                        <div class="modal-footer modal-footer-confirm">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                          <button type="button" class="btn btn-confirmation" data-dismiss="modal">OK</button>
                        </div>

                      </div>

                    </div>
                  </div>

                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

}

export default EmployeeConfirmation;