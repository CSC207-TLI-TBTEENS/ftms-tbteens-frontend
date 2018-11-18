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
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Review and Submit</h1>
                        <hr className="my-4"/>

                    </div>
                </header>

                <SubmitList
                    employees = {this.props.jobDetails}
                />
            </div>
        );
    }
}

export default Submit;