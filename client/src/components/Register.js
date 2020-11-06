import React, { useState } from "react";
import styled from "styled-components";

function Register() {
  // Local states
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInputChanges(event) {
    event.preventDefault();
    console.log(event);
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
          onChange={(event) => handleInputChanges(event)}
        ></input>
        <br />
        <label htmlFor="mail"> Email </label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={(event) => handleInputChanges(event)}
        ></input>
        <br />
        <label htmlFor="password"> Password </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(event) => handleInputChanges(event)}
        ></input>
      </form>
    </div>
  );
}

export default Register;
