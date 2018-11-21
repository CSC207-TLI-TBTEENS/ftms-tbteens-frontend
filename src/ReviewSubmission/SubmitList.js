import React, {Component} from 'react';
import SubmitItem from './SubmitItem';

class SubmitList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details: props.details
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
                pattern={detail.inputRegex}
                handleChange={(event) => this.handleInputChange(event, index)}
                key={index}
            />
        })
    }

    render() {
        return (
            <div className="container bg-purple rounded">
                <div className="container">
                    <table className="table">
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default SubmitList;