import React from 'react';
import {MessageBox, Message} from 'element-react';

const onClick = () => {
  MessageBox.confirm('This will delete this job from this employee. Continue?', 'Confirmation', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    Message({
      type: 'success',
      message: 'Deletion completed!'
    });
  }).catch(() => {
    Message({
      type: 'info',
      message: 'Deletion cancelled'
    });
  });
}

const cardStyle = {
  backgroundColor: "rgb(90, 85, 121)",
  overflowY: "scroll",
  overflowX: "scroll"
}

const EmployeeConfirmation = (props) => { 
  return (
    <div class="card" style={cardStyle}>
        <div class="card-body">
            <h5 class="card-title">Hello</h5>
            <h6 class="card-subtitle mb-2">Employee's Tasks Queue</h6>
            {/* {
                props.currentEmployee.currentJobs.map(job => {
                    return (
                        <div>
                            <p className="card-text">
                                <i className="el-icon-delete el-icon-left" onClick={onClick}></i>
                                {"                 " + job}
                            </p>
                        </div>
                    )
                })
            } */}
        </div>
    </div>
)
}

export default EmployeeConfirmation;