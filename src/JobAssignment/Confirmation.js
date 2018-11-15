import React from 'react';
import {MessageBox, Button, Message} from 'element-react';

const buttonStyle = {
    backgroundColor: "rgb(90, 85, 121)",
    color: "rgb(203, 200, 228)",
    width: "5rem",
    marginLeft: "10rem"
}

const onClick = () => {
    MessageBox.confirm('This will assign the above job to the above employee. Continue?', 'Confirmation', {
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
        <Button style={buttonStyle} type="text" onClick={onClick.bind(this)}>Assign</Button>
    )
}

export default Confirmation;