import React, {Component} from 'react';
import Federation from './FedLogin.js';
import ForgotCredentials from './ForgotCredentials.js';
import { Message } from 'element-react';
import Logo from "../images/norweld-logo.png";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            forgot: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleForgotCreds = (tof) => {
        this.setState({forgot: tof});
    }

    handleChange(e) {
        this.props.removeAlert();
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
            alerts,
            history,
            removeAlert
          } = this.props;

        history.listen(() => {
            removeAlert();
        });

        let display = (
            <div className="container">
                {alerts.message && (
                    Message({
                        type: alerts.category,
                        message: alerts.message,
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
                                <div className="row justify-content-between">
                                    <div className="col">
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="remember"/>
                                            <label className="form-check-label" htmlFor="remember">Remember me</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <p className="forgot-acc" onClick={this.handleForgotCreds.bind(this, true)}>Forgot your credentials?</p>
                                    </div>
                                </div>
                                <div className="login-submit">
                                    <button type="submit" id = "login" className="btn btn-submit">Login</button>
                                </div>
                            </form>
                            <div className="third-party-buttons">
                                <hr className="row justify-content-center divider"/>
                                <p className="row justify-content-center third-party-login">Login with Google or Facebook</p>
                                <Federation />
                            </div>     
                        </div>
                    </div>
                </div>
            </div>
        )
        if (this.state.forgot) {
            display = (
                <ForgotCredentials switchBack={this.handleForgotCreds} parent={this}/>
            )
        }
        
        return (
            display
        )
    }
}

export default Login;
