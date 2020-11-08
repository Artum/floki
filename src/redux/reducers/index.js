import { combineReducers } from "redux";

import authenticationReducer from "./authenticationReducer";
import applicationReducer from "./applicationReducer";

export default combineReducers({
  userAuthentication: authenticationReducer,
  application: applicationReducer,
});
