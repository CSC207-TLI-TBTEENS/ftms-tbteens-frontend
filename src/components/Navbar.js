import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';

class Navbar extends Component {
    render() {
        return (
            // Adding in Navbar
            <nav className="navbar bg-purple navbar-expand-lg mb-3">
                <div className="container">
                    <div className="navbar-brand">
                        <img src={Logo} alt="FTMS Home" /> FTMS
                    </div>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <Link className="nav-link" to={"/employees"}> Employees </Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to={"/companies"}> Companies </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;