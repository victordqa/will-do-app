import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logInAction } from "../redux/actions/authActions";
import { clearErrorsAction } from "../redux/actions/errorActions";

function Login(props) {
  let { logInAction, clearErrorsAction, error, isAuth } = props;
  let errorId = error.id;
  let errorMsg = error.msg;
  // Local states
  const [user, setUser] = useState({
    email: "victor@gmail.com",
    password: "1234",
  });

  //Display server messages
  const [statusMsg, setStatusMsg] = useState("");
  useEffect(() => {
    console.log("use effect triggered");
    if (!isAuth && errorId === "LOGIN_FAILURE") {
      setStatusMsg(errorMsg);
    } else if (isAuth) {
      setStatusMsg("Logged in! You are good to go.");
      window.location.href = "http://localhost:3000/tasks";
    }
    clearErrorsAction();
  }, [isAuth, errorId, errorMsg, clearErrorsAction]);

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
  return { error: store.error, isAuth: store.auth.isAuth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logInAction: ({ username, email, password }) =>
      dispatch(logInAction({ username, email, password })),
    clearErrorsAction: () => dispatch(clearErrorsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
