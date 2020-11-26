import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addTaskAction } from "../redux/actions/taskActions";

const CreateTaskContainer = styled.div`
  border: 1px solid rgba(61, 66, 69, 0.85);
  color: inherit;
  background-color: #181a1b;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TaskDescriptionContainer = styled.textarea`
  color: inherit;
  font-family: inherit;
  background-color: #181a1b;
  border: 1px solid rgba(61, 66, 69, 0.85);
  padding: 1rem;
  border-radius: 0.5em;
  display: flex;
  width: 120%;
  word-break: keep-all;
  flex: 1;
  &:focus {
    outline: none !important;
    box-shadow: 0 0 10px #719ece;
  }
`;

const TaskImportanceContainer = styled.input`
  border: 1px solid rgba(61, 66, 69, 0.85);
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #181a1b;
  color: inherit;
  width: 2em;
  height: 2em;
  font-size: 1rem;

  &:focus {
    outline: none !important;
    box-shadow: 0 0 10px #719ece;
  }
`;
const CreateTaskIconContainer = styled.button`
  color: inherit;
  border: 2px solid red;
  background-color: #181a1b;
  align-self: flex-start;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0.3em 0em;
  &:hover {
    border: 2 px solid rgba(186, 0, 84, 0.8);
  }
  &:focus {
    outline: none !important;
    box-shadow: 0 0 10px #719ece;
  }
`;
const PlaceHolderPlusContainer = styled.div`
  color: ${(props) =>
    props.toggle ? "rgba(186,0,84,1)" : "rgb(200, 195, 188) !important"};
  border: 1px solid;
  border-color: ${(props) =>
    props.toggle ? "rgba(186,0,84,1)" : "rgba(186,0,84,0.5)"};
  opacity: ${(props) => (props.toggle ? "1" : "0.5")};
  border-radius: 50%;
  font-size: 2em;
  height: 1em;
  width: 1.1em;
  background-color: #181a1b;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.1em;
  margin: 0.15em;
`;

const PlaceHolderTextContainer = styled.div`
  color: rgb(200, 195, 188) !important;
  opacity: ${(props) => (props.toggle ? "1" : "0.5")};
  height: 100%;
  background-color: #181a1b;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  margin-top: ${(props) => (props.toggle ? 0 : "-25%")};
  border: 1px solid rgba(61, 66, 69, 0.85);
  border: 1px solid red;
  padding: 1rem;
  border-radius: 0.5em;
  width: 70vw;
  align-items: center;
  white-space: initial;
  transition: all 0.4s ease-in-out;
  align-items: center;
`;

function CreateTaskModal(props) {
  let { addTaskAction } = props;
  const [newTask, setNewTask] = useState({
    importance: "",
    description: "",
  });

  // Local state to control toggle for task creation
  const [toggle, setToggle] = useState(false);

  function toggleHandler() {
    setToggle(!toggle);
  }
  function addTaskHandler(newTask) {
    console.log("should add", newTask.description);
    // addTaskAction(newTask);
  }

  function onChangeHandler(event) {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    setNewTask({ ...newTask, [name]: value });
  }
  return (
    <CreateTaskContainer>
      <div style={{ overflow: "hidden" }}>
        <FormContainer onSubmit={(e) => e.preventDefault()} toggle={toggle}>
          <label htmlFor="importance">
            <TaskImportanceContainer
              name="importance"
              type="text"
              value={newTask.importance}
              placeholder="Importance"
              onChange={(event) => onChangeHandler(event)}
            ></TaskImportanceContainer>
          </label>
          <label htmlFor="description">
            <TaskDescriptionContainer
              name="description"
              type="text"
              placeholder="Task description"
              value={newTask.description}
              onChange={(event) => onChangeHandler(event)}
            ></TaskDescriptionContainer>
          </label>
        </FormContainer>
      </div>
      <CreateTaskIconContainer
        onClick={() => {
          addTaskHandler(newTask);
          toggleHandler();
        }}
      >
        <PlaceHolderPlusContainer toggle={toggle}>
          &#65291;
        </PlaceHolderPlusContainer>
        <PlaceHolderTextContainer toggle={toggle}>
          {toggle ? "Create!" : "Create new task..."}
        </PlaceHolderTextContainer>
      </CreateTaskIconContainer>
    </CreateTaskContainer>
  );
}

let mapDispatchToProps = (dispatch) => {
  return {
    addTaskAction: (newTask) => dispatch(addTaskAction(newTask)),
  };
};
export default connect(null, mapDispatchToProps)(CreateTaskModal);
