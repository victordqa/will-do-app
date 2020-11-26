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
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  margin-top: ${(props) => (props.toggle ? "3%" : "-25%")};
  margin-bottom: 0.5em;
  border-radius: 0.5em;
  width: 100%;
  align-items: center;
  transition: all 0.4s ease-in-out;
  align-items: center;
  justify-content: space-evenly;
`;
const CreateTaskDescriptionContainer = styled.textarea`
  color: inherit;
  font-family: inherit;
  background-color: #181a1b;
  border: 1px solid rgba(61, 66, 69, 0.85);
  border-radius: 0.5em;
  text-align: center;
  vertical-align: middle;
  width: 100% !important; //override textarea default
  word-break: keep-all;
  flex: 1;
  &:focus {
    outline: none !important;
    box-shadow: 0 0 10px #719ece;
  }
`;

const TaskImportanceContainer = styled.input`
  border: 1px solid rgba(61, 66, 69, 0.85);
  margin-right: 1rem;
  border-radius: 0.5em;
  background-color: #181a1b;
  color: inherit;
  text-align: center;
  height: 2em;
  width: 100%;
  font-size: 0.7rem;

  &:focus {
    outline: none !important;
    box-shadow: 0 0 10px #719ece;
  }
`;
const CreateTaskIconContainer = styled.button`
  color: inherit;
  border: none;
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
  &:hover {
    border: 1px solid red;
    color: 2px solid red;
  }
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

function CreateTaskModal(props) {
  let { addTaskAction } = props;
  const [newTask, setNewTask] = useState({
    importance: "",
    description: "",
  });

  // Local state to control toggle for task creation
  const [toggle, setToggle] = useState({ isToggled: false, numberOfClicks: 0 });

  function toggleHandler() {
    if (toggle.numberOfClicks === 0) {
      setToggle({ isToggled: true, numberOfClicks: 1 });
    } else {
      setToggle({ isToggled: false, numberOfClicks: 0 });
    }
  }
  function addTaskHandler(newTask) {
    console.log("should add", newTask.description);
    if (toggle.numberOfClicks === 1) {
      addTaskAction(newTask);
    }
  }

  function onChangeHandler(event) {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    setNewTask({ ...newTask, [name]: value });
  }
  return (
    <CreateTaskContainer>
      <div style={{ overflow: "hidden", width: "100% " }}>
        <FormContainer
          onSubmit={(e) => e.preventDefault()}
          toggle={toggle.isToggled}
        >
          <label
            htmlFor="importance"
            style={{
              width: "10% ",
            }}
          >
            <TaskImportanceContainer
              name="importance"
              type="text"
              value={newTask.importance}
              placeholder="Importance"
              onChange={(event) => onChangeHandler(event)}
            ></TaskImportanceContainer>
          </label>
          <label htmlFor="description" style={{ width: "50%" }}>
            <CreateTaskDescriptionContainer
              name="description"
              type="text"
              placeholder="Task description..."
              rows={4}
              value={newTask.description}
              onChange={(event) => onChangeHandler(event)}
            ></CreateTaskDescriptionContainer>
          </label>
        </FormContainer>
      </div>
      <CreateTaskIconContainer
        onClick={() => {
          toggleHandler();
          addTaskHandler(newTask);
        }}
      >
        <PlaceHolderPlusContainer toggle={toggle.isToggled}>
          &#65291;
        </PlaceHolderPlusContainer>
        <PlaceHolderTextContainer toggle={toggle.isToggled}>
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