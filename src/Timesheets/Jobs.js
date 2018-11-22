import React, { Component } from 'react';
import JobList from './JobList';
import SearchBar from '../components/Search'

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            jobsShow: []
        }

        this.searchRet = this.searchRet.bind(this);
    }

    componentWillMount() {
        this.loadJobs();
    }
    searchRet(data){
        this.setState({jobsShow:[...data]});
    }

    async loadJobs() {
        let job = {id: 1, jobName: "Sami's Job", clientName: "UofT", description: "This is a new job", tasks: 0};
        let jobs = [job];
        // let jobs = await apiCalls.getEmployeesJobs();
        this.setState({jobs, jobsShow:[...jobs]});
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Job List</h1>
                    </div>
                </header>

                <SearchBar data={this.state.jobs} onchange={this.searchRet}/>

                <JobList
                    jobs = {this.state.jobsShow}
                />

            </div>
        )
    }
}

export default Jobs;