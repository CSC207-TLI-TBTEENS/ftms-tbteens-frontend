import React, {Component} from 'react';
import JobItem from './JobItem';

class JobList extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const jobs = this.props.jobs.map(job => (
            <JobItem
                key={job.id}
                job = {job}
                getEmployees = {this.props.getEmployees}
                {...job}
            />
        ));
        return (
            <table className="table" id="table-job">
                <thead>
                    <tr className="table-head">
                        <th scope="col" >Job Description</th>
                    </tr>
                </thead>
                <tbody id= "data">
                {jobs}
                </tbody>
                
            </table>
    
        )
    }
}

export default JobList;