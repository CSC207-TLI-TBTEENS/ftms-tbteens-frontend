import React, { Component } from 'react';
import TimesheetList from './TimesheetList';
import SearchBar from '../components/Search';
import * as apiCalls from '../Employees/api.js';
import { Message } from 'element-react';

class Timesheets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timesheets: [],
            timesheetsShow: []
        }

        this.searchRet = this.searchRet.bind(this);
    }

    componentWillMount() {
        this.loadTimesheets();
    }
    searchRet(data){
        this.setState({timesheetsShow:[...data]});
    }

    async loadTimesheets() {
        try {
            let getTimesheets = await apiCalls.getJobsFromEmployee(this.props.currentUser.user.id);
            this.setState({timesheets: [...getTimesheets], timesheetsShow: [...getTimesheets]});
        } catch(err) {
            Message({
                type: 'error',
                message: err.message
            });
        }
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron bg-image">
                    <div className="container">
                        <h1 className="display-4">Timesheets</h1>
                    </div>
                </header>

                <SearchBar data={this.state.timesheets} onchange={this.searchRet}/>

                <TimesheetList
                    timesheets = {this.state.timesheetsShow}
                />

            </div>
        )
    }
}

export default Timesheets;