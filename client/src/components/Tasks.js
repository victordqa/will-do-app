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
  if (props.id === props.animate)
    return ` position: absolute; transform: translate(${horizontalDisp}vw, ${verticalDisp}vh) rotate(${rotation}deg);   transition:all ${speed}s ease-in;`;
};

const TaskContainer = styled.div`
  ${(props) => {
    console.log("id: ", props.id);
    console.log("hovered: ", props.hoovered);
    console.log("animate: ", props.animate);
  }}
  margin-top: 1rem;
  border: 1px solid rgba(61, 66, 69, 0.85);
  padding: 1rem;
  border-radius: 0.5em;
  display: flex;
  flex-flow: wrap;

  align-items: center;
  width: 100%;
  ${(props) =>
    props.id === props.hoovered ? taskAnimationHandler(props) : ""};
`;
const TaskImportanceContainer = styled.div`
  border: 1px solid rgba(61, 66, 69, 0.85);
  padding: 1rem;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 2.5em;
  /* ${(props) =>
    props.id === props.hooveredTask ? taskAnimationHandler(props) : ""}; */
`;

const DoneButton = styled.button`
  ${(props) =>
    props.id === props.hooveredTask
      ? console.log(
          "doen button rendered because of task hoover: ",
          props.animate
        )
      : ""}
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

function Tasks({ addTaskAction, deleteTaskAction, tasks, user, isAuth }) {
  const [newTask, setNewTask] = useState({
    importance: 0,
    description: "",
  });

  // Local state for identifying last deleted task to perform animation before deletion
  const [animateTask, setAnimateTask] = useState("");

  // Local state for identifying a hoovered card and display extra info
  const [hooveredTask, setHooveredTask] = useState("");

  function deleteAndAnimateTaskHandler(taskId) {
    setAnimateTask(taskId);
    setTimeout(() => deleteTaskAction(taskId), 2200);
  }

  // function deleteAndAnimateTaskHandler(taskId) {
  //   setAnimateTask(taskId);
  //   setTimeout(() => deleteTaskAction(taskId), 2200);
  // }

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
    <TaskContainer
      key={task._id}
      id={task._id}
      hoovered={hooveredTask}
      onMouseOver={(e) => console.log(task._id)}
      onMouseOut={() => console.log(task._id)}
    >
      <DoneButton
        animate={animateTask}
        onClick={() => deleteAndAnimateTaskHandler(task._id)}
      >
        Done!
      </DoneButton>
      <TaskImportanceContainer>
        <div style={{ fontSize: "1rem" }}>Importance</div>
        {task.importance}
      </TaskImportanceContainer>
      -{task.description}
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
