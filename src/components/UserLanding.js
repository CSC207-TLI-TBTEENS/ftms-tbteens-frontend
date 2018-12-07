import React from "react";

import AccountInfo from './AccountInfo.js';
import Activities from './Activities.js';
import "../css/index.css";

class UserLanding extends React.Component {
    state = {
        user: this.props.currentUser.user,
    } 
    render() {
        return (
            <div id="employee-dashboard" className="carousel slide w-100" data-ride="carousel">
                <ol className="carousel-indicators" data-interval="false">
                    <li data-target="#employee-dashboard" data-slide-to="0" className="active"></li>
                    <li data-target="#employee-dashboard" data-slide-to="1"></li>
                </ol>
                <div className="container dashboard-container">
                    <div className="carousel-inner mb-2">
                        <AccountInfo user={this.state.user} parent={this}/>
                            <Activities user={this.state.user}/>
                        {/* <div className="carousel-item">
                            <h3 className="carousel-header">
                                Recent Activities
                            </h3>
                        </div> */}
                    </div>
                </div>
                <a className="carousel-control-prev" href="#employee-dashboard" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#employee-dashboard" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

export default UserLanding;