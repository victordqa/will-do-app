import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import CreateTaskModal from "./CreateTaskModal";
import {
  deleteTaskAction,
  addTaskAction,
  getTasksAction,
} from "../redux/actions/taskActions";

const taskAnimationHandler = (props) => {
  let horizontalDisp = 70 * 1.2;
  let verticalDisp = -60 * 1.2;
  let rotation = 180;
  let speed = 0.4 + Math.random() * 0.4;
  if (props.animate)
    return ` position: absolute; transform: translate(${horizontalDisp}vw, ${verticalDisp}vh) rotate(${rotation}deg);   transition:all ${speed}s ease-in;`;
};

const TaskContainer = styled.div`
  margin-top: 1rem;
  border: 1px solid rgba(61, 66, 69, 0.85);
  padding: 1rem;
  border-radius: 0.5em;
  display: flex;
  flex-flow: wrap;
  max-width: 80vw;
  align-items: center;
  white-space: initial;
  ${(props) => (props.animate === true ? taskAnimationHandler(props) : "")};
`;

const TaskDescriptionContainer = styled.div`
  margin-top: 1rem;
  color: inherit;
  height: auto;
  font-family: inherit;
  background-color: #181a1b;
  border: 1px solid rgba(61, 66, 69, 0.85);
  padding: 1rem;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  width: 50%;
  overflow: auto;
  word-break: keep-all;
  flex: 1;
`;
const TaskImportanceContainer = styled.div`
  /* border: 1px solid rgba(61, 66, 69, 0.85); */
  padding: 1rem;
  margin-right: 1rem;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 2.5em;
`;

const DoneButton = styled.button`
  background-color: rgba(186, 0, 84, 0.8);
  border-radius: 8em;
  height: 3.5em;
  width: 3.5em !important;
  margin: 1em;
  padding: 0.4em !important;
  color: inherit;
  font-weight: 600;
  border: none;
  transition: all 0.3s ease-in;
  font-size: ${(props) => (props.isHoovered ? "1rem" : "0.2rem")};
  opacity: ${(props) => (props.isHoovered ? 1 : 0)};
  width: ${(props) => (props.isHoovered ? "3.1rem" : "0.5rem")};
  &:hover {
    background-color: rgba(186, 0, 84, 1);
  }
`;
const ImportanceDescriptionContainer = styled.div`
  font-size: 0.65rem;
  transition: all 0.5s ease-in-out;
  visibility: ${(props) => (props.isHoovered ? "visible" : "hidden")};
  opacity: ${(props) => (props.isHoovered ? 1 : 0)};
`;

function Tasks({ addTaskAction, deleteTaskAction, tasks, user, isAuth }) {
  const [newTask, setNewTask] = useState({
    importance: 0,
    description: "",
  });
  // Local state for hoover and deletion rendering
  const [localTasks, setLocalTasks] = useState([
    {
      createdAt: "",
      description: "",
      importance: 0,
      isCompleted: false,
      updatedAt: "",
      userId: "",
      animate: true,
      isHoovered: false,
      __v: 0,
    },
  ]);

  useEffect(() => {
    let tasksArray = tasks.map((task) => {
      return { ...task, animate: false, isHoovered: false };
    });
    setLocalTasks(tasksArray);
  }, [tasks]);

  function deleteAndAnimateTaskHandler(taskId) {
    setLocalTasks(
      localTasks.map((task) => {
        if (task._id === taskId) {
          //Change animate property in local state so that only the card that had this prop changed will rerender
          //Note that passing  rendering the cards based on props that change all the time
          // for all ther cards would be inefficient because of all the rerenderings
          return { ...task, animate: true };
        } else {
          return task;
        }
      })
    );
    setTimeout(() => deleteTaskAction(taskId), 1000);
  }
  function hooverHandler(e, taskId) {
    if (e.type === "mouseenter") {
      setLocalTasks(
        localTasks.map((task) => {
          if (task._id === taskId) {
            // Updtate local state, only cards that had their props changed will rerender
            return { ...task, isHoovered: true };
          }
          return { ...task, isHoovered: false };
        })
      );
    }
    if (e.type === "mouseleave") {
      setLocalTasks(
        localTasks.map((task) => {
          return { ...task, isHoovered: false };
        })
      );
    }
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
  let mappedTasks = localTasks.map((task) => (
    <TaskContainer
      key={task._id}
      id={task._id}
      animate={task.animate}
      onMouseEnter={(e) => hooverHandler(e, task._id)}
      onMouseLeave={(e) => hooverHandler(e, task._id)}
    >
      <DoneButton
        isHoovered={task.isHoovered}
        onClick={() => deleteAndAnimateTaskHandler(task._id)}
      >
        Done!
      </DoneButton>
      <TaskImportanceContainer>
        <ImportanceDescriptionContainer isHoovered={task.isHoovered}>
          Importance
        </ImportanceDescriptionContainer>
        {task.importance}
      </TaskImportanceContainer>
      <TaskDescriptionContainer>{task.description}</TaskDescriptionContainer>
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
      <CreateTaskModal />
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
