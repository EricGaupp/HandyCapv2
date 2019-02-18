import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import axios from "axios";

import { setUser, setToken } from "../actions/userActions";

import Dashboard from "Dashboard";
import Footer from "Footer";
import Home from "Home";
import Login from "Login";
import Navbar from "Navbar";
import News from "News";
import Register from "Register";
import PrivateRoute from "PrivateRoute";

import "App.css";

const mapDispatchToProps = dispatch => {
  return {
    setUser: response => dispatch(setUser(response)),
    setToken: token => dispatch(setToken(token))
  };
};

class App extends Component {
  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/verify", { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          if (response.data.id) {
            this.props.setUser(response);
            this.props.setToken(token);
          }
        })
        .catch(error => {
          //Non 200 range response status codes are handled in axios catch block. See https://github.com/axios/axios#handling-errors for retrieving response bodies
          if (error) {
            localStorage.removeItem("token");
          }
        });
    }
  }

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

export default connect(
  null,
  mapDispatchToProps
)(App);
