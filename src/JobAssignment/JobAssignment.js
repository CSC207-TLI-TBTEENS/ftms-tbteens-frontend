import React, { Component } from 'react';
import JobsList from './JobsList.js';
import EmployeesList from './EmployeesList.js';
import TaskConfirmation from './TaskConfirmation.js';
import EmployeeConfirmation from './EmployeeConfirmation.js';
import Confirmation from './Confirmation.js';
import SearchBar from './Search.js'
import * as jobAPI from './api.js';
import * as employeeAPI from '../Employees/api.js';
import 'element-theme-default';
import withAuth from "../hocs/withAuth";
import { isMobileOnly } from 'react-device-detect';

export class JobAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      jobsShow: [],
      employeesShow: [],
      employees: [],
      tasks: [],
      jobToConfirm: { jobTitle: "No Job Chosen", employees: [] },
      employeeToConfirm: { firstname: "No Employee Chosen", lastname: "" },
      employeeJobs: [],
      jobEmployees: []
    };

    this.searchRetJob = this.searchRetJob.bind(this)
    this.searchRetEmployee = this.searchRetEmployee.bind(this)
    this.getJobsFromEmployees = this.getJobsFromEmployee.bind(this);
    this.getEmployeesFromJob = this.getEmployeesFromJob.bind(this);
  }

  componentWillMount() {
    this.getAllEmployees();
    this.getAllJobs();
  }

  searchRetJob(data) {
    this.setState({ jobsShow: [...data] });
  }

  searchRetEmployee(data) {
    this.setState({ employeesShow: [...data] });
  }

  async getAllJobs() {
    try {
      this.props.removeAlert();
      let allJobs = await jobAPI.getAllJobs();
      this.setState({ jobs: allJobs, jobsShow: allJobs });
    } catch (err) {
      this.props.addAlert("error-jobassign", err.message);
    }
  }

  async getAllEmployees() {
    try {
      this.props.removeAlert();
      let allEmployees = await employeeAPI.getEmployees();
      this.setState({ employees: allEmployees, employeesShow: allEmployees });
    } catch (err) {
      this.props.addAlert("error-jobassign", err.message);
    }
  }

  async getJobsFromEmployee(employee) {
    try {
      this.props.removeAlert();
      let jobsFromEmployee = await employeeAPI.getJobsFromEmployee(employee.id);
      this.setState({ employeeJobs: jobsFromEmployee });
    } catch (err) {
      this.props.addAlert("error-jobassign", err.message);
    }
  }

  async getEmployeesFromJob(job) {
    try {
      this.props.removeAlert();
      let employeesFromJob = await jobAPI.getEmployeesFromJob(job.id);
      this.setState({ jobEmployees: employeesFromJob });
    } catch (err) {
      this.props.addAlert("error-jobassign", err.message);
    }
  }

  // Just a dummy until I have time to implement and test the real onclick for deleting workers/jobs from each other.
  async dummyOnClick() {
    alert("Button pressed");
  }

  handleTaskChosen = (job) => {
    this.setState(
      {
        jobToConfirm: { ...job }
      }
    );
    this.getEmployeesFromJob({ ...job });
    console.log(JSON.stringify(this.state.jobEmployees));
  };

  handleEmployeeChosen = (employee) => {
    this.setState(
      {
        employeeToConfirm: { ...employee }
      }
    );
    this.getJobsFromEmployee({ ...employee });
  };

  render() {
    // Removing alerts if page is reloaded.
    this.props.history.listen(() => {
      this.props.removeAlert();
    });

    const employeeSection = () => {
      return (<div>
        <h3 className='job-manage-header'>Employees</h3>
        <SearchBar data={this.state.employees} onchange={this.searchRetEmployee} />
        <EmployeesList employees={this.state.employeesShow} employeeHandler={this.handleEmployeeChosen} />
      </div>
      )
    }

    const jobSection = () => {
      return (
        <div>

          <h3 className='job-manage-header'>Jobs</h3>
          <SearchBar data={this.state.jobs} onchange={this.searchRetJob} />
          <JobsList jobs={this.state.jobsShow} taskHandler={this.handleTaskChosen} />
        </div>
      )
    }

    const assignSection = () => {
      return (
        <div>
          {/* In case the employees list doesn't load */}
          < div className={this.props.alerts.category === "error-jobassign" ? "d-block alert alert-danger" : "d-none"} >
            {this.props.alerts.message}
          </div >

          <div className="row align-items-center justify-content-center">
            <h3 className='job-manage-header'>Assign Job</h3>
            <div className="col-md-12 mb-3 d-flex justify-content-center">
              <TaskConfirmation currentJob={this.state.jobToConfirm} employees={this.state.jobEmployees} />
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12 mb-3 d-flex justify-content-center">
              <EmployeeConfirmation currentEmployee={this.state.employeeToConfirm} jobs={this.state.employeeJobs} onClick={this.dummyOnClick} />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12 d-flex justify-content-center">
              <Confirmation employee={this.state.employeeToConfirm} job={this.state.jobToConfirm} onClick={this.dummyOnClick} />
            </div>
          </div>
        </div>)
    }

    return (
      <div>
        {!isMobileOnly &&
          <div className="container h-80" >
            <div class="row justify-content-center h-100" >
              <div className="col-md-3 h-20">
                {employeeSection()}
              </div>
              <div className="col-md-6">
                {assignSection()}
              </div>
              <div className="col-md-3 h-20">
                {jobSection()}
              </div>
            </div>
          </div >}

        {!!isMobileOnly &&
          <div className="container h-80" >
            <div className="col-md-6">
              {assignSection()}
            </div>
            <br/>
            <div class="row justify-content-center h-100" >
              <div className="col-md-3 h-20">
                {employeeSection()}
              </div>
              <div className="col-md-3 h-20">
                {jobSection()}
              </div>
            </div>
          </div >}
      </div>
    );
  }
}

export default withAuth(["ROLE_ADMIN", "ROLE_EMPLOYEE", "ROLE_SUPERVISOR", "ROLE_CLIENT"], JobAssignment);