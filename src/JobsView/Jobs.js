import React, { Component } from 'react';
import * as apiCalls from './api';
import JobList from './JobList';
import SearchBar from '../components/Search.js'

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            jobsShow: []
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
        const {jobsShow} = this.state;

        return (
        <div className="container">
            <header className="jumbotron bg-purple">
                        <div className="container">
                            <h1 className="display-4">Welcome!</h1>
                            <hr className="my-4"/>
                        </div>
            </header>
            
            
            <SearchBar data={this.state.jobs} onchange={this.searchRet}/>

            <JobList
                jobs = {jobsShow} getEmployees = {this.getEmployeesFromJob}
            />
            

            <div className="modal fade" id="jobForm" tabIndex="-1" role="dialog" aria-labelledby="createNewJob" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Adding New Job</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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