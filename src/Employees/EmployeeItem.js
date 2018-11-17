import React from 'react';

const EmployeeItem = ({firstname, lastname, email}) => (
    <tr>
        <td>{firstname}</td>
        <td>{lastname}</td>
        <td>{email}</td>
    </tr>
)
export default EmployeeItem;