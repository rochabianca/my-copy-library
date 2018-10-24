import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

import Navbar from "./components/layouts/Navbar";
import copyLibraries from "../src/components/copyLibraries/copyLibraries";
import AddCopyLibrary from "./components/copyLibraries/AddCopyLibrary";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Route exact path="/" component={copyLibraries} />
              <Route exact path="/new" component={AddCopyLibrary} />
              <Switch />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
