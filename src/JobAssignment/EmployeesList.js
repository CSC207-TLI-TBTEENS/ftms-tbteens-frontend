import React, { Component } from 'react';
import {Card, Button} from 'element-react';
import './JobAssignment.css'

const style = {
    backgroundColor: "rgb(160, 218, 113)"
}

const cardStyle = {
    width: "15vw"
}

const EmployeesList = (props) => {
    let num = 1;
    return (
        <div class="row">
            <div class="accordion" id="accordionExample2">
                {
                    props.employees.map(employee => {
                        num++;
                        return (
                            <div class="card" style={cardStyle}>
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button onClick={props.employeeHandler.bind(this, employee)}class="btn btn-link" type="button" data-toggle="collapse" data-target={"#employee" + num} aria-expanded="false" aria-controls={"employee" + num}>
                                    {employee.name}
                                    </button>
                                </h5>
                                </div>

                                <div id={"employee" + num} class="collapse multi-collapse" aria-labelledby="headingOne" data-parent="#accordionExample2">
                                <div class="card-body" style={style}>
                                    <p>EMPLOYEE ID: {employee.id}</p>
                                    <p>EMPLOYEE SKILL: {employee.skill}</p>
                                </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>         
        </div>
    )

}

export default EmployeesList;