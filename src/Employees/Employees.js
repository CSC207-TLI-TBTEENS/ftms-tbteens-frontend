import React, { Component } from 'react';
import * as apiCalls from './api';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import Loading from '../components/Loading.js';
import SearchBar from '../components/Search.js';
import { Message, MessageBox } from 'element-react';
import * as sorter from '../components/Sorter.js';
import withAuth from "../hocs/withAuth";

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            employeesShow:[],
            // The employee current looked at through edit option (at first is no one)
            employeeViewed: [{label: "First Name", value: ""}, 
                            {label: "Last name", value: ""}, 
                            {label: "Email", value: ""}, 
                            {label: "Phone", value: ""}],
            loading: true,
            listToggle: 0,
            changeKey: true,
            previousKey: ''
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

    // Adding an employee. This is passed as a prop to the EmployeeForm.
    async addEmployee(employee) {
        try {
            let newEmployee = await apiCalls.createEmployee(employee);
            this.props.removeAlert();
            this.setState({employees : [...this.state.employees, newEmployee], 
                employeesShow : [...this.state.employeesShow, newEmployee]});
            this.props.addAlert("success", "Successfully added new employee!");
        } catch(err) {
            this.props.addAlert("error", err.message);
        }
    }

    searchRet(data){
        this.setState({employeesShow: [...data]});
    }

    async sortEmployees(key) {
        let changeKey = (key !== this.state.previousKey) ? true : this.state.changeKey;
        let sortedList = await sorter.sortTable([...this.state.employees], [...this.state.employeesShow],
                         key, this.state.listToggle, changeKey);
        this.setState({employees: sortedList[0], employeesShow: sortedList[1], 
                        listToggle: sortedList[2], changeKey: !changeKey, previousKey: key});
    }

    setEmployeeViewing = (firstname, lastname, email, phone) => {
        // When an employee is viewed through edit button, update the employee currently viewed
        this.setState({employeeViewed: [
            {label: "First Name", value: firstname}, 
            {label: "Last Name", value: lastname}, 
            {label: "Email", value: email}, 
            {label: "Number", value: phone}
        ]})
    }

    // Handle the editting of a particular form
    formChangeHandler = (event, index) => {
        // If the item being changed is not the email (email is unique, cannot be changed)
        if (index !== 2) {
            // Find the item being changed
            const changed = {...this.state.employeeViewed[index]};
            // Set to new value
            changed.value = event.target.value;

            const newEmployeeViewed = [...this.state.employeeViewed];
            newEmployeeViewed[index] = changed;

            this.setState({
                employeeViewed: newEmployeeViewed    
            })
        }
    }

    // The edit employee info form is submitted
    async handleEmployeeEdit(id, firstname, lastname, email, number) {
        let edited = false;
        await MessageBox.confirm('Update this employee\'s information?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(async() => {
            edited = true;
            // Call backend edit function
            let result = await apiCalls.editEmployee({id, firstname, lastname, email, number});
            await Message({
              type: 'success',
              // Display success message
              message: result.message
            });
        }).catch((error) => {
            Message({
              type: 'info',
              message: error.message
            });
        });
        // If no errors in editting 
        if (edited) {
            // Update the employees that are showed and the current list of employees
            let currentEmployees = [...this.state.employees];
            for (let i = 0; i < currentEmployees.length; i++) {
                if (currentEmployees[i].id === id) {
                    let editedEmployee = {
                        id: id,
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        number: number
                    };
                    currentEmployees[i] = editedEmployee;
                    break;
                }
            }
            this.setState({employees: currentEmployees, 
                employeesShow: currentEmployees});
        }
    }

    // When a delete request is made by clicking the delete button
    async confirmDeletion(id, firstname, lastname) {
        let deleted = false;
        await MessageBox.confirm('This action will remove EMPLOYEE #' + id + ' ' + firstname + ' ' + lastname + ' from the database. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(async() => {
            deleted = true;
            // Call delete function from backend
            let result = await apiCalls.deleteEmployee(id);
            await Message({
              type: 'success',
              message: result.message
            });
        }).catch((error) => {
            let message = "Deletion cancelled!"
            if (error !== undefined) {
                message = error.message
            }
            Message({
              type: 'info',
              message: message
            });
        });
        if (deleted) {
            let currentEmployees = [...this.state.employees];
            for (let i = 0; i < currentEmployees.length; i++) {
                if (currentEmployees[i].id === id) {
                    currentEmployees.splice(i, 1);
                    break;
                }
            };
            this.setState({employeesShow: currentEmployees, employees: currentEmployees});
        }
    }

    render() {
        // Removing alerts if page is reloaded.
        this.props.history.listen(() => {
            this.props.removeAlert();
        });

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
                                sortEmployees={this.sortEmployees}
                                editHandler={this.handleEmployeeEdit}
                                parent={this}/> 
                </div>);
        }
        return (
        <div className="container">
            <header className="jumbotron bg-image">
                <div className="container">
                    <h1 className="display-4 pb-3">Employees</h1>
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

export default withAuth(["ROLE_ADMIN"], Employees);