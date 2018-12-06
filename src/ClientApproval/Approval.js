import React, {Component} from 'react';
import ApprovalList from './ApprovalList';
import withAuth from "../hocs/withAuth";

class Approval extends Component {
    constructor(props) {
        super(props);
        const regexTime = "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$";
        const regexHour = "^[0-9]+:[0-9]{2}$";
        const regexMoney = "^[$]{0,1}[0-9]*(,[0-9]{3})*(.[0-9]{2}){0,1}$";

        if (this.props.details !== null && this.props.details !== undefined) {
            this.state = { 
                details: props.details, 
                declineReason: "",
                disabled: true
            }
        }
        else {
            this.state = {
                details:[{name: "Start Time", value: "12:34"},
                        {name: "End Time", value: "23:45", inputRegex: regexTime},
                        {name: "Travel Time", value: "00:00", inputRegex: regexHour},
                        {name: "Costs", value: "1,000,000", inputRegex: regexMoney}],
                declineReason: "",
                disabled: true
            }
        }
        // Give me a prop with the form AND of the details below, the form will autogenerate
        // i.e. 
        // details: [
        // {
        //     name: "Display-name-1", 
        //     value: "Value-for-user-to-change-1", 
        //     [OPTIONAL]inputRegex: "Regex=for-value-to-match-1"
        // }
        // ]
    }


    handleClick = () => {
        var inputs = document.getElementsByClassName("user-input");
        var errorMsgs = document.getElementsByClassName("form-error");
        // Loops through the inputs and makes sure they match their regex
        // If not it sets the error msg
        for(var i = 0; i < inputs.length; i++) {
            var re = new RegExp(this.state.details[i].inputRegex);
            if (re.test(inputs[i].value)) {
                errorMsgs[i].innerHTML = "";
            }
            else {
                errorMsgs[i].innerHTML = "This is not a valid input";
            }
        }
    }

    declineClick = () => {     
        this.setState({ 
            disabled: false
        });
    }
    undoDeclineClick = () => {
        this.setState({ 
            disabled: true
        });
    }

    approveClick = () => {
        // Do backend stuff 
    }

    handleDeclineChange(e) {
        this.setState({declineReason : e.target.value});
    }

    render() {
        // Removing alerts if page is reloaded.
        this.props.history.listen(() => {
            this.props.removeAlert();
        });
        
        return (
            <div className="container">
                <header className="jumbotron bg-image">
                    <div className="container">
                        <h1 className="display-4 pb-3">Timesheet Approval</h1>
                        {/*TODO: Change this "Task Name" to be from props*/}
                        <p className="h4">Task Name</p>
                    </div>
                </header>

                <ApprovalList details={this.state.details} disabled={this.state.disabled}/>

                <div className="mb-2">
                    <button type="button" className="btn btn-submit mr-2" onClick={this.declineClick} data-toggle="modal" data-target="#declineForm">
                        Decline Form
                    </button>
                    
                    <button type="button" className="btn btn-secondary" onClick={this.approveClick}>
                        Approve Form
                    </button>
                </div>

                <div className="modal fade" id="declineForm" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Adding New Employee</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.undoDeclineClick}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>Reason for declining timesheet</label>
                            <input 
                            onChange={this.handleDeclineChange}
                            type="text" 
                            className="form-control user-input" 
                            value={this.state.declineReason}
                            />
                            <div className="mt-2 float-right">
                                <button 
                                    className="btn btn-submit mr-2" 
                                    data-toggle="modal" 
                                    data-target="#declineForm"
                                    onClick={this.undoDeclineClick}>
                                    Cancel
                                </button>
                                <button 
                                    className="btn btn-submit" 
                                    data-toggle="modal" 
                                    data-target="#declineForm">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }


}

export default withAuth(["ROLE_ADMIN", "ROLE_CLIENT"], Approval);