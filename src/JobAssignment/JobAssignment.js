import React, { Component } from 'react';
import JobsList from './JobsList.js';
import EmployeesList from './EmployeesList.js';
import TaskConfirmation from './TaskConfirmation.js';
import EmployeeConfirmation from './EmployeeConfirmation.js';
import Confirmation from './Confirmation.js';
import * as jobAPI from './api.js';
import * as employeeAPI from '../Employees/api.js';
import 'element-theme-default';

export class JobAssignment extends Component {
    constructor(props) {
      super(props);
      this.state = {
        jobs: [],
        employees: [],
        tasks: [],
        jobToConfirm: {jobTitle: "No Job Chosen", employees: []},
        employeeToConfirm: {firstname: "No Employee Chosen", lastname: ""},
        employeeJobs: [],
        jobEmployees: []
      };

      this.getJobsFromEmployees = this.getJobsFromEmployee.bind(this);
      this.getEmployeesFromJob = this.getEmployeesFromJob.bind(this);
    }

    componentWillMount() {
        this.getAllEmployees();
        this.getAllJobs();
    }

    async getAllJobs() {
        let allJobs = await jobAPI.getAllJobs();
        this.setState({jobs: allJobs});
    }

    async getAllEmployees() {
        let allEmployees = await employeeAPI.getEmployees();
        this.setState({employees: allEmployees});
    }

    async getJobsFromEmployee(employee) {
        let jobsFromEmployee = await employeeAPI.getJobsFromEmployee(employee.id);
        this.setState({employeeJobs: jobsFromEmployee});
    }

    async getEmployeesFromJob(job) {
        let employeesFromJob = await jobAPI.getEmployeesFromJob(job.id);
        this.setState({jobEmployees: employeesFromJob});
    }

    // Just a dummy until I have time to implement and test the real onclick for deleting workers/jobs from each other.
    async dummyOnClick() {
        alert("Button pressed");
    }

    handleTaskChosen = (job) => {
        this.setState(
            {
                jobToConfirm: {...job}
            }
        );
        this.getEmployeesFromJob({...job});
        console.log(JSON.stringify(this.state.jobEmployees));
    };

    handleEmployeeChosen = (employee) => {
        this.setState(
            {
                employeeToConfirm: {...employee}
            }
        );
        this.getJobsFromEmployee({...employee});
    };

    render() {
        return (
            <div className="container h-80">
                <div class="row justify-content-center align-items-center">
                    <div class="col-4 align-items-center job-manage-header">
                        <h3>Assign Job</h3>
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
                {/*The main content*/}
                <div class="row justify-content-center h-100">
                    <div className="col-md-3 d-flex justify-content-center">
                            <EmployeesList employees={this.state.employees} employeeHandler={this.handleEmployeeChosen}/>
                    </div>
                    <div className="col-md-6">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-12 mb-3 d-flex justify-content-center">
                                <TaskConfirmation currentJob={this.state.jobToConfirm} employees={this.state.jobEmployees}/>
                            </div>
                        </div>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-12 mb-3 d-flex justify-content-center">
                                <EmployeeConfirmation currentEmployee={this.state.employeeToConfirm} jobs={this.state.employeeJobs} onClick={this.dummyOnClick}/>
                            </div>
                         </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 d-flex justify-content-center">
                                <Confirmation employee={this.state.employeeToConfirm} job={this.state.jobToConfirm} onClick={this.dummyOnClick}/>
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