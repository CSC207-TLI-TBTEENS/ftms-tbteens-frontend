import React from 'react';
import * as API from './api.js';
import { Message } from 'element-react';

class ResetPassword extends React.Component {
    state = {
        passwordFirst: '',
        passwordConfirm: '',
        userId: '',
    }

    componentWillMount = () => {
        this.getUserId();
    }

    handlePasswordEdit = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    async verifyPasswordEntered() {
        if (this.state.passwordFirst !== this.state.passwordConfirm) {
            Message({
                type: 'error',
                message: 'Password mismatch!'
            })
        } else {
            let result = await this.changePassword();
            if (result.success === true) {
                Message({
                    type: 'success',
                    message: result.message
                })
            } else {
                Message({
                    type: 'error',
                    message: result.message
                })
            }
        }
    }

    async changePassword() {
        let result;
        if (this.props.itemForgot === "password") {
            result = await API.changePassword({id: this.state.userId, password: this.state.passwordConfirm});
        }
        console.log(result)
        return result;
    }

    async getUserId() {
        if (this.props.itemForgot === "password") {
            let ID = await API.getUserIdByEmail(this.props.recoverPassword);
            this.setState({userId: ID});
        }
        else {
            let ID = await API.getUserIdByName(this.props.recoverOther);
            this.setState({userId: ID});
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="forgot-container container-forgot">
                        <p className="return-to-login" onClick={this.props.switchBack.bind(this.props.parent, false)}>
                            <i className="el-icon-arrow-left"/>
                            Return to login
                        </p>
                        <h1 className="recovery-head">Credentials Recovery</h1>
                        <div className="form-group forgot-item-select new-password">
                            <label className="text-black" htmlFor="forgot-item">
                                <strong>Enter a new password:</strong>
                            </label>
                            <form>
                                <div className="form-group">
                                    <label className="text-black" htmlFor="password-first">Password</label>
                                    <input type="password"
                                        name="passwordFirst"
                                        value={this.state.passwordFirst} 
                                        onChange={this.handlePasswordEdit.bind(this)}
                                        className="form-control" 
                                        id="password-first" 
                                        aria-describedby="password-first" 
                                        placeholder="New Password"/>
                                </div>
                                <div className="form-group">
                                    <label className="text-black" htmlFor="password-confirm">Confirm Your Password</label>
                                    <input type="password"
                                        name="passwordConfirm"
                                        value={this.state.passwordConfirm}
                                        onChange={this.handlePasswordEdit.bind(this)} 
                                        className="form-control" 
                                        id="password-confirm" 
                                        placeholder="Confirm Password"/>
                                </div>
                            </form>
                            <div className="row justify-content-center">
                                <button type="button" 
                                        onClick={this.verifyPasswordEntered.bind(this)}
                                        class="btn btn-primary submit-forgot">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPassword;