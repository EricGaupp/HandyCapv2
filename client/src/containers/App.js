import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { verifyUserByToken } from "actions/userActions";

import Dashboard from "components/Dashboard";
import Footer from "components/Footer";
import Home from "components/Home";
import Login from "components/Login";
import Navbar from "components/Navbar";
import News from "components/News";
import Register from "components/Register";
import PrivateRoute from "components/PrivateRoute";

import "./App.css";

const mapDispatchToProps = dispatch => {
  return {
    verifyUserByToken: token => dispatch(verifyUserByToken(token))
  };
};

class App extends Component {
  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.verifyUserByToken(token);
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
