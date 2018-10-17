import React from "react";

const componentLogic = WrapperComponent => {
  class Component extends React.Component {
    state = {
      text: "Hello World!!!"
    };

    onChange = e => {
      this.setState({
        text: e.target.value
      });
    };

    render() {
      return <WrapperComponent {...this.state} onChange={this.onChange} />;
    }
  }

  return Component;
};

export default componentLogic;
