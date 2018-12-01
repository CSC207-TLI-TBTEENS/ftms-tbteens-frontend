import { ADD_ALERT, REMOVE_ALERT } from "../actionTypes";

export const addAlert = (category, alert) => ({
  type: ADD_ALERT,
  category,
  alert
});

export const removeAlert = () => ({
  type: REMOVE_ALERT
});