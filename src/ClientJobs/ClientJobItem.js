import React from 'react';
import { Link } from 'react-router-dom';

const ClientJobItem = ({id, jobTitle ,siteLocation, jobDescription}) => (
    <tr>
        <td>{jobTitle}</td>
        <td>{siteLocation}</td>
        <td>{jobDescription}</td>
        <td>
        <Link to={"/timesheets/" + id + "/client"}>
                    <button type="button" className="btn btn-main ml-1">
                        View Timesheets
                    </button>
        </Link>
        </td>
        
    </tr>


)
export default ClientJobItem;
