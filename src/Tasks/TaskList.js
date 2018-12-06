import React, {Component} from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

    render() {
        const task = this.props.task.map(task => (
           <TaskItem
                key={task.id}
                {...task}
                viewHandler = {this.props.viewHandler}
                deletionHandler = {this.props.deletionHandler}
                curr = {this.props.parent}
            />
        ));

        console.log(this.props.task);
        let num = 0;
        let key = 0;
        const modals = this.props.task.map(task => {
            num++;
            return (
                <span key={num} className="modal fade" id={"task" + task.id} tabIndex="-1" role="dialog" aria-labelledby="viewTaskDetails" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="viewTaskDetails">{task.taskname}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    {
                                        this.props.taskViewed.map((field, index) => {
                                            key++;
                                            return (
                                                <div className="form-group" key={key}>
                                                    <label htmlFor="TASKInfo">{field.label}</label>
                                                    <input type="text" className="form-control" id={field.label + num} aria-describedby="emailHelp" 
                                                        value={field.value} onChange={(event) => this.props.formHandler(event, index)} disabled/>
                                                </div>
                                            )
                                        })
                                    }
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onClick={this.props.editHandler.bind(this.props.parent, 
                                        task.id, this.props.taskViewed[0].value, 
                                        this.props.taskViewed[1].value,  
                                        this.props.taskViewed[2].value)}
                                type="button" className="btn btn-primary save-changes-btn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </span>
            )
        })
        return (
            <div className="table-responsive table-shadow mb-4">
            <table className="table mb-0">
                <thead>
                    <tr className="table-head">
                        <th scope="col">Task Name</th>
                        <th scope="col">Task Description</th>
                        {/* <th scope="col">Start Time</th>
                        <th scope="col">End Time</th> */}
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                {task}
                {modals}
                </tbody>
            </table>
            </div>
        )
    }
}

export default TaskList;