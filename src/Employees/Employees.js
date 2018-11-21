import React, { Component } from 'react';
import * as apiCalls from './api';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import Loading from '../components/Loading.js';
import SearchBar from '../components/Search.js';
import { Message, MessageBox } from 'element-react'

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            employeesShow:[],
            employeeViewed: [{label: "First Name", value: null}, 
                            {label: "Last name", value: null}, 
                            {label: "Email", value: null}, 
                            {label: "Phone", value: null}],
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
        this.setState({employees : [...this.state.employees, newEmployee], 
                    employeesShow : [...this.state.employeesShow, newEmployee]});
    }

    searchRet(data){
        this.setState({employeesShow: [...data]});
    }

    async sortEmployee(key, toggleState) {
        let employees = [...this.state.employees];
        let employeesShow = [...this.state.employeesShow];
        if (toggleState === 0) {
            employees = await this.sortByAscending(employees, key);
            employeesShow = await this.sortByAscending([...this.state.employeesShow], key);
        }
        else if (toggleState === 1) {
            employees = await this.sortByDescending(employees, key);
            employeesShow = await this.sortByDescending([...this.state.employeesShow], key);
        }

        let listToggle = await this.incrementToggle();
        this.setState({employees: employees, employeesShow: employeesShow, listToggle: listToggle});
    }

    async sortByAscending(arr, key) {
        let newArr = [...arr];
        newArr.sort(function(a, b) {
            if (a[key] < b[key])
                return -1;
            else if (a[key] > b[key])
                return 1;
            return 0; 
        });

        return newArr;
    }

    async sortByDescending(arr, key) {
        let newArr = [...arr];
        newArr.sort(function(a, b) {
            if (a[key] > b[key])
                return -1;
            else if (a[key] < b[key])
                return 1;
            return 0; 
        });

        return newArr;
    }

    async incrementToggle() {
        let listToggle = this.state.listToggle;
        listToggle = listToggle ? 0 : 1;
        
        return listToggle;
    }
    render() {
        let content;
        if (this.state.loading) {
            content = <Loading/>;
        } else {
            content = (<div>
                    <SearchBar data={this.state.employees} onchange={this.searchRet}/>
                    <EmployeeList employees = {this.state.employeesShow} 
                                employeeViewed={this.state.employeeViewed}
                                viewHandler={this.setEmployeeViewing}
                                formHandler={this.formChangeHandler}
                                deletionHandler={this.confirmDeletion}
                                parent={this}/> 
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