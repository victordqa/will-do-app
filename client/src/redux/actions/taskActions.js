import {
  ADD_TASK,
  DELETE_TASK,
  LOADING_TASKS_SUCCSESS,
  LOADING_TASKS,
} from "./types";
import axios from "axios";

//Get user tasks from api
export const getTasksAction = () => async (dispatch) => {
  dispatch(loadingTasksAction());
  try {
    let res = await axios.get("http://localhost:5000/api/task/user_tasks");
    dispatch(loadingTasksSuccsessAction(res.data));
  } catch (e) {
    console.error(e.message);
  }
};
export const deleteTaskAction = (taskId) => {
  return { type: DELETE_TASK, payload: taskId };
};

export const addTaskAction = (newTask) => async () => {};

export const loadingTasksAction = () => {
  return { type: LOADING_TASKS };
};

export const loadingTasksSuccsessAction = (data) => {
  return { type: LOADING_TASKS_SUCCSESS, payload: data };
};
