import React, {Component} from 'react';
import * as apiCalls from './api';
import { Message, MessageBox } from 'element-react';


class SpecificTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            taskDescription:"",
            startTime: "",
            endTime:"",
            DURATION:"",
            session:[],
            sessionViewed: [{label: "Start Time", value: ""},
                {label: "End Time", value: ""},
                {label: "Duration", value: ""}],
            startPause: 'fas fa-play',
            stopped: false  // This should be part of the task object that gets passed in.
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleStartPauseClick = this.handleStartPauseClick.bind(this);
        this.handleStopClick = this.handleStopClick.bind(this);
    }

    componentWillMount() {
        this.loadSpecificTask();
    }

    async loadSpecificTask() {
        let oneTask = {taskName: "Digging Hole", taskDescription: "None",
                     session:[{starttime:"12:00", endtime:"12:30", duration: "30"},
                              {starttime:"12:50", endtime:"12:55", duration: "5"}]
                    };
        // TODO: Get specific task from props on TimesheetEdit. It uses dummy data now.

        // let sessions = oneTask[session];
        // change sessions accordingly when task is passed as an object.

        let taskName = oneTask.taskName;
        let taskDescription = oneTask.taskDescription;
        

        this.setState({task : oneTask, taskName: taskName, taskDescription: taskDescription});
        // session: sessions, sessionsShow:[...session],
        //?? every session is a dictionary and is passed?
        
    }
    

    // setSessionViewing = (starttime, endtime) => {
    //     // When one session for a task is viewed through modify button, update the session currently modified
    //     this.setState({sessionViewed: [
    //         {label: "Start Time", value: starttime}, 
    //         {label: "End Time", value: endtime}, 
    //         {label: "Duration", value: endtime-starttime}
    //     ]})
    // }


    handleChange(e) {
        // When the name, description, overall starttime, overall endtim us modified, update and pass it to the timesheet page and backend.
        this.props.removeAlert();
        this.setState({[e.target.name] : e.target.value});
        // TODO: pass the update info to timesheet page
    }
    
    // async handleSessionEdit(id, starttime, endtime) {
    //     let edited = false;
    //     await MessageBox.confirm('Update this session\'s information?', 'Warning', {
    //         confirmButtonText: 'OK',
    //         cancelButtonText: 'Cancel',
    //         type: 'warning'
    //     }).then(async() => {
    //         edited = true;
    //         // Call backend edit function
    //         let result = await apiCalls.editSession({id, starttime, endtime});
    //         await Message({
    //           type: 'success',
    //           // Display success message
    //           message: result.message
    //         });
    //     }).catch((error) => {
    //         Message({
    //           type: 'info',
    //           message: error.message
    //         });
    //     });
    //     // If no errors in editting 
    //     if (edited) {
    //         // Update the session that are showed and the current list of employees
    //         let currentSession = [...this.state.session];
    //         for (let i = 0; i < currentsession.length; i++) {
    //             if (currentSession[i].id === id) {
    //                 let editedSession = {
    //                     id: id,
    //                     starttime:starttime,
    //                     endtime:endtime,
    //                     duration: endtime - starttime
    //                 };
    //                 currentSession[i] = editedSession;
    //                 break;
    //             }
    //         }
    //         this.setState({session: currentSession, 
    //             sessionViewed: currentSession});
    //     }
    // }

    handleStartPauseClick() {
        // Still need to get/send data to back-end.

        if (this.state.startPause === 'fas fa-play') {
            this.setState({startPause: 'fas fa-pause'});
            // Save start time for this session to component state. Waiting for back-end code: use dummy data for now.
            if (this.state.startTime === '') this.setState({startTime: '10:30'});
            let newSession = {startTime: '10:30', endTime: '--', duration: '--'};
            let addSession = this.state.session.push(newSession);
            this.setState({session: addSession});
        } else {
            this.setState({startPause: 'fas fa-play'});
            // Save end time for this session to component state. Waiting for back-end code: use dummy data for now.
            let endSession = this.state.session;
            endSession[-1].endTime = '11:45';
            this.setState({session: endSession});
        }
    }

    handleStopClick() {
        // Still need to get/send data to back-end.

        this.setState({stopped: true});
        // Save final end time to component state. Waiting for back-end code: use dummy data for now.
        this.setState({endTime: '15:00'});
        let endSession = this.state.session;
        endSession[-1].endTime = '11:45';
        this.setState({session: endSession});
    }

    render() {
        return(
            <div className="container">
                <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.5.0/css/all.css'
                      integrity='sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU'
                      crossOrigin='anonymous'/>
                <header className="jumbotron bg-image">
                    <div className="container">
                        <h1 className="display-4 pb-3">{this.state.taskName}</h1>
                        {/*TODO: Change this "Task Name" to be from props*/}
                        <h1 className="display-4">{this.state.taskId}</h1>
                        <p className="h4">{this.state.taskDescription}</p>
                        {/* TODO: Change this "Task description" to be from props */}
                        
                        </div> 
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <p>
                         OVERALL START TIME: {this.state.startTime} OVERALL END TIME: {this.state.endTime} TOTAL DURATION:
                        </p>
                        {/*TODO: Change these three fields according to the session table*/}
                        
                </header>

                <div className="mb-2">
                        <button type="button" className="btn btn-submit mr-1" disabled={this.state.stopped}
                                onClick={this.handleStartPauseClick}>
                            <i className={this.state.startPause}></i>
                        </button>
                        <button type="button" className="btn btn-submit mr-1" onClick={this.handleStopClick}>
                            <i className='fas fa-stop'></i>
                        </button>
                        {/*TODO: Make stop button function.*/}
                        <button type="button" className="btn btn-dark mr-1">
                            Modify Task Details
                        </button>
                        {/*TODO: Allow modify function work.*/}

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

                    // <div className="modal fade" id="taskForm" tabIndex="-1" role="dialog" aria-labelledby="createNewTask" aria-hidden="true">
                    // <div className="modal-dialog" role="document">
                    //     <div className="modal-content">
                    //         <div className="modal-header">
                    //              <h5 className="modal-title" id="exampleModalLabel">Task Details</h5>
                                
                    //              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    //                 <span aria-hidden="true">&times;</span>
                    //              </button>
                    //         </div>
                    //          <div className="modal-body">
                    //         <TaskForm
                    //         addTask = {this.addTask}
                    //         />
                    //         </div>
                    //     </div>
                    //  </div>
                    // </div>
            


        )
    }
}
export default SpecificTask;