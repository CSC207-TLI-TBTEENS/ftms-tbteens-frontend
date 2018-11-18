import React from 'react';
import './Login.css';
import { Button, Checkbox } from 'element-react';
import Federation from './FedLogin.js';

const rememberStyle = {
    color: 'rgb(203, 200, 228)',
    fontSize: '80%',
    marginLeft: '3%'
}

const buttonStyle = {
    borderRadius: '1rem',
    backgroundColor: 'rgb(160, 218, 113)',
    borderRadius: '1rem',
    width: '5rem',
    height: '2rem',
    lineHeight: '0.5rem',
    color: 'black',
    textAlign: 'flex',
    display: 'block',
    marginLeft: '-0.5rem',
    borderColor: 'rgb(90, 85, 121)'
}

const containerStyle = {
    backgroundColor: "rgb(90, 85, 121)",
    marginTop: "5vh",
    borderTadius: "1vh",
    color: "rgb(203, 200, 228)",
    textAlign: "center",
    height: "38rem",
    width: "28rem"
}

const Login = (props) => {
    return (
        <div className="row">
            <div className="container">    
                <p className="welcome-text"> Welcome to Norweld! <br/> Please login below. </p>
                <div className="field">
                    <form className="login-form">
                        <div className="form-group">
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" for="exampleCheck1">Remember me</label>
                        </div>
                        <div className="login-submit">
                            <button type="submit" className="btn btn-submit">Login</button>
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
        
    )
}

export default Login;
