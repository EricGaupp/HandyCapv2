import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "Dashboard";
import Footer from "Footer";
import Home from "Home";
import Login from "Login";
import Navbar from "Navbar";
import News from "News";
import Register from "Register";
import PrivateRoute from "PrivateRoute";

import "App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="contentWrapper">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/news" component={News} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route
                render={() => {
                  return (
                    <h1 className="customContainer">404: Page not Found</h1>
                  );
                }}
              />
            </Switch>
          </div>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
