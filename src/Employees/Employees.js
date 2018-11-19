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
            defaultEmployees: [],
            employees: [],
            employeesShow:[],
            loading: true,
            listToggle: 0
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.sortEmployee = this.sortEmployee.bind(this);
        this.searchRet = this.searchRet.bind(this);
    }
    componentWillMount() {
        this.loadEmployees();
    }

    async loadEmployees() {
        let employees = await apiCalls.getEmployees();
        this.setState({defaultEmployees: employees, employees : employees, loading : false, employeesShow:[...employees]});
    }

    async addEmployee(employee) {
        let newEmployee = await apiCalls.createEmployee(employee);
        this.setState({employees : [...this.state.employees, newEmployee]});
    }
    searchRet(data){
        this.setState({employeesShow:[...data]});
    }

    async sortEmployee(key, toggleState) {
        let copyEmployees = [...this.state.employees];
        let employees = [...this.state.defaultEmployees];
        if (toggleState === 0)
            employees = await this.sortByAscending(copyEmployees, key);
        else if (toggleState === 1)
            employees = await this.sortByDescending(copyEmployees, key);

        let listToggle = await this.incrementToggle();
        this.setState({employees: employees, listToggle: listToggle});
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
        listToggle = (listToggle !== 2) ? listToggle + 1 : 0;
        
        return listToggle;
    }

    render() {
        let content;
        if (this.state.loading) {
            content = <Loading/>;
        } else {
            content = (<div>
                    <SearchBar data={this.state.employees} onchange={this.searchRet}/>
                    <EmployeeList employees = {this.state.employeesShow} sortFunc = {this.sortEmployee} toggle = {this.state.listToggle}/> 
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

            <div className="modal fade" id="employeeForm" tabIndex="-1" role="dialog" aria-labelledby="createNewEmployee" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Adding New Employee</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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