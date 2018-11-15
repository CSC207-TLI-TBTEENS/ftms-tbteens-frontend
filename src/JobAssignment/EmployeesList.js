import React, { Component } from 'react';
import {Card, Button} from 'element-react';
import './JobAssignment.css'

const employeeList = {
    backgroundColor: "rgb(90, 85, 121)",
    width: "20rem",
    color: "rgb(203, 200, 228)",
    height: "36rem",
    borderRadius: "0.5rem",
    overflow: "auto",
    marginLeft: "7rem"
}

const jobButtonStyle = {
    width: "16.7rem",
    height: "4rem",
    margin: "0rem",
    borderColor: "rgb(90, 85, 121)",
    backgroundColor: "transparent",
    border: "none",
    color: "rgb(203, 200, 228)",
    marginLeft: "0.4rem"
}

const cardStyle = {
    backgroundColor: "rgb(90, 85, 121)",
    borderRadius: "0.5rem",
    border: "none"
}

const EmployeesList = (props) => {
    return (
        <div style={employeeList}>
            <Card style={cardStyle}
                className="box-card"
                header={
                        <div className="clearfix">
                            <span className="employees-table-header">Employees</span>
                        </div>
                    }>
                <div className="all-tasks">
                {
                    props.employees.map(employee => {
                        return (
                            <div>
                                <Button style={jobButtonStyle} 
                                        onClick={props.employeeHandler.bind(this, employee)}>
                                    {employee.name} - ID: {employee.id}
                                </Button>
                            </div>
                        )
                    })
                }
                </div>
                
            </Card>
        </div>
    )

}

export default EmployeesList;