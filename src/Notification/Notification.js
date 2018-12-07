import React, { Component } from 'react';
import { connect } from "react-redux";
import {getNotifications, updateIsRead} from "./api";
import {Badge} from "element-react";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.currentUser.user,
            notifications: [],
            unread: true,
        };
    }

    componentWillMount() {
        this.getNotifications();
    }

    async getNotifications(){
        try {
            let notifications = await getNotifications(this.state.userId.id);
            this.setState({notifications: notifications})
            let i;
            for(i = 0; i < this.state.notifications.length; i++){
                if(this.state.notifications[i].read === false){
                    this.setState({unread: false})
                }
            }
        } catch(err) {
            console.log(err)
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
        let content = this.state.notifications.map(notification => 
            <div>
                <a className="dropdown-item notif-dropdown" href="#">
                    <p className="mb-2">{notification.message}</p>
                    <h6 className="mb-1">{notification.createdAt.substring(0, notification.createdAt.length - 12).replace("T", " ")}</h6>
                </a>
            </div>
        )

        return(
            <div className="Notification">
                <li className="nav-item dropdown">
                    <a className="nav-link" href="#" id="navbarDropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i onClick={this.switchIconsHandler.bind(this)} className="fa fa-bell">
                            {this.state.unread === false  &&
                            <Badge isDot></Badge>}
                        </i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <div>
                            <p className="card-text box-size">
                                {content}
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
