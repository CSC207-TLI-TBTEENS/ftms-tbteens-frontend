import React, {Component} from 'react';
import CompanyItem from './CompanyItem';

class CompanyList extends Component {

    sortCompanies(key) {
        this.props.sortCompanies(key);
    }

    render() {
        const companies = this.props.companies.map(cmp => (
            <CompanyItem
                key={cmp.id}
                {...cmp}
                viewHandler = {this.props.viewHandler}
                deletionHandler = {this.props.deletionHandler}
                curr = {this.props.curr}
            />
        ));
        let num = 0;
        let key = 0;
        const modals = this.props.companies.map(cmp => {
            num++;
            return (
                <span key={num} className="modal fade" id={"company" + cmp.id} tabIndex="-1" role="dialog" aria-labelledby="viewCompanyDetails" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="viewCompanyDetails">{cmp.name}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    {
                                        this.props.companyViewed.map((field, index) => {
                                            key++;
                                            return (
                                                <div key={key} className="form-group">
                                                    <label htmlFor="employee-info">{field.label}</label>
                                                    <input type="email" className="form-control" id={field.label + num} aria-describedby="emailHelp" 
                                                        value={field.value} onChange={(event) => this.props.formHandler(event, index)}/>
                                                </div>
                                            )
                                        })
                                    }
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onClick={this.props.editHandler.bind(this.props.curr, 
                                        cmp.id, this.props.companyViewed[0].value, 
                                        this.props.companyViewed[1].value, 
                                        this.props.companyViewed[2].value, 
                                        this.props.companyViewed[3].value)}
                                type="button" className="btn btn-primary save-changes-btn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </span>
            )
        })
        return (
            <div className="table-responsive table-shadow">
            <table className="table">
                <thead>
                    <tr className="table-head">
                        <th scope="col">Logo</th>
                        <th scope="col" onClick={() => this.sortCompanies('name')}>Name</th>
                        <th scope="col" onClick={() => this.sortCompanies('email')}>Contact Email</th>
                        <th scole="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {companies}
                    {modals}
                </tbody>
            </table>
            </div>            
        )
    }
}

export default CompanyList;