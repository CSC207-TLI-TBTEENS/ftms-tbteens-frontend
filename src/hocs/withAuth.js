import React, { Component } from "react";
import { connect } from "react-redux";
import { addAlert} from "../store/actions/alerts";

export default function withAuth(validRoles, ComponentToBeRendered) {
  class Authenticate extends Component {
    componentWillMount() {
        if (this.props.isAuthenticated === false) {
            this.props.addAlert("error", "You must be logged in to view that page!");
            this.props.history.push("/login");
        } else if (!validRoles.includes(this.props.role)) {
            this.props.addAlert("error", "You do not have permission to view this page!");
            this.props.history.push("/");
        }
    }
    componentWillUpdate(nextProps) {
        if (this.props.isAuthenticated === false) {
            this.props.addAlert("error", "You must be logged in to view that page!");
            this.props.history.push("/login");
        } else if (!validRoles.includes(this.props.role)) {
            this.props.addAlert("error", "You do not have permission to view this page!");
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

  return connect(mapStateToProps, { addAlert })(Authenticate);
}