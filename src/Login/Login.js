import React, {Component} from 'react';
import './Login.css';
import { withRouter} from "react-router-dom";
import Federation from './FedLogin.js';
import { login } from '../Services/authApi';
import Logo from "../images/norweld-logo.png";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
		this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const loginRequest = {...this.state};
        login(loginRequest)
        .then(response => {
            localStorage.setItem('accessToken', response.accessToken);
            this.props.onLogin();
            this.props.history.push("/employees");
        }).catch(error => {
            if(error.status === 401) {
                console.log("Username or Password is incorrect.")                  
            } else {
                console.log(error)
                console.log("Something went wrong!")                                         
            }
        });
    }

    render() {
        const {email, password} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="container container-style">
                        <img className="logo-header pt-3" src={Logo} alt="Logo"/>    
                        <div className="field">
                            <form className="login-form" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input 
                                    type="email" 
                                    name="email" 
                                    className="form-control" 
                                    id="email" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Email"
                                    value={email}
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                    type="password"
                                    name="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Password"
                                    value={password}
                                    autoComplete="off"
                                    onChange={this.handleChange} 
                                    />
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                </div>
                                <div className="login-submit">
                                    <button type="submit" id = "login" className="btn btn-submit">Login</button>
                                </div>
                            </form>
                            <div className="third-party-buttons">
                                <hr className="divider"/>
                                <p className="third-party-login">Login using your Google or Facebook account</p>
                                <Federation />
                            </div>     
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);
