import React, {Component} from 'react';
// import * as apiCalls from './api';

class SpecificTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: null,
            taskName: "",
            taskDescription:"",
            sessionViewed: [{label: "Start Time", value: ""},
                {label: "End Time", value: ""},
                {label: "Duration", value: ""}]
        }
    }

    render() {
        return(
            <div className="container">
                <header className="jumbotron bg-image">
                    <div className="container">
                        <h1 className="display-4 pb-3">{this.props.taskName}</h1>
                        {/*TODO: Change this "Task Name" to be from props*/}
                        {/*<h1 className="display-4">{this.state.taskId}</h1>*/}
                        <p className="h4">{this.props.taskName}</p>
                        {/*TODO: Change this "Task description" to be from props*/}
                        </div>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <p>
                         START TIME         END TIME               TOTAL DURATION
                        </p>
                        {/*TODO: Change these three fields according to the session table*/}
                </header>
                    <div className="mb-2">
                        <button type="button" className="btn btn-submit mr-1" onClick={this.handleClick}>
                        Start-Pause
                        </button>
                        {/*TODO: Change "Start-Pause" to icons. The icons can change when you click it.*/}
                        <button type="button" className="btn btn-submit mr-1">
                            Stop
                        </button>
                        <button type="button" className="btn btn-dark mr-1">
                            Modify
                        </button>

                    </div> 
                        <br/> <br/>
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">Start Time</th>
                                <th scope="col">End Time</th>
                                <th scope="col">Duration(min)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">12:00</th>
                                <td>12:45</td>
                                <td>45</td>
                            </tr>
                            </tbody>
                        </table>
                        {/*TODO: Change the table based on the action on button*/}

                    </div>



        )
    }
}
export default SpecificTask;