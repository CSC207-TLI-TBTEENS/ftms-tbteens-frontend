import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import Employees from "../Employees/Employees";
import Companies from "../Companies/Companies";
import Login from "../Login/Login.js";

const Main = props => {
    return (
        <Route render={({location}) => ( 
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={600}
                    classNames="fade"
                >
                <div className="page">
                    <Switch location={location}>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/employees" component={Employees} />
                        <Route exact path="/companies" component={Companies} />
                    </Switch>
                </div>
                </CSSTransition>
            </TransitionGroup>
        )} />
    )
}

export default Main;