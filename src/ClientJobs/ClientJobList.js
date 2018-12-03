import React, {Component} from 'react';
import ClientJobItem from './ClientJobItem';

class ClientJobList extends Component {
    sortJobs(key) {
        this.props.sortJobs(key);
    }

    render() {
        const clientJobs = this.props.jobs.map(clientJob => (
            <ClientJobItem
                key={clientJob.id}
                jobTitle = {clientJob.jobTitle}
                siteLocation = {clientJob.siteName}
                jobDescription = {clientJob.description}
                {...clientJob}
            />
            
        ));
 
        return (
            <div className="table-responsive table-shadow mb-4">
            <table className="table mb-0">
                <thead>
                <tr className="table-head">
                    <th scope="col">Job Title</th>
                    <th scope="col" onClick={() => this.sortJobs('siteName')}>Site Location</th>
                    <th scope="col" onClick={() => this.sortJobs('description')}>Job Description</th>
                    <th scope="col">Employees</th>
                </tr>
                </thead>
                <tbody>
                {clientJobs}
                </tbody>
            </table>
            </div>
        )
    }
}

export default ClientJobList;