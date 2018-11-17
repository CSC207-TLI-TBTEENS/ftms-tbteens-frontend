import React, {Component} from 'react';
import TimesheetItem from './TimesheetItem';

class TimesheetList extends Component {

    render() {
        const timesheets = this.props.timesheets.map(emp => (
            <TimesheetItem
                key={emp.id}
                {...emp}
            />
        ));
        return (
            <table className="table">
                <thead>
                    <tr className="table-head">
                        <th scope="col">Task</th>
                        <th scope="col">Site</th>
                        <th scope="col">Worker</th>
                        <th scope="col">Company</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                    </tr>
                </thead>
                <tbody>
                {timesheets}
                </tbody>
            </table>
        )
    }
}

export default TimesheetList;