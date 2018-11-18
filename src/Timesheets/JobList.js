import React, {Component} from 'react';
import JobItem from './JobItem';

class JobList extends Component {

    render() {
        const jobs = this.props.jobs.map(job => (
           <JobItem
                key={job.id}
                {...job}
            />
        ));
        return (
            <table className="table">
                <thead>
                    <tr className="table-head">
                        <th scope="col">Name</th>
                        <th scope="col">Client Company</th>
                        <th scope="col"></th>
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