import React, { Component } from 'react';
import JobsList from './JobsList.js';
import EmployeesList from './EmployeesList.js';
import TaskConfirmation from './TaskConfirmation.js';
import EmployeeConfirmation from './EmployeeConfirmation.js';
import Confirmation from './Confirmation.js';
import * as jobAPI from './api.js';
import * as employeeAPI from '../Employees/api.js';
import 'element-theme-default';
import withAuth from "../hocs/withAuth";

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

      // Binding functions so that the 'this' keyword refers to the Job Assignment class.
      this.getJobsFromEmployees = this.getJobsFromEmployee.bind(this);
      this.getEmployeesFromJob = this.getEmployeesFromJob.bind(this);
      this.assignJob = this.assignJob.bind(this);
      this.removeJob = this.removeJob.bind(this);
    }

    componentWillMount() {
        this.getAllEmployees();
        this.getAllJobs();
    }

    async getAllJobs() {
        try {
            this.props.removeAlert();
            let allJobs = await jobAPI.getAllJobs();
            this.setState({jobs: allJobs});
        } catch(err) {
            this.props.addAlert("error-jobassign", err.message);
        }
    }

    async getAllEmployees() {
        try {
            this.props.removeAlert();
            let allEmployees = await employeeAPI.getEmployees();
            this.setState({employees: allEmployees});
        } catch(err) {
            this.props.addAlert("error-jobassign", err.message);
        }
    }

    async getJobsFromEmployee(employee) {
        try {
            this.props.removeAlert();
            let jobsFromEmployee = await employeeAPI.getJobsFromEmployee(employee.id);
            this.setState({employeeJobs: jobsFromEmployee});
        } catch(err) {
            this.props.addAlert("error-jobassign", err.message);
        }
    }

    async getEmployeesFromJob(job) {
        try {
            this.props.removeAlert();
            let employeesFromJob = await jobAPI.getEmployeesFromJob(job.id);
            this.setState({jobEmployees: employeesFromJob});
        } catch(err) {
            this.props.addAlert("error-jobassign", err.message);
        }
    }

    handleTaskChosen = (job) => {
        this.setState(
            {
                jobToConfirm: {...job}
            }
        );
        this.getEmployeesFromJob({...job});
    };

    handleEmployeeChosen = (employee) => {
        this.setState(
            {
                employeeToConfirm: {...employee}
            }
        );
        this.getJobsFromEmployee({...employee});
    };

    // Function to assign a job to an employee.
    async assignJob() {
        try {
        this.props.removeAlert();
        await jobAPI.assignJob(this.state.jobToConfirm.id, this.state.employeeToConfirm.id);
        this.setState({employeeJobs: [...this.state.employeeJobs,this.state.jobToConfirm], 
                jobEmployees:[...this.state.jobEmployees, this.state.employeeToConfirm]});
        } catch(err) {
          this.props.addAlert("error-jobassign", err.message);
        }
    }

    // Function to remove a job from an employee
    async removeJob(jobID, employeeID) {
        try {
            this.props.removeAlert();
            await jobAPI.removeJob(jobID, employeeID);
            // Editing state
            const employeeJobs = [...this.state.employeeJobs].filter(job => job.id !== jobID);
            const jobEmployees = [...this.state.jobEmployees].filter(employee => employee.id !== employeeID);
            this.setState({employeeJobs, jobEmployees});
        } catch(err) {
            this.props.addAlert("error-jobassign", err.message);
          }
    }

    render() {
        // Removing alerts if page is reloaded.
        this.props.history.listen(() => {
            this.props.removeAlert();
        });
        return (
            <div className="container h-80">
                <div className="row justify-content-center align-items-center">
                    <div className="col-4 align-items-center job-manage-header">
                        <h3>Assign Job</h3>
                    </div>
                </div>
                <div className="row justify-content-between align-items-center">
                    <div className="col-3 align-items-center job-manage-header">
                        <h3>Employees</h3>
                    </div>
                    <div className="col-6 align-items-center job-manage-header">
                    </div>
                    <div className="col-3 justify-content-end job-manage-header">
                        <h3>Jobs</h3>
                    </div>
                </div>
                {/*The main content*/}
                <div className="row justify-content-center h-100">

                    {/* The list of employees.  */}
                    <div className="col-md-3 d-flex justify-content-center">
                            <EmployeesList employees={this.state.employees} employeeHandler={this.handleEmployeeChosen}/>
                    </div>
                    <div className="col-md-6">
                        
                        {/* In case the employees list doesn't load */}
                        <div className={ this.props.alerts.category === "error-jobassign" ? "d-block alert alert-danger" : "d-none" }>
                            {this.props.alerts.message}
                        </div>

                        {/* The current job you're viewing. */}
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-12 mb-3 d-flex justify-content-center">
                                <TaskConfirmation 
                                currentJob={this.state.jobToConfirm} 
                                employees={this.state.jobEmployees}
                                delete={this.removeJob}/>
                            </div>
                        </div>

                        {/* The current employee you are viewing. */}
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-12 mb-3 d-flex justify-content-center">
                                <EmployeeConfirmation 
                                currentEmployee={this.state.employeeToConfirm} 
                                jobs={this.state.employeeJobs} 
                                delete={this.removeJob}/>
                            </div>
                         </div>
                        
                        {/* Confirm Job Assignment component. */}
                        <div className="row justify-content-center">
                            <div className="col-md-12 d-flex justify-content-center">
                                <Confirmation assignJob={this.assignJob}/>
                            </div>
                        </div>
                    </div> 

                    {/* The list of all jobs.  */}
                    <div className="col-md-3 d-flex justify-content-center">
                        <JobsList jobs={this.state.jobs} taskHandler={this.handleTaskChosen}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(["ROLE_SUPERVISOR"], JobAssignment);