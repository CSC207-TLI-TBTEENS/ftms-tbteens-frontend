import { apiCall, setTokenHeader } from "../../Services/api";
import { getCurrentUser } from "../../Services/authApi";
import { SET_CURRENT_USER } from "../actionTypes";
import { addAlert, removeAlert } from "./alerts";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    dispatch(setCurrentUser({}));
  };
}

export function authUser(userData) {
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => {
        return apiCall("POST", "/api/auth/signin", userData)
        .then((response) => {
            localStorage.setItem('accessToken', response.accessToken);
            setAuthorizationToken(localStorage.accessToken);
            return getCurrentUser()
        })
        .then((user) => {
          dispatch(setCurrentUser(user));
          dispatch(removeAlert());
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          if(err.status === 401) {
            dispatch(addAlert("error", "Wrong email or password!"));
          } else {
            dispatch(addAlert("error", err.message));
          }
          reject(); // indicate the API call failed
        });
    });
  };
}