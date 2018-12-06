import React, {Component} from 'react';
import ApprovalList from './ApprovalList';
import withAuth from "../../hocs/withAuth";
import * as apiCalls from './api.js';
import { connect } from "react-redux";

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
                disabled: true,
                display: false,
                reviewed:false
            }
        }
        else {
            this.state = {
                details:[{name: "Start Time", value: "12:34"},
                        {name: "End Time", value: "23:45", inputRegex: regexTime},
                        {name: "Travel Time", value: "00:00", inputRegex: regexHour},
                        {name: "Costs", value: "1,000,000", inputRegex: regexMoney}],
                declineReason: "",
                disabled: true,
                display: false
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
        this.handleDeclineChange = this.handleDeclineChange.bind(this);
        this.declined = this.declined.bind(this);
        this.approveClick = this.approveClick.bind(this);
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
        this.props.removeAlert(); 
        this.setState({ 
            disabled: false,
            display: true
        });
    }
    undoDeclineClick = () => {
        this.setState({ 
            disabled: true,
            display:false
        });
    }

    //ApiCall for reviewing
    async declined() {
        try{
            this.props.removeAlert();
            await apiCalls.rejectTimesheet(this.props.timesheetID);
            this.setState({reviewed:true, display:false});
            this.props.addAlert("success-review", "Successfully reviewed Timesheet!");
        } catch(err) {
            this.props.addAlert("error-review", err.message);
        }
    }

    async approveClick() {
        try{
            this.props.removeAlert();
            await apiCalls.approveTimesheet(this.props.timesheetID);
            this.setState({reviewed:true});
            this.props.addAlert("success-review", "Successfully reviewed Timesheet!");
        } catch(err) {
            this.props.addAlert("error-review", err.message);
        }
    }

    handleDeclineChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    // Returns which error display should be displayed
    getAlert() {
        if (this.props.alerts.category === "error-review") {
            return "alert alert-danger"
        }
        if (this.props.alerts.category === "success-review") {
            return "alert alert-success"
        }
        return "d-none"
    }

    render() {
        console.log(this.props.alerts)
        let content;
        if (!this.state.display){
            content = (
            <div className="container">
                <ApprovalList details={this.state.details} disabled={this.state.disabled}/>

                <div className="mb-2">
                {/* Disable Buttons once reviewed*/}
                    <button type="button" disabled={this.state.reviewed} className="btn btn-submit mr-2" onClick={this.declineClick} data-toggle="modal" data-target="#declineForm">
                        Decline Form
                    </button>
                    
                    <button type="button" disabled={this.state.reviewed} className="btn btn-secondary" onClick={this.approveClick}>
                        Approve Form
                    </button>
                </div>

                
            </div>
            )
        }
        else{
            content = (
                <div className="container">
                
                    
                    <div className="modal-body">
                                <label>Reason for declining timesheet</label>
                                <input 
                                onChange={this.handleDeclineChange}
                                type="text" 
                                className="form-control user-input" 
                                name="declineReason"
                                value={this.state.declineReason}
                                required/>
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
                                        data-target="#declineForm"
                                        onClick={this.declined.bind(this)}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                </div>
                
            )
        }
        return (
            <div className="container">
            {/* In case the Timesheet is already submitted doesn't load */}
                <div className={this.getAlert()}>
                        {this.props.alerts.message}
                </div>
                {content}
            </div>
            
        );
    }


}
function mapStateToProps(state) {
    return {
        alerts: state.alerts
    }; 
}

export default connect(mapStateToProps)(withAuth(["ROLE_ADMIN", "ROLE_CLIENT"], Approval));