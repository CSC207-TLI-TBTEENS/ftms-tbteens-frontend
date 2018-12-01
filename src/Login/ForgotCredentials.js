import React from 'react';
import '../css/Login.css';
import * as API from './api.js';
import { Message } from 'element-react';

class ForgotCredentials extends React.Component {
    state = {
        itemForgot: 'password',
        forgotPassword: {email: ''},
        forgotOther: {firstname: '', lastname: '', phone: ''},
        passwordVerified: false,
        emailOrBothVerified: false
    }
    

    handleItemChosen(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleEditEmailBoth(event) {
        let temp = {...this.state.forgotOther};
        for (let i = 0; i < temp.length; i++) {
            console.log(temp[i])
            if (temp[i] === event.target.name) {
                temp.splice(i, 1);
                break;
            }
        }
        this.setState({forgotOther: {...temp, [event.target.name]: event.target.value}})
    }

    handleEditPassword(event) {
        this.setState({forgotPassword: {email: event.target.value}})
    }

    async verifyPasswordRecovery() {
        let result;
        try {
            result = await API.verifyRecoverPassword(this.state.forgotPassword);
            console.log(result)
            Message({
                type: 'success',
                message: result.message
            });
            this.setState({passwordVerified: true})
        } catch (error) {
            console.log(error)
            Message({
                type: 'error',
                message: error.message
            })
        }
        
    }

    async verifyEmailOrBothRecovery() {
        let result;
        try {
            result = await API.verifyRecoverEmailOrBoth(this.state.forgotOther);
            Message({
                type: 'success',
                message: result.message
            });
            this.setState({emailOrBothVerified: true})
        } catch (error) {
            Message({
                type: 'error',
                message: error.message
            })
        }
    }

    render() {
        let modalPromptEmailBoth = "We have a sent a recovery code to your phone at " + this.state.forgotOther.phone + ". Please enter the code to continue."
        let modalPromptPassword = "We have sent a recovery code to your email at " + this.state.forgotPassword.email + ". Please enter the code to continue.";
        let display;
        if (this.state.passwordVerified) {
            display = (
                <div className="password-recover-verified">
                    <h1 className="display-4">
                        <i className="el-icon-check"></i>
                    </h1>
                    <h1 className="display-4 success-message">
                        Your information has been verified
                    </h1>
                    <div className="row justify-content-center align-items-center">
                        <button type="button" className="btn btn-primary submit-forgot" data-toggle="modal" data-target="#forgotPassword">
                            Proceed
                        </button>
                    </div>
                    <div className="modal fade" id="forgotPassword" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="forgot-password">{modalPromptPassword}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="code-verify">10-digit code</span>
                                </div>
                                <input type="text" className="form-control" id="code-verify" aria-describedby="basic-addon3"/>
                            </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-primary submit-forgot">Submit</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        else if (this.state.emailOrBothVerified) {
            display = (
                <div className="email-or-both-recover-verified">
                    <h1 className="display-4">
                        <i className="el-icon-check"></i>
                    </h1>
                    <h1 className="display-4 success-message">
                        Your information has been verified
                    </h1>
                    <div className="row justify-content-center align-items-center">
                        <button type="button" className="btn btn-primary submit-forgot" data-toggle="modal" data-target="#forgotEmailBoth">
                            Proceed
                        </button>
                    </div>
                    <div className="modal fade" id="forgotEmailBoth" tabIndex="-1" role="dialog" aria-labelledby="forgot-email-both" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="forgot-email-both">{modalPromptEmailBoth}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="code-verify">10-digit code</span>
                                </div>
                                <input type="text" className="form-control" id="code-verify" aria-describedby="basic-addon3"/>
                            </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-primary submit-forgot">Submit</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            if (this.state.itemForgot === "password") {
                display = (
                    <div className="forgot-password">
                        <form>
                            <div className="form-group forgot-form">
                                <label htmlFor="email">Enter your email:</label>
                                <input onChange={this.handleEditPassword.bind(this)}
                                    value={this.state.forgotPassword.email}
                                    type="text" 
                                    className="form-control" 
                                    id="email" 
                                    placeholder="Email"/>
                            </div>
                            <div className="row justify-content-center">
                                <button onClick={this.verifyPasswordRecovery.bind(this)}type="button" className="btn btn-primary submit-forgot">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
            else {
                display = (
                    <div className="forgot-email-both">
                        <form>
                            <div className="form-group forgot-form">
                                <label htmlFor="fname">Enter your first name:</label>
                                <input onChange={this.handleEditEmailBoth.bind(this)}
                                        name="firstname"
                                        value={this.state.forgotOther.firstname}
                                        type="text" 
                                        className="form-control" 
                                        id="fname" 
                                        placeholder="First Name"/>
                            </div>
                            <div className="form-group forgot-form">
                                <label htmlFor="lname">Enter your last name:</label>
                                <input onChange={this.handleEditEmailBoth.bind(this)}
                                        type="text" 
                                        name="lastname"
                                        value={this.state.forgotOther.lastname}
                                        className="form-control" 
                                        id="lname" 
                                        placeholder="Last Name"/>
                            </div>
                            <div className="form-group forgot-form">
                                <label htmlFor="phone">Enter your phone number:</label>
                                <input onChange={this.handleEditEmailBoth.bind(this)}
                                        type="text" 
                                        name="phone"
                                        value={this.state.forgotOther.phone} 
                                        className="form-control" id="phone" 
                                        placeholder="Phone Number"/>
                            </div>
                            <div className="row justify-content-center">
                                <button onClick={this.verifyEmailOrBothRecovery.bind(this)}
                                    type="button" 
                                    className="btn btn-primary submit-forgot">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
        }
        return (
            <div className="container">
                <div className="forgot-container container-forgot">
                    <p className="return-to-login" onClick={this.props.switchBack.bind(this.props.parent, false)}>
                        <i className="el-icon-arrow-left"/>
                        Return to login
                    </p>
                    <h1>Credentials Recovery</h1>
                    <div className="form-group forgot-item-select">
                        <label htmlFor="forgot-item">Which of your credentials did you forget?</label>
                        <select name="itemForgot" 
                                className="form-control custom-select"
                                value={this.state.itemForgot}
                                onChange={this.handleItemChosen.bind(this)} 
                                id="forgot-item">
                            <option value="password">Password</option>
                            <option value="email">Email</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                    <div className="info-required">
                        {display}
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotCredentials;