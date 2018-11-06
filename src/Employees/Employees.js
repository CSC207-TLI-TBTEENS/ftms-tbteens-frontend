import React, { Component } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

class Employees extends Component {
  render() {
    return (
    <div className="container">
        <header className="jumbotron">
		            <div className="container">
			            <h1 className="display-4">Welcome!</h1>
			            <hr className="my-4"/>
			            <p>
                            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#employeeForm">
                                Add Employee
                            </button> 
			            </p>
		            </div>
	    </header>
        
        <EmployeeList/>

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
              <EmployeeForm/>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Employees;