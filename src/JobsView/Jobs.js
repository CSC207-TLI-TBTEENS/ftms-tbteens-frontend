import React, { Component } from 'react';
import * as apiCalls from './api';
import JobList from './JobList';
import Loading from '../components/Loading.js';
import SearchBar from '../components/Search.js'
import { MessageBox, Message} from 'element-react';

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            loading: true,
            jobsShow: [],
            jobViewed: [{label: "SiteName", value: null}, 
            {label: "Description", value: null}]
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
        this.setState({jobs, loading : false, jobsShow:[...jobs]});
    }

    setJobViewing = (siteName, description) => {
        this.setState({jobViewed: [
            {label: "SiteName", value: siteName}, 
            {label: "Description", value: description}
        ]})
    }

    async handleJobEdit(id, siteName, description) {
        let edited = false;
        await MessageBox.confirm('Update this job\'s information?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(async() => {
            edited = true;
            await apiCalls.editJob({id, siteName, description});
            await Message({
              type: 'success',
              message: 'Edited JOB #' + id + ' ' + description + ' successfully!'
            });
        }).catch((error) => {
            console.log(error)
            Message({
              type: 'info',
              message: "Deletion cancelled!"
            });
        });
        if (edited) {
            let currentJobs = [...this.state.clientJobs];
            for (let i = 0; i < currentJobs.length; i++) {
                if (currentJobs[i].id === id) {
                    let editedJob = {
                        id: id,
                        siteName: siteName,
                        description: description
                    };
                    currentJobs[i] = editedJob;
                    break;
                }
            }
            this.setState({jobs: currentJobs, 
                jobsShow: currentJobs});
        }
    }

    formChangeHandler = (event, index) => {
        const changed = {...this.state.jobViewed[index]};
        changed.value = event.target.value;

        const newJobViewed = [...this.state.jobViewed];
        newJobViewed[index] = changed;

        this.setState({
            jobViewed: newJobViewed    
        })
    }

    async confirmDeletion(id, siteName, description) {
        let deleted = false;
        await MessageBox.confirm('This action will remove JOB #' + id + ' ' + description + ' from the database. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(async() => {
            deleted = true;
            await apiCalls.deleteJob(id);
            await Message({
              type: 'success',
              message: 'Deleted JOB #' + id + ' ' + description + ' successfully!'
            });
        }).catch(() => {
            Message({
              type: 'info',
              message: "Deletion cancelled!"
            });
        });
        if (deleted) {
            let currentJobs = [...this.state.jobs];
            for (let i = 0; i < currentJobs.length; i++) {
                if (currentJobs[i].id === id) {
                    currentJobs.splice(i, 1);
                    break;
                }
            };
            this.setState({jobsShow: [...currentJobs], jobs: [...currentJobs]});
        }
    }

    render() {
        let content;
        const {jobsShow} = this.state;
        if (this.state.loading) {
            content = <Loading/>;
        } else {
            content = (<div>
                    <SearchBar data={this.state.jobs} onchange={this.searchRet}/>

                    <JobList
                        jobs = {jobsShow} 
                        getEmployees = {this.getEmployeesFromJob}
                        viewHandler={this.setJobViewing} 
                        editHandler={this.handleJobEdit}
                        jobViewed={this.state.jobViewed} 
                        formHandler={this.formChangeHandler}
                        deletionHandler={this.confirmDeletion}
                        curr={this}
                    />
                </div>);
        }

        return (
        <div className="container">
            <header className="jumbotron bg-image">
                        <div className="container">
                            <h1 className="display-4 pb-3">Jobs</h1>
                        </div>
            </header>
            
            
            {content}
            

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