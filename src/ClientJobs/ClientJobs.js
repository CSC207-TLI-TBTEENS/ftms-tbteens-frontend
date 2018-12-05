import React, { Component } from 'react';
import ClientJobList from './ClientJobList';
import ClientJobForm from './ClientJobForm';
import SearchBar from "../components/Search";
import withAuth from "../hocs/withAuth";

import * as apiCalls from './api';
import * as sorter from '../components/Sorter.js'

class ClientJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientJobs: [],
            clientJobsShow:[],
            jobViewed: [{label: "SiteName", value: null}, 
            {label: "Description", value: null}],
            loading: true,
            listToggle: 0,
            changeKey: true,
            previousKey: ''
        }
        this.createJob = this.createJob.bind(this);
        this.searchRet = this.searchRet.bind(this);
        this.sortJobs = this.sortJobs.bind(this);
    }

    componentWillMount() {
        this.loadJobs();
    }

    // Load jobs associated with the company of the current user. Catches api errors
    async loadJobs() {
        try {
            this.props.removeAlert();
            let jobs = await apiCalls.getJobs(this.props.currentUser.company);
            this.setState({clientJobs:[...jobs],loading : false, clientJobsShow:[...jobs]});
        } catch(err) {
            this.props.addAlert("error-load-clientjobs", err.message);
        }
    }

    // Sorting function for jobs.
    async sortJobs(key) {
        let changeKey = (key !== this.state.previousKey) ? true : this.state.changeKey;
        let sortedList = await sorter.sortTable([...this.state.jobs], [...this.state.jobsShow], 
                                                key, this.state.listToggle, changeKey);
        this.setState({jobs: sortedList[0], jobsShow: sortedList[1], listToggle: sortedList[2],
                        changeKey: !changeKey, previousKey: key});
    }

    // Create a new job, and assign it to the company of the current user.
    async createJob(job) {
        try {
            this.props.removeAlert();
            let newJob = await apiCalls.createJob(this.props.currentUser.company, job);
            this.setState({clientJobs : [...this.state.clientJobs, newJob],
                            clientJobsShow: [...this.state.clientJobsShow, newJob]});
            this.props.addAlert("success-adding-clientjobs", "Successfully added new employee!");
        } catch(err) {
            this.props.addAlert("error-adding-clientjobs", err.message);
        }
    }

    searchRet(data){
        this.setState({clientJobsShow : [...data]});
    }
    

    render() {
        // Removing alerts if page is reloaded.
        this.props.history.listen(() => {
            this.props.removeAlert();
        });
        
        return (
            <div className="container">
                <header className="jumbotron bg-image">
                    <div className="container">
                        <h1 className="display-4 pb-3">Client Job List</h1>
                        <p>
                            <button type="button" className="btn btn-submit" data-toggle="modal" data-target="#clientJobForm">
                                Add Job
                            </button>
                        </p>
                    </div>
                </header>

                {/* In case the job list doesn't load */}
                <div className={ this.props.alerts.category === "error-load-clientjobs" ? "d-block alert alert-danger" : "d-none" }>
                    {this.props.alerts.message}
                </div>

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
                                    company = {this.props.currentUser.company}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <SearchBar data={this.state.clientJobs} onchange={this.searchRet}/>
                <ClientJobList
                    jobs = {this.state.clientJobsShow} 
                    sortJobs={this.sortJobs}
                />

            </div>
        )
    }
}

export default withAuth(["ROLE_CLIENT"], ClientJobs);