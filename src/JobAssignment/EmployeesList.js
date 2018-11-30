import React from 'react';

const EmployeesList = (props) => {
    let num = 1;
    return (
        <div class="row">
            <div class="accordion" id="accordionEmployees">
                {
                    props.employees.map(employee => {
                        num++;
                        return (
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button onClick={props.employeeHandler.bind(this, employee)} class="btn btn-link" type="button" data-toggle="collapse" data-target={"#employee" + num} aria-expanded="false" aria-controls={"employee" + num}>
                                    {employee.firstname + " " + employee.lastname}
                                    </button>
                                </h5>
                                </div>

                                <div id={"employee" + num} class="collapse multi-collapse" aria-labelledby="headingOne" data-parent="#accordionEmployees">
                                <div class="card-body card-body-green" >
                                    <p>EMPLOYEE ID: {employee.id}</p>
                                    <p>EMPLOYEE EMAIL: {employee.email}</p>
                                    <p>EMPLOYEE NUMBER: {employee.number}</p>
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