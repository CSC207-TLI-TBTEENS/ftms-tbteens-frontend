import React from 'react';

const EmployeesList = (props) => {
    let num = 1;
    return (
        <div class="accordion-jobassign-desktop" id="accordionEmployees">
            {
                props.employees.map(employee => {
                    num++;
                    return (
                        <div class="card card-borderless">
                            <div class="card-header card-header-purple" id="headingOne">
                                <h5 class="mb-0">
                                    <button onClick={props.employeeHandler.bind(this, employee)} class="btn btn-link" type="button" data-toggle="collapse" data-target={"#employee" + num} aria-expanded="false" aria-controls={"employee" + num}>
                                        {employee.firstname + " " + employee.lastname}
                                    </button>
                                </h5>
                            </div>

                            <div id={"employee" + num} class="collapse multi-collapse" aria-labelledby="headingOne" data-parent="#accordionEmployees">
                                <div class="card-body card-body-green" >
                                    <h6>EMPLOYEE ID: {employee.id}</h6>
                                    <h6>EMPLOYEE EMAIL: {employee.email}</h6>
                                    <h6>EMPLOYEE NUMBER: {employee.number}</h6>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>         
    )

}

export default EmployeesList;