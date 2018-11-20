import React, { Component } from 'react';
import JobList from './JobList';

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        }
    }

    componentWillMount() {
        this.loadJobs();
    }

    async loadJobs() {
        let job = {id: 1, jobName: "Sami's Job", clientName: "UofT", description: "This is a new job", tasks: 0};
        let jobs = [job];
        // let jobs = await apiCalls.getEmployeesJobs();
        this.setState({jobs});
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Job List</h1>
                    </div>
                </header>

                <JobList
                    jobs = {this.state.jobs}
                />

            </div>
        )
    }
}

export default Jobs;