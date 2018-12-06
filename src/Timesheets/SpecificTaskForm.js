import React, {Component} from 'react';

class SpecificTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            taskDescription:"",
            overallStartTime: "",
            overallEndTime:"",
            totalDuration:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(e) {
        await this.setState({[e.target.name] : e.target.value});

    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.editTaskDetail({...this.state});
        // let duration =  '';
        //     if (endTime !== "") {
        //         duration = endTime - startTime;
        //     }
        this.setState({
            taskName: '',
            taskDescription: '',
            overallStartTime: '',
            overallEndTime: '',
            totalDuration: ''
        });
      }
    
    render() {
        const {taskName, taskDescription, overallStartTime, overallEndTime} = this.state;
        return (
            <div className="container">
	        <div className="row align-items-center justify-content-center h-100">
            <div className="popup-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="taskName">Task Name</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="taskName"
                            id="taskName" 
                            placeholder={this.state.taskName}
                            value={taskName}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                        &nbsp;
                        <div className="form-group">
                            <label htmlFor="taskDescription">Task Description</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="taskDescription"
                            id="taskDescription" 
                            placeholder={this.state.taskDescription}
                            value={taskDescription}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                        &nbsp; 
                        <div className="form-group">
                            <label htmlFor="overallStartTime">Overall Start Time</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="overallStartTime"
                            id="overallStartTime" 
                            placeholder={this.state.overallStartTime}
                            value={overallStartTime}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                        &nbsp; 
                        <div className="form-group">
                            <label htmlFor="overallEndTime">Overall End Time</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="overallEndTime"
                            id="overallEndTime" 
                            placeholder={this.state.overallEndTime}
                            value={overallEndTime}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        {/* <div className="form-group">
                            <label htmlFor="totalDuration">Total Duration</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="totalDuration"
                            id="totalDuration" 
                            placeholder={this.state.totalDuration}
                            value={totalDuration}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div> */}
                    </div>
                    
                    
                    <div className="row justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-submit btn-block"
                        >
                        Change
                        </button>
                    </div>
                </form>
            </div>
            </div>
            </div> 
        )
    }
}

export default SpecificTaskForm;