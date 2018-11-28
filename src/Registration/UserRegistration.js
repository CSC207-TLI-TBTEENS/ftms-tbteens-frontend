import React, {Component} from 'react';
import '../index.css';
import { Button, Checkbox } from 'element-react';


class UserRegistration extends Component {
    render() {
        return (
            <div className="container">
                <header className="jumbotron bg-purple">
                    <div className="container">
                        <h1 className="display-4">User Registration</h1>
                        <p className="h4">The User's information...</p>
                    </div>
                </header>
                <div className="field">
                            <div className="form-group">
                                <input 
                                type="password"
                                name="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Password"
                                autoComplete="off"
                                />
                            </div>
                        </div>
                <button type="button" className="btn btn-submit">
                    Submit Password and Approve Information
                </button>
            </div>
        );
    }


}

export default UserRegistration;