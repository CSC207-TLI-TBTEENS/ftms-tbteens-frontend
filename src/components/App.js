import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from "react-redux";
import { configureStore } from "../store";
import Main from './Main';
import Navbar from './Navbar';
import { getCurrentUser } from '../Services/authApi';
import { setCurrentUser, setAuthorizationToken} from "../store/actions/auth";

const store = configureStore();

if (localStorage.accessToken) {
  setAuthorizationToken(localStorage.accessToken);
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    getCurrentUser()
    .then(user => {
      store.dispatch(setCurrentUser(user));
    }).catch(error => {
      console.log(error)
    });
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>
);

export default App;


// class App extends Component {
//   constructor(props, context) {
//     super(props, context);
//     this.state = {
//       currentUser: null,
//       isAuthenticated: false
//     }
//     this.handleLogout = this.handleLogout.bind(this);
//     this.loadCurrentUser = this.loadCurrentUser.bind(this);
//     this.handleLogin = this.handleLogin.bind(this);
//   }

//   handleLogout(callback) {
//     localStorage.removeItem('accessToken');
//     this.setState({
//       currentUser: null,
//       isAuthenticated: false
//     });
//     callback();
//   }

//   handleLogin() {
//     this.loadCurrentUser();
//   }

//   render() {
//     return (
//       <Router>
//         <div>
//           <Navbar 
//             isAuthenticated={this.state.isAuthenticated} 
//             currentUser={this.state.currentUser} 
//             onLogout={this.handleLogout}
//           />
//           <Main 
//             isAuthenticated={this.state.isAuthenticated} 
//             currentUser={this.state.currentUser} 
//             onLogin={this.handleLogin}
//           />
//         </div>
//       </Router>
//     )
//   }
// }
