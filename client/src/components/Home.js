import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HomeContainer = styled.div`
  display: flex;
  width: 85%;
  border: 2px solid red;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Home() {
  return (
    <Container>
      <HomeContainer>
        <h3>Hello!</h3>
        <p>Welcome to the best self management app in the world!</p>
        <p>
          Click on <b>Register</b> to start
        </p>
      </HomeContainer>
    </Container>
  );
}

export default Home;
