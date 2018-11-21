import React, { Component } from 'react';
import * as apiCalls from './api';
import CompanyForm from './CompanyForm';
import CompanyList from './CompanyList';
import Loading from '../components/Loading';
import SearchBar from '../components/Search.js';
import { MessageBox, Message} from 'element-react';
import * as sorter from '../components/Sorter.js'

class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            companiesShow:[],
            companyViewed: [{label: "Name", value: null}, 
            {label: "Logo", value: null}, 
            {label: "Email", value: null}, 
            {label: "Number", value: null}],
            loading: true,
            listToggle: 0,
            changeKey: true,
            previousKey: ''
        }
        this.addCompany= this.addCompany.bind(this);
        this.searchRet = this.searchRet.bind(this);
        this.sortCompanies = this.sortCompanies.bind(this);
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
        this.setState({companies : [...this.state.companies, newCompany],
                        companiesShow: [...this.state.companiesShow, newCompany]});
    }

    searchRet(data){
        this.setState({companiesShow : [...data]});
    }

    setCompanyViewing = (name, logo, email, phone) => {
        console.log(name, logo, email, phone)
        this.setState({companyViewed: [
            {label: "Name", value: name}, 
            {label: "Logo", value: logo}, 
            {label: "Email", value: email}, 
            {label: "Number", value: phone}
        ]})
    }

    formChangeHandler = (event, index) => {
        const changed = {...this.state.companyViewed[index]};
        changed.value = event.target.value;

        const newCompanyViewed = [...this.state.companyViewed];
        newCompanyViewed[index] = changed;

        this.setState({
            companyViewed: newCompanyViewed    
        })
    }

    async sortCompanies(key) {
        let changeKey = (key !== this.state.previousKey) ? true : this.state.changeKey;
        let sortedList = await sorter.sortTable([...this.state.companies], [...this.state.companiesShow], 
                                                key, this.state.listToggle, changeKey);
        this.setState({companies: sortedList[0], companiesShow: sortedList[1], listToggle: sortedList[2],
                        changeKey: !changeKey, previousKey: key});
    }

    async handleEmployeeEdit(id, name, logo, email, number) {
        let edited = false;
        console.log("this", this);
        console.log("id", id)
        await MessageBox.confirm('Update this company\'s information?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(async() => {
            edited = true;
            await apiCalls.editCompany({id, name, logo, email, number});
            await Message({
              type: 'success',
              message: 'Edited COMPANY #' + id + ' ' + name + ' successfully!'
            });
        }).catch((error) => {
            console.log(error)
            Message({
              type: 'info',
              message: "Deletion cancelled!"
            });
        });
        if (edited) {
            let currentCompanies = [...this.state.companies];
            for (let i = 0; i < currentCompanies.length; i++) {
                if (currentCompanies[i].id == id) {
                    let editedCompany = {
                        id: id,
                        name: name,
                        logo: logo,
                        email: email,
                        number: number
                    };
                    currentCompanies[i] = editedCompany;
                    break;
                }
            }
            this.setState({companies: currentCompanies, 
                companiesShow: currentCompanies});
            
            console.log(this.state.companies, this.state.companiesShow)
        }
    }

    async confirmDeletion(id, name) {
        let deleted = false;
        console.log(this);
        await MessageBox.confirm('This action will remove COMPANY #' + id + ' ' + name + ' from the database. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(async() => {
            deleted = true;
            await apiCalls.deleteCompany(id);
            await Message({
              type: 'success',
              message: 'Deleted COMPANY #' + id + ' ' + name + ' successfully!'
            });
        }).catch(() => {
            Message({
              type: 'info',
              message: "Deletion cancelled!"
            });
        });
        if (deleted) {
            let currentCompanies = [...this.state.companies];
            for (let i = 0; i < currentCompanies.length; i++) {
                if (currentCompanies[i].id == id) {
                    currentCompanies.splice(i, 1);
                    break;
                }
            };
            this.setState({companiesShow: currentCompanies, companies: currentCompanies});
        }
    }

    render() {
        let content;
        if (this.state.loading) {
            content = <Loading/>;
        } else {
            content = (<div> 
                    <SearchBar data={this.state.companies} onchange={this.searchRet}/>
                    <CompanyList companies = {this.state.companiesShow}
                                viewHandler={this.setCompanyViewing} 
                                formHandler={this.formChangeHandler}
                                companyViewed={this.state.companyViewed}
                                deletionHandler={this.confirmDeletion}
                                sortCompanies={this.sortCompanies}
                                editHandler={this.handleEmployeeEdit}
                                curr={this}/>
                    </div>);
        }
        return (
            <div className="container">
                <header className="jumbotron bg-purple">
                            <div className="container">
                                <h1 className="display-4">Companies</h1>
                                <hr className="my-4"/>
                                <p>
                                    <button type="button" className="btn btn-submit" data-toggle="modal" data-target="#companyForm">
                                        Add Company
                                    </button> 
                                </p>
                            </div>
                </header>
                
                {content}

                <div className="modal fade" id="companyForm" tabindex="-1" role="dialog" aria-labelledby="createNewCompany" aria-hidden="true">
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