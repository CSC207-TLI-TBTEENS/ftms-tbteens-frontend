import React, { Component } from 'react';
import ClientJobList from './ClientJobList';
import ClientJobForm from './ClientJobForm';
import SearchBar from "../components/Search";
import * as apiCalls from './api';


class ClientJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientJobs: [],
            clientJobsShow:[],
        }
        this.createJob = this.createJob.bind(this);
        this.searchRet = this.searchRet.bind(this);
    }

    componentWillMount() {
        this.loadClientJobs();
    }

    async loadClientJobs() {
        let jobs = await apiCalls.getJobs();
        this.setState({clientJobs : jobs, loading : false, clientJobsShow: [...jobs]});
        console.log(this.state.clientJobsShow)
    }

    async createJob(job) {
        let newJob = await apiCalls.createJob(job);
        this.setState({clientJobs : [...this.state.clientJobs, newJob],
                        clientJobsShow: [...this.state.clientJobsShow, newJob]});
    }

    searchRet(data){
        this.setState({clientJobsShow : [...data]});
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
                                <h5 className="modal-title" id="exampleModalLabel">Adding New Job</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ClientJobForm
                                    createJob = {this.createJob}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <SearchBar data={this.state.clientJobs} onchange={this.searchRet}/>
                <ClientJobList
                    jobs = {this.state.clientJobsShow}
                />

            </div>
        )
    }
}

export default ClientJobs;