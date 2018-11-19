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
                    <h1 className="display-4">Review and Submit</h1>
                    {/*TODO: Change this "Task Name" to be from props*/}
                    <p className="h4">Task Name</p>
                </header>

                <SubmitList/>

                <button type="button" className="btn btn-submit">
                    Submit
                </button>
            </div>
        );
    }
}

export default Submit;