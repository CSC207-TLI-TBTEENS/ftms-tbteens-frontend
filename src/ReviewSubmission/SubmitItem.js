import React from 'react';

const SubmitItem = ({name, pattern, handleChange, value, errorMsg}) => (
    <div className="form-group row">
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label"><h4>{name}</h4></label>
        <div className="col-sm-10">
            <input type="text" 
                className="form-control user-input" 
                id="colFormLabel" 
                value={value} 
                onChange={handleChange} 
                pattern={pattern}/>
            <div className="form-control-feedback form-error">
                {errorMsg}
            </div>
        </div>
    </div>
)

export default SubmitItem;