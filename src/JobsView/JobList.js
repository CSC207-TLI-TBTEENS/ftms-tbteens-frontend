import React, {Component} from 'react';
import JobItem from './JobItem';

class JobList extends Component {
    render() {
        const jobs = this.props.jobs.map(job => (
            
            <JobItem
                key={job.id}
                job = {job}
                {...job}
            />
        ));
        
        return (
            <div className="table-responsive table-shadow mb-4">
            <table className="table mb-0" id="table-job">
                <thead>
                    <tr className="table-head">
                        <th scope="col" >Job Description</th>
                        <th scope="col" >Site</th>
                    </tr>
                </thead>
                <tbody id= "data">
                {jobs}
                </tbody>
                
            </table>
            </div>
        )
    }
}

export default JobList;