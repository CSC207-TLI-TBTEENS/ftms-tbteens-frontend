import React from 'react';
import 'element-theme-default';
import './JobAssignment.css'

const style = {
    backgroundColor: "rgb(160, 218, 113)"
}

const JobsList = (props) => {
    let num = 1;
    return (
        <div class="row">
            <div class="accordion" id="accordionExample1" >
                {
                    props.jobs.map(job => {
                        num++;
                        return (
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button onClick={props.taskHandler.bind(this, job)}class="btn btn-link" type="button" data-toggle="collapse" data-target={"#job" + num} aria-expanded="false" aria-controls={"job" + num}>
                                    {job.name}
                                    </button>
                                </h5>
                                </div>

                                <div id={"job" + num} class="collapse multi-collapse" aria-labelledby="headingOne" data-parent="#accordionExample1">
                                <div class="card-body" style={style}>
                                    {/* <p>TASK ID: {job.id}</p>
                                    <p>TASK SITE: {job.site}</p>
                                    <p>DESCRIPTION: {job.descript}</p> */}
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

export default JobsList;