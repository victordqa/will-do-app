import React, { useState } from "react";
import styled from "styled-components";

const CreateTaskContainer = styled.div`
  border: 1px solid rgba(61, 66, 69, 0.85);
  color: inherit;
  background-color: #181a1b;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
`;
const PlaceHolderPlusContainer = styled.div`
  color: rgb(200, 195, 188) !important;
  opacity: 0.5;
  border: 1px solid rgba(186, 0, 84, 1);
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
  color: inherit;
  opacity: 0.5;
  height: 100%;
  background-color: #181a1b;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
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

function CreateTaskModal() {
  // Local state to control toggle for task creation
  const [toggle, setToggle] = useState(true);

  function toggleHandler() {
    setToggle(!toggle);
    console.log(toggle);
  }
  return (
    <CreateTaskContainer>
      <PlaceHolderPlusContainer>&#65291;</PlaceHolderPlusContainer>
      <PlaceHolderTextContainer>Create new task...</PlaceHolderTextContainer>
      <FormContainer>adsfadf</FormContainer>
    </CreateTaskContainer>
  );
}

export default CreateTaskModal;
