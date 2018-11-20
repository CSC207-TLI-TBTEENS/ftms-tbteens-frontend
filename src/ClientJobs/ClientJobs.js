import React, { Component } from 'react';
import ClientJobList from './ClientJobList';

class ClientJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientJobs: []
        }
    }

    componentWillMount() {
        this.loadClientJobs();
    }

    async loadClientJobs() {
        let clientJob = {id: 1, siteLocation: "UofT", employees: ["Clara", "Nancy", "Person X"], jobDescription: "This is a new job", tasks: 0};
        let clientJobs = [clientJob];
        // let jobs = await apiCalls.getEmployeesJobs();
        this.setState({clientJobs});
        //let clientJobs = await apiCalls.getEmployees();
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron bg-purple">
                    <div className="container">
                        <h1 className="display-4">Client Job List</h1>
                    </div>
                </header>

                <ClientJobList
                    jobs = {this.state.clientJobs}
                />

            </div>
        )
    }
}

export default ClientJobs;