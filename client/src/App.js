import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LayoutContainer = styled.div`
  display: flex;
  width: 85%;
  border: 2px solid red;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Router>
      <Navbar />
      <BodyContainer>
        <LayoutContainer>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/tasks" component={Tasks} />
        </LayoutContainer>
      </BodyContainer>

      <Footer />
    </Router>
  );
}

export default App;
