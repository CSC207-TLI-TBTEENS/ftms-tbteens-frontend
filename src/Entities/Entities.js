import React, { Component } from 'react';
import * as apiCalls from './api';
import EntityForm from './EntityForm';
import EntityList from './EntityList';

class Entities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entities: []
        }
        this.addEmployees = this.addEmployee.bind(this);
        this.addCompanies = this.addCompany.bind(this);
    }
    componentWillMount() {
        if (this.props.type === "Employee") {
            this.loadEmployees();
        } else {
            this.loadCompanies();
        }
    }

    async loadEmployees() {
        let entities = await apiCalls.getEmployees();
        this.setState({entities});
    }

    async loadCompanies() {
        let entities = await apiCalls.getCompanies();
        this.setState({entities});
    }

    async addEmployee(employee) {
        let newEntity = await apiCalls.createEmployee(employee);
        this.setState({employees : [...this.state.entities, newEntity]});
    }

    async addCompany(company) {
        let newEntity = await apiCalls.createEmployee(company);
        this.setState({employees : [...this.state.entities, newEntity]});
    }


    render() {
        let additionHandlerFunction = this.addEmployee;
        let ids = ["First Name", "Last Name", "Email", "Phone"]
        let phs = ["John", "Doe", "johndoe@hotmail.com", "647-328-7726"]
        if (this.props.type !== "Employee") {
            additionHandlerFunction = this.addCompanies;
            ids = ["Name", "Email", "Logo", "Phone"];
            phs = ["Banana Co.", "admin@banana.ca", "Picture", "888-999-1111"]
        }
        return (
        <div className="container">
            <header className="jumbotron">
                        <div className="container">
                            <h1 className="display-4">Welcome!</h1>
                            <hr className="my-4"/>
                            <p>
                                <button type="button" className="btn btn-submit" data-toggle="modal" data-target="#employeeForm">
                                    Add {this.props.type}
                                </button> 
                            </p>
                        </div>
            </header>

            <EntityList
                entities = {this.state.entities} ids = {ids}
            />

            <div className="modal fade" id="employeeForm" tabindex="-1" role="dialog" aria-labelledby="createNewEmployee" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Adding New {this.props.type}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                <EntityForm
                    addEntity = {additionHandlerFunction} ids = {ids} phs = {phs}
                />
                </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Entities;