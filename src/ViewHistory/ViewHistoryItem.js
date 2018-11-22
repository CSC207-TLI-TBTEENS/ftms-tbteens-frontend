import React from 'react';

const ViewHistoryItem = ({JobName, DateInfo, StartTime, EndTime, TravelTime}) => (
    <tr>
        <td>{JobName}</td>
        <td>{DateInfo}</td>
        <td>{StartTime}</td>
        <td>{EndTime}</td>
        <td>{TravelTime}</td>
    </tr>
)
export default ViewHistoryItem;