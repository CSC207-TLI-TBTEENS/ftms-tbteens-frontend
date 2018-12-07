import React from 'react';
import * as JobAPI from '../JobsView/api.js';
import { Progress } from 'element-react';


class Activities extends React.Component {
    state = {
        jobs: []
    }

    componentWillMount = () => {
        this.getJobs();
    }

    // get the jobs from the current user
    getJobs = async () => {
        // api call to get the jobs
        let employeeJobs = await JobAPI.getJobsFromEmployee(this.props.user.id);

        // for each job, add info of its progress
        for (let i = 0; i < employeeJobs.length; i++) {
            let completion = await JobAPI.getJobCompletion(employeeJobs[i].id);
            employeeJobs[i]["progress"] = completion
        }

        // set the state
        this.setState({jobs: employeeJobs});
    }

    
    render() {
        // for every job, create a progress bar
        // this bar is not representative of this specific employee's progress on the job
        // but the entire jb as a whole
        const jobs = this.state.jobs.map(job => {
            let percentage = (job.progress * 100).toString() + "%"
            let bar;

            // if the job is done, bar will be colored green
            if (percentage === "100%") {
                bar = (
                    <div className="progress-bar progress-bar-striped" 
                            role="progressbar" 
                            style={{width: percentage}} 
                            aria-valuenow={(job.progress * 100).toString()} 
                            aria-valuemin="0" 
                            aria-valuemax="100"/>
                )
            // else will just be blue
            } else {
                bar = (
                    <div className="progress-bar progress-bar-striped bg-success" 
                            role="progressbar" 
                            style={{width: percentage}} 
                            aria-valuenow={(job.progress * 100).toString()} 
                            aria-valuemin="0" 
                            aria-valuemax="100"/>
                )
            }
            return (
                <div className="mb-3">
                    <h5>{job.jobTitle}</h5>
                    <div className="progress">
                        {bar}
                    </div>
                </div>
            )
        })
        return (
            <div className="carousel-item">
                <h3 className="carousel-header"> 
                    Activities
                </h3>
                <div className="card">
                    <div className="card-body">
                        <h4>
                            Job History                          
                        </h4>
                        {jobs}
                    </div>
                </div>
            </div>
        )
    }
 }

 export default Activities;