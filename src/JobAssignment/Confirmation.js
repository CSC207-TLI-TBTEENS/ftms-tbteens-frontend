import React from 'react';
import * as assignAPI from './api.js'

const assignJob = (employee, job) => {
  console.log("Confirmed assign now")
  let inputs = {"job": job, "employee": employee}
  assignAPI.assignJob(inputs);
}

const Confirmation = (props) => {
    return (
      <div className="row">
        <div className="col-md-4">
          <button type="button" class="btn btn-confirmation" data-toggle="modal" data-target="#verticalCenterModal">
            Assign
          </button>

          <div class="modal fade" id="verticalCenterModal" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              
              <div class="modal-content modal-content-confirm">
                
                <div class="modal-header modal-header-confirm">
                  <h5 class="modal-title" id="ModalCenterTitle">This will assign the below job to the below employee. Continue?</h5>
                </div>

                <div class="modal-footer modal-footer-confirm">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-confirmation" data-dismiss="modal" onClick={assignJob.bind(this, props.employee, props.job)}>OK</button>
                </div>

              </div>

            </div>
          </div>
          
        </div>
      </div>
        
    )
}

export default Confirmation;