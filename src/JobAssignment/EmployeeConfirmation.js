import React from 'react';
import {Button, Tree, MessageBox, Message} from 'element-react';

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

const getJobsDicts = (jobs) => {
    let jobList = [];
    for (let i = 0; i < jobs.length; i++) {
        let dict = {level: 2, label: jobs[i]};
        jobList.push(dict);
    };
    console.log(jobList);
    return jobList;
}

const getData = (props) => { 
    return ([{
    level: 0,
    label: props.employeeChosen.name,
    children: [
        {label: "EMPLOYEE'S ID: " + props.employeeChosen.id, level: 1},
        {label: "EMPLOYEE'S SKILL: " + props.employeeChosen.skill, level: 1},
        {label: "EMPLOYEE'S CURRENT JOBS", level: 1,
        children: getJobsDicts(props.employeeChosen.currentJobs)
    }]
  }])
}

const options = {
    children: 'children',
    label: 'label'
  }

const remove = (store, data) => {
    store.remove(data);
  }

const buttonStyle = {
    border: "none",
    backgroundColor: "rgb(160, 218, 113)",
    color: "black"
}

const renderContent = (nodeModel, data, store) => {
    let button = null;
    if (data.level === 2) {
        button = (
        <span style={{float: 'right', marginRight: '20px'}}>
          <Button style={buttonStyle}size="mini" onClick={onClick}>Delete</Button>
        </span>
        )
    }
    return (
      <span>
        <span>
          <span>{data.label}</span>
        </span>
        {button}
      </span>);
  }

const style = {
        width: "25rem",
        borderRadius: "0.5rem",
        backgroundColor: "rgb(90, 85, 121)",
        border: "none",
        color: "rgb(203, 200, 228)",
        margin: "2rem",
        marginLeft: "0rem"
}

const EmployeeConfirmation = (props) => { 
  
    return (
      <Tree style={style}
        data={getData(props)}
        options={options}
        nodeKey="id"
        defaultExpandAll={true}
        expandOnClickNode={false}
        renderContent={(...args)=>renderContent(...args)}
      />
    )
}

export default EmployeeConfirmation;