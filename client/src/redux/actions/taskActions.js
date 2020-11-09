import {
  ADD_TASK,
  DELETE_TASK,
  GET_TASK,
  LOADING_TASK,
  LOADING_TASK_FAILURE,
} from "./types";
import axios from "axios";

//Get tasks from api
export const getTasksAction = () => {
  return async (dispatch) => {
    dispatch(loadingTasksAction());
    try {
      let tasks = await axios.get("http://localhost:5000/api/task/all_tasks");
      dispatch(loadingTasksSuccsessAction(tasks));
    } catch (e) {
      dispatch(loadingTasksFailureAction(e.message));
      throw e.message;
    }
  };
};

export const deleteTaskAction = (taskId) => {
  return { type: DELETE_TASK, payload: taskId };
};

export const addTaskAction = (newTask) => {
  return { type: ADD_TASK, payload: newTask };
};

export const loadingTasksAction = () => {
  return { type: LOADING_TASK };
};
export const loadingTasksFailureAction = () => {
  return { type: LOADING_TASK_FAILURE };
};

export const loadingTasksSuccsessAction = () => {
  return { type: LOADING_TASK_SUCCSESS };
};
