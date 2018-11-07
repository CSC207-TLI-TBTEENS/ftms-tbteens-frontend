import React, {Component} from 'react';
import EmployeeItem from './EmployeeItem';

class EmployeeList extends Component {

    render() {
        const employees = this.props.employees.map(emp => (
            <EmployeeItem
                key={emp.id}
                {...emp}
            />
        ));
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Email</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                {employees}
            </table>
        )
    }
}

export default EmployeeList;