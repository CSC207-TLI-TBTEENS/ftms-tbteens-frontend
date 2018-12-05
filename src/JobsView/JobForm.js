import React, {Component} from 'react';

class JobForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName:'',
            siteName:'',
            workerName:'',
            companyName:'',
            startTime:'',
            endTime:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
		this.setState({[e.target.name] : e.target.value});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.addJob({...this.state});
        this.setState({
            taskName:'',
            siteName:'',
            workerName:'',
            companyName:'',
            startTime:'',
            endTime:''
        });
      }
    
    render() {
        const {taskName,siteName, workerName,companyName, startTime,endTime} = this.state;
        return (
            <div className="container">
	        <div className="row align-items-center justify-content-center h-100">
            <div className="popup-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="taskName">Task Name</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="taskName"
                            id="taskName" 
                            placeholder="Drive"
                            value={taskName}
                            autoComplete="off"
                            onChange={this.handleChange}
                            required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="siteName">Site Name</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="siteName"
                            id="siteName" 
                            placeholder="Timmins"
                            value={siteName}
                            autoComplete="off"
                            onChange={this.handleChange}
                            required/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="workerName">Worker</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="workerName"
                            id="workerName" 
                            placeholder="John"
                            value={workerName}
                            autoComplete="off"
                            onChange={this.handleChange}
                            required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="companyName">Company</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="companyName"
                            id="companyName" 
                            placeholder="Norwell"
                            value={companyName}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="startTime">Start</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="startTime"
                            id="startTime" 
                            placeholder="12:00"
                            value={startTime}
                            autoComplete="off"
                            onChange={this.handleChange}
                            required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="endTime">End Time</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="endTime"
                            id="endTime" 
                            placeholder="12:00"
                            value={endTime}
                            autoComplete="off"
                            onChange={this.handleChange}
                            required/>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-submit btn-block"
                    >
                    Create
                    </button>
                </form>
            </div>
            </div>
            </div> 
        )
    }
}

export default JobForm;