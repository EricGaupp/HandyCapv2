import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "Navbar";
import Home from "Home";

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
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
