import React from 'react';

const SubmitItem = ({name, pattern, handleChange, value}) => (
    <tr className="bg-purple">
        <td className="align-bottom fit"><h5>{name}</h5></td>
        <td>
            <input type="text"
                   className="form-control user-input"
                   value={value}
                   onChange={handleChange}
                   pattern={pattern}
            />
        </td>
    </tr>
)

export default SubmitItem;