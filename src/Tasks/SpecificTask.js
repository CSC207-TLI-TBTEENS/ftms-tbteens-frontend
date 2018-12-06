import React, {Component} from 'react';
import * as apiCalls from './api';
import { Message, MessageBox } from 'element-react';

class SpecificTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            taskDescription:"",
            STARTTIME: "",
            ENDTIME:"",
            DURATION:"",
            session:[],
            sessionViewed: [{label: "Start Time", value: ""},
                {label: "End Time", value: ""},
                {label: "Duration", value: ""}]
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.loadSpecificTask();
    }

    componentDidMount() {
        const taskId = this.props.match.params.id;
        const userId = this.props.currentUser.user.id;
        //this.loadSessions(taskId, userId);
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

    render() {
        return(
            <div className="container">
                <header className="jumbotron bg-image">
                    <div className="container">
                        <h1 className="display-4 pb-3">{this.state.taskName}</h1>
                        <h1 className="display-4">{this.state.taskId}</h1>
                        <p className="h4 mb-3"> Description: {this.state.taskDescription}</p>
                        
                        </div> 
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <p className="d-inline-block mr-5">
                            OVERALL START TIME: {this.state.STARTTIME}                   
                        </p>
                        <p className="d-inline-block mr-5 ml-5">
                            OVERALL END TIME: {this.state.ENDTIME}
                        </p>
                        <p className="d-inline-block mr-5 ml-5">
                            TOTAL DURATION: {this.state.DURATION}
                        </p>
                        
                </header>
                    <div className="mb-2">
                        <button type="button" className="btn btn-submit mr-1" onClick={this.handleClick}>
                           Start-Pause
                        </button>
                        {/*TODO: Change "Start-Pause" to icons. The icons can change when you click it.*/}
                        <button type="button" className="btn btn-submit mr-1">
                            Stop
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