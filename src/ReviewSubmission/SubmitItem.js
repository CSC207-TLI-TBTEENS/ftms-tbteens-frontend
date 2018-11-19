import React from 'react';
import './Submit.css';

const SubmitItem = ( props ) => (
    <tr className="bg-purple">
        <td className="align-middle fit"><h5>{props.field}</h5></td>
        <td>
            {/*TODO: Auto fill the inputs*/}
            <input type="text"
                   className="form-control user-input"
                   value={props.current}
                   onChange={props.handleChange.bind(this)}
            />
        </td>
    </tr>
)

export default SubmitItem;