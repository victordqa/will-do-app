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
        <label For="username"> Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={(event) => handleInputChanges(event)}
        ></input>
      </form>
    </div>
  );
}

export default Register;
