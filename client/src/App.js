import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Tasks from "./components/Tasks";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/tasks" component={Tasks} />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
