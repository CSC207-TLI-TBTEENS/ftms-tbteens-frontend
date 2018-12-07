import React, {Component} from 'react';
import "../css/index.css";

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timesheet: this.props.timesheetId,
            name: '',
            description: ''

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(e) {
        await this.setState({[e.target.name] : e.target.value});

    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addTask({...this.state});
        this.setState({
            name: '',
            description: ''
        });
    }

    render() {
        const {name, description, endtime} = this.state;
        return (
            <div className="container">
                <div className="row align-items-center justify-content-center h-80">
                    <h3>Enter the task details below:</h3>
                    <div className="popup-form w-100">
                        <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name" className="dark-font">Task Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        placeholder="Task name ..."
                                        value={name}
                                        autoComplete="off"
                                        onChange={this.handleChange}
                                        required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="dark-font">Task Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        id="description"
                                        placeholder="Task description ..."
                                        value={description}
                                        autoComplete="off"
                                        onChange={this.handleChange}
                                        required/>
                                </div>
                            <div className="row justify-content-center">
                                <button
                                    type="submit"
                                    className="btn btn-submit btn-block"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskForm;