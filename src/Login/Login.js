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

const Login = (props) => {
    return (
        <div className="Header">
            <h1 className="welcome-header">
            Welcome to the Construction Company! <br/> Please login below.</h1>
            <div className="field">
                <input className="field-form" type="text" placeholder=" Email..."/>
                <br/>
                <input className="field-form" type="text" placeholder=" Password..." />
                <div className="remember-info">
                    <Checkbox checked style={rememberStyle}> Remember me</Checkbox>
                    <p className='password-forgot'>Forgot your password?</p>
                </div>
                <div className="login-button">
                    <Button className ="Button" type="primary" style={buttonStyle} onClick={props.click}>Login</Button>
                </div>
                <div className="login-google">
                    <hr className='divider'></hr>
                    <p className="third-party-login">Login using your Google or Facebook account</p>
                    <Federation />
                </div>     
            </div>
        </div>
    )
}

export default Login;
