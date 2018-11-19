import React, {Component} from 'react';
import './Submit.css';
import SubmitItem from './SubmitItem';

class SubmitList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details: props.details
        }

        if (this.state.details === null || this.state.details.length === 0) {
            this.state = {
                details: [
                    {name: "Start Time", value: "10:12"},
                    {name: "End Time", value: "13:09"},
                    {name: "Travel Time", value: "00:30"},
                    {name: "Costs", value: "$350"}
                ]
            }
        }

    }

    handleInputChange = (event, index) => {
        const detailChanged = {...this.state.details[index]};
        detailChanged.value = event.target.value;

        const newDetails = [...this.state.details];
        newDetails[index] = detailChanged;

        this.setState({
            details: newDetails
        })
    }

    createTable = () => {
        return this.state.details.map((detail, index) => {
            return <SubmitItem
                name={detail.name}
                value={detail.value}
                handleChange={(event) => this.handleInputChange(event, index)}
                key={index}
            />
        })
    }

    render() {
        return (
            <div className="container bg-purple">
                <table className="table">
                    {this.createTable()}
                </table>
            </div>
        )
    }
}

export default SubmitList;