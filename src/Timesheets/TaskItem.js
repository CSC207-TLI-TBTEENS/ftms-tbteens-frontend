import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({taskId, taskName, taskDescription, startTime, endTime, duration, sessions}) => (
    <tr>
        <td>{taskName}</td>
    </tr>

)

export default TaskItem;