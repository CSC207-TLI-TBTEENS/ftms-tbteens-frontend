import React, {Component} from 'react';
import '../index.css';
import {apiCall} from "../Services/api";
import Logo from "../images/norweld-logo.png";



class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {},
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.getEmployeeInfo(this.props.match.params.id);
    }

    handleSubmit(event) {
        event.preventDefault();
        const registerRequest = {"id": this.props.match.params.id, "password": this.state.password};
        // // this.props.onAuth(loginRequest)
        // .then(() => {
        //     this.props.history.push("/");
        // })
        // .catch(() => {
        //     return;
        // });
    }

    handleChange(e) {
		this.setState({[e.target.name] : e.target.value});
    }

    async getEmployeeInfo(id) {
        let employee = await apiCall("GET", "/api/employees/" + this.props.match.params.id);
        console.log(employee);
        this.setState({ employee })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="container container-style">
                        <img className="logo-header pt-3" src={Logo} alt="Logo"/>   
                        <div className="field">
                            <form className="login-form" onSubmit={this.handleSubmit}>
                                <h3 className="infoshow">
                                    <small class="text-muted">{this.state.employee.firstname}</small>
                                </h3>
                                <h3>
                                    Last Name
                                    <small class="text-muted">{this.state.employee.lastname}</small>
                                </h3>
                                <h3>
                                    Email
                                    <small class="text-muted">{this.state.employee.email}</small>                                </h3>
                                <h3>
                                    Phone
                                    <small class="text-muted">{this.state.employee.number}</small>                                </h3>
                                <div className="form-group">
                                    <input 
                                    type="password"
                                    name="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Password"
                                    autoComplete="off"
                                    //value = {password}
                                    onChange={this.handleChange} 
                                    />
                                </div>
                                <div className="login-submit">
                                    <button type="submit" id = "login" className="btn btn-submit">Register</button>
                                </div>
                            </form>   
                        </div>
                    </div>
                </div>
            </div>
        )}

}

export default UserRegistration;