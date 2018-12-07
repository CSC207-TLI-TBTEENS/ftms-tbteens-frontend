import React, {Component} from 'react';
import JobItem from './JobItem';

class JobList extends Component {
    render() {
        const jobs = this.props.jobs.map(job => (
            
            <JobItem
                key={job.id}
                job = {job}
                jobTitle = {job.jobTitle}
                siteLocation = {job.siteName}
                jobDescription = {job.description}
                viewHandler = {this.props.viewHandler}
                deletionHandler = {this.props.deletionHandler}
                curr = {this.props.curr}
                {...job}
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
                                            if (field.label.indexOf("Email") !== -1) {
                                                return (
                                                    <div class="form-group">
                                                        <label>{field.label}</label>
                                                        <input type="email" class="form-control" id="firstName" aria-describedby="emailHelp" 
                                                            value={field.value} onChange={(event) => this.props.formHandler(event, index)} required/>
                                                    </div>
                                                )
                                            }
                                            else {
                                                return (
                                                    <div class="form-group">
                                                        <label>{field.label}</label>
                                                        <input type="text" class="form-control" id="firstName" aria-describedby="emailHelp" 
                                                            value={field.value} onChange={(event) => this.props.formHandler(event, index)} required/>
                                                    </div>
                                                )
                                            }
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
            <div className="table-responsive table-shadow mb-4">
            <table className="table mb-0" id="table-job">
                <thead>
                    <tr className="table-head">
                        <th scope="col" >Job Description</th>
                        <th scope="col" >Site</th>
                        <th scope="col" >Details</th>
                        <th scope="col" ></th>
                    </tr>
                </thead>
                <tbody id= "data">
                {jobs}
                {modals}
                </tbody>
                
            </table>
            </div>
        )
    }
}

export default JobList;