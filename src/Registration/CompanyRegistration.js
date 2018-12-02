import React, {Component} from 'react';
import '../Login/Login.css';
import {apiCall} from "../Services/api";
import { Message } from 'element-react';
import Logo from "../images/norweld-logo.png";

class CompanyRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            number: '',
            password: '',
            confirmPassword: '',
            completed: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.removeAlert();
        if (this.state.password === this.state.confirmPassword) {
            const registerRequest = {"id": this.props.match.params.id, 
            "firstname": this.state.firstname, "lastname": this.state.lastname, "number": this.state.number,
            "email": this.state.email, "password": this.state.password};
            apiCall("POST", "/api/auth/companysignup", registerRequest)
            .then(() => {
                this.props.history.push("/login");
            })
            .catch(() => {
            });
        } else {
            this.props.addAlert("Password don't match!");
        }
    }

    handleChange(e) {
		this.setState({[e.target.name] : e.target.value});
    }

    render() {
        const {firstname, lastname, email, number, password, confirmPassword, completed} = this.state;
        const {alerts} = this.props;
        let passwordMessage = "";
        if (password !== confirmPassword) {
            passwordMessage = "Passwords don't match."
        }

        let display;
        if (!completed) {
            display = (
            <div className="row">
                <div className="container container-style">
                    <img className="logo-header pt-3" src={Logo} alt="Logo"/>   
                    <div className="field">
                        <form className="login-form" onSubmit={this.handleSubmit}>
                            <h3 className="display-6">Welcome to Norweld!</h3>
                            <p>Please enter the following details to complete your registration.</p>

                            <div className="form-group">
                                <input 
                                type="text"
                                name="firstname" 
                                className="form-control" 
                                id="firstname" 
                                placeholder="First Name"
                                autoComplete="off"
                                value = {firstname}
                                onChange={this.handleChange} 
                                required
                                />
                            </div>

                            <div className="form-group">
                                <input 
                                type="text"
                                name="lastname" 
                                className="form-control" 
                                id="lastname" 
                                placeholder="Last Name"
                                autoComplete="off"
                                value = {lastname}
                                onChange={this.handleChange} 
                                required
                                />
                            </div>

                            <div className="form-group">
                                <input 
                                type="email"
                                name="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="Email"
                                autoComplete="off"
                                value = {email}
                                onChange={this.handleChange} 
                                required
                                />
                            </div>

                            <div className="form-group">
                                <input 
                                type="tel"
                                name="number" 
                                className="form-control" 
                                id="number" 
                                placeholder="Number"
                                autoComplete="off"
                                value = {number}
                                onChange={this.handleChange} 
                                required
                                />
                            </div>

                            <div className="form-group">
                                <input 
                                type="password"
                                name="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Password"
                                autoComplete="off"
                                value = {password}
                                onChange={this.handleChange}
                                required 
                                />
                            </div>

                            <div className="form-group">
                                <input 
                                type="password"
                                name="confirmPassword" 
                                className="form-control" 
                                id="confirmPassword" 
                                placeholder="Confirm Password"
                                autoComplete="off"
                                value = {confirmPassword}
                                onChange={this.handleChange}
                                required 
                                />
                                <div className="form-control-feedback form-error">{passwordMessage}</div>
                            </div>
                            <div className="login-submit">
                                <button type="submit" id = "login" className="btn btn-submit">Register</button>
                            </div>
                        </form>   
                    </div>
                </div>
            </div>)
        } else {
            display = <p>User Registration complete! Please login!</p>
        }
        
        return (
            <div className="container">
                {alerts.message && (
                    Message({
                        type: alerts.category,
                        message: alerts.message,
                        showClose: true
                    })
                )} 
                {display}
            </div>
        )
    }

}

export default CompanyRegistration;