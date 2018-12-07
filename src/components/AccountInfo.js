import React from 'react';
import { Loading } from 'element-react';
import * as LoginAPI from "../Login/api.js";
import * as EmployeeAPI from "../Employees/api.js";
import { verifyPasswordEmployee } from "../Services/authApi.js";
import { Message } from 'element-react';

class AccountInfo extends React.Component {
    state = {
        id: this.props.user.id,
        fname: this.props.user.firstname,
        lname: this.props.user.lastname,
        phone: this.props.user.number,
        email: this.props.user.email,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        showAlert: false,
        alertMessage: "",
        changeSuccessful: false,
        loading: false,
        tablefname: "",
        tablelname: "",
        tablephone: "",
        changePasswordLoading: false
    }
    handleFormEdit = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    sendEditRequest = async () => {
        console.log("executing")
        if (this.state.loading) {
            let result;
            try {
                result = await EmployeeAPI.editEmployee({
                    id: this.state.id, 
                    firstname: this.state.tablefname, 
                    lastname: this.state.tablelname, 
                    number: this.state.phone
                })
                if (result.success === true) {
                    Message({
                        type: "success",
                        message: "Updated account details successfully!"
                    });
                    this.setState({fname: this.state.tablefname, 
                        lname: this.state.tablelname, 
                        phone: this.state.tablephone, 
                        loading: false
                    });
                } else {
                    Message({
                        type: "error",
                        message: "There was an error with your request. Please contact support."
                    })
                    this.setState({loading: false});
                }
            } catch (error) {
                Message({
                    type: "error",
                    message: "Internal Server Error. Please try again later."
                });
                this.setState({loading: false});
            }
        }
    }

    handleTableSubmit = () => {
        let firstname = document.getElementById("firstname").innerHTML;
        let lastname = document.getElementById("lastname").innerHTML;
        let phone = document.getElementById("phone").innerHTML;
        if (firstname !== this.state.fname || 
            lastname !== this.state.lname || 
            phone !== this.state.phone) {
                this.setState({loading: true});
                this.setState({tablefname: firstname, tablelname: lastname, tablephone: phone});
            }
    }

    authenticateRequest = async () => {
        const authenticationRequest = {id: this.state.id, 
            password: this.state.oldPassword};
        
        let result; 
        result = await verifyPasswordEmployee(authenticationRequest);

        return result;
    }

    async changePasswordRequest(event) {
        event.preventDefault();
        this.setState({changePasswordLoading: true})
        let authenticationResult
        try {
            authenticationResult = await this.authenticateRequest();
        } catch(error) {
            this.setState({alertMessage: "The current password you entered does not match our records. Please try again."});
            this.setState({showAlert: true, changeSuccessful: false, changePasswordLoading: false});
            return;
        }
        if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({alertMessage: "Password mismatch!"});
            this.setState({showAlert: true, changeSuccessful: false, changePasswordLoading: false});
            return;
        }
        let result = await LoginAPI.changePassword({id: this.state.id, password: this.state.newPassword});
        if (result.success === true) {
            this.setState({alertMessage: "Your password has been changed successfully!"});
            this.setState({changeSuccessful: true});
        } else {
            this.setState({alertMessage: "There was an error with your password change request, please contact support."});
            console.log(result)
        }
        this.setState({showAlert: true, changePasswordLoading: false});
    }

    render() {
        if (this.state.loading) {
            this.sendEditRequest();
        }
        let alert;
        if (this.state.showAlert) {
            if (this.state.changeSuccessful) {
                alert = (
                    <div className="alert alert-success" role="alert">
                        {this.state.alertMessage}
                    </div>
                )
            } else {
                alert = (
                    <div className="alert alert-danger" role="alert">
                        {this.state.alertMessage}
                    </div>
                )
            }
        }
        
        let submit;
        if (this.state.loading) {
            submit = (
                <i className="el-icon-loading"/>
            )
        } else {
            submit = (
                <i onClick={this.handleTableSubmit}
                className="el-icon-check submit-edit-button"></i>
            )
        }
        let form;
        if (this.state.changePasswordLoading) {
            form = (
                <Loading>
                    <div className="card card-body">
                        {alert}
                        <form onSubmit={this.changePasswordRequest.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="oldPassword" className="change-label">Current password</label>
                                <input type="password"
                                    name="oldPassword"
                                    value={this.state.oldPassword} 
                                    onChange={this.handleFormEdit}
                                    className="form-control" 
                                    id="oldPassword" 
                                    aria-describedby="oldPassword" 
                                    placeholder="Enter your current password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword" className="change-label">New password</label>
                                <input type="password" 
                                    name="newPassword"
                                    value={this.state.newPassword}
                                    onChange={this.handleFormEdit}
                                    className="form-control" 
                                    id="newPassword" 
                                    placeholder="Enter your new password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPasswordConfirm" className="change-label">Retype your new password</label>
                                <input type="password" 
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleFormEdit}
                                    className="form-control" 
                                    id="newPasswordConfirm" 
                                    placeholder="Confirm your new password"/>
                            </div>
                            <button type="submit" 
                                className="btn btn-submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </Loading>
            )
        } else {
            form = (
                <div className="card card-body">
                        {alert}
                        <form onSubmit={this.changePasswordRequest.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="oldPassword" className="change-label">Current password</label>
                                <input type="password"
                                    name="oldPassword"
                                    value={this.state.oldPassword} 
                                    onChange={this.handleFormEdit}
                                    className="form-control" 
                                    id="oldPassword" 
                                    aria-describedby="oldPassword" 
                                    placeholder="Enter your current password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword" className="change-label">New password</label>
                                <input type="password" 
                                    name="newPassword"
                                    value={this.state.newPassword}
                                    onChange={this.handleFormEdit}
                                    className="form-control" 
                                    id="newPassword" 
                                    placeholder="Enter your new password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPasswordConfirm" className="change-label">Retype your new password</label>
                                <input type="password" 
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleFormEdit}
                                    className="form-control" 
                                    id="newPasswordConfirm" 
                                    placeholder="Confirm your new password"/>
                            </div>
                            <button type="submit" 
                                className="btn btn-submit">
                                Submit
                            </button>
                        </form>
                    </div>
            )
        }
        return (
            <div className="carousel-item active">
                <h3 className="carousel-header">
                    Account information
                </h3>
                <div className="form-group change-password">    
                    <label htmlFor="email" className="dark-font">Email address</label>
                    <input type="text" 
                        id="email"
                        className="form-control email-carousel dark-border" 
                        aria-label="email" 
                        aria-describedby="email"
                        value={this.state.email}
                        readOnly/>
                    <small id="email" className="form-text text-muted">You cannot change your email. Please contact support if you wish to.</small>
                </div>
                <button className="btn btn-secondary" 
                    data-toggle="collapse" 
                    href="#changePassword" 
                    role="button" aria-expanded="false" 
                    aria-controls="changePassword">
                    Change your password
                </button>
                <div className="collapse mt-2 el-loading-demo" id="changePassword">
                    {form}
                </div>
                <table className="table mt-2 round-table">
                    <thead className="hidden">
                        <tr>
                            <th className="w-25">
                                Field
                            </th>
                            <th className="w-65">
                                Your information
                            </th>
                            <th className="w-10 submit-edit-info">
                                {submit}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                ID
                            </td>
                            <td>
                                {this.state.id}
                            </td>
                            <td/>
                        </tr>
                        <tr>
                            <td>
                                First Name
                            </td>
                            <td contentEditable
                                id="firstname"
                                name="fname" 
                                suppressContentEditableWarning 
                                className="editable-cell">
                                {this.state.fname}
                            </td>
                            <td/>
                        </tr>
                        <tr>
                            <td>
                                Last Name
                            </td>
                            <td contentEditable 
                                id="lastname"
                                name="lname"
                                suppressContentEditableWarning 
                                className="editable-cell">
                                {this.state.lname}
                            </td>
                            <td/>
                        </tr>
                        <tr>
                            <td>
                                Phone Number
                            </td>
                            <td contentEditable
                                id="phone"
                                name="phone" 
                                suppressContentEditableWarning 
                                className="editable-cell">
                                {this.state.phone}
                            </td>
                            <td/>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AccountInfo;