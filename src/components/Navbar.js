import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../images/logo.png';

class Navbar extends Component {
    render() {
        // Whether to display login or logout.
        let login = (this.props.isAuthenticated ? 
            <a href 
                className="nav-link" 
                onClick={() => this.props.onLogout(() => this.props.history.push("/login"))}> 
                Logout 
            </a>
            : <Link className="nav-link" to={"/login"}> Login </Link>
            )
        return (
            // Adding in Navbar
            <nav className="navbar navbar-dark bg-purple navbar-expand-lg mb-3">
                <div className="container">
                    <div className="navbar-brand">
                        <img src={Logo} alt="FTMS Home" /> FTMS
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {this.props.isAuthenticated &&
                            <ul className="navbar-nav mr-auto">    
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/employees"}> Employees </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/companies"}> Companies </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/timesheets"}> Timesheets </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/jobsview"}> Jobs </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/jobassign"}> Job Assignment </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/review"}> Review and Submit </Link>
                                </li>
                            </ul>
                        }

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                {login}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/viewhistory"}> View History </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);