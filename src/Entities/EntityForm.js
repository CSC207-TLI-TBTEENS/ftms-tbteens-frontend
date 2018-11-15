import React, {Component} from 'react';

class EntityForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastEmail: '',
            emailLogo: '',
            numberNumber: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
		this.setState({[e.target.name] : e.target.value});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.addEntity({...this.state});
        this.setState({
            firstName: '',
            lastEmail: '',
            emailLogo: '',
            numberNumber: ''
        });
      }
    
    render() {
        const {firstName, lastEmail, emailLogo, numberNumber} = this.state;
        let [id1, id2, id3, id4] = [this.props.ids[0], 
                                    this.props.ids[1], 
                                    this.props.ids[2], 
                                    this.props.ids[3]]
        let [ph1, ph2, ph3, ph4] = [this.props.phs[0],
                                    this.props.phs[1], 
                                    this.props.phs[2], 
                                    this.props.phs[3]]
        return (
            <div className="container">
	        <div className="row align-items-center justify-content-center h-100">
            <div className="popup-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="firstName">{id1}</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="firstname"
                            id="firstName" 
                            placeholder={ph1}
                            value={firstName}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="lastName">{id2}</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="lastname"
                            id="lastName" 
                            placeholder={ph2}
                            value={lastEmail}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">{id3}</label>
                            <input 
                            type="email"
                            className="form-control"
                            name="email"
                            id="email" 
                            placeholder={ph3}
                            value={emailLogo}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="number">{id4}</label>
                            <input 
                            type="tel"
                            className="form-control"
                            name="number"
                            id="number" 
                            placeholder={ph4}
                            value={numberNumber}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-submit btn-block"
                    >
                    Create
                    </button>
                </form>
            </div>
            </div>
            </div> 
        )
    }
}

export default EntityForm;