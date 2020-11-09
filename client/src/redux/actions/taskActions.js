import { ADD_TASK, DELETE_TASK, GET_TASK, LOADING_TASK } from "./types";
import axios from "axios";

export const getTaskAction = () => {
  return async (dispatch) => {
    dispatch(loadingTaskAction());
    try{
      await tasks = axios.get('') 
    }
    catch(e){throw e}
  };
};

export const deleteTaskAction = (taskId) => {
  return { type: DELETE_TASK, payload: taskId };
};

export const addTaskAction = (newTask) => {
  return { type: ADD_TASK, payload: newTask };
};

export const loadingTaskAction = () => {
  return { type: LOADING_TASK };
};
