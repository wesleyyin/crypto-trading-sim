import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component.js";
import Login from "./components/login.component.js";
import Signup from "./components/signup.component";
import Feed from "./components/feed.component";
import UserProfile from "./components/user-profile.component";
import UserSearch from "./components/user-search.component.js";
import NewPost from "./components/new-post.component.js";
import Notifications from "./components/notifications.component";
import EditProfile from "./components/edit-profile.component";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <div className = "container">
          <Navbar />
          <br/>
          <Route path = "/" exact component = {Feed} />
          <Route path = "/profiles/:username" exact component = {UserProfile} />
          <Route path = "/search" exact component = {UserSearch} />
          <Route path = "/edit-profile" exact component = {EditProfile} />
          <Route path = "/new_post" exact component = {NewPost} />
          <Route path = "/notifications" exact component = {Notifications} />
      </div>
      </Switch>
      
      
    </Router>
  );
}

export default App;