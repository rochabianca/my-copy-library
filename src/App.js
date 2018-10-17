import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import copyLibraries from "../src/components/copyLibraries/copyLibraries";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Route exact path="/" component={copyLibraries} />
              <Switch />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
