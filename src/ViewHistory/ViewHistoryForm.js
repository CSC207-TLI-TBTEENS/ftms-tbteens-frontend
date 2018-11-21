import React, {Component} from 'react';
import './style.css';

class ViewHistoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StartTime: '',
            EndTime: '',
            DateInfo: '',
            JobName: '',
            TravelTime: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addJobTime({...this.state});
        this.setState({
            StartTime: '',
            EndTime: '',
            DateInfo: '',
            JobName: '',
            TravelTime: ''
        });
    }

    render() {
        const {StartTime, EndTime, TravelTime, JobName, DateInfo} = this.state;
        return (
            <div className="container">
                <div className="row align-items-center justify-content-center h-100">
                    <div className="popup-form">
                        <form onSubmit={this.handleSubmit}>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="number">Job Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="JobName"
                                        id="JobName"
                                        placeholder={'Fix Equipment'}
                                        value={JobName}
                                        autoComplete="off"
                                        onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="number">Date</label>
                                    <input
                                        type="date"
                                        className= "test"
                                        name="DateInfo"
                                        id="DateInfo"
                                        value={DateInfo}
                                        autoComplete="off"
                                        onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="TravelTime">Start Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        name="StartTime"
                                        id="StartTime"
                                        placeholder="87"
                                        value={StartTime}
                                        autoComplete="off"
                                        onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="email">End Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        name="End Time"
                                        id="End Time"
                                        value={EndTime}
                                        autoComplete="off"
                                        onChange={this.handleChange}/>
                                </div>
                            </div>

                            {/*this field doesn't work idk why*/}
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="number">Travel Time</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="EndTime"
                                        id="EndTime"
                                        placeholder={'98'}
                                        value={TravelTime}
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

export default ViewHistoryForm;