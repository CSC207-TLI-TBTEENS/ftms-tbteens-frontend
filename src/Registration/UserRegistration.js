import React, {Component} from 'react';
import {apiCall} from "../Services/api";
import { Message } from 'element-react';
import Logo from "../images/norweld-logo.png";

class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {},
            password: '',
            confirmPassword: '',
            completed: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.getEmployeeInfo(this.props.match.params.id);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.removeAlert();
        if (this.state.password === this.state.confirmPassword) {
            const registerRequest = {"id": this.props.match.params.id, "password": this.state.password};
            apiCall("POST", "/api/auth/signup", registerRequest)
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

    async getEmployeeInfo(id) {
        try {
            this.props.removeAlert();
            let employee = await apiCall("GET", "/api/auth/user/" + this.props.match.params.id);
            this.setState({ employee });
        } catch(err) {
            this.props.addAlert(err.message);
        }
        
    }
    
    render() {
        const {firstname, lastname} = this.state.employee;
        const {password, confirmPassword, completed} = this.state;
        const {alerts} = this.props;
        let passwordMessage = "";
        if (password !== confirmPassword) {
            passwordMessage = "Passwords don't match."
        }

        let display;
        if (!completed && this.state.employee.password === null) {
            display = (
            <div className="row">
                <div className="container container-style">
                    <img className="logo-header pt-3" src={Logo} alt="Logo"/>   
                    <div className="field">
                        <form className="login-form" onSubmit={this.handleSubmit}>
                            <h3 className="display-6">Welcome {firstname} {lastname}!</h3>
                            <p>Please choose a password to complete your registration.</p>
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
        } else if (this.state.password != null) {
            display = (
                <div class="jumbotron">
                    <h1 class="display-4">This user has already been registered</h1>
                </div>
            )
            
        }    
        else {
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

export default UserRegistration;