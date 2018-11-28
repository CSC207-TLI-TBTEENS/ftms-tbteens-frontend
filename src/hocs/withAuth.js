import React, { Component } from "react";
import { connect } from "react-redux";
import { addError } from "../store/actions/errors";
import { getCurrentUser } from '../Services/authApi';

export default function withAuth(validRoles, ComponentToBeRendered) {
  class Authenticate extends Component {
    componentWillMount() {
        if (this.props.isAuthenticated === false) {
            if (!localStorage.accessToken) {
                this.props.addError("You must be logged in to view that page!");
                this.props.history.push("/login");
            } else {
                getCurrentUser()
                .then(user => {
                    if (!validRoles.includes(user.role)) {
                        this.props.addError("You do not have permission to view this page!");
                        this.props.history.push("/");
                    }
                })
            }
        } else if (!validRoles.includes(this.props.role)) {
            this.props.addError("You do not have permission to view this page!");
            this.props.history.push("/");
        }
    }
    componentWillUpdate(nextProps) {
        if (this.props.isAuthenticated === false) {
            if (!localStorage.accessToken) {
                this.props.addError("You must be logged in to view that page!");
                this.props.history.push("/login");
            } else {
                getCurrentUser()
                .then(user => {
                    if (!validRoles.includes(user.role)) {
                        this.props.addError("You do not have permission to view this page!");
                        this.props.history.push("/");
                    }
                })
            }
        } else if (!validRoles.includes(this.props.role)) {
            this.props.addError("You do not have permission to view this page!");
            this.props.history.push("/");
        }
    }
    render() {
      return <ComponentToBeRendered {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.currentUser.isAuthenticated, role: state.currentUser.user.role};
  }

  return connect(mapStateToProps, { addError })(Authenticate);
}