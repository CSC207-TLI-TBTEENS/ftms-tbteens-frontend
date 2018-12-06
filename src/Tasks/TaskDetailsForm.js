import React, {Component} from 'react';

class TaskDetailsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.taskName,
            description: this.props.taskDescription

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(e) {
        await this.setState({[e.target.name] : e.target.value});

    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.editTaskDetails({...this.state});
      }
    
    render() {
        const {name,description, endtime} = this.state;
        return (
            <div className="container">
	        <div className="row align-items-center justify-content-center h-100">
            <div className="popup-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Task Name</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="name"
                            id="name" 
                            placeholder={this.props.taskName}
                            value={this.state.name}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="description">Task Description</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="description"
                            id="description" 
                            placeholder={this.props.taskDescription}
                            value={this.state.description}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                    </div>                    
                    <div className="row justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-submit btn-block">
                        Update
                        </button>
                    </div>
                </form>
            </div>
            </div>
            </div> 
        )
    }
}

export default TaskDetailsForm;