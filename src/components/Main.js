import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import Employees from "../Employees/Employees";
import Companies from "../Companies/Companies";
import Login from "../Login/Login.js";
<<<<<<< HEAD
import Jobs from "../Jobs/Jobs.js";
=======
import JobAssignment from "../JobAssignment/JobAssignment.js";
>>>>>>> bebba8aa322ba72ff16ca902f52d47323c5d1933

const Main = props => {
    return (
        <Route render={({location}) => ( 
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    timeout={750}
                    classNames="fade"
                >
                <div className="page">
                    <Switch location={location}>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/employees" component={Employees} />
                        <Route exact path="/companies" component={Companies} />
<<<<<<< HEAD
                        <Route exact path="/jobs" component={Jobs} />
=======
                        <Route exact path="/jobassign" component={JobAssignment} />
>>>>>>> bebba8aa322ba72ff16ca902f52d47323c5d1933
                    </Switch>
                </div>
                </CSSTransition>
            </TransitionGroup>
        )} />
    )
}

export default Main;