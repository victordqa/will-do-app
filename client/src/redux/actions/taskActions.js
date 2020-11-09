import {
  ADD_TASK,
  DELETE_TASK,
  LOADING_TASKS_SUCCSESS,
  LOADING_TASKS,
  LOADING_TASKS_FAILURE,
} from "./types";
import axios from "axios";

//Get tasks from api
export const getTasksAction = () => async (dispatch) => {
  dispatch(loadingTasksAction());
  try {
    let res = await axios.get("http://localhost:5000/api/task/all_tasks");
    console.log("-----------------------", res);
    dispatch(loadingTasksSuccsessAction(res.data));
  } catch (e) {
    dispatch(loadingTasksFailureAction(e.message));
    throw e.message;
  }
};
export const deleteTaskAction = (taskId) => {
  return { type: DELETE_TASK, payload: taskId };
};

export const addTaskAction = (newTask) => {
  return { type: ADD_TASK, payload: newTask };
};

export const loadingTasksAction = () => {
  return { type: LOADING_TASKS };
};
export const loadingTasksFailureAction = () => {
  return { type: LOADING_TASKS_FAILURE };
};

export const loadingTasksSuccsessAction = (data) => {
  return { type: LOADING_TASKS_SUCCSESS, payload: data };
};
