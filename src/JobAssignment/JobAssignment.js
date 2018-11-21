import React, { Component } from 'react';
import JobsList from './JobsList.js';
import EmployeesList from './EmployeesList.js';
import TaskConfirmation from './TaskConfirmation.js';
import EmployeeConfirmation from './EmployeeConfirmation.js';
import Confirmation from './Confirmation.js';
import * as jobAPI from './api.js';
import * as employeeAPI from '../Employees/api.js';

const style = {
    height: "10vh"
}

export class JobAssignment extends Component {
    state = {
        jobs: [],
        employees: [],
        tasks: [],
        jobToConfirm: {job: "N/A", employees: []},
        employeeToConfirm: {employee: "N/A", jobs: []},
    }

    componentWillMount() {
        this.getAllEmployees();
        this.getAllJobs();
        this.getAllTasks();
    }

    async getAllTasks() {
        let allTasks = await jobAPI.getTasks();
        this.setState({tasks: allTasks})
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

    handleTaskChosen = (job, employees) => {
        this.setState(
            {
                jobToConfirm: {job: job, employees: employees}
            }
        )
    }

    handleEmployeeChosen = (employee, jobs) => {
        let jobsFromEmployee = this.getJobsFromEmployee(employee, this.state.tasks);
        this.setState(
            {
                employeeToConfirm: {employee: employee, jobs: jobsFromEmployee}
            }
        )
    }

    render() {
        return (
            <div className="container h-80">
                <div class="row justify-content-center align-items-center">
                    <div class="col-4 align-items-center job-manage-header">
                        Jobs Manager
                    </div>
                </div>
                <div class="row justify-content-between align-items-center">
                    <div class="col-3 align-items-center job-manage-header">
                        Employees
                    </div>
                    <div class="col-6 align-items-center job-manage-header">
                    </div>
                    <div class="col-3 justify-content-end job-manage-header">
                        Jobs
                    </div>
                </div>
                <div class="row justify-content-center h-100">
                    <div className="col-md-3 d-flex justify-content-center">
                            <EmployeesList employees={this.state.employees} 
                                employeeHandler={this.handleEmployeeChosen}/> 
                    </div>
                    <div className="col-md-6">
                        <div className="row align-items-center justify-content-center" style={style}>
                        </div>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-12 mb-3 d-flex justify-content-center">
                                <TaskConfirmation currentJob={this.state.taskToConfirm}/>
                            </div>
                        </div>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-12 mb-3 d-flex justify-content-center">
                                <EmployeeConfirmation currentEmployee={this.state.employeeToConfirm}/>
                            </div>
                         </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12 d-flex justify-content-center">
                                <Confirmation />
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