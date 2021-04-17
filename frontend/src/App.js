import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Login from "./components/login.component.js";
import Signup from "./components/signup.component";
import Dashboard from "./components/dashboard.component";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path = "/" exact component = {Dashboard} />
      </Switch>
      
      
    </Router>
  );
}

export default App;