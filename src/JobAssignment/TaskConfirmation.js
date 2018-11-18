import React from 'react';
import {Tree, MessageBox, Message, Button} from 'element-react'

const onClick = () => {
    MessageBox.confirm('This will delete this employee from this job. Continue?', 'Confirmation', {
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

const TaskConfirmation = (props) => {   
    return (
        <div class="card" style={cardStyle}>
            <div class="card-body">
                <h5 class="card-title">{props.currentJob.name}</h5>
                <h6 class="card-subtitle mb-2">Employees on Task</h6>
                {
                    props.currentJob.currentEmployees.map(employee => {
                        return (
                            <div>
                                <p className="card-text">
                                    <i className="el-icon-delete el-icon-left" onClick={onClick}></i>
                                    {"                 " + employee}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TaskConfirmation;