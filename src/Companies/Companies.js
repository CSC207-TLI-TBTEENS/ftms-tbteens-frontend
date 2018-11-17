import React, { Component } from 'react';
import * as apiCalls from './api';
import CompanyForm from './CompanyForm';
import CompanyList from './CompanyList';

class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        }
        this.addCompany= this.addCompany.bind(this);
    }
    componentWillMount() {
        this.loadCompanies();
    }

    async loadCompanies() {
        let companies= await apiCalls.getCompanies();
        this.setState({companies});
    }

    async addCompany(company) {
        let newCompany= await apiCalls.createCompany(company);
        this.setState({companies : [...this.state.companies, newCompany]});
    }

    render() {
        return (
        <div className="container">
            <header className="jumbotron">
                        <div className="container">
                            <h1 className="display-4">Welcome!</h1>
                            <hr className="my-4"/>
                            <p>
                                <button type="button" className="btn btn-submit" data-toggle="modal" data-target="#employeeForm">
                                    Add Company
                                </button> 
                            </p>
                        </div>
            </header>

            <CompanyList
                companies = {this.state.companies}
            />

            <div className="modal fade" id="employeeForm" tabindex="-1" role="dialog" aria-labelledby="createNewEmployee" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Adding New Company</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                <CompanyForm
                    addCompany = {this.addCompany}
                />
                </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Companies;