import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Tasks from "./components/Tasks";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/tasks" component={Tasks} />
      </Layout>
    </Router>
  );
}

export default App;
