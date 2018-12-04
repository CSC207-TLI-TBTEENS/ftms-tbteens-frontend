import { combineReducers } from "redux";
import currentUser from "./currentUser";
import alerts from "./alerts";

const rootReducer = combineReducers({
  currentUser,
  alerts
});

export default rootReducer;
