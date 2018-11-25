import React from 'react';
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
