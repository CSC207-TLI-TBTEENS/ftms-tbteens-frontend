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
            query: ''
        }
        this.addTimesheet = this.addTimesheet.bind(this);
        this.search = this.search.bind(this);
    }
    search(e){
        this.setState({[e.target.name]:e.target.value})
        if (e.target.value != ""){
            let curtimesheets = this.state.timesheets;
            let newTimesheet = [];
            const values = Object.values(curtimesheets)
            for (let i = 0; i < values.length; i++) {
                let data = Object.values(values[i])
                

                for (let j = 1; j < data.length; j++){
                    console.log(data[j])
                    console.log(data[j].indexOf(e.target.value))
                    if (data[j].indexOf(e.target.value) != -1 && !newTimesheet.includes(values[i])){   
                        newTimesheet.push(values[i])
                    }
                }
                
            }
           
            this.setState({timesheetsShow: [...newTimesheet]});
    
        }
        else{
            this.setState({timesheetsShow: [...this.state.timesheets]});
        }
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
            
            <input 
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            type="text"
                            
                            className="form-control"
                            name="query"
                            id="query"
                            value = {query}
                            placeholder="search"
                            autoComplete="off"
                            onChange={this.search}
                            />
            
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