import React from 'react';
import './Login.css';
import Federation from './FedLogin.js';
import Logo from "../images/norweld-logo.png";


const rememberStyle = {
    color: 'rgb(203, 200, 228)',
    fontSize: '80%',
    marginLeft: '3%'
}

const Login = (props) => {
    return (
        <div className="container">
        <div className="row">
            <div className="container container-style">
                <img className="logo-header pt-3" src={Logo}/>    
                {/* <p className="welcome-text"> Welcome to Norweld! <br/> Please login below. </p> */}
                <div className="field">
                    <form className="login-form">
                        <div className="form-group">
                            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" for="exampleCheck1">Remember me</label>
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

export default Login;
