import React, { Component } from 'react';
import ClientJobList from './ClientJobList';
import ClientJobForm from './ClientJobForm';
import SearchBar from "../components/Search";



class ClientJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientJobs: [],
            clientJobsShow:[],
        }
        this.addJob= this.addJob.bind(this);
        this.searchRet = this.searchRet.bind(this);
    }

    componentWillMount() {
        this.loadClientJobs();
    }

    async loadClientJobs() {
        let clientJob1 = {id: 1, siteLocation: "UofT", employees: ["Clara", "Nancy", "Person X"], jobDescription: "This is a new job", tasks: 0};
        let clientJob2 = {id: 2, siteLocation: "NewBrunswick", employees: ["William", "Felicia", "Person Y"], jobDescription: "Nice Job!", tasks: 1};
        let clientJobs = [clientJob1, clientJob2];
        // let jobs = await apiCalls.getEmployeesJobs();
        this.setState({clientJobs, clientJobsShow: [...clientJobs]});
        //let clientJobs = await apiCalls.getEmployees();
    }

    async addJob(job) {
        let newJob= {id: 2, siteLocation: "U of T" , employees: ["Person X", "Person"], jobDescription: ":(", tasks: 10};
        this.setState({clientJobs : [...this.state.clientJobs, newJob]});
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

                <SearchBar data={this.state.clientJobs} onchange={this.searchRet}/>
                <ClientJobList
                    jobs = {this.state.clientJobsShow}
                />

            </div>
        )
    }
}

export default ClientJobs;