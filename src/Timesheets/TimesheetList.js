import React, {Component} from 'react';
import TimesheetItem from './TimesheetItem';

class TimesheetList extends Component {

    render() {
        const timesheets = this.props.timesheets.map(timesheet => {
           return (<TimesheetItem
                key={timesheet.id}
                {...timesheet}
            />)
        });
        return (
            <div className="table-responsive table-shadow mb-4">
            <table className="table mb-0">
                <thead>
                    <tr className="table-head">
                        <th scope="col">Name</th>
                        <th scope="col">Client Company</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {timesheets}
                </tbody>
            </table>
            </div>
        )
    }
}

export default TimesheetList;