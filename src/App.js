import React, { Component } from 'react';
import EmployeeForm from './Employees/EmployeeForm.js';

class App extends Component {
  render() {
    return (
      <div>
        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#employeeForm">
          Add Employee
        </button> 
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

export default App;
