import React, {Component} from 'react';
import './Submit.css';
import SubmitItem from './SubmitItem';

class SubmitList extends Component {

    render() {
        return (
            <div>
                <table className="table">
                    <SubmitItem field="Start Time"/>
                    <SubmitItem field="End Time"/>
                    <SubmitItem field="Travel Time"/>
                    <SubmitItem field="Costs"/>
                </table>
            </div>
        )
    }
}

export default SubmitList;