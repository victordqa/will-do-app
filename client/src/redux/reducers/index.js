import { combineReducers } from "redux";
import { taskReducer } from "./taskReducer";
import { errorReducer } from "./errorReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  task: taskReducer,
  error: errorReducer,
  auth: authReducer,
});

export default rootReducer;
