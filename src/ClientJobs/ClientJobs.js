import React, { Component } from 'react';
import ClientJobList from './ClientJobList';
import SearchBar from "../components/Search";

class ClientJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientJobs: [],
            clientJobsShow:[],
        }
        this.searchRet = this.searchRet.bind(this);
    }

    componentWillMount() {
        this.loadClientJobs();
    }

    async loadClientJobs() {
        let clientJob1 = {id: 1, siteLocation: "UofT", employees: ["Clara", "Nancy", "Person X"], jobDescription: "Cute Job", tasks: 5};
        let clientJob2 = {id: 2, siteLocation: "NewBrunswick", employees: ["William", "Felicia", "Person Y"], jobDescription: "Nice Job!", tasks: 1};
        let clientJobs = [clientJob1, clientJob2];
        // let jobs = await apiCalls.getEmployeesJobs();
        this.setState({clientJobs, clientJobsShow: [...clientJobs]});
        //let clientJobs = await apiCalls.getEmployees();
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
                            <button type="button" className="btn btn-submit" data-toggle="modal" data-target="#employeeForm">
                                Add Job
                            </button>
                        </p>
                    </div>
                </header>

                <SearchBar data={this.state.clientJobs} onchange={this.searchRet}/>
                <ClientJobList
                    jobs = {this.state.clientJobsShow}
                />

            </div>
        )
    }
}

export default ClientJobs;