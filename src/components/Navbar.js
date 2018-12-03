import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import Logo from '../images/logo.png';

class Navbar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push("/login");
    };
    render() {
        // Whether to display login or logout.
        let login = (this.props.currentUser.isAuthenticated ? 
            <a href onClick={this.logout} className="nav-link"> 
                Logout 
            </a>
            : <Link className="nav-link" to={"/login"}> Login </Link>
            )
        return (
            // Adding in Navbar
            <nav className="navbar navbar-dark bg-black navbar-expand-lg mb-3 w-100">
                <div className="container">
                    <div className="navbar-brand">
                        <img src={Logo} alt="FTMS Home" /> FTMS
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {this.props.currentUser.user.role === "ROLE_ADMIN" &&
                            <ul className="navbar-nav mr-auto">    
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/employees"}> Employees </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/companies"}> Companies </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/jobsview"}> Jobs </Link>
                                </li>
                            </ul>
                        }

                        {this.props.currentUser.user.role === "ROLE_EMPLOYEE" &&
                            <ul className="navbar-nav mr-auto">    
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/timesheets"}> Timesheets </Link>
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
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser
    };
  }
  
export default withRouter(
    connect(mapStateToProps, { logout })(Navbar)
);
