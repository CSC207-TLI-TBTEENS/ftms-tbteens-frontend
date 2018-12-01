import React, {Component} from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskname: '',
            starttime: '',
            endtime: ''
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
            taskname:'',
            starttime: '',
            endtime: ''
        });
      }
    
    render() {
        const {taskname, starttime, endtime} = this.state;
        return (
            <div className="container">
	        <div className="row align-items-center justify-content-center h-100">
            <div className="popup-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="taskname">Task Name</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="taskname"
                            id="taskname" 
                            placeholder={this.state.taskname}
                            value={taskname}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
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