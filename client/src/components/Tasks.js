import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  deleteTaskAction,
  addTaskAction,
  getTasksAction,
} from "../redux/actions/taskActions";

const taskAnimationHandler = (props) => {
  let horizontalDisp = (70 + Math.random() * 45) * 1.2;
  let verticalDisp = (-60 + Math.random() * -45) * 1.2;
  let rotation = 300 + Math.random() * 2000;
  let speed = 0.7 + Math.random() * 1.5;
  if (props.id === props.current)
    return ` position: absolute; transform: translate(${horizontalDisp}vw, ${verticalDisp}vh) rotate(${rotation}deg);   transition:all ${speed}s ease-in;`;
};

const TaskContainer = styled.div`
  margin-top: 1rem;
  border: 1px solid rgba(61, 66, 69, 0.85);
  padding: 1rem;
  border-radius: 0.5em;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  max-width: 80%;
  ${(props) => taskAnimationHandler(props)};
`;

const DoneButton = styled.button`
  background-color: rgba(186, 0, 84, 0.8);
  border-radius: 3em;
  height: 3.7em;
  color: inherit;
  font-weight: 600;
  border: none;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: rgba(186, 0, 84, 1);
  }
`;

const ImportanceContainer = styled.div`
  border-radius: 0.5em;
  border: 1px solid rgba(61, 66, 69, 0.85);
  color: inherit;
  font-weight: 600;
  font-size: 2rem;
  transition: all 0.5s ease-out;
  &:hover {
    background-color: rgba(186, 0, 84, 1);
  }
`;
function Tasks({ addTaskAction, deleteTaskAction, tasks, user, isAuth }) {
  const [newTask, setNewTask] = useState({
    importance: 0,
    description: "",
  });

  // Local state for identifying last deleted task to perform animation before deletion
  const [currentTask, setCurrentTask] = useState("");

  function deleteTaskHandler(taskId) {
    setCurrentTask(taskId);
    setTimeout(() => deleteTaskAction(taskId), 2200);
  }

  function deleteTaskHandler(taskId) {
    setCurrentTask(taskId);
    setTimeout(() => deleteTaskAction(taskId), 2200);
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
    <TaskContainer key={task._id} id={task._id} current={currentTask}>
      <DoneButton onClick={() => deleteTaskHandler(task._id)}>Done!</DoneButton>{" "}
      <ImportanceContainer>{task.importance}</ImportanceContainer>-
      {task.description}
    </TaskContainer>
  ));

  return (
    <div>
      <h3> {isAuth ? `Hello ${user.username}!` : ""} </h3>
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
    isAuth: store.auth.isAuth,
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
