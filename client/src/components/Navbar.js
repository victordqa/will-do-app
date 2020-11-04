import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(96, 104, 108, 0.85);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const LogoContainer = styled.div`
  font-weight: bold;
  border: 2px solid whitesmoke;
  margin: 0.4rem;
  padding: 0.1rem;
`;
const Spacer = styled.div`
  height: 3rem;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-right: 1rem;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  margin-right: 1rem;
  &:visited {
    color: inherit;
  }
`;

function Navbar() {
  return (
    <>
      <NavContainer>
        <StyledLink to="/">
          <LogoContainer>✅WILL DO!</LogoContainer>
        </StyledLink>
        <LinksContainer>
          <StyledLink to="/login">Log In</StyledLink>
          <StyledLink to="/register">
            <b>Register</b>
          </StyledLink>
        </LinksContainer>
      </NavContainer>
      <Spacer></Spacer>
    </>
  );
}

export default Navbar;
