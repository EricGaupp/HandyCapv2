import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "Dashboard";
import Footer from "Footer";
import Home from "Home";
import Login from "Login";
import Navbar from "Navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/about"
              render={() => {
                return <h1>About</h1>;
              }}
            />
            <Route
              exact
              path="/news"
              render={() => {
                return <h1 className="customContainer">News</h1>;
              }}
            />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/logout"
              render={() => {
                return <h1 className="customContainer">Logout</h1>;
              }}
            />
            <Route path="/dashboard" component={Dashboard} />
            <Route
              render={() => {
                return <h1 className="customContainer">404: Page not Found</h1>;
              }}
            />
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
