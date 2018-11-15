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

const getEmployeesDicts = (employees) => {
    let employeesDict = [];
    for (let i = 0; i < employees.length; i++) {
        let dict = {level: 2, label: employees[i]};
        employeesDict.push(dict);
    };
    console.log(employeesDict);
    return employeesDict;
}

const getData = (props) => { 
    return ([{level: 0,
    label: props.taskChosen.name,
    children: [
        {level: 1, label: "TASK ID: " + props.taskChosen.id},
        {level: 1, label: "TASK SITE: " + props.taskChosen.site},
        {level: 1, label: "TASK DESCRIPTION: " + props.taskChosen.descript},
        {level: 1, label: "EMPLOYEES ON TASK", children: getEmployeesDicts(props.taskChosen.currentEmployees)}
        ]
    }])
}

const options = {
    children: 'children',
    label: 'label'
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
        color: "rgb(203, 200, 228)"
    }

const TaskConfirmation = (props) => {   
    return (
        <Tree
        style={style}
        data={getData(props)}
        options={options}
        nodeKey="id"
        defaultExpandAll={true}
        expandOnClickNode={false}
        renderContent={(...args)=>renderContent(...args)}
        />
    )
}

export default TaskConfirmation;