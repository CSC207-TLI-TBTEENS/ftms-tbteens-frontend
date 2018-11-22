import React from 'react';
import {MessageBox, Message} from 'element-react';

const buttonStyle = {
    borderColor: "rgb(203, 200, 228)",
    color: "rgb(203, 200, 228)"
}

const onClick = () => {
    MessageBox.confirm('This will assign the below job to the above employee. Continue?', 'Confirmation', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'info'
    }).then(() => {
      Message({
        type: 'success',
        message: 'Assignment completed!'
      });
    }).catch(() => {
      Message({
        type: 'info',
        message: 'Assignment canceled'
      });
    });
  }

const Confirmation = () => {
    return (
      <div className="row">
        <div className="col-md-4">
        <button style={buttonStyle} onClick={onClick} type="button" class="btn btn-outline-primary">Assign</button>
        </div>
      </div>
        
    )
}

export default Confirmation;