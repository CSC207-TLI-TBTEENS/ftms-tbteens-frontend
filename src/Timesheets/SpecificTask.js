import React, {Component} from 'react';
import * as apiCalls from './api';
import { Message, MessageBox } from 'element-react';
import SpecificTaskForm from './SpecificTaskForm';

class SpecificTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: this.props.match.params.id,
            taskName: "",
            taskDescription:"",
            overallStartTime: "",
            overallEndTime:"",
            totalDuration:"",
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

    async loadSpecificTask() {
        let oneTask = {taskName: "Digging Hole", taskDescription: "description",
                     overallStartTime: "12:00", overallEndTime: "", totalDuration:"",
                     session:[{starttime:"12:00", endtime:"12:30", duration: "30"},
                              {starttime:"12:50", endtime:"12:55", duration: "5"}]
                    };

        // TODO: Get specific task from props on TimesheetEdit. It uses dummy data now.

        // let sessions = oneTask[session];
        // change sessions accordingly when task is passed as an object.

        let taskName = oneTask.taskName;
        let taskDescription = oneTask.taskDescription;
        let overallStartTime = oneTask.overallStartTime;
        let overallEndTime = oneTask.overallEndTime;
        let duration = oneTask.duration;

        this.setState({taskName: taskName, 
                       taskDescription: taskDescription,
                       overallStartTime: overallStartTime,
                       overallEndTime: overallEndTime,
                       totalDuration: duration});
        // session: sessions, sessionsShow:[...session],
        //?? every session is a dictionary and is passed? 
    }
    
    async editTaskDetail(taskName, taskDescription,startTime, endTime, duration) {      
        let edited = false;
        await MessageBox.confirm('Update this task\'s information?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(async() => {
            edited = true;
            // Call backend edit function this.props.match.params.id = task ID
            let id = this.state.taskId;
            let result = await apiCalls.editTask({id, taskName, taskDescription, startTime, endTime, duration});
            await Message({
              type: 'success',
              // Display success message
              message: result.message
            });
        }).catch((error) => {
            Message({
              type: 'info',
              message: error.message
            });
        });
        // If no errors in editting 
        if (edited) {
            // Update the session that are showed and the current list of employees
            
            // let taskName = taskName;
            // let taskDescription = taskDescription
            // let startTime = startTime;
            // let endTime = endTime;
            // let duration = duration;
            
            this.setState({taskName: taskName, 
                taskDescription: taskDescription,
                overallStartTime: startTime,
                overallEndTime: endTime,
                totalDuration: duration});
        }
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
                         {/*TODO: Change this "Task Name" to be from props*/}
                        <h1 className="display-4">{this.state.taskName}</h1>
                        <p className="h4">{this.state.taskDescription}</p>
                        {/* TODO: Change this "Task description" to be from props */}
                        
                        </div> 
                        
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <p>
                        <div> 
                         OVERALL   START   TIME:   <span>&nbsp; &nbsp; &nbsp; &nbsp; {this.state.overallStartTime} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
                         </div> 
                         <div> 
                         OVERALL   END   TIME:   <span>&nbsp; &nbsp; &nbsp; &nbsp; {this.state.overallEndTime} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span> 
                         </div> 
                         <div> 
                         TOTAL   DURATION: <span>&nbsp; &nbsp; &nbsp; &nbsp; {this.state.totalDuration} &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span> 
                         </div> 
                         
                        </p>
                        {/*TODO: Change these three fields according to the session table*/}
                        
                        &nbsp;
                        <p>
                            <button type="button" className="btn btn-submit mr-1" data-toggle="modal" data-target="#specificTaskForm">
                                Change Task Details
                            </button>
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

                <div className="mb-2">
                <button type="button" className="btn btn-submit mr-1" onClick={this.handleClick}>
                           Back
                </button>
                </div>
                 {/*TODO: Return to the timesheet page by clicking back button*/}  

                <div className="modal fade" id="specificTaskForm" tabIndex="-1" role="dialog" aria-labelledby="editTask" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Change Task Detail</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <SpecificTaskForm
                        editTaskDetail = {this.editTaskDetail}
                    />
                    </div>
                    </div>
                </div>

                
                </div>
                

            {/* //     <div className="modal-footer">
            //     <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            //     <button onClick={this.props.editHandler.bind(this.props.curr,  */}
            {/* //             cmp.id, this.props.companyViewed[0].value, 
            //             this.props.companyViewed[1].value, 
            //             this.props.companyViewed[2].value, 
            //             this.props.companyViewed[3].value)}
            //     type="button" className="btn btn-primary save-changes-btn">Save changes</button> */}
            </div>
 
            

        )
    }
}
export default SpecificTask;