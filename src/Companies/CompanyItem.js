import React from 'react';

const CompanyItem = ({logo, name, email}) => (
    <tr>
        <td>{logo}</td>
        <td>{name}</td>
        <td>{email}</td>
    </tr>
)
export default CompanyItem;