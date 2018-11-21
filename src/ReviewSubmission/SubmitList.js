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

    createForm = () => {
        return this.state.details.map((detail, index) => {
            return <SubmitItem
                name={detail.name}
                value={detail.value}
                pattern={detail.inputRegex}
                handleChange={(event) => this.handleInputChange(event, index)}
                key={index}
                errorMsg={detail.errorMsg}
            />
        })
    }

    render() {
        return (
            <div className="container bg-purple rounded">
                <div className="container">
                    <form>
                        {this.createForm()}
                    </form>
                </div>
            </div>
        )
    }
}

export default SubmitList;