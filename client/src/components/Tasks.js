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

function Tasks({ addTaskAction, deleteTaskAction, tasks, getTasksAction }) {
  //Get tasks from database
  useEffect(() => {
    getTasksAction();
  }, []);

  const [newTask, setNewTask] = useState({
    importance: 0,
    description: "",
  });

  function deleteTaskHandler(taskId) {
    console.log(taskId);
    deleteTaskAction(taskId);
  }

  function addTaskHandler(newTask) {
    let _id = Math.random();
    newTask._id = _id;
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
      <p>
        <button onClick={() => deleteTaskHandler(task._id)}>DELETE</button>{" "}
        {task.importance}-{task.description}
      </p>
    </TaskContainer>
  ));

  return (
    <div>
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
      {mappedTasks}
    </div>
  );
}

let mapStateToProps = (store) => {
  return { tasks: store.tasks, isLoading: store.loading, error: store.error };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getTasksAction: () => dispatch(getTasksAction()),
    deleteTaskAction: (taskId) => dispatch(deleteTaskAction(taskId)),
    addTaskAction: (newTask) => dispatch(addTaskAction(newTask)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
