import React, {Component} from 'react';
import ClientJobItem from './ClientJobItem';

class ClientJobList extends Component {

    render() {
        const clientJobs = this.props.jobs.map(clientJob => (
            <ClientJobItem
                key={clientJob.id}
                siteLocation = {clientJob.siteName}
                jobDescription = {clientJob.description}
                {...clientJob}
            />
            
        ));
        return (
            <div className="table-responsive">
            <table className="table">
                <thead>
                <tr className="table-head">
                    <th scope="col">Site Location</th>
                    <th scope="col">Job Description</th>
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