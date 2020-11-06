import { ADD_TASK, GET_TASK, DELETE_TASK } from "../actions/types";
import mockTasks from "../../mockTasksForReducer";

let initialState = mockTasks;

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return [{ ...state }, action.payload];
    case GET_TASK:
      return state; // kind of useless now but will poerform requests in future
    case DELETE_TASK:
      let filteredTasks = state.filter((task) => task._id !== action.payload);
      return filteredTasks;
    default:
      return state;
  }
};
