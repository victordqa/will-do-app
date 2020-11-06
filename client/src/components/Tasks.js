import React, { useState } from "react";
import styled from "styled-components";
import mockTasks from "../mockTasks";

const TaskContainer = styled.div`
  border: 2px solid white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 80%;
`;

function Tasks() {
  const [tasks, setTasks] = useState(mockTasks);
  const [newTask, setNewTask] = useState({
    importance: 0,
    description: "",
  });

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task._id != taskId));
  }

  function addTask(newTask) {
    let _id = Math.random;
    console.log([...tasks, newTask]);
    setTasks([...tasks, newTask]);
  }

  function handleInputChanges(event) {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    setNewTask({ ...newTask, [name]: value });
  }
  //Create task cards
  let mappedTasks = tasks.map((task) => (
    <TaskContainer>
      {" "}
      <p key={task._id}>
        <button onClick={() => deleteTask(task._id)}>DELETE</button>{" "}
        {task.importance}-{task.description}
      </p>
    </TaskContainer>
  ));

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label for="description">
          {" "}
          Task description
          <input
            name="description"
            type="text"
            value={newTask.description}
            onChange={(event) => handleInputChanges(event)}
          ></input>
        </label>
        <label for="importance">
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

export default Tasks;
