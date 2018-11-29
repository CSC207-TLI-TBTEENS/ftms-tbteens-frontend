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
                curr = {this.props.parent}
            />
        ));
        let num = 0;
        let key = 0
        const modals = this.props.employees.map(emp => {
            num++;
            return (
                <span key={num} className="modal fade" id={"employee" + emp.id} tabIndex="-1" role="dialog" aria-labelledby="viewEmployeeDetails" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="viewEmployeeDetails">{emp.firstname + " " + emp.lastname}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    {
                                        this.props.employeeViewed.map((field, index) => {
                                            key++;
                                            return (
                                                <div className="form-group" key={key}>
                                                    <label htmlFor="employeeInfo">{field.label}</label>
                                                    <input type="text" className="form-control" id={field.label + num} aria-describedby="emailHelp" 
                                                        value={field.value} onChange={(event) => this.props.formHandler(event, index)}/>
                                                </div>
                                            )
                                        })
                                    }
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onClick={this.props.editHandler.bind(this.props.parent, 
                                        emp.id, this.props.employeeViewed[0].value, 
                                        this.props.employeeViewed[1].value, 
                                        this.props.employeeViewed[2].value, 
                                        this.props.employeeViewed[3].value)}
                                type="button" className="btn btn-primary save-changes-btn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </span>
            )
        })
        return (
            <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr className="table-head">
                        <th scope="col" onClick={() => this.sortEmployees('firstname')}>First</th>
                        <th scope="col" onClick={() => this.sortEmployees('lastname')}>Last</th>
                        <th scope="col" onClick={() => this.sortEmployees('email')}>Email</th>
                        <th scope="col" onClick={() => this.sortEmployees('role')}>Role</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {employees}
                </tbody>
            </table>
            {modals}
            </div>
        )
    }
}

export default EmployeeList;