"use strict";

import React, { Component } from 'react';
import * as apiCalls from './api';
import TimesheetForm from './TimesheetForm';
import TimesheetList from './TimesheetList';

class Timesheets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timesheets: [],
            timesheetsShow: [],
            query: '',
            update: 'false'
        }
        this.addTimesheet = this.addTimesheet.bind(this);
        this.search = this.search.bind(this);
        this.handleChanging = this.handleChanging.bind(this);
    }
    search(e){
        e.preventDefault();
        if (this.state.query != ''){
            let curtimesheets = this.state.timesheets;
            let newTimesheet = [];
            console.log(...curtimesheets)
            let i,j;
            newTimesheet = curtimesheets.filter(timesheet => (
                timesheet.taskName.indexOf(this.state.query) != -1
            ))
            
            // curtimesheets.forEach(element => {
            //     if(element
            // }); (i = 0; i < curtimesheets.length; i++) {
            //     curTimesheet = curtimesheets[î];
            //     if(curTime)
            //     for (j=0; j< curtimesheets[i].length; j++){
            //         if (curtimesheets[i].indexOf(this.state.query) != -1){
            //             console.log(curtimesheets[i])
            //             
            //         }
            //     }
           
            this.setState({timesheetsShow: [...newTimesheet]});
    
        }
        else{
            this.setState({timesheetsShow: [...this.state.timesheets] })
        }
    }
    handleChanging(e) {
        
        this.setState({[e.target.name]:e.target.value})
        
        
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
        /*if (this.state.update){
            const newerTimesheet = [...this.state.newTimesheet];
            let update = false
            this.setState({timesheets: [...newerTimesheet], update: 'false'});
            
            
        
        }*/
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
            <form onSubmit={this.search}>
            <input 
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            type="text"
                            className="searchControl"
                            name="query"
                            id="query"
                            value = {this.state.query}
                            placeholder="search"
                            autoComplete="off"
                            onChange={this.handleChanging}
                            onkeydown={this.search}
                            />
            </form>
            
            <TimesheetList
                timesheets = {this.state.timesheetsShow}
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