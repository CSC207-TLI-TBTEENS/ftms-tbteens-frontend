import React, { Component } from 'react';
import JobsList from './JobsList.js';
import EmployeesList from './EmployeesList.js';
import TaskConfirmation from './TaskConfirmation.js';
import EmployeeConfirmation from './EmployeeConfirmation.js';
import Confirmation from './Confirmation.js';
import * as jobAPI from '../ClientJobs/api.js';
import * as employeeAPI from '../Employees/api.js';
import '../css files/JobAssignment.css';
import 'element-theme-default';

export class JobAssignment extends Component {
    state = {
        jobs: [],
        employees: [],
        tasks: [],
        jobToConfirm: {jobTitle: "No Task Chosen", employees: []},
        employeeToConfirm: {firstname: "No Employee Chosen", lastname: ""}
    }

    componentWillMount() {
        this.getAllEmployees();
        this.getAllJobs();
    }

    async getAllJobs() {
        let allJobs = await jobAPI.getJobs();
        this.setState({jobs: allJobs});
    }

    async getAllEmployees() {
        let allEmployees = await employeeAPI.getEmployees();
        this.setState({employees: allEmployees});
    }

    async getJobsFromEmployee(employee, tasks) {
        let inputs = [employee, tasks];
        let jobsFromEmloyee = await employeeAPI.getJobsFromEmployee({...inputs});
        return jobsFromEmloyee;
    }

    handleTaskChosen = (job) => {
        this.setState(
            {
                jobToConfirm: {...job}
            }
        )
        console.log(this.state.jobToConfirm)

    }

    handleEmployeeChosen = (employee) => {
        // let jobsFromEmployee = this.getJobsFromEmployee(employee, this.state.tasks);
        this.setState(
            {
                employeeToConfirm: {...employee}
            }
        )
        console.log(this.state.employeeToConfirm)
    }

    render() {
        return (
            <div className="container h-80">
                <div class="row justify-content-center align-items-center">
                    <div class="col-4 align-items-center job-manage-header">
                        <h3>Jobs Manager</h3>
                    </div>
                </div>
                <div class="row justify-content-between align-items-center">
                    <div class="col-3 align-items-center job-manage-header">
                        <h3>Employees</h3>
                    </div>
                    <div class="col-6 align-items-center job-manage-header">
                    </div>
                    <div class="col-3 justify-content-end job-manage-header">
                        <h3>Jobs</h3>
                    </div>
                </div>
                <div class="row justify-content-center h-100">
                    <div className="col-md-3 d-flex justify-content-center">
                            <EmployeesList employees={this.state.employees} 
                                employeeHandler={this.handleEmployeeChosen}/> 
                    </div>
                    <div className="col-md-6">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-12 mb-3 d-flex justify-content-center">
                                <TaskConfirmation currentJob={this.state.jobToConfirm}/>
                            </div>
                        </div>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-12 mb-3 d-flex justify-content-center">
                                <EmployeeConfirmation currentEmployee={this.state.employeeToConfirm}/>
                            </div>
                         </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 d-flex justify-content-center">
                                <Confirmation employee={this.state.employeeToConfirm} job={this.state.jobToConfirm} />
                            </div>
                        </div>
                    </div> 
                    <div className="col-md-3 d-flex justify-content-center">
                        <JobsList jobs={this.state.jobs} taskHandler={this.handleTaskChosen}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default JobAssignment;