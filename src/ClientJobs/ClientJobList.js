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
                viewHandler = {this.props.viewHandler}
                deletionHandler = {this.props.deletionHandler}
                curr = {this.props.curr}
                {...clientJob}
            />
            
        ));
        const modals = this.props.jobs.map(job => {
            return (
                <div class="modal fade" id={"job" + job.id} tabindex="-1" role="dialog" aria-labelledby="viewjobDetails" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="viewjobDetails">{job.name}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    {
                                        this.props.jobViewed.map((field, index) => {
                                            return (
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">{field.label}</label>
                                                    <input type="email" class="form-control" id="firstName" aria-describedby="emailHelp" 
                                                        value={field.value} onChange={(event) => this.props.formHandler(event, index)}/>
                                                </div>
                                            )
                                        })
                                    }
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onClick={this.props.editHandler.bind(this.props.curr, 
                                        job.id, this.props.jobViewed[0].value, 
                                        this.props.jobViewed[1].value)}
                                type="button" class="btn save-changes-btn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="table-responsive">
            <table className="table">
                <thead>
                <tr className="table-head">
                    <th scope="col">Job Title</th>
                    <th scope="col" onClick={() => this.sortJobs('siteName')}>Site Location</th>
                    <th scope="col" onClick={() => this.sortJobs('description')}>Job Description</th>
                    <th scope="col">Employees</th>
                    <th scole="col"></th>
                </tr>
                </thead>
                <tbody>
                {clientJobs}
                {modals}
                </tbody>
            </table>
            </div>
        )
    }
}

export default ClientJobList;