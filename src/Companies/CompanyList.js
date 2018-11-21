import React, {Component} from 'react';
import CompanyItem from './CompanyItem';

class CompanyList extends Component {

    render() {
        const companies = this.props.companies.map(cmp => (
            <CompanyItem
                key={cmp.id}
                {...cmp}
            />
        ));
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr className="table-head">
                            <th scope="col">Logo</th>
                            <th scope="col">Name</th>
                            <th scope="col">Contact Email</th>
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

export default CompanyList;