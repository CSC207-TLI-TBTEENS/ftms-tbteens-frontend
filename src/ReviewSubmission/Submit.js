import React, {Component} from 'react';
import SubmitList from './SubmitList';
import './Submit.css';

class Submit extends Component {
    constructor(props) {
        super(props);
        const regexTime = "([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]";
        const regexHour = "[0-9]+:[0-9]{2}";
        const regexMoney = "[$]{0,1}[0-9]*(,[0-9]{3})*(.[0-9]{2}){0,1}";
        this.state = {
            details:
                [{name: "Start Time", value: "12:34", inputRegex: regexTime},
                {name: "End Time", value: "23:45", inputRegex: regexTime},
                {name: "Travel Time", value: "00:00", inputRegex: regexHour},
                {name: "Costs", value: "1,000,000", inputRegex: regexMoney}]
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
                    <div className="container">
                        <h1 className="display-4">Review and Submit</h1>
                        <hr className="my-4"/>
                        {/*TODO: Change this "Task Name" to be from props*/}
                        <p className="h4">Task Name</p>
                    </div>
                </header>

                <SubmitList details={this.state.details}/>

                <button type="button" className="btn btn-submit" onClick={this.handleClick}>
                    Submit Form
                </button>
            </div>
        );
    }


}

export default Submit;