import React, {Component} from 'react';
import TaskList from "../Tasks/TaskList";
import PartRequestForm from "./PartRequestForm";
import * as apiCalls from '../Tasks/api';
import * as jobApiCalls from '../JobsView/api.js'
import TaskForm from '../Tasks/TaskForm';
import { Message, MessageBox } from 'element-react';
import withAuth from "../hocs/withAuth";


class TimesheetEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobId: "",
            job: {},
            user: {},
            location: "",
            taskList: [],
            taskShow:[],
            taskViewed: [{label: "Task Name", value:""},
                        {label: "Start Time", value: ""}, 
                        {label: "End Time", value: ""}]
        }
    this.addTask = this.addTask.bind(this);
    }

    componentDidMount() {
        const timesheetId = this.props.match.params.id;
        const userId = this.props.currentUser.user.id;
        this.loadTasks(timesheetId);
        this.loadJob(timesheetId);
    }

    async loadTasks(timesheetId) {
        try {
            this.props.removeAlert();
            let tasks = await apiCalls.getTasks(timesheetId);
            this.setState({taskList: tasks});
            this.setState({taskShow: [...tasks]});
        } catch(err) {
            this.props.addAlert("error-timesheetedit", err.message);
        }
    }

    async submitPartRequest(request) {
        // try {
        //     this.props.removeAlert();
        //     let newRequest = await apiCalls.createPartRequest(request);
        // } catch(err) {
        //     this.props.addAlert("error-timesheetedit", err.message);
        // }
    }

    async loadJob(timesheetId) {
        try {
            this.props.removeAlert();
            let job = await jobApiCalls.getJobFromId(timesheetId);
            this.setState({job: job});
        } catch(err) {
            this.props.addAlert("error-timesheetedit", err.message);
        }
    }

    async addTask(task) {
        try {
            this.props.removeAlert();
            let newTask = await apiCalls.createTask(task);
            this.setState({taskList : [...this.state.taskList, newTask], 
                        taskShow : [...this.state.taskShow, newTask]});
        } catch(err) {
            this.props.addAlert("error-timesheetedit", err.message);
        }
    }
   
    setTaskViewing = (taskname, starttime, endtime) => {
        this.setState({taskViewed: [
            {label: "Task Name", value: taskname},
            {label: "Start Time", value: starttime},
            {label: "End Time", value: endtime}
        ]})
    }

    formChangeHandler = (event, index) => {
        if (index !== 2) {
            const changed = {...this.state.taskViewed[index]};
            changed.value = event.target.value;

            const newTaskViewed = [...this.state.taskViewed];
            newTaskViewed[index] = changed;

            this.setState({
                taskViewed: newTaskViewed    
            })
        }
    }
    /*async handleTaskEdit(id, taskname, starttime, endtime) {
        let edited = false;
        await MessageBox.confirm('Update this Task\'s name?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(async() => {
            edited = true;
            await apiCalls.editTask({id, taskname, starttime, endtime});
            await Message({
              type: 'success',
              message: 'Edited Task #' + id + ' ' + taskname + ' successfully!'
            });
        }).catch((error) => {
            Message({
              type: 'info',
              message: "Deletion cancelled!"
            });
        });
        if (edited) {
            let currentTasks = [...this.state.taskList];
            for (let i = 0; i < currentTasks.length; i++) {
                if (currentTasks[i].id === id) {
                    let editedTask = {
                        id: id,
                        taskname: taskname,
                        starttime: starttime,
                        endtime: endtime
                    };
                    currentTasks[i] = editedTask;
                    break;
                }
            }
            this.setState({taskList: currentTasks, 
                taskShow: currentTasks});
        }
    } */

    async confirmDeletion(id, taskname) {
        let deleted = false;
        await MessageBox.confirm('This action will remove TASK #' + id + ' ' + taskname + ' from the database. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(async() => {
            deleted = true;
            await apiCalls.deleteTask(id);
            await Message({
              type: 'success',
              message: 'Deleted Task#' + id + ' ' + taskname + ' successfully!'
            });
        }).catch((error) => {
            Message({
              type: 'info',
              message: "Deletion cancelled!"
            });
        });
        if (deleted) {
            let currentTasks = [...this.state.taskList];
            for (let i = 0; i < currentTasks.length; i++) {
                if (currentTasks[i].id === id) {
                    currentTasks.splice(i, 1);
                    break;
                }
            };
            this.setState({taskShow: currentTasks, tasks: currentTasks});
        }
    }

    render() {
        // Removing alerts if page is reloaded.
        this.props.history.listen(() => {
            this.props.removeAlert();
        });

        let content = (<div>
            
            <TaskList task = {this.state.taskShow} 
                        taskViewed={this.state.taskViewed}
                        viewHandler={this.setTaskViewing}
                        formHandler={this.formChangeHandler}
                        deletionHandler={this.confirmDeletion}
                        editHandler={this.handleTaskEdit}
                        parent={this}/> 
        </div>);

        return(
            <div className="container">
                <header className="jumbotron bg-image">
                    <div className="container">
                        <h1 className="display-4">{this.state.job.jobTitle}</h1>
                        <hr className="my-4"/>
                        <p>
                            {this.state.job.description}
                        </p>
                        <button type="button" className="btn btn-table mr-1" data-toggle="modal" data-target="#taskForm">
                            Add Task
                        </button>
                        <button type="button" className="btn btn-table mr-1" data-toggle="modal" data-target="#requestForm">
                            Request Parts
                        </button>
                        <button type="button" className="btn btn-table mr-1 w-auto">
                            Review and Submit Timesheet
                        </button>
                    </div>
                </header>

                {/* In case the employees list doesn't load */}
                <div className={ this.props.alerts.category === "error-timesheetedit" ? "d-block alert alert-danger" : "d-none" }>
                    {this.props.alerts.message}
                </div>

                {content}

                <div className="modal fade" id="taskForm" tabIndex="-1" role="dialog" aria-labelledby="createNewTask" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                 <h5 className="modal-title" id="exampleModalLabel">Adding New Task</h5>
                                
                                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                 </button>
                            </div>
                             <div className="modal-body">
                            <TaskForm
                            addTask = {this.addTask}
                            timesheetId= {this.props.match.params.id}
                            />
                            </div>
                        </div>
                    </div>
                </div>

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
                                <button type="button" className="btn btn-submit mr-1" data-dismiss="modal">
                                    Back
                                </button>
                                <button type="button" className="btn btn-submit ml-1 w-auto" data-toggle="modal" data-target="#requestForm">
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

export default withAuth(["ROLE_ADMIN", "ROLE_EMPLOYEE", "ROLE_SUPERVISOR", "ROLE_CLIENT"], TimesheetEdit);