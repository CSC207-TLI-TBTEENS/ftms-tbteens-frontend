import React, {Component} from 'react';
import TaskList from "./TaskList";
import PartRequestForm from "./PartRequestForm";

class TimesheetEdit extends Component {
    state = {
        jobId: null,
        location: "",
        taskList: []
    }
//    componentDidMount() {
//        const { id } = this.props.match.params;
//        this.setState({jobId: id});
//        this.loadTasks(this.state.jobId);
//    }
//
//    async loadTasks() {
//        // let tasks = await apiCalls.getJobTasks();
//        //this.setState({taskList: tasks});
//        this.setState({taskList: []});
//    }

    async submitPartRequest(request) {
        // let newRequest = await apiCalls.createPartRequest(request);
    }

    render() {
        return(
            <div className="container">
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">{this.state.jobId}</h1>
                        <hr className="my-4"/>
                        <p>
                            Job Description here!!
                        </p>
                        <button type="button" className="btn btn-main mr-1" data-toggle="modal" data-target="#taskForm">
                            Add Task
                        </button>
                        <button type="button" className="btn btn-second mr-1" data-toggle="modal" data-target="#requestForm">
                            Request Parts
                        </button>
                        <button type="button" className="btn btn-submit mr-1 width-auto">
                            Review and Submit Timesheet
                        </button>
                    </div>
                </header>

                <div className="modal fade" id="requestForm" tabindex="-1" role="dialog" aria-labelledby="requestForm" aria-hidden="true">
                     <div className="modal-dialog" role="document">
                         <div className="modal-content">
                             <div className="modal-header">
                                 <h5 class="modal-title">Part Request Form</h5>

                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                   <span aria-hidden="true">&times;</span>
                                 </button>
                             </div>
                             <div className="modal-body">
                                <PartRequestForm
                                    submitPartRequest = {this.submitPartRequest}
                                    jobId = {this.state.jobId}
                                    location = {this.state.location}
                                />
                             </div>
                             <div className="modal-footer">
                                <button type="button" className="btn btn-second mr-1" data-dismiss="modal">
                                    Back
                                </button>
                                <button type="button" className="btn btn-submit ml-1 width-auto" data-toggle="modal" data-target="#requestForm">
                                    Submit
                                </button>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        )
    }
}

export default TimesheetEdit;