import React, {Component} from 'react';

class PartRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location,
            details: '',
            jobId: this.props.jobId
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(e) {
        await this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.submitPartRequest({details: this.state.details, location: this.state.location});
        this.setState({
            location: this.props.location,
            details:'',
        });
      }

    render() {
        const {location, details, jobId} = this.state;
        return (
            <div className="container">
                <div className="row align-items-center justify-content-center h-100">
                    <div className="popup-form w-100">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="location" className="dark-font">Delivery Location:</label>
                                <input
                                type="text"
                                className="form-control"
                                name="location"
                                id="location"
                                placeholder= {this.state.location}
                                value={location}
                                autoComplete="off"
                                onChange={this.handleChange}
                                required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="details" className="dark-font">Request Details</label>
                                <textarea
                                className="form-control"
                                name="details"
                                id="details"
                                placeholder="Details about part request"
                                rows="5"
                                value={details}
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

export default PartRequestForm;