import React, {Component} from 'react';
import validateEmail from "../EmailValidation/ValidateEmail";

class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            number: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
		this.setState({[e.target.name] : e.target.value});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.addEmployee({...this.state});
        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            number: ''
        });
      }
    
    render() {
        const {firstname, lastname, email, number} = this.state;
        return (
            <div className="container">
	        <div className="row align-items-center justify-content-center h-100">
            <div className="popup-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="firstName">First Name</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="firstname"
                            id="firstName" 
                            placeholder="John"
                            value={firstname}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="lastname"
                            id="lastName" 
                            placeholder="Doe"
                            value={lastname}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email</label>
                            <input 
                            type="email"
                            className="form-control"
                            name="email"
                            id="email" 
                            placeholder="example@example.com"
                            value={email}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="number">Phone Number</label>
                            <input 
                            type="tel"
                            className="form-control"
                            name="number"
                            id="number" 
                            placeholder="289-400-2393"
                            value={number}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-submit btn-block"
                    >
                    Create
                    </button>
                </form>
            </div>
            </div>
            </div> 
        )
        {
            ("#submit").on("click", validateEmail);
        }
    }
}

export default EmployeeForm;