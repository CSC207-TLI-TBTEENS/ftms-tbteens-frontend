import React, { Component } from 'react';
import * as apiCalls from './api';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import Loading from '../components/Loading.js';
import SearchBar from '../components/Search.js';
import { Message, MessageBox } from 'element-react';
import * as sorter from '../components/Sorter.js';

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
            loading: true,
            listToggle: 0
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.searchRet = this.searchRet.bind(this);
        this.sortEmployees = this.sortEmployees.bind(this);
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

    async sortEmployees(key) {
        let sortedList = await sorter.sortTable([...this.state.employees], [...this.state.employeesShow], key, this.state.listToggle);
        this.setState({employees: sortedList[0], employeesShow: sortedList[1], listToggle: sortedList[2]});
    }

    setEmployeeViewing = (firstname, lastname, email, phone) => {
        this.setState({employeeViewed: [
            {label: "First Name", value: firstname}, 
            {label: "Last Name", value: lastname}, 
            {label: "Email", value: email}, 
            {label: "Number", value: phone}
        ]})
    }

    formChangeHandler = (event, index) => {
        const changed = {...this.state.employeeViewed[index]};
        changed.value = event.target.value;

        const newEmployeeViewed = [...this.state.employeeViewed];
        newEmployeeViewed[index] = changed;

        this.setState({
            employeeViewed: newEmployeeViewed    
        })
    }

    async confirmDeletion(id, firstname, lastname) {
        let deleted = false;
        console.log(this);
        await MessageBox.confirm('This action will remove EMPLOYEE #' + id + ' ' + firstname + ' ' + lastname + ' from the database. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(async() => {
            deleted = true;
            await apiCalls.deleteEmployee(id);
            await Message({
              type: 'success',
              message: 'Deleted EMPLOYEE #' + id + ' ' + firstname + ' ' + lastname + ' successfully!'
            });
        }).catch(() => {
            Message({
              type: 'info',
              message: "Deletion cancelled!"
            });
        });
        console.log(deleted)
        if (deleted) {
            let currentEmployees = [...this.state.employees];
            for (let i = 0; i < currentEmployees.length; i++) {
                if (currentEmployees[i].id == id) {
                    currentEmployees.splice(i, 1);
                    break;
                }
            };
            this.setState({employeesShow: currentEmployees, employees: currentEmployees});
        }
        console.log(this.state);
        console.log(this.state.currentEmployees)
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
                                parent={this}
                                sortEmployees={this.sortEmployees}/> 
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