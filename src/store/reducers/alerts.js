import { ADD_ALERT, REMOVE_ALERT } from "../actionTypes";

export default (state = { category: null, message: null }, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return { ...state, category: action.category,  message: action.alert };
    case REMOVE_ALERT:
      return { ...state, category: null, message: null };
    default:
      return state;
  }
};