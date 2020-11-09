import {
  ADD_TASK,
  DELETE_TASK,
  LOADING_TASKS,
  LOADING_TASKS_SUCCSESS,
  LOADING_TASKS_FAILURE,
} from "../actions/types";

let initialState = {
  tasks: [
    {
      "importance": 14,
      "isCompleted": false,
      "_id": "5fa29bbab51c6a1e6cbed069",
      "userId": "5fa195a8a01871379cf02642",
      "description": "Tenis",
      "createdAt": "2020-11-04T12:16:58.408Z",
      "updatedAt": "2020-11-04T12:16:58.408Z",
      "__v": 0,
    },
  ],
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
      return { ...state, tasks: action.payload, error: "", loading: false };
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
