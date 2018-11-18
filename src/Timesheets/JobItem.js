import React from 'react'

const JobItem = ({jobName, clientName}) => (
    <tr>
        <td>{jobName}</td>
        <td>{clientName}</td>
    </tr>
)

export default JobItem;