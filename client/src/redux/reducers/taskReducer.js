import {
  ADD_TASK_SUCCSESS,
  DELETE_TASK_SUCCSESS,
  LOADING_TASKS,
  LOADING_TASKS_SUCCSESS,
} from "../actions/types";

let initialState = {
  tasks: [],
  msg: "",
  loading: false,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_SUCCSESS:
    case DELETE_TASK_SUCCSESS:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
      };
    case LOADING_TASKS:
      return { ...state, loading: true };
    case LOADING_TASKS_SUCCSESS:
      return { ...state, tasks: action.payload, loading: false };
    default:
      return state;
  }
};
