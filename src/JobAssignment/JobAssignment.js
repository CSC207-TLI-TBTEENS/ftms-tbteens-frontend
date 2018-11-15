import React, { Component } from 'react';
import JobsList from './JobsList.js';
import EmployeesList from './EmployeesList.js';
import TaskConfirmation from './TaskConfirmation.js';
import EmployeeConfirmation from './EmployeeConfirmation.js';
import Confirmation from './Confirmation.js';


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
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
            {id: 1, name: "Your mom", skill: "Great", currentJobs: ["Build 1", "Build 2", "Build 3"]},
        ],
        taskToConfirm: {id: "N/A", name: "No Task Chosen", site: "N/A", descript: "N/A", currentEmployees: ["N/A"]},
        employeeToConfirm: {id: "N/A", name: "No Employee Chosen", skill: "N/A", currentJobs: ["N/A"]}
    }

    handleTaskChosen = (task) => {
        console.log("in task handler")
        console.log(task)
        this.setState(
            {
                taskToConfirm: task
            }
        )
        console.log("Executed")
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
            <div>
                <div className="employees-list">
                    <EmployeesList employees={this.state.employees} 
                                   employeeHandler={this.handleEmployeeChosen}/> 
                </div>
                <div className="jobs-list">
                    <JobsList jobs={this.state.jobs} taskHandler={this.handleTaskChosen}/>
                </div>
                <div className="confirmation">
                    <TaskConfirmation taskChosen={this.
                    state.taskToConfirm} 
                                  />
                    <EmployeeConfirmation employeeChosen={this.state.employeeToConfirm}/>
                    <Confirmation />
                </div>
            </div>
        );
    }
}

export default JobAssignment;