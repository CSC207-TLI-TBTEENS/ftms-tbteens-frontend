import React from "react";
import { Switch, Route, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import Landing from "./Landing";
import Employees from "../Employees/Employees";
import Companies from "../Companies/Companies";
import Login from "../Login/Login.js";
import JobsView from "../JobsView/Jobs.js";
import JobAssignment from "../JobAssignment/JobAssignment.js";
import Submit from "../ReviewSubmission/Submit.js";
import Timesheets from "../Timesheets/Timesheets";
import TimesheetEdit from "../Timesheets/TimesheetEdit";
import ClientJobs from "../ClientJobs/ClientJobs"
import ViewHistory from "../ViewHistory/ViewHistory.js";
import withAuth from "../hocs/withAuth";
import UserRegistration from "../Registration/UserRegistration.js";
import CompanyRegistration from "../Registration/CompanyRegistration.js";
import { authUser } from "../store/actions/auth";
import { removeAlert, addAlert } from "../store/actions/alerts";
import SpecificTask from "../Tasks/SpecificTask";

const Main = props => {
    const adminOnly = ["ROLE_ADMIN"];
    const allUsers  = ["ROLE_ADMIN", "ROLE_EMPLOYEE", "ROLE_SUPERVISOR", "ROLE_CLIENT"];
    const { authUser, alerts, removeAlert, currentUser } = props;
    return (
        <Route render={({location}) => (
            <Switch location={location}>
                {/* This is the login route. */}
                <Route exact path="/login" render={(props) => 
                <Login 
                    removeAlert={removeAlert}
                    alerts={alerts}
                    onAuth={authUser}
                    {...props}
                />} />

                {/* User Registration route. */}
                <Route exact path="/usersignup/:id" render={(props) => 
                <UserRegistration
                    removeAlert={removeAlert}
                    alerts={alerts}
                    onAuth={authUser}
                    addAlert={addAlert}
                    {...props}
                />} />

                {/* Company Registration route. */}
                <Route exact path="/companysignup/:id" render={(props) => 
                <CompanyRegistration
                    removeAlert={removeAlert}
                    alerts={alerts}
                    onAuth={authUser}
                    addAlert={addAlert}
                    {...props}
                />} />

                {/* Employees route, only accessed by admins. */}
                <Route exact path="/employees"  render={(props) => 
                    <Employees
                        removeAlert={removeAlert}
                        alerts={alerts}
                        addAlert={addAlert}
                        {...props}
                />} />

                {/* Companies route, only accessed by admins. */}
                <Route exact path="/companies"  render={(props) => 
                    <Companies
                        removeAlert={removeAlert}
                        alerts={alerts}
                        addAlert={addAlert}
                        {...props}
                />} />

                {/* Job Assignment route. */}
                <Route exact path="/jobassign"  render={(props) => 
                    <JobAssignment
                        removeAlert={removeAlert}
                        alerts={alerts}
                        addAlert={addAlert}
                        {...props}
                />} />

                <Route exact path="/jobsview" component={withAuth(adminOnly, JobsView)} />
                <Route exact path="/review" component={withAuth(allUsers, Submit)} />

                {/* Client Jobs route, only accessible by client users. */}
                <Route exact path="/clientJobs" render={(props) => 
                    <ClientJobs
                        removeAlert={removeAlert}
                        alerts={alerts}
                        addAlert={addAlert}
                        currentUser={currentUser.user}
                        {...props}
                />} />

                {/* Timesheets Route */}
                <Route exact path="/timesheets" render={(props) => 
                <Timesheets
                    currentUser={currentUser}
                    {...props}
                />} />

                {/* Timesheet editing route */}
                <Route exact path="/timesheets/:id/edit" render={(props) => 
                <TimesheetEdit
                    currentUser={currentUser}
                    {...props}
                />} />

                {/* Task editing route */}
                {/* <Route exact path="/task/:id/edit" render={(props) =>  */}
                <Route exact path="/taskedit" render={(props) => 
                <SpecificTask
                    currentUser={currentUser}
                    {...props}
                />} />

                <Route exact path="/viewhistory" component={withAuth(allUsers, ViewHistory)}/>

                {/* This is the root route. */}
                <Route exact path="/" render={(props) => 
                <Landing
                    removeAlert={removeAlert}
                    alerts={alerts}
                    currentUser= {currentUser}
                    {...props}
                />} />

            </Switch>
        )} />
    )
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      alerts: state.alerts
    };
}
  
export default withRouter(
    connect(mapStateToProps, { authUser, removeAlert, addAlert })(Main)
);