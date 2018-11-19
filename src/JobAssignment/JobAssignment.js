import React, { Component } from 'react';
import JobsList from './JobsList.js';
import EmployeesList from './EmployeesList.js';
import TaskConfirmation from './TaskConfirmation.js';
import EmployeeConfirmation from './EmployeeConfirmation.js';
import Confirmation from './Confirmation.js';

const style = {
    height: "10vh"
}

export class JobAssignment extends Component {
    state = {

        jobs: [
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]},
            {id: 1, name: "Fix this thing", site: "A27", descript: "Fix truck number 25", currentEmployees: ["Bob", "Linda", "Jones"]}
        ],

        employees: [
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Bob", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
        ],
        taskToConfirm: {id: "N/A", name: "No Task Chosen", site: "N/A", descript: "N/A", currentEmployees: ["N/A", "N/A", "N/A"]},
        employeeToConfirm: {id: "N/A", name: "No Employee Chosen", skill: "N/A", currentJobs: ["N/A", "N/A", "N/A"]}
    }

    handleTaskChosen = (task) => {
        this.setState(
            {
                taskToConfirm: task
            }
        )
    }

    handleEmployeeChosen = (employee) => {
        this.setState(
            {
                employeeToConfirm: employee
            }
        )
    }

    render() {
        return (
            <div className="container h-100">
                <div className="row justify-content-center align-items-center">
                    <div className="col-4 align-items-center job-manage-header">
                        Jobs Manager
                    </div>
                </div>
                <div className="row justify-content-between align-items-center">
                    <div className="col-3 align-items-center job-manage-header">
                        Employees
                    </div>
                    <div className="col-6 align-items-center job-manage-header">
                    </div>
                    <div className="col-3 justify-content-end job-manage-header">
                        Jobs
                    </div>
                </div>
                <div className="row justify-content-center h-100">
                    <div className="col-3 d-flex justify-content-center">
                            <EmployeesList employees={this.state.employees} 
                                employeeHandler={this.handleEmployeeChosen}/> 
                    </div>
                    <div className="col-6">
                        <div className="row align-items-center justify-content-center" style={style}>
                        </div>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-12 mb-3 d-flex justify-content-center">
                                <TaskConfirmation currentJob={this.state.taskToConfirm}/>
                            </div>
                        </div>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-12 mb-3 d-flex justify-content-center">
                                <EmployeeConfirmation currentEmployee={this.state.employeeToConfirm}/>
                            </div>
                         </div>
                        <div className="row justify-content-center">
                            <div className="col-12 d-flex justify-content-center">
                                <Confirmation />
                            </div>
                        </div>
                    </div> 
                    <div className="col-3 d-flex justify-content-center">
                        <JobsList jobs={this.state.jobs} taskHandler={this.handleTaskChosen}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default JobAssignment;

 {/* <div className="col-6">
                        <div className="row justify-content-center">
                            <div className="col-md-7 mb-3">
                                <TaskConfirmation currentJob={this.state.taskToConfirm}/>
                            </div>
                            <div className="col-md-7 mb-3">
                                <EmployeeConfirmation currentEmployee={this.state.employeeToConfirm}/>
                            </div>
                         </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 d-flex justify-content-center">
                                <Confirmation />
                            </div>
                        </div>
                    </div> */}