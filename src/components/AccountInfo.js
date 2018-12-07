import React from 'react';
import { Loading } from 'element-react';
import * as LoginAPI from "../Login/api.js";
import * as EmployeeAPI from "../Employees/api.js";
import { verifyPasswordEmployee } from "../Services/authApi.js";
import { Message } from 'element-react';

class AccountInfo extends React.Component {
    state = {
        // current user info
        id: this.props.user.id,
        fname: this.props.user.firstname,
        lname: this.props.user.lastname,
        phone: this.props.user.number,
        email: this.props.user.email,

        // password change form (current password, new one to be changed to, confirm new one)
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",

        // to show alert of a password change result or not
        showAlert: false,

        // the message (success/failure)
        alertMessage: "",

        // determine the format of alert message (red/green)
        changeSuccessful: false,

        // when the table info is submitted, will be updated for any necessary changes
        tablefname: "",
        tablelname: "",
        tablephone: "",

        // for loading animation 
        loading: false,
        changePasswordLoading: false
    }

    // when something is edited
    handleFormEdit = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    // when user wants to edit their info from the table
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

    // user submit info from table to be changed, makes sure they actually changed stuff
    handleTableSubmit = () => {
        let firstname = document.getElementById("firstname").innerHTML;
        let lastname = document.getElementById("lastname").innerHTML;
        let phone = document.getElementById("phone").innerHTML;

        // if the submitted info is different than the info from the files, then change
        // else, dont change
        if (firstname !== this.state.fname || 
            lastname !== this.state.lname || 
            phone !== this.state.phone) {
                this.setState({loading: true});
                this.setState({tablefname: firstname, tablelname: lastname, tablephone: phone});
            }
    }

    // ensures current password matches with records
    authenticateRequest = async () => {
        const authenticationRequest = {id: this.state.id, 
            password: this.state.oldPassword};
        
        let result; 
        result = await verifyPasswordEmployee(authenticationRequest);

        return result;
    }

    // change password request is submitted
    async changePasswordRequest(event) {
        event.preventDefault();

        // start loading animation
        this.setState({changePasswordLoading: true})
        let authenticationResult

        // check current password matches
        try {
            authenticationResult = await this.authenticateRequest();
        } catch(error) {
            // doesnt match: exit out and alert message as below
            this.setState({alertMessage: "The current password you entered does not match our records. Please try again."});
            this.setState({showAlert: true, changeSuccessful: false, changePasswordLoading: false});
            return;
        }

        // check that the new passwords typed in match
        if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({alertMessage: "Password mismatch!"});
            this.setState({showAlert: true, changeSuccessful: false, changePasswordLoading: false});
            return;
        }

        // if everything is good, change the password
        let result = await LoginAPI.changePassword({id: this.state.id, password: this.state.newPassword});
        if (result.success === true) {
            this.setState({alertMessage: "Your password has been changed successfully!"});
            this.setState({changeSuccessful: true});
        } else {
            // if there is any error here, it is probably the api's problem
            this.setState({alertMessage: "There was an error with your password change request, please contact support."});
        }

        // display the result message and set loading animation to stop
        this.setState({showAlert: true, changePasswordLoading: false});
    }

    render() {
        // if the info change is loading, then change the info as requested
        if (this.state.loading) {
            // this function sets the loading animation to stop when it's done
            this.sendEditRequest();
        }

        let alert;
        // if there is alert to show
        if (this.state.showAlert) {
            // successful alert has green background
            if (this.state.changeSuccessful) {
                alert = (
                    <div className="alert alert-success" role="alert">
                        {this.state.alertMessage}
                    </div>
                )
            } else {
                // red background for failure
                alert = (
                    <div className="alert alert-danger" role="alert">
                        {this.state.alertMessage}
                    </div>
                )
            }
        }

        // if info changing is being processed, change submit button on table to loading animation
        // if not, submit button is a checkmark
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

        // if password change request in progress, put the entire form in the collapse in loading mode
        // else display the form
        let form;
        if (this.state.changePasswordLoading) {
            form = (
                <Loading>
                    <div className="card card-body">
                        {/* if there is an alert, display it, else will be null */}
                        {alert}

                        {/* change password form */}
                        <form onSubmit={this.changePasswordRequest.bind(this)}>
                            {/* old password */}
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

                            {/* new password */}
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

                            {/* confirm new password */}
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

                            {/* submit here or press enter */}
                            <button type="submit" 
                                className="btn btn-submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </Loading>
            )
        } else {
            // just like the form in if branch, except no loading
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
                     {/* display email, email cant be changed  */}
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

                {/* collapse form to change password */}
                <button className="btn btn-secondary" 
                    data-toggle="collapse" 
                    href="#changePassword" 
                    role="button" aria-expanded="false" 
                    aria-controls="changePassword">
                    Change your password
                </button>

                {/* password changing form, displayed depending on 
                if there is a password change request currently */}
                <div className="collapse mt-2 el-loading-demo" id="changePassword">
                    {form}
                </div>

                {/* table with editable cells to edit info */}
                <table className="table mt-2 round-table">
                    <thead className="hidden">
                        <tr>
                            <th className="w-25">
                                Field
                            </th>
                            <th className="w-65">
                                Your information
                            </th>
                            {/* submit button, 
                            will be loading animation when a valid request is made */}
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