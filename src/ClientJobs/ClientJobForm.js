import React, {Component} from 'react';

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

    render() {
        const {jobTitle, siteName, description} = this.state;
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group col-md-18">
                            <label htmlFor="jobTitle"> Job Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="jobTitle"
                                id="jobTitle"
                                placeholder={'Job Title'}
                                value={jobTitle}
                                autoComplete="off"
                                onChange={this.handleChange}/>
                        </div>

                        <div className="form-group col-md-18">
                            <label htmlFor="siteName"> Location</label>
                            <input
                                type="text"
                                className="form-control"
                                name="siteName"
                                id="siteName"
                                placeholder={'Location'}
                                value={siteName}
                                autoComplete="off"
                                onChange={this.handleChange}/>
                        </div>

                        <div className="form-group col-md-18">
                            <label htmlFor="description"> Description </label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                id="description"
                                placeholder={'Enter the job description...'}
                                value={description}
                                autoComplete="off"
                                onChange={this.handleChange}/>
                        </div>

                    <div className="form-row justify-content-center">
                        <div className="form-group col-md-5">
                            <button
                                type="submit" id = "login"
                                className="btn btn-submit btn-block">
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ClientJobForm;