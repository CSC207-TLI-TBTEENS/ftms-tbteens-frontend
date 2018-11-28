import React from 'react';
import * as assignAPI from './api.js'
import {MessageBox, Message} from 'element-react';

const buttonStyle = {
    borderColor: "rgb(203, 200, 228)",
    color: "rgb(203, 200, 228)"
}

const assignJob = (employee, job) => {
  console.log("Confiremd assign now")
  let inputs = {"job": job, "employee": employee}
  assignAPI.assignJob(inputs);
}

const onclick = (employee,job) => {
    
    MessageBox.confirm('This will assign the below job to the below employee. Continue?', 'Confirmation', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'info'
    }).then(() => {
      Message({
        type: 'success',
        message: 'Assignment completed!'
      });
      assignJob(employee, job);
    }).catch(() => {
      Message({
        type: 'info',
        message: 'Assignment canceled'
      });
    });
  }

const Confirmation = (props) => {
    return (
      <div className="row">
        <div className="col-md-4">
          <button style={buttonStyle} onClick={onclick.bind(this, props.employee, props.job)} type="button" class="btn btn-outline-primary">Assign</button>
        </div>
      </div>
        
    )
}

export default Confirmation;