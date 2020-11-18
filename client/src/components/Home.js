import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: inline;
  text-decoration: none;

  &:visited {
    color: inherit;
  }
  &:link {
    color: inherit;
  }
`;

function Home() {
  return (
    <div>
      <h3>Hello!</h3>
      <p>Welcome to the best self management app in the world!</p>
      <div style={{ display: "inline" }}>Click on </div>
      <StyledLink to="/register">
        <b style={{ display: "inline" }}>Register </b>
      </StyledLink>
      <div style={{ display: "inline" }}>to start</div>
    </div>
  );
}

export default Home;
