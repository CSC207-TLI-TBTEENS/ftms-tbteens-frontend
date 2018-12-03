import React, {Component} from 'react';
import JobItem from './JobItem';

class JobList extends Component {

    render() {
        const jobs = this.props.jobs.map(job => (
           <JobItem
                {...job}
            />
        ));
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
                {jobs}
                </tbody>
            </table>
            </div>
        )
    }
}

export default JobList;