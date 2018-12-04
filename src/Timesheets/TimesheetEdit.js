import React, {Component} from 'react';
import TaskList from "./TaskList";
import PartRequestForm from "./PartRequestForm";
import * as apiCalls from './api';
import TaskForm from './TaskForm';
import { Message, MessageBox } from 'element-react';


class TimesheetEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobId: null,
            location: "",
            taskList: [],
            taskShow:[],
            taskViewed: [{label: "Task Name", value:""},
                        {label: "Start Time", value: ""}, 
                        {label: "End Time", value: ""}]
        }
    this.addTask = this.addTask.bind(this);
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


    async addTask(task) {
        let newTask = await apiCalls.createTask(task);
        this.setState({taskList : [...this.state.taskList, newTask], 
                    taskShow : [...this.state.taskShow, newTask]});
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
    async handleTaskEdit(id, taskname, starttime, endtime) {
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
    }

    async confirmDeletion(id, taskname) {
        let deleted = false;
        console.log(this);
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
            console.log(error)
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
                        <h1 className="display-4 pb-3">{this.state.jobId}</h1>
                        <p>
                            Job Description here!!
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


                    {/* //     <br/> <br/>
                    //   <div class="table-responsive table-shadow mb-4">  
                    //      <table class="table mb-0">
                    //         <thead>
                    //             <tr>
                    //                 <th scope="col">Task Name</th>
                    //                 <th scope="col">Start Time</th>
                    //                 <th scope="col">End Time</th>
                    //             </tr>
                    //         </thead>
                    //         <tbody>
                    //             <tr>
                    //                 <th scope="row">1</th>
                    //                 <td>Mark</td>
                    //                 <td>Otto</td>
                                 
                    //             </tr>
                    //          <tr>
                    //             <th scope="row">2</th>
                    //             <td>Jacob</td>
                    //             <td>Thornton</td>
                             
                    //         </tr>
                    //         <tr>
                    //             <th scope="row">3</th>
                    //              <td>Larry</td>
                    //             <td>the Bird</td>
                             
                    //         </tr>
                    //      </tbody>
                    //     </table>
                    //   </div>
                         */}
                    </div>
                </header>
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

export default TimesheetEdit;