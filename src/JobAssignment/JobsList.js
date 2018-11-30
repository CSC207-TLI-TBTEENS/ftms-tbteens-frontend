import React from 'react';

const JobsList = (props) => {
    let num = 1;
    return (
        <div class="row">
            <div class="accordion" id="jobList" >
                {
                    props.jobs.map(job => {
                        num++;
                        return (
                            <div class="card">
                                <div class="card-header jobs-list-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button onClick={props.taskHandler.bind(this, job)}class="btn btn-link" type="button" data-toggle="collapse" data-target={"#job" + num} aria-expanded="false" aria-controls={"job" + num}>
                                    {job.jobTitle}
                                    </button>
                                </h5>
                                </div>

                                <div id={"job" + num} class="collapse multi-collapse" aria-labelledby="headingOne" data-parent="#jobList">
                                <div class="card-body card-body-green" >
                                    <p>JOB ID: {job.id}</p>
                                    <p>JOB SITE: {job.siteName}</p>
                                    <p>DESCRIPTION: {job.description}</p>
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