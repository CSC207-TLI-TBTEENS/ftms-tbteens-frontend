import React, { Component } from 'react';
import {Card, Button} from 'element-react';
import 'element-theme-default';
import './JobAssignment.css'

const taskList = {
    backgroundColor: "rgb(90, 85, 121)",
    width: "20rem",
    color: "rgb(203, 200, 228)",
    height: "36rem",
    borderRadius: "0.5rem",
    overflow: "auto"
}

const jobButtonStyle = {
    width: "16.7rem",
    height: "4rem",
    margin: "0rem",
    borderColor: "rgb(90, 85, 121)",
    border: "none",
    backgroundColor: "transparent",
    color: "rgb(203, 200, 228)",
    marginLeft: "0.4rem"
}

const cardStyle = {
    backgroundColor: "rgb(90, 85, 121)",
    border: "none"
}

const JobsList = (props) => {
    return (
        <div style={taskList}>
            <Card style={cardStyle}
                className="box-card"
                header={
                        <div className="clearfix">
                            <span className="task-table-header">Current Tasks</span>
                        </div>
                    }>
                <div className="all-tasks">
                {
                    props.jobs.map(job => {
                        return (
                            <div>
                                <Button style={jobButtonStyle} 
                                        onClick={props.taskHandler.bind(this, job)}>
                                    {job.name} - ID: {job.id}
                                </Button>
                            </div>
                        )
                    })
                }
                </div>
                
            </Card>
        </div>
    )

}

export default JobsList;