import React, { Component } from "react";
import logo from "../../logo.svg";
import {
  StateLessWithProps,
  StateLessWithoutProps
} from "../stateless/StateLess";
import SpreadAttributes from "../stateless/SpreadAttributes";
import ComponentLogic from "../HOCs/ComponentLogic";
import "../App.css";

@ComponentLogic
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Hello world!!!"
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({
      text: e.target.value
    });
  };

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
          <input type="text" value={this.state.text} onChange={this.onChange} />
        </header>
      </div>
    );
  }
}

// export default ComponentLogic(App);
