import React, {Component} from 'react';
import './Login.css';
import Federation from './FedLogin.js';
import { Message } from 'element-react';
import Logo from "../images/norweld-logo.png";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
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
        this.props.onAuth(loginRequest)
        .then(() => {
            this.props.history.push("/");
        })
        .catch(() => {
            return;
        });
    }

    render() {
        const {email, password} = this.state;
        const {
            errors,
            history,
            removeError
          } = this.props;

        history.listen(() => {
            removeError();
        });
        
        return (
            <div className="container">
                {errors.message && (
                    Message({
                        type: 'error',
                        message: errors.message,
                        showClose: true
                    })
                )} 
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

export default Login;
