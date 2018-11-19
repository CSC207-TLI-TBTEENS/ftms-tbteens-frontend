import React, {Component} from 'react';
import './Submit.css';
import SubmitItem from './SubmitItem';

class SubmitList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [
                { name: "Start Time", value: "10:12"},
                { name: "End Time", value: "13:09"},
                { name: "Travel Time", value: "00:30"},
                { name: "Costs", value: "$350"}
            ]
        }
    }

    handleInputChange = (event) => {
        this.setState({
            current: [
                event.target.value,
                "13:09",
                "0:30",
                "$350"
            ]
        })
    }

    createTable = () => {
        let items = [];
        for (let i = 0; i < this.state.details.length; i++) {
            items.push(<SubmitItem
                name={this.state.details[i].name}
                value={this.state.details[i].value}
                handleChange={this.handleInputChange}
            />)
        }
        return items
    }

    createTable2 = () =>{
        return this.state.details.map(detail => {
            return <SubmitItem name={detail.name} value={detail.value} handleChange={this.handleInputChange}/>
        })
    }

    render() {
        return (
            <div>
                <table className="table">
                    {this.createTable2()}
                </table>
            </div>
        )
    }
}

export default SubmitList;