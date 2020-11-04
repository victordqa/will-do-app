import React from "react";
import styled from "styled-components";

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

const LinksContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-right: 1rem;
`;
function Navbar() {
  return (
    <NavContainer>
      <LogoContainer>✅WILL DO!</LogoContainer>
      <LinksContainer>
        <div style={{ marginRight: "1rem" }}>Log In</div>
        <div style={{ fontWeight: "bold" }}>Register</div>
      </LinksContainer>
    </NavContainer>
  );
}

export default Navbar;
