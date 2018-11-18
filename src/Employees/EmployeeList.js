import React, {Component} from 'react';
import EmployeeItem from './EmployeeItem';

class EmployeeList extends Component {
    sortEmployees(key) {
        this.props.sortFunc(key);
    }
    render() {
        let employees = this.props.employees.map(emp => (
            <EmployeeItem
                key={emp.id}
                {...emp}
            />
        ));
        return (
            <table className="table">
                <thead>
                    <tr className="table-head">
                        {/*<th scope="col">First</th>*/}
                        <th scope="col" onClick={() => this.sortEmployees('firstname')}>First</th>
                        <th scope="col" onClick={() => this.sortEmployees('lastname')}>Last</th>
                        <th scope="col" onClick={() => this.sortEmployees('email')}>Email</th>
                    </tr>
                </thead>
                <tbody>
                {employees}
                </tbody>
            </table>
        )
    }

}

export default EmployeeList;