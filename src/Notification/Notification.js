import React, { Component } from 'react';
import { connect } from "react-redux";
import {getNotifications, updateIsRead} from "./api";
import "./Notification.css"
import {Badge} from "element-react";

class Notification extends Component {

    state = {
        userId: this.props.currentUser.user,
        notifications: [],
        unread: true,
    };

    componentWillMount() {
        this.getNotifications();
    }

    async getNotifications(){
        let notifications = await getNotifications(this.state.userId.id);
        this.setState({notifications: notifications})
        let i;
        for(i = 0; i < this.state.notifications.length; i++){
            if(this.state.notifications[i].read == false){
                this.setState({unread: false})
            }
        }
    }

    switchIconsHandler = () => {
        let i;
        for(i = 0; i < this.state.notifications.length; i++){
           updateIsRead(this.state.notifications[i].notificationId);
        }

        this.setState(
            {unread: true})
    }

    render(){
        return(
            <div className="Notification">
                <li className="nav-item dropdown">
                    <a className="nav-link" href="#" id="navbarDropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i onClick={this.switchIconsHandler.bind(this)} className="fa fa-bell">
                            {this.state.unread == false  &&
                            <Badge isDot></Badge>}
                        </i>
                    </a>
                    <div className="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
                        <div>
                            <p className="card-text box-size">
                                {this.state.notifications.map(notification => <a className="dropdown-item wrap" href="#">
                                {notification.message + notification.createdAt}</a>)}
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
