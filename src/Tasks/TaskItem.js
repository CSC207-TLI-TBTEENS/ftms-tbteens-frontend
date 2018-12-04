import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({id, name, description, startTime, endTime, duration, sessions}) => (
    <tr>
        <td>{name}</td>
        <td>{description}</td>
        {/* <td>{startTime}</td>
        <td>{endTime}</td>
        <td>{duration}</td>
        <td>{sessions}</td> */}
        <td>
            <Link to={"/task/" + id + "/edit"}>
                    <button type="button" className="btn btn-main ml-1">
                        Edit Task
                    </button>
            </Link>  
        </td>
    </tr>

)

export default TaskItem;