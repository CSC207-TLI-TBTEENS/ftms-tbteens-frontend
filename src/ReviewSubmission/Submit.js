import React, {Component} from 'react';
import './Submit.css';

import SubmitList from './SubmitList';

class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details:
                [{name: "Start Time", value: "12:34"},
                {name: "End Time", value: "23:45"},
                {name: "Travel Time", value: "00:00"},
                {name: "Costs", value: "$1,000,000"}]
        }
    }

    loadDetails = () => {
        // TODO: Get the pre-generated details from the backend and set it to "details"
    }

    handleClick = () => {
        // TODO: Do back end submission
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron bg-purple">
                    <h1 className="display-4">Review and Submit</h1>
                    {/*TODO: Change this "Task Name" to be from props*/}
                    <p className="h4">Task Name</p>
                </header>


                <SubmitList details={this.state.details}/>

                <button type="button" className="btn btn-submit" onClick={this.handleClick}>
                    <div className="container">Submit</div>
                </button>
            </div>
        );
    }


}

export default Submit;