import React, {Component} from 'react';
import CompanyItem from './CompanyItem';

class CompanyList extends Component {

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

        const modals = this.props.companies.map(cmp => {
            return (
                <div class="modal fade" id={"company" + cmp.id} tabindex="-1" role="dialog" aria-labelledby="viewCompanyDetails" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="viewCompanyDetails">{cmp.name}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    {
                                        this.props.companyViewed.map((field, index) => {
                                            return (
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">{field.label}</label>
                                                    <input type="email" class="form-control" id="firstName" aria-describedby="emailHelp" 
                                                        value={field.value} onChange={(event) => this.props.formHandler(event, index)}/>
                                                </div>
                                            )
                                        })
                                    }
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary save-changes-btn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <table className="table">
                <thead>
                    <tr className="table-head">
                        <th scope="col">Logo</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact Email</th>
                        <th scole="col"></th>
                    </tr>
                </thead>
                <tbody>
                {companies}
                {modals}
                </tbody>
            </table>
        )
    }
}

export default CompanyList;