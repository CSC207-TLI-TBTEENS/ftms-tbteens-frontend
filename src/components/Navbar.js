import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';

class Navbar extends Component {
    render() {
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
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/login"}> Login </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/employees"}> Employees </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/companies"}> Companies </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/jobsview"}> Jobs </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/jobassign"}> Job Assignment </Link>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;