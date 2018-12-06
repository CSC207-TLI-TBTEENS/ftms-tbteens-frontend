import React, {Component} from 'react';

// A bootstrap Input Label and Input View
class ApprovalItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details: props.details
        }
    }

    render() {  
        let content;
        if (this.props.disabled) {
            console.log("Hi Worlds")
            content = <input type="text" 
                className="form-control user-input" 
                id="colFormLabel" 
                value={this.props.value} 
                onChange={this.props.handleChange} 
                pattern={this.props.pattern}
                disabled
                />
        } else {
            console.log(this.props.disabled)
            content = <input type="text" 
                className="form-control user-input" 
                id="colFormLabel" 
                value={this.props.value} 
                onChange={this.props.handleChange} 
                pattern={this.props.pattern}
                />
        }

        return (
            <div className="form-group row my-2">
                <label htmlFor="colFormLabel" className="col-sm-2 col-form-label"><h4>{this.props.name}</h4></label>
                <div className="col-sm-10">
                    {content}
                    <div className="form-control-feedback form-error"></div>
                </div>
            </div>
        )
    }
}

export default ApprovalItem;