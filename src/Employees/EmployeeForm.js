import React, {Component} from 'react';
import { connect } from "react-redux";

class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            number: '',
            role: "ROLE_EMPLOYEE"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            number: '',
            role: "ROLE_EMPLOYEE"
        });
        this.props.addEmployee(this.state);
    }
    
    // Returns which error display should be displayed
    getAlert() {
        if (this.props.alerts.category === "error-adding-employee") {
            return "alert alert-danger"
        }
        if (this.props.alerts.category === "success-adding-employee") {
            return "alert alert-success"
        }
        return "d-none"
    }

    render() {
        const {firstname, lastname, email, number, role} = this.state;

        return (
            <div className="container">
	        <div className="row align-items-center justify-content-center h-100">
            <div className="popup-form">
                <form onSubmit={this.handleSubmit}>
                    {this.props.alerts.message && (
                        <div className={this.getAlert()}>{this.props.alerts.message}</div>
                    )}
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="firstName">First Name</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="firstname"
                            id="firstName" 
                            placeholder="John"
                            value={firstname}
                            autoComplete="off"
                            onChange={this.handleChange}
                            required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="lastname"
                            id="lastName" 
                            placeholder="Doe"
                            value={lastname}
                            autoComplete="off"
                            onChange={this.handleChange}
                            required/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email</label>
                            <input 
                            type="email"
                            className="form-control"
                            name="email"
                            id="email" 
                            placeholder="example@example.com"
                            value={email}
                            autoComplete="off"
                            onChange={this.handleChange}
                            required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="number">Phone Number</label>
                            <input 
                            type="tel"
                            className="form-control"
                            name="number"
                            id="number" 
                            placeholder="289-400-2393"
                            value={number}
                            autoComplete="off"
                            onChange={this.handleChange}
                            required/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="form-group">
                            <label htmlFor="select-employee-type">Employee Type</label>
                            <select onChange={this.handleChange} value={role} name="role" className="custom-select" id="select-employee-type">
                                <option value="ROLE_EMPLOYEE" selected="selected">Regular</option>
                                <option value="ROLE_SUPERVISOR">Supervisor</option>
                            </select>
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


function mapStateToProps(state) {
    return {
        alerts: state.alerts
    }; 
}
export default connect(mapStateToProps)(EmployeeForm);