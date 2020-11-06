import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mockTasks from "../mockTasks";
import { connect } from "react-redux";
import { getTaskAction, deleteTaskAction } from "../redux/actions/taskActions";

const TaskContainer = styled.div`
  border: 2px solid white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 80%;
`;

function Tasks({ getTaskAction, deleteTaskAction, tasks }) {
  //Get tasks from redux store
  const [newTask, setNewTask] = useState({
    importance: 0,
    description: "",
  });

  function deleteTaskHandler(taskId) {
    console.log(taskId);
    deleteTaskAction(taskId);
  }

  function addTask(newTask) {
    let _id = Math.random();
    newTask._id = _id;
    // setTasks([...tasks, newTask]);
  }

  function handleInputChanges(event) {
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
            onChange={(event) => handleInputChanges(event)}
          ></input>
        </label>
        <label htmlFor="importance">
          {" "}
          Task importance
          <input
            name="importance"
            type="text"
            value={newTask.importance}
            onChange={(event) => handleInputChanges(event)}
          ></input>
        </label>
      </form>
      <button onClick={() => addTask(newTask)}>
        <b>Add Task!</b>
      </button>
      {mappedTasks}
    </div>
  );
}

let mapStateToProps = (store) => {
  return { tasks: store.task };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getTaskAction: () => dispatch(getTaskAction()),
    deleteTaskAction: (taskId) => dispatch(deleteTaskAction(taskId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
