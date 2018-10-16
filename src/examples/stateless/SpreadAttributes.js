import React from "react";

export default props => {
  return (
    <div style={props.style}>
      <div>{props.title}</div>
      <span>{props.text}</span>
    </div>
  );
};
