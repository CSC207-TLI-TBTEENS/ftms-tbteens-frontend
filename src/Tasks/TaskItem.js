import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({taskId, taskName, taskDescription, startTime, endTime, duration, sessions}) => (
    <tr>
        <td>{taskName}</td>
        <td>{taskDescription}</td>
        <td>{startTime}</td>
        <td>{endTime}</td>
        <td>{duration}</td>
        <td>{sessions}</td>
    </tr>

)

export default TaskItem;