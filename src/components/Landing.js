import React, { Component } from "react";
import { Message } from 'element-react';

class Landing extends Component {
    componentWillMount() {
        if (this.props.currentUser.isAuthenticated=== false) {
            this.props.history.push("/login");
        } 
    }
    render() {
        const {alerts, history, removeAlert, currentUser} = this.props;

        history.listen(() => {
            removeAlert();
        });

        return (
            <div className="container">
            {alerts.message && (
                Message({
                    type: alerts.category,
                    message: alerts.message,
                    showClose: true
                })
            )} 
            
        <header className="jumbotron bg-purple">
                <div className="container">
                    <h1 className="display-4">Welcome {currentUser.user.firstname} {currentUser.user.lastname}</h1>
                    <hr className="my-4"/>
                    <p>This is your Norweld dashboard. From here you can conquer the world!</p>
                </div>
        </header>
    </div>
        )
    }
}

export default Landing;