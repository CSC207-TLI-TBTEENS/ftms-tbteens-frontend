import React from 'react';
import '../index.css';
import { Button, Checkbox } from 'element-react';


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
    lineHeight: '0.9rem',
    textAlign: 'flex',
    display: 'block',
    marginLeft: '-0.5rem',
    borderColor: 'rgb(90, 85, 121)'
}

const Registration = (props) => {
    return (
        <div className="Header">
        <h1 className="welcome-header">
        Register yourself in the system here! <br/> Please fill in details below.</h1>
    <div className="field">
        <input className="field-form" type="text" placeholder=" Password..." />

    <div className="login-button">
        <Button className ="Button btn-submit" type="primary" style={buttonStyle} onClick={props.click}>Submit</Button>
    </div>
    </div>
    </div>
)
}

export default Registration;