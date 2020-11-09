import {
  ADD_TASK,
  DELETE_TASK,
  LOADING_TASKS,
  LOADING_TASKS_SUCCSESS,
  LOADING_TASKS_FAILURE,
} from "../actions/types";

let initialState = {
  tasks: [],
  loading: false,
  error: "",
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case LOADING_TASKS:
      return { ...state, loading: true };
    case LOADING_TASKS_SUCCSESS:
      return { ...state, tasks: action.payload, error: "" };
    case LOADING_TASKS_FAILURE:
      return { ...state, error: action.payload };
    case DELETE_TASK:
      let filteredTasks = state.tasks.filter(
        (task) => task._id !== action.payload
      );
      return { ...state, tasks: filteredTasks };
    default:
      return state;
  }
};
