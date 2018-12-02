import React, { Component } from 'react';
import { connect } from "react-redux";
import {getNotifications} from "./api";
import "./Notification.css"

class Notification extends Component {

    state = {
        userId: this.props.currentUser.user,
        notifications: []
    };

    componentWillMount() {
        this.getNotifications();
    }

    async getNotifications(){
        let notifications = await getNotifications(this.state.userId.id);
        this.setState({notifications: notifications})
    }

    render(){
        console.log(this.state.userId.id)
        console.log(this.state.notifications)
        return(
            <div className="Notification">
                <li className="nav-item dropdown">
                    <a className="nav-link" href="#" id="navbarDropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-bell"></i>
                    </a>
                    <div className="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
                        <div>
                            <p className="card-text box-size">
                                {this.state.notifications.map(notification => <a className="dropdown-item wrap" href="#">
                                {notification.message}</a>)}
                            </p>
                        </div>
                    </div>
                </li>
            </div>)}
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps)(Notification);
