import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import Logo from '../images/logo.png';
import Notification from '../Notification/Notification.js';

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
                    
                    {this.props.currentUser.isAuthenticated &&
                        <div className="navbar-notif-mobile ml-auto mr-2">
                            <Notification />
                        </div>
                    }

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarNav">
                        
                        {/* Links the admin can see  */}
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
                        
                        {/* Links the Employee can see */}
                        {this.props.currentUser.user.role === "ROLE_EMPLOYEE" &&
                            <ul className="navbar-nav mr-auto">    
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/timesheets"}> Timesheets </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/review"}> Review and Submit </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/onetask"}> Specific Task </Link>
                                </li>
                            </ul>
                        }

                        {/* Links the client company users can see. */}
                        {this.props.currentUser.user.role === "ROLE_CLIENT" &&
                            <ul className="navbar-nav mr-auto">    
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/clientjobs"}> Jobs </Link>
                                </li>
                            </ul>
                        }


                        <ul className="navbar-nav ml-auto">
                            {this.props.currentUser.isAuthenticated &&
                                <li className="navbar-notif">
                                    <Notification />
                                </li>
                            }
                            
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
