import React, { Component } from 'react';
import Employees from './Employees/Employees.js';
import Companies from './Companies/Companies.js';
import Login from './Login/Login.js';
// import JobAssignment from './JobAssignment/JobAssignment.js';

class App extends Component {
state = {
  loggedIn: false,
}

  loginHandler = () => {
    this.setState({
      loggedIn: true
    })
  }

  render() {
    let display = (
      <div>
        <Login click={this.loginHandler}/>
      </div>   
    );

    if (this.state.loggedIn) {
      display = (
        <div>
          <Companies/>       
        </div>
      )
    }

    return (
      display
    );
  }
}

export default App;
