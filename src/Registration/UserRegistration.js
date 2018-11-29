import React, {Component} from 'react';
import '../Login/Login.css';
import {apiCall} from "../Services/api";
import Logo from "../images/norweld-logo.png";



class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {},
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.getEmployeeInfo(this.props.match.params.id);
    }

    handleSubmit(event) {
        event.preventDefault();
        const registerRequest = {"id": this.props.match.params.id, "password": this.state.password};
        apiCall("POST", "/api/auth/signup", registerRequest)
        .then(() => {
            this.props.history.push("/");
        })
        .catch(() => {
            console.log("something went wrong!");
        });
    }

    handleChange(e) {
		this.setState({[e.target.name] : e.target.value});
    }

    async getEmployeeInfo(id) {
        let employee = await apiCall("GET", "/api/auth/user/" + this.props.match.params.id);
        this.setState({ employee })
    }
    render() {
        const {firstname, lastname} = this.state.employee;
        const password = this.state.password;
        return (
            <div className="container">
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
                                    />
                                </div>
                                <div className="login-submit">
                                    <button type="submit" id = "login" className="btn btn-submit">Register</button>
                                </div>
                            </form>   
                        </div>
                    </div>
                </div>
            </div>
        )}

}

export default UserRegistration;