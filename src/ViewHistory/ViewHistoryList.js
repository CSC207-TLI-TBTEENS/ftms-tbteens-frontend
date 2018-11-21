import React, {Component} from 'react';
import ViewHistoryItem from './ViewHistoryItem';

class ViewHistoryList extends Component {

    render() {
        const companies = this.props.companies.map(cmp => (
            <ViewHistoryItem
                key={cmp.id}
                {...cmp}
            />
        ));
        return (
            <div className="table-responsive">
            <table className="table">
                <thead>
                <tr className="table-head">
                    <th scope="col">Job Name</th>
                    <th scope="col">Date Info</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Travel Time</th>
                </tr>
                </thead>
                <tbody>
                {companies}
                </tbody>
            </table>
            </div>
        )
    }
}

export default ViewHistoryList;