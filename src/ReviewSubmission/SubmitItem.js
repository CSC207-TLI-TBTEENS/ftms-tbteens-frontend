import React from 'react';

// A bootstrap Input Label and Input View
const SubmitItem = ({name, pattern, handleChange, value}) => (
    <div className="form-group row my-2">
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label"><h4>{name}</h4></label>
        <div className="col-sm-10">
            <input type="text" 
                className="form-control user-input" 
                id="colFormLabel" 
                value={value} 
                onChange={handleChange} 
                pattern={pattern}
                required/>
            <div className="form-control-feedback form-error"></div>
        </div>
    </div>
)

export default SubmitItem;