import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logInAction } from "../redux/actions/authActions";
import { clearErrorsAction } from "../redux/actions/errorActions";

function Login({ logInAction, clearErrorsAction, error, isAuthenticaded }) {
  // Local states
  const [user, setUser] = useState({
    email: "victor@gmail.com",
    password: "1234",
  });

  //Display server messages
  const [statusMsg, setStatusMsg] = useState("");
  useEffect(() => {
    if (!isAuthenticaded && error.id === "LOGIN_FAILURE") {
      setStatusMsg(error.msg);
    } else if (isAuthenticaded) {
      setStatusMsg("Logged in! You are good to go.");
      setTimeout(
        () => (window.location.href = "http://localhost:3000/tasks"),
        1500
      );
    }
    clearErrorsAction();
  }, [error.msg, isAuthenticaded]);

  function logInHandler(user) {
    //clear previous erros
    clearErrorsAction();

    logInAction(user);
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
        <button onClick={(e) => logInHandler(user)}>Log In</button>
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
    logInAction: ({ username, email, password }) =>
      dispatch(logInAction({ username, email, password })),
    clearErrorsAction: () => dispatch(clearErrorsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
