import React, { Component } from 'react';
import ClientJobList from './ClientJobList';
import ClientJobForm from './ClientJobForm';
import SearchBar from "../components/Search";
import { MessageBox, Message} from 'element-react';
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

    async sortJobs(key) {
        let changeKey = (key !== this.state.previousKey) ? true : this.state.changeKey;
        let sortedList = await sorter.sortTable([...this.state.jobs], [...this.state.jobsShow], 
                                                key, this.state.listToggle, changeKey);
        this.setState({jobs: sortedList[0], jobsShow: sortedList[1], listToggle: sortedList[2],
                        changeKey: !changeKey, previousKey: key});
    }

    async loadJobs() {
        let jobs = await apiCalls.getJobs();
        this.setState({clientJobs:[...jobs],loading : false, clientJobsShow:[...jobs]});
    }

    async createJob(job) {
        let newJob = await apiCalls.createJob(job);
        this.setState({clientJobs : [...this.state.clientJobs, newJob],
                        clientJobsShow: [...this.state.clientJobsShow, newJob]});
    }

    searchRet(data){
        this.setState({clientJobsShow : [...data]});
    }
    setJobViewing = (siteName, description) => {
        this.setState({jobViewed: [
            {label: "SiteName", value: siteName}, 
            {label: "Description", value: description}
        ]})
    }

    async handleJobEdit(id, siteName, description) {
        let edited = false;
        console.log("this", this);
        console.log("id", id)
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
                if (currentJobs[i].id == id) {
                    let editedJob = {
                        id: id,
                        siteName: siteName,
                        description: description
                    };
                    currentJobs[i] = editedJob;
                    break;
                }
            }
            this.setState({clientJobs: currentJobs, 
                clientJobsShow: currentJobs});
            
            console.log(this.state.clientJobs, this.state.clientJobsShow)
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
        console.log(this);
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
            let currentJobs = [...this.state.clientJobs];
            for (let i = 0; i < currentJobs.length; i++) {
                if (currentJobs[i].id == id) {
                    currentJobs.splice(i, 1);
                    break;
                }
            };
            this.setState({clientJobsShow: [...currentJobs], clientJobs: [...currentJobs]});
        }
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
                    editHandler={this.handleJobEdit}
                    formHandler={this.formChangeHandler}
                    deletionHandler={this.confirmDeletion}
                    curr={this}
                    jobViewed={this.state.jobViewed} 
                    viewHandler={this.setJobViewing} 
                    sortJobs={this.sortJobs}
                />

            </div>
        )
    }
}

export default ClientJobs;