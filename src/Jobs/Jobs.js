import React, { Component } from 'react';
import * as apiCalls from './api';
import JobForm from './JobForm';
import JobList from './JobList';
import SearchBar from '../components/Search.js'

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            jobsShow: [],
            query: ''
        }
        this.searchRet = this.searchRet.bind(this);
    }
 
    searchRet(data){
        this.setState({jobsShow:[...data]});
    }

    componentWillMount() {
        this.loadJobs();
    }

    async loadJobs() {
        let jobs = await apiCalls.getJobs();
        this.setState({jobs, jobsShow:[...jobs]});
        
    }

    render() {
        const {query, jobs, jobsShow} = this.state;

        return (
        <div className="container">
            <header className="jumbotron bg-purple">
                        <div className="container">
                            <h1 className="display-4">Welcome!</h1>
                            <hr className="my-4"/>
                            <p>
                                <button type="button" className="btn btn-submit" data-toggle="modal" data-target="#jobForm">
                                    Add Job
                                </button> 
                            </p>
                        </div>
            </header>
            
            
            <SearchBar data={this.state.jobs} onchange={this.searchRet}/>

            <JobList
                jobs = {jobsShow}
            />

            <div className="modal fade" id="jobForm" tabindex="-1" role="dialog" aria-labelledby="createNewJob" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Adding New Job</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Jobs;