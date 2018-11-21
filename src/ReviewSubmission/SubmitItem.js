import React from 'react';

const SubmitItem = ({name, pattern, handleChange, value}) => (
    <div className="form-group row">
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label"><h5>{name}</h5></label>
        <div className="col-sm-10">
            <input type="text" 
                className="form-control user-input" 
                id="colFormLabel" 
                value={value} 
                onChange={handleChange} 
                pattern={pattern}/>
        </div>
    </div>
)

export default SubmitItem;