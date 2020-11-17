import {
  ADD_TASK_SUCCSESS,
  DELETE_TASK_SUCCSESS,
  LOADING_TASKS_SUCCSESS,
  LOADING_TASKS,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { getErrorsAction } from "./errorActions";

//Get all tasks of a specific user based on token's payload (userId)
export const getTasksAction = () => async (dispatch, getState) => {
  dispatch(loadingTasksAction());
  try {
    let res = await axios.get(
      "http://localhost:5000/api/task/user_tasks",
      tokenConfig(getState)
    );
    dispatch(loadingTasksSuccsessAction(res.data));
  } catch (e) {
    console.error(e.message);
    dispatch(
      getErrorsAction(e.response.data.msg, e.response.status, "GET_TASKS_ERROR")
    );
  }
};
export const deleteTaskAction = (taskId) => async (dispatch, getState) => {
  dispatch(loadingTasksAction());

  let data = { taskId };
  let config = tokenConfig(getState);

  try {
    let res = await axios({
      method: "delete",
      url: "http://localhost:5000/api/task/delete",
      data: data,
      ...config,
    });
    dispatch(deleteTaskSuccsessAction());
    dispatch(getTasksAction());
  } catch (e) {
    console.error(e.message);
    dispatch(
      getErrorsAction(
        e.response.data.msg,
        e.response.status,
        "DELETE_TASK_ERROR"
      )
    );
  }
};

export const addTaskAction = (newTask) => async (dispatch, getState) => {
  dispatch(loadingTasksAction());
  let data = newTask;
  let config = tokenConfig(getState);
  try {
    let res = await axios.post(
      "http://localhost:5000/api/task/add",
      data,
      config
    );
    dispatch(addTaskSuccsessAction());
    dispatch(getTasksAction());
  } catch (e) {
    console.error(e.message);
    dispatch(
      getErrorsAction(e.response.data.msg, e.response.status, "GET_TASKS_ERROR")
    );
  }
};

export const loadingTasksAction = () => {
  return { type: LOADING_TASKS };
};

export const loadingTasksSuccsessAction = (data) => {
  return { type: LOADING_TASKS_SUCCSESS, payload: data };
};

export const addTaskSuccsessAction = () => {
  return { type: ADD_TASK_SUCCSESS };
};

export const deleteTaskSuccsessAction = () => {
  return { type: DELETE_TASK_SUCCSESS };
};
