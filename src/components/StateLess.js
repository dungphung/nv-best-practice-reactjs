import React from "react";

const StateLessWithProps = (props, style) => {
  return <div style={style}>{props.text}</div>;
};

const StateLessWithoutProps = () => {
  return <div>State less function without props</div>;
};

export { StateLessWithProps, StateLessWithoutProps };
