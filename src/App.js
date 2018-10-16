import React, { Component } from "react";
import logo from "./logo.svg";
import {
  StateLessWithProps,
  StateLessWithoutProps
} from "./components/StateLess";
import SpreadAttributes from "./components/SpreadAttributes";
import "./App.css";

class App extends Component {
  spreadAttributes = () => {
    return {
      title: "This is a title",
      text: "text only"
    };
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Stateless component/function</p>
          <StateLessWithoutProps />
          <StateLessWithProps style={{}} text="Stateless with props" />
          <p>Spread attributes</p>
          <SpreadAttributes {...this.spreadAttributes()} />
        </header>
      </div>
    );
  }
}

export default App;
