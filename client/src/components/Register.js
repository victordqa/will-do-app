import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { registerAction } from "../redux/actions/authActions";

function Register() {
  // Local states
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  function onChangeHandler(event) {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    setUser({ ...user, [name]: value });
  }

  return (
    <div>
      <form>
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
        <button onClick>Register</button>
        <p>Status:</p>
      </form>
    </div>
  );
}

const mapStateToProps = (store) => {};

const mapDispatchToProps = (dispatch) => {
  return {
    registerAction: ({ username, email, password }) =>
      dispatch(registerAction({ username, email, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
