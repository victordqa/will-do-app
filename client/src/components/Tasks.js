import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  deleteTaskAction,
  addTaskAction,
  getTasksAction,
} from "../redux/actions/taskActions";

const TaskContainer = styled.div`
  border: 2px solid white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 80%;
`;

function Tasks({
  addTaskAction,
  deleteTaskAction,
  tasks,
  getTasksAction,
  user,
  isAuthenticaded,
}) {
  // Get tasks from database
  // useEffect(() => {
  //   getTasksAction();
  // }, []);

  const [newTask, setNewTask] = useState({
    importance: 0,
    description: "",
  });

  function deleteTaskHandler(taskId) {
    deleteTaskAction(taskId);
  }

  function addTaskHandler(newTask) {
    addTaskAction(newTask);
  }

  function onChangeHandler(event) {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    setNewTask({ ...newTask, [name]: value });
  }
  //Create task cards

  let mappedTasks = tasks.map((task) => (
    <TaskContainer key={task._id}>
      <div>
        <button onClick={() => deleteTaskHandler(task._id)}>DELETE</button>{" "}
        {task.importance}-{task.description}
      </div>
    </TaskContainer>
  ));

  return (
    <div>
      <h3> {isAuthenticaded ? `Hello ${user.username}!` : ""} </h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="description">
          {" "}
          Task description
          <input
            name="description"
            type="text"
            value={newTask.description}
            onChange={(event) => onChangeHandler(event)}
          ></input>
        </label>
        <label htmlFor="importance">
          {" "}
          Task importance
          <input
            name="importance"
            type="text"
            value={newTask.importance}
            onChange={(event) => onChangeHandler(event)}
          ></input>
        </label>
      </form>
      <button onClick={() => addTaskHandler(newTask)}>
        <b>Add Task!</b>
      </button>
      <div>{tasks.length === 0 ? "No tasks :)" : mappedTasks}</div>
    </div>
  );
}

let mapStateToProps = (store) => {
  return {
    tasks: store.task.tasks,
    isLoading: store.task.loading,
    error: store.task.error,
    user: store.auth.user,
    isAuthenticaded: store.auth.isAuthenticaded,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getTasksAction: () => dispatch(getTasksAction()),
    deleteTaskAction: (taskId) => dispatch(deleteTaskAction(taskId)),
    addTaskAction: (newTask) => dispatch(addTaskAction(newTask)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
