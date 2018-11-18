import React, { Component } from 'react';
import * as apiCalls from './api';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
    }
    componentWillMount() {
        this.loadEmployees();
    }

    async loadEmployees() {
        let employees = await apiCalls.getEmployees();
        this.setState({employees});
    }

    async addEmployee(employee) {
        let newEmployee = await apiCalls.createEmployee(employee);
        this.setState({employees : [...this.state.employees, newEmployee]});
    }

    render() {
        return (
        <div className="container">
            <header className="jumbotron bg-purple">
                        <div className="container">
                            <h1 className="display-4">Employees</h1>
                            <hr className="my-4"/>
                            <p>
                                <button type="button" className="btn btn-submit" data-toggle="modal" data-target="#employeeForm">
                                    Add Employee
                                </button> 
                            </p>
                        </div>
            </header>

            <EmployeeList
                employees = {this.state.employees}
            />

            <div className="modal fade" id="employeeForm" tabindex="-1" role="dialog" aria-labelledby="createNewEmployee" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Adding New Employee</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                <EmployeeForm
                    addEmployee = {this.addEmployee}
                />
                </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Employees;