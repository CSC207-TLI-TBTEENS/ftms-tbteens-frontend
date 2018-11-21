import React, {Component} from 'react';
import './clientJobDetails.css';

class ClientJobForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: '',
            company: '',
            location: '',
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
        this.props.addJob({...this.state});
        this.setState({
            job: '',
            company: '',
            location: '',
            description: ''
        });
    }

    render() {
        const {job, company, location, description} = this.state;
        return (
            <div className="container">
                <div className="row align-items-center justify-content-center h-100">
                    <div className="popup-form">
                        <form onSubmit={this.handleSubmit}>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="job">Job Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="job"
                                        id="job"
                                        placeholder={'Job Name'}
                                        value={job}
                                        autoComplete="off"
                                        onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="company">Company Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="company"
                                        id="company"
                                        placeholder={'Company Name'}
                                        value={company}
                                        autoComplete="off"
                                        onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="location"> Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        id="location"
                                        placeholder={'Location'}
                                        value={location}
                                        autoComplete="off"
                                        onChange={this.handleChange}/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="description"> Description </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        id="description"
                                        value={description}
                                        autoComplete="off"
                                        onChange={this.handleChange}/>
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

export default ClientJobForm;