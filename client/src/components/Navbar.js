import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOutSuccsessAction } from "../redux/actions/authActions";

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(61, 66, 69, 0.85);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const LogoContainer = styled.div`
  font-weight: bold;
  border: 2px solid rgba(24, 26, 27, 0.8);
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
  display: ${(props) => (props.$isAuth ? "flex" : "none")};
  text-decoration: none;
  margin-right: 1rem;
  &:visited {
    color: inherit;
  }
  &:link {
    color: inherit;
  }
`;
const LogOutStyledLink = styled(Link)`
  display: ${(props) => (props.$isAuth ? "flex" : "none")};
  text-decoration: none;
  margin-right: 1rem;
  &:visited {
    color: inherit;
  }
`;

const RegisterContainer = styled.div`
  background-color: rgba(186, 0, 84, 0.8);
  padding: 0.3rem 1rem;
  border-radius: 3em;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: rgba(186, 0, 84, 1);
  }
`;
const LogInContainer = styled.div`
  border-bottom: 1px solid rgba(61, 66, 69, 0.85);
  transition: all 0.3s ease-in-out;
  &:hover {
    border-bottom: 1px solid rgba(186, 0, 84, 1);
  }
`;

function Navbar(props) {
  let { isAuth, logOutAction } = props;
  const logOutHandler = () => {
    logOutAction();
  };
  return (
    <>
      <NavContainer>
        <StyledLink $isAuth={true} to="/">
          <LogoContainer>✅WILL DO!</LogoContainer>
        </StyledLink>
        <LinksContainer>
          <StyledLink $isAuth={!isAuth} to="/login">
            <LogInContainer> Log In</LogInContainer>
          </StyledLink>
          <StyledLink $isAuth={!isAuth} to="/register">
            <RegisterContainer>Register</RegisterContainer>
          </StyledLink>
          <LogOutStyledLink $isAuth={isAuth} to="/">
            <b onClick={() => logOutHandler()}>Log out</b>
          </LogOutStyledLink>
        </LinksContainer>
      </NavContainer>
      <Spacer></Spacer>
    </>
  );
}

let mapStateToProps = (store) => {
  return { isAuth: store.auth.isAuth };
};

let mapDispatchToProps = (dispatch) => {
  return { logOutAction: () => dispatch(logOutSuccsessAction()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
