import React, { Component } from 'react';

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
        // let jobs = await apiCalls.getEmployeesJobs();
        // this.setState({jobs});
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Job List</h1>
                        <hr className="my-4"/>
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