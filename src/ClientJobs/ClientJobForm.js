import React, {Component} from 'react';
import { connect } from "react-redux";

class ClientJobForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle: '',
            siteName: '',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log({...this.state})
        this.props.createJob({...this.state});
        this.setState({
            jobTitle: '',
            siteName: '',
            description: '',
        });
    }

    // Returns which error display should be displayed
    getAlert() {
        if (this.props.alerts.category === "error-adding-clientjobs") {
            return "alert alert-danger"
        }
        if (this.props.alerts.category === "success-adding-clientjobs") {
            return "alert alert-success"
        }
        return "d-none"
    }

    render() {
        const {jobTitle, siteName, description} = this.state;
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    {this.props.alerts.message && (
                        <div className={this.getAlert()}>{this.props.alerts.message}</div>
                    )}
                    <div className="form-group col-md-12">
                        <label htmlFor="jobTitle"> Job Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="jobTitle"
                            id="jobTitle"
                            placeholder={'Job Title'}
                            value={jobTitle}
                            autoComplete="off"
                            onChange={this.handleChange}
                            required/>
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="siteName"> Location</label>
                        <input
                            type="text"
                            className="form-control"
                            name="siteName"
                            id="siteName"
                            placeholder={'Location'}
                            value={siteName}
                            autoComplete="off"
                            onChange={this.handleChange}
                            required/>
                    </div>

                    <div className="form-group col-md-12">
                        <label htmlFor="description"> Description </label>
                        <textarea
                            className="form-control"
                            name="description"
                            id="description"
                            placeholder={'Enter the job description...'}
                            value={description}
                            autoComplete="off"
                            onChange={this.handleChange}
                            required/>
                    </div>

                
                    <div className="form-group col-md-12">
                        <button
                            type="submit" id = "login"
                            className="btn btn-submit btn-block float-right">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        alerts: state.alerts
    }; 
}
export default connect(mapStateToProps)(ClientJobForm);