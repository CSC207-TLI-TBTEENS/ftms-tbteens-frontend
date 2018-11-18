import React, { Component } from 'react';
import * as apiCalls from './api';
import TimesheetForm from './TimesheetForm';
import TimesheetList from './TimesheetList';
import SearchBar from '../Search/Search.js'

class Timesheets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timesheets: [],
            timesheetsShow: [],
            query: ''
        }
        this.addTimesheet = this.addTimesheet.bind(this);
        this.searchRet = this.searchRet.bind(this);
    }
 
    searchRet(data){
        this.setState({timesheetsShow:[...data]});
    }

    componentWillMount() {
        this.loadTimesheets();
    }

    async loadTimesheets() {
        let timesheets = await apiCalls.getTimesheets();
        this.setState({timesheets, timesheetsShow:[...timesheets]});
        
    }

    async addTimesheet(timesheet) {
        let newTimesheet = await apiCalls.createTimesheet(timesheet);
        this.setState({timesheets : [...this.state.timesheets, newTimesheet]});
    }

    render() {
        const {query, timesheets, timesheetsShow} = this.state;

        return (
        <div className="container">
            <header className="jumbotron">
                        <div className="container">
                            <h1 className="display-4">Welcome!</h1>
                            <hr className="my-4"/>
                            <p>
                                <button type="button" className="btn btn-submit" data-toggle="modal" data-target="#timesheetForm">
                                    Add Timesheet
                                </button> 
                            </p>
                        </div>
            </header>
            
            
            <SearchBar data={this.state.timesheets} onchange={this.searchRet}/>

            <TimesheetList
                timesheets = {timesheetsShow}
            />

            <div className="modal fade" id="timesheetForm" tabindex="-1" role="dialog" aria-labelledby="createNewTimesheet" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Adding New Timesheet</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                <TimesheetForm
                    addTimesheet = {this.addTimesheet}
                />
                </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Timesheets;