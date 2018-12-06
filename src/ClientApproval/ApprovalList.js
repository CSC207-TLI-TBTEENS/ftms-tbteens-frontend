import React, {Component} from 'react';
import ApprovalItem from './ApprovalItem';

class ApprovalList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details: props.details
        }
    }

    // This sets up 2 way binding so editing text auto changes the state and display
    handleInputChange = (event, index) => {
        const detailChanged = {...this.state.details[index]};
        detailChanged.value = event.target.value;

        const newDetails = [...this.state.details];
        newDetails[index] = detailChanged;

        this.setState({
            details: newDetails
        })
    }

    // Creates a list of Submit items to show in the form 
    // If there are n number of elements in the state.details, it prints out n input fields
    createForm = () => {
        return this.state.details.map((detail, index) => {
            return <ApprovalItem
                name={detail.name}
                value={detail.value}
                // Sets the regex to accept all strings if there is no inputRegex
                pattern={detail.inputRegex === undefined ? ".*" : detail.inputRegex}
                handleChange={(event) => this.handleInputChange(event, index)}
                disabled={this.props.disabled}
                key={index}
            />
        })
    }

    render() {        
        return (
            <div className="container bg-black rounded mb-3 table-shadow">
                <div className="container py-1">
                    <form>
                        {this.createForm()}
                    </form>
                </div>
            </div>
        )
    }
}

export default ApprovalList;