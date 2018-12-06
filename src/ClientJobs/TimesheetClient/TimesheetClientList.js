import React, {Component} from 'react';
import TimesheetClientItem from './TimesheetClientItem';

class TimesheetList extends Component {

    render() {
        const timesheets = this.props.timesheets.map(timesheet => {
            
            return (<TimesheetClientItem
                key={timesheet.id}
                {...timesheet}
            />)
            
        });
        return (
            <div className="table-responsive table-shadow mb-4">
            <table className="table mb-0">
                <thead>
                    <tr className="table-head">
                        <th scope="col">Employee</th>
                        <th scope="col">Details</th>
                        <th scope="col">Review</th>
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