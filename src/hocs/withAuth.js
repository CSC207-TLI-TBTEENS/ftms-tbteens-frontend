import React, { Component } from "react";
import { connect } from "react-redux";
import { addError } from "../store/actions/errors";


export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component {
    componentDidMount() {
      if (this.props.isAuthenticated === false) {
        this.props.addError("You must be logged in to view that page!");
        this.props.history.push("/login");
      }
    }
    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated === false) {
        this.props.addError("You must be logged in to view that page!");
        this.props.history.push("/login");
      }
    }
    render() {
      return <ComponentToBeRendered {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.currentUser.isAuthenticated };
  }

  return connect(mapStateToProps, { addError })(Authenticate);
}