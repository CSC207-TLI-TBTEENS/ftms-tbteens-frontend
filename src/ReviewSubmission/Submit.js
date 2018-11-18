import React, { Component } from 'react';
import './Submit.css';

import SubmitList from './SubmitList';

class Submit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron bg-purple">
                    <div className="container">
                        <h1 className="display-4">Review and Submit</h1>
                    </div>
                </header>

                <SubmitList/>

                <button type="button" className="btn btn-submit" data-toggle="modal" data-target="#employeeForm">
                    Submit
                </button>
            </div>
        );
    }
}

export default Submit;