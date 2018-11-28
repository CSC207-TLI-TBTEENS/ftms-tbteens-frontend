import React, {Component} from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

    render() {
        const tasks = this.props.jobs.map(task => (
           <TaskItem
                {...task}
            />
        ));
        return (
            <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr className="table-head">
                        <th scope="col">Task Name</th>
                        <th scope="col">Task Description</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                    </tr>
                </thead>
                <tbody>
                {tasks}
                </tbody>
            </table>
            </div>
        )
    }
}

export default TaskList;