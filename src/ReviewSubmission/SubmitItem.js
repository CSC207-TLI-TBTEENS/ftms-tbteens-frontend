import React from 'react';
import './Submit.css';

const SubmitItem = ({field}) => (
    <tr className="bg-purple">
        <th className="align-middle"><h5>{field}</h5></th>
        <td><input type="text" className="form-control user-input" aria-label="Sizing example input"
                   aria-describedby="inputGroup-sizing-default"/></td>
    </tr>

)

export default SubmitItem;