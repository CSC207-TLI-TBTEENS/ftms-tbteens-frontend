import React, {Component} from 'react';
import '../css/index.css';
import * as apiCalls from './api';
import { Message, MessageBox } from 'element-react';
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'
import { timingSafeEqual } from 'crypto';

class SpecificTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskID: Number(this.props.match.params.id),
            task: {},
            sessions: [],
            sessionOnGoing: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.editTaskDetail = this.editTaskDetail.bind(this);
    }

    componentWillMount() {
        this.loadSpecificTask();
        this.loadSessions();
    }

    async loadSpecificTask() {
        let oneTask = await apiCalls.getTaskByID(this.state.taskID);

        this.setState({task: oneTask});
        this.setState({starting: oneTask.startingSession, latest: oneTask.latestSession});
        console.log(oneTask)
    }

    handleStartOrPause = async () => {
        let latest;
        if (this.state.task.latestSession !== null) {
            latest = await apiCalls.getSessionBySessionID(this.state.task.latestSession);
        }

        if (this.state.task.startingSession === null || !latest.inProgress) {
            let session;
            try {
                session = await apiCalls.startNewSession(this.state.taskID);
                this.setState({sessionOnGoing: true});
                Message({
                    type: "success",
                    message: "A new session has been started successfully!"
                })
            } catch (error) {
                Message({
                    type: "error",
                    message: "There was an error while starting a new session. Please contact support!"
                })
            }
        } else {
            let result = await apiCalls.endSession(this.state.latest);
            if (result.success === true) {
                this.setState({sessionOnGoing: false});
                Message({
                    type: "success",
                    message: "Session has been ended."
                })
            } else {
                Message({
                    type: "error",
                    message: result.message
                })
            }
        }
        let updatedTask = await apiCalls.getTaskByID(this.state.taskID);
        this.setState({task: updatedTask})
        this.loadSpecificTask();
        this.loadSessions();
    }
  
    async loadSessions() {
        let sessions = await apiCalls.getSessionsByTaskID(this.state.taskID);

        this.setState({sessions: sessions});
        console.log(sessions);
    }

    async editTaskDetail() {
        let newName = document.getElementById("title").innerHTML;
        let newDescription = document.getElementById("description").innerHTML;
        await MessageBox.confirm('Update this task\'s information?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(async () => {
            // Call backend edit function this.props.match.params.id = task ID
            let result = await apiCalls.editTask({id: this.state.taskID, name: newName, 
                description: newDescription});
            await Message({
                type: 'success',
                // Display success message
                message: result.message
            });
        }).catch((error) => {
            let message;
            if (error === undefined) {
                message = "Editing cancelled.";
            } else {
                message = error.message;
            }
            Message({
                type: 'info',
                message: message
            });
        });
    }

    handleChange(e) {
        // When the name, description, overall starttime, overall endtim us modified, update and pass it to the timesheet page and backend.
        this.props.removeAlert();
        this.setState({[e.target.name] : e.target.value});
        // TODO: pass the update info to timesheet page
    }

    render() {
        let startStop;
        if (this.state.sessionOnGoing) {
            startStop = (
                <i className="fas fa-stop"></i>
            )
        } else {
            startStop = (
                <i className="fas fa-play"></i>
            )
        }
        console.log(this.state.task);
        const times = this.state.sessions.map(session => {
            return(
                <tr>
                    <td>{session.startTimeString}</td>
                    <td>{session.endTimeString}</td>
                    <td>{(session.hoursElapsed.toString() + "0000").slice(0, 4)}</td>
                </tr>
            )
        })
        return(
            <div className="container">
                <header className="jumbotron bg-image">
                    <div className="container">
                        <h1 id="title" className="display-4 pb-3" suppressContentEditableWarning contentEditable="true">{this.state.task.name}</h1>
                        <h1 className="display-4">{this.state.taskId}</h1>
                        <p className="h4 mb-3"> Description: 
                            <p id="description" className="h5" suppressContentEditableWarning contentEditable="true">{this.state.task.description}</p>
                        </p>
                        <p>
                            TOTAL DURATION (HOURS): {(this.state.task.hoursElapsed)}
                        </p>
                    </div>
                    
                </header>
                <div className="mb-2">
                    <button type="button" className="btn btn-submit mr-1" onClick={this.handleStartOrPause.bind(this)}>
                        {startStop}
                    </button>
                    <button type="button" className="btn btn-submit mr-1" onClick={this.editTaskDetail.bind(this)}>
                        <i class="fas fa-check"></i>
                    </button>
                </div>
                <br/> <br/>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Duration (hours)</th>
                    </tr>
                    </thead>
                    <tbody>
                        {times}
                    </tbody>
                </table>
                {/*TODO: Change the table based on the action on button*/}



                <div className="modal fade" id="taskForm" tabIndex="-1" role="dialog" aria-labelledby="ModifyTask" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Task Details</h5>

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <TaskForm
                                    editTaskDetail = {this.editTaskDetail}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        )
    }
}
export default SpecificTask;