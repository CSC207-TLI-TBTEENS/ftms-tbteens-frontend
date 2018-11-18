import React, {Component} from 'react';
import JobItem from './JobItem';

class JobList extends Component {

    render() {
        const jobs = this.props.jobs.map(emp => (
           <JobItem
                key={emp.id}
                {...emp}
            />
        ));
        return (
            <table className="table">
                <thead>
                    <tr className="table-head">
                        <th scope="col">Name</th>
                        <th scope="col">Client Company</th>
                    </tr>
                </thead>
                <tbody>
                {jobs}
                </tbody>
            </table>
        )
    }
}

export default JobList;