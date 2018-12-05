import React from 'react';

const TaskConfirmation = (props) => {   
    return (
        <div class="card card-scroll">
            <div class="card-body">
                <h4 class="card-title">{props.currentJob.jobTitle}</h4>
                <h6 class="card-subtitle mb-2">Employees on Task</h6>
                {
                    props.employees.map(employee => {
                        return (
                            <div>
                                <p className="card-text closer-p">
                                  <i className="el-icon-delete"/>
                                    {"                 " + employee.firstname + " " + employee.lastname}
                                </p>

                                <div class="modal fade" id="deleteJobCenterModal" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
                                  <div class="modal-dialog modal-dialog-centered" role="document">
                                    
                                    <div class="modal-content modal-content-confirm">
                                      
                                      <div class="modal-header modal-header-confirm">
                                        <h4 class="modal-title" id="ModalCenterTitle">This will delete this employee from this job. Continue?</h4>
                                      </div>

                                      <div class="modal-footer modal-footer-confirm">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-confirmation" data-dismiss="modal" onClick={props.onClick}>OK</button>
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

export default TaskConfirmation;