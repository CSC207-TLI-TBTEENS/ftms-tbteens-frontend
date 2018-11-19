import React, {Component} from 'react';
import './Submit.css';
import SubmitItem from './SubmitItem';

class SubmitList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: ["Start Time", "End Time", "Travel Time", "Costs"],
            current: ["10:12", "13:09", "0:30", "$350"]
        }
    }

    handleInputChange(event) {
        this.setState({current: event.target.value})
    }

    createTable = () => {
        let items = [];
        for (let i = 0; i < this.state.fields.length; i++) {
            items.push(<SubmitItem
                field={this.state.fields[i]}
                current={this.state.current[i]}
                handleChange={this.handleInputChange}
            />)
        }
        return items
    }

    render() {
        return (
            <div>

                <table className="table">
                    {/*/!*TODO: Fill with more fields*!/*/}
                    {/*<SubmitItem*/}
                        {/*field="Start Time"*/}
                        {/*current="10:12"*/}
                    {/*/>*/}
                    {/*<SubmitItem*/}
                        {/*field="End Time"*/}
                        {/*current="13:53"*/}
                    {/*/>*/}
                    {/*<SubmitItem field="Travel Time"/>*/}
                    {/*<SubmitItem field="Costs"/>*/}
                    {this.createTable()}
                </table>
            </div>
        )
    }
}

export default SubmitList;