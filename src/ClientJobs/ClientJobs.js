import React, { Component } from 'react';
import ClientJobList from './ClientJobList';
import ClientJobForm from './ClientJobForm';
import * as apiCalls from "../Companies/api";


class ClientJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientJobs: []
        }
        this.addJob= this.addJob.bind(this);
    }

    componentWillMount() {
        this.loadClientJobs();
    }

    async loadClientJobs() {
        let clientJob = {id: 1, siteLocation: "UofT", employees: ["Clara", "Nancy", "Person X"], jobDescription: "This is a new job", tasks: 0};
        let clientJobs = [clientJob];
        // let jobs = await apiCalls.getEmployeesJobs();
        this.setState({clientJobs});
        //let clientJobs = await apiCalls.getEmployees();
    }

    async addJob(job) {
        let newJob= {id: 2, siteLocation: "not UofT", employees: ["Person X", "Person"], jobDescription: "This is a new job", tasks: 10};
        this.setState({clientJobs : [...this.state.clientJobs, newJob]});
    }
    render() {
        return (
            <div className="container">
                <header className="jumbotron bg-purple">
                    <div className="container">
                        <h1 className="display-4">Client Job List</h1>
                        <hr className="my-4"/>
                        <p>
                            <button type="button" className="btn btn-submit" data-toggle="modal" data-target="#clientJobForm">
                                Add Job
                            </button>
                        </p>
                    </div>
                </header>

                <div className="modal fade" id="clientJobForm" tabindex="-1" role="dialog" aria-labelledby="createNewJob" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Adding New Job</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ClientJobForm
                                    addJob = {this.addJob}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <ClientJobList
                    jobs = {this.state.clientJobs}
                />

            </div>
        )
    }
}

export default ClientJobs;