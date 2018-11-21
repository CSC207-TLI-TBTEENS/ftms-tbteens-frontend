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
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr className="table-head">
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {employees}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EmployeeList;