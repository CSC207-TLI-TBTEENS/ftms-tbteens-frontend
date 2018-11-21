import React, { Component } from 'react';
import * as apiCalls from './api';
import ViewHistoryForm from './ViewHistoryForm';
import ViewHistoryList from './ViewHistoryList';
import Loading from '../components/Loading';
import SearchBar from '../components/Search.js'

class ViewHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            companiesShow:[],
            loading: true
        }
        this.addCompany= this.addCompany.bind(this);
        this.searchRet = this.searchRet.bind(this);
    }
    componentWillMount() {
        this.loadCompanies();
    }

    async loadCompanies() {
        let companies= await apiCalls.getCompanies();
        this.setState({companies : companies, loading : false, companiesShow: [...companies]});
    }

    async addCompany(company) {
        let newCompany= await apiCalls.createCompany(company);
        this.setState({companies : [...this.state.companies, newCompany]});
    }

    searchRet(data){
        this.setState({companiesShow : [...data]});
    }

    render() {
        let content;
        if (this.state.loading) {
            content = <Loading/>;
        } else {
            content = (<div>
                <SearchBar data={this.state.companies} onchange={this.searchRet}/>
                <ViewHistoryList companies = {this.state.companiesShow} />
            </div>);
        }
        return (
            <div className="container">
                <header className="jumbotron bg-purple">
                    <div className="container">
                        <h1 className="display-4">Personal History</h1>
                        <hr className="my-4"/>
                        <p>
                            <button type="button" className="btn btn-submit" data-toggle="modal" data-target="#ViewHistoryForm">
                                Add Completed Job
                            </button>
                        </p>
                    </div>
                </header>

                {content}

                <div className="modal fade" id="ViewHistoryForm" tabindex="-1" role="dialog" aria-labelledby="createNewCompany" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add Completed Job</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ViewHistoryForm
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

export default ViewHistory;