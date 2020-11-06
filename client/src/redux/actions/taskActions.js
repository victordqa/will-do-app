import { ADD_TASK, DELETE_TASK, GET_TASK } from "./types";

export const getTaskAction = () => {
  return { type: GET_TASK };
};

export const deleteTaskAction = (taskId) => {
  return { type: DELETE_TASK, payload: taskId };
};
