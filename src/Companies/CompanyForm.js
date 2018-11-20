import React, {Component} from 'react';

class CompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            number: '',
            logo: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
		this.setState({[e.target.name] : e.target.value});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.addCompany({...this.state});
        this.setState({
            name: '',
            email: '',
            number: '',
            logo: ''
        });
      }
    
    render() {
        const {name, email, number, logo} = this.state;
        return (
            <div className="container">
	        <div className="row align-items-center justify-content-center h-100">
            <div className="popup-form">
                <form onSubmit={this.handleSubmit}>
                
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Name</label>
                            <input 
                            type="text"
                            className="form-control"
                            name="name"
                            id="name" 
                            placeholder="Banana Co."
                            value={name}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Contact Email</label>
                            <input 
                            type="email"
                            className="form-control"
                            name="email"
                            id="email" 
                            placeholder="admin@banana.ca"
                            value={email}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="number">Contact Number</label>
                            <input 
                            type="tel"
                            className="form-control"
                            name="number"
                            id="number" 
                            placeholder="289-400-2393"
                            value={number}
                            autoComplete="off"
                            onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="logo">Logo</label>
                            <input 
                            type="tel"
                            className="form-control"
                            name="logo"
                            id="logo" 
                            placeholder="logo.png"
                            value={logo}
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

export default CompanyForm;