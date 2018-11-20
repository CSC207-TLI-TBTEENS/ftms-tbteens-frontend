import React from 'react';

const TimesheetItem = ({taskName,siteName, workerName,companyName, startTime,endTime}) => (
    <tr>
        <td>{taskName}</td>
        <td>{siteName}</td>
        <td>{workerName}</td>
        <td>{companyName}</td>
        <td>{startTime}</td>
        <td>{endTime}</td>
    </tr>
)
export default TimesheetItem;