import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";

const SpacerContainer = styled.div`
  flex: 1;
`;
const LayoutContainer = styled.div`
  display: flex;
  width: 60vw;
  /* border: 2px solid blue; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function Layout({ children }) {
  return (
    <BodyContainer>
      {" "}
      <LayoutContainer>
        {" "}
        <Navbar />
        {children}
        <SpacerContainer></SpacerContainer>
        <Footer />
      </LayoutContainer>
    </BodyContainer>
  );
}

export default Layout;
