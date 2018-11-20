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