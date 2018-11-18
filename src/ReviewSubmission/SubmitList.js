import React, {Component} from 'react';
import './Submit.css';
import SubmitItem from './SubmitItem';

class SubmitList extends Component {

    render() {
        return (
            <div>
                <SubmitItem field="Start Time"/>
                <SubmitItem field="End Time"/>
                <SubmitItem field="Travel Time"/>
                <SubmitItem field="Costs"/>
            </div>
        )
    }
}

export default SubmitList;