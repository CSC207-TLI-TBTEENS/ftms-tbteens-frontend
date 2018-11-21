import React, {Component} from 'react';
import EmployeeItem from './EmployeeItem';

class EmployeeList extends Component {

    sortEmployees(key) {
        this.props.sortEmployees(key);
    }
    render() {
        const employees = this.props.employees.map(emp => (
            <EmployeeItem
                key={emp.id}
                {...emp}
                viewHandler = {this.props.viewHandler}
                deletionHandler = {this.props.deletionHandler}
            />
        ));

        const modals = this.props.employees.map(emp => {
            return (
                <div class="modal fade" id={"employee" + emp.id} tabindex="-1" role="dialog" aria-labelledby="viewEmployeeDetails" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="viewEmployeeDetails">{emp.firstname + " " + emp.lastname}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    {
                                        this.props.employeeViewed.map((field, index) => {
                                            return (
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">{field.label}</label>
                                                    <input type="email" class="form-control" id="firstName" aria-describedby="emailHelp" 
                                                        value={field.value} onChange={(event) => this.props.formHandler(event, index)}/>
                                                </div>
                                            )
                                        })
                                    }
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onClick={this.props.editHandler.bind(this.props.parent, 
                                        emp.id, this.props.employeeViewed[0].value, 
                                        this.props.employeeViewed[1].value, 
                                        this.props.employeeViewed[2].value, 
                                        this.props.employeeViewed[3].value)}
                                type="button" class="btn btn-primary save-changes-btn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <table className="table">
                <thead>
                    <tr className="table-head">
                        <th scope="col" onClick={() => this.sortEmployees('firstname')}>First</th>
                        <th scope="col" onClick={() => this.sortEmployees('lastname')}>Last</th>
                        <th scope="col" onClick={() => this.sortEmployees('email')}>Email</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {employees}
                {modals}
                </tbody>
            </table>
        )
    }
}

export default EmployeeList;