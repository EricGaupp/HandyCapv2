import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import history from "../router/history";

import { verifyUserByToken } from "actions/userActions";

import GlobalStyles from "../themes/GlobalStyles";

import Dashboard from "components/Dashboard/Dashboard";
import Footer from "components/Footer";
import Home from "components/Home";
import Navbar from "components/Navbar/Navbar";
import News from "components/News";
import Register from "components/Register";
import PrivateRoute from "components/PrivateRoute";

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
      <Router history={history}>
        <React.Fragment>
          <GlobalStyles />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/news" component={News} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
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

export default connect(
  null,
  mapDispatchToProps
)(App);
