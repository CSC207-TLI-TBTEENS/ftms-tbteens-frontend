import React from 'react';

const JobsList = (props) => {
    let num = 1;
    return (
        <div class="accordion-jobassign-desktop" id="jobList" >
            {
                props.jobs.map(job => {
                    num++;
                    return (
                        <div class="card card-borderless">
                            <div class="card-header card-header-purple jobs-list-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button onClick={props.taskHandler.bind(this, job)}class="btn btn-link" type="button" data-toggle="collapse" data-target={"#job" + num} aria-expanded="false" aria-controls={"job" + num}>
                                        {job.jobTitle}
                                    </button>
                                </h5>
                            </div>

                            <div id={"job" + num} class="collapse multi-collapse" aria-labelledby="headingOne" data-parent="#jobList">
                                <div class="card-body card-body-green" >
                                    <h6>JOB ID: {job.id}</h6>
                                    <h6>JOB SITE: {job.siteName}</h6>
                                    <h6>DESCRIPTION: {job.description}</h6>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
         </div>
    )

}

export default JobsList;