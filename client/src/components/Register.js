import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { registerAction } from "../redux/actions/authActions";
import { clearErrorsAction } from "../redux/actions/errorActions";

function Register({
  registerAction,
  clearErrorsAction,
  error,
  isAuthenticaded,
}) {
  // Local states
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  //Display server messages
  const [statusMsg, setStatusMsg] = useState("");
  useEffect(() => {
    if (!isAuthenticaded && error.id === "REGISTER_FAILURE") {
      setStatusMsg(error.msg);
    } else if (isAuthenticaded) {
      setStatusMsg("Registered! You are good to go.");
    }
    clearErrorsAction();
  }, [error.msg, isAuthenticaded]);
  function registerHandler(user) {
    //clear previous erros
    clearErrorsAction();

    registerAction(user);
  }
  function onSubmitHandler(event) {
    event.preventDefault();
  }
  function onChangeHandler(event) {
    let name = event.target.name;
    let value = event.target.value;
    setUser({ ...user, [name]: value });
  }

  return (
    <div>
      <form onSubmit={(event) => onSubmitHandler(event)}>
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={(event) => onChangeHandler(event)}
        ></input>
        <br />
        <label htmlFor="mail"> Email </label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={(event) => onChangeHandler(event)}
        ></input>
        <br />
        <label htmlFor="password"> Password </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(event) => onChangeHandler(event)}
        ></input>
        <br></br>
        <hr></hr>
        <button onClick={(e) => registerHandler(user)}>Register</button>
        <p> {statusMsg} </p>
      </form>
    </div>
  );
}

const mapStateToProps = (store) => {
  return { error: store.error, isAuthenticaded: store.auth.isAuthenticaded };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerAction: ({ username, email, password }) =>
      dispatch(registerAction({ username, email, password })),
    clearErrorsAction: () => dispatch(clearErrorsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
