import React from 'react';


//Toggle for Job Detail View Enabled
const JobItem = ({description, job, getEmployees}) => (
        <tr data-toggle="modal" data-target={"#Job" +job.id}>
                <td>{description}</td>
                <div class="modal fade" id={"Job" + job.id} tabindex="-1" role="dialog" aria-labelledby="viewJobDetails" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="viewJobDetails">{description}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Test
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary save-changes-btn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
        </tr>
            

    
)
export default JobItem;