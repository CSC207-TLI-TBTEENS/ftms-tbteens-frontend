import React, {Component} from 'react';
import * as apiCalls from './api';
import EmployeeItem from './EmployeeItem';

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }

    componentWillMount() {
        this.loadEmployees();
    }

    async loadEmployees() {
        let employees = await apiCalls.getEmployees();
        this.setState({employees});
    }

    render() {
        const employees = this.state.employees.map(emp => (
            <EmployeeItem
                key={emp.id}
                {...emp}
            />
        ));
        return (
            <table className="table table-striped">
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