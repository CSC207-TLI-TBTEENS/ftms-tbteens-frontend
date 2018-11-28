import React, {Component} from 'react';
import '../index.css';
import { Button, Checkbox } from 'element-react';


class ClientRegistration extends Component {
    render() {
        return (
            <div className="container">
                <header className="jumbotron bg-purple">
                    <div className="container">
                        <h1 className="display-4">Client Registration</h1>
                        <p className="h4">the client info</p>
                    </div>
                </header>
                
                <button type="button" className="btn btn-submit" onClick={this.handleClick}>
                    Submit Info
                </button>
            </div>
        );
    }


}

export default ClientRegistration;