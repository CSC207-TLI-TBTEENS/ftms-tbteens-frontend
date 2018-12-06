import React, {Component} from 'react';
import TimesheetClientItem from './TimesheetClientItem';

class TimesheetList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const timesheets = this.props.timesheets.map(timesheet => {
            
            return (<TimesheetClientItem
                key={timesheet.id}
                addAlert={this.props.addAlert}
                removeAlert={this.props.removeAlert}
                alerts={this.props.alerts}
                {...timesheet}
            />)
            
        });
        return (
            <div className="table-responsive table-shadow mb-4">
            <table className="table mb-0">
                <thead>
                    <tr className="table-head">
                        <th scope="col">Employee</th>
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