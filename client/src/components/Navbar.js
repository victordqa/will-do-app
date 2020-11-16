import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOutSuccsessAction } from "../redux/actions/authActions";

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
  display: ${(props) => (props.isAuthenticaded ? "flex" : "none")};
  text-decoration: none;
  margin-right: 1rem;
  &:visited {
    color: inherit;
  }
`;
const LogOutStyledLink = styled(Link)`
  ${(props) => console.log("is auth: ", props.isAuthenticaded)};
  display: ${(props) => (props.isAuthenticaded ? "flex" : "none")};
  text-decoration: none;
  margin-right: 1rem;
  &:visited {
    color: inherit;
  }
`;

function Navbar({ isAuthenticaded, logOutAction }) {
  console.log("is auth from redux ", isAuthenticaded);
  const logOutHandler = () => {
    logOutAction();
  };
  return (
    <>
      <NavContainer>
        <StyledLink isAuthenticaded={true} to="/">
          <LogoContainer>✅WILL DO!</LogoContainer>
        </StyledLink>
        <LinksContainer>
          <StyledLink isAuthenticaded={!isAuthenticaded} to="/login">
            Log In
          </StyledLink>
          <StyledLink isAuthenticaded={!isAuthenticaded} to="/register">
            <b>Register</b>
          </StyledLink>
          <LogOutStyledLink isAuthenticaded={isAuthenticaded} to="/">
            <b onClick={() => logOutHandler()}>Log out</b>
          </LogOutStyledLink>
        </LinksContainer>
      </NavContainer>
      <Spacer></Spacer>
    </>
  );
}

let mapStateToProps = (store) => {
  return { isAuthenticaded: store.auth.isAuthenticaded };
};

let mapDispatchToProps = (dispatch) => {
  return { logOutAction: () => dispatch(logOutSuccsessAction()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
