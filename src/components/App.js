import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Main from './Main';
import Navbar from './Navbar';

import { getCurrentUser } from '../Services/authApi';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentUser: null,
      isAuthenticated: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // Loading currently logged in user.
  loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
      });
    }).catch(error => {
      console.log(error)
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(callback) {
    localStorage.removeItem('accessToken');
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    callback();
  }

  handleLogin() {
    this.loadCurrentUser();
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar 
            isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout}
          />
          <Main 
            isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogin={this.handleLogin}
          />
        </div>
      </Router>
    )
  }
}

export default App;
