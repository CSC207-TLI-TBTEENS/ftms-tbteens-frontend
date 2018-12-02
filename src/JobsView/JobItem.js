import React, {Component} from 'react';
import * as apiCalls from './api';

const editStyle = {
    backgroundColor: "rgb(160, 218, 113)",
    border: "none",
    display: "inline-block",
}

const deleteStyle = {
    backgroundColor: "red",
    border: "none",
    display: "inline-block",
}

const groupStyle = {
    float: "right"
}

//Toggle for Job Detail View Enabled
class JobItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }
    
    //Get list of all employees from specific job
    async getEmployeesFromJob(job){
        let newemployees = await apiCalls.getEmployeesFromJob(job);
        console.log(newemployees)
        this.setState({employees: [...newemployees]});
    }

    componentWillMount() {
        this.getEmployeesFromJob(this.props.job);
    }

    render(){
        const employees = this.state.employees
        return(
        <tr>
                <td>{this.props.description}</td>
                <td>{this.props.siteName}</td>
                <td>
                    <button type="button" className="btn btn-second mr-1" data-toggle="modal" data-target={"#Job" +this.props.job.id}>
                        View Job Details
                    </button>
                </td>
                <td>
                    <div style={groupStyle} class="btn-group" role="group" aria-label="deletion-edit">
                        <button onClick={this.props.deletionHandler.bind(this.props.curr, this.props.id,this.props.siteLocation, this.props.jobDescription)}
                                style={deleteStyle} type="button" class="btn btn-primary">
                                <i className="el-icon-delete"></i>
                        </button> 
                        <button onClick={this.props.viewHandler.bind(this, this.props.siteLocation, this.props.jobDescription)} 
                                style={editStyle} type="button" class="btn btn-primary" 
                                data-toggle="modal" data-target={"#job" + this.props.id}>
                                <i className="el-icon-edit"></i>
                        </button>
                    </div>
                </td>
                <div class="modal fade" id={"Job" + this.props.job.id} tabIndex="-1" role="dialog" aria-labelledby="viewJobDetails" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="viewJobDetails">{this.props.description}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="table-responsive">
                                    <table className="table" id="table-job-all">
                                        <thead>
                                            <tr className="table-head">
                                                <th scope="col" >Employees</th>
                                                <th scope="col" >Tasks</th>
                                                <th scope="col" >Review Status</th>
                                            </tr>
                                        </thead>
                                        
                                        {
                                            employees.map(emp => {
                                                return (
                                                <tbody id= "data">
                                                    <tr>
                                                        <td>{emp.firstname + " " + emp.lastname}</td>
                                                        <td>{emp.name}</td>
                                                        <td>Not Reviewed</td>
                                                    </tr>
                                                </tbody>
                                                )
                                        })
                                        }
                                        
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
        </tr>
        );
            

                                    }
                                }
export default JobItem;