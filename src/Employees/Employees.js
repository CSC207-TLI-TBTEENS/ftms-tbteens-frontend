import React, { Component } from 'react';
import * as apiCalls from './api';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import Loading from '../components/Loading';
import SearchBar from '../components/Search.js'

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            employeesShow:[],
            loading: true
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.searchRet = this.searchRet.bind(this);
    }
    componentWillMount() {
        this.loadEmployees();
    }

    async loadEmployees() {
        let employees = await apiCalls.getEmployees();
        this.setState({employees : employees, loading : false, employeesShow:[...employees]});
    }

    async addEmployee(employee) {
        let newEmployee = await apiCalls.createEmployee(employee);
        this.setState({employees : [...this.state.employees, newEmployee]});
    }
    searchRet(data){
        this.setState({employeesShow:[...data]});
    }

    render() {
        let content;
        if (this.state.loading) {
            content = <Loading/>;
        } else {
            content = (<div>
                    <SearchBar data={this.state.employees} onchange={this.searchRet}/>
                    <EmployeeList employees = {this.state.employeesShow} /> 
                </div>);
        }
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
            
            

            {content}

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